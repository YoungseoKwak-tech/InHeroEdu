import { createAdminClient } from "@/lib/supabase";

export type InteractionEventType = "view" | "dwell" | "reaction" | "save";

export interface InteractionVectorItem {
  resource_id: string;
  score: number;
}

export interface CollaborativeRecommendation {
  resource_id: string;
  cf_score: number;
}

const INTERACTION_INCREMENTS: Record<InteractionEventType, number> = {
  view: 0.1,
  dwell: 0.2,
  reaction: 0.5,
  save: 0.8,
};

/**
 * Update the denormalized user-resource interaction matrix.
 * Tracking should never break the core UX, so failures are logged and
 * returned rather than thrown.
 */
export async function recordInteraction(
  userId: string,
  resourceId: string,
  eventType: InteractionEventType
): Promise<{ ok: true } | { ok: false; error: string }> {
  const increment = INTERACTION_INCREMENTS[eventType];
  const supabase = createAdminClient();

  try {
    const { error } = await supabase.rpc("upsert_interaction_score", {
      p_user_id: userId,
      p_resource_id: resourceId,
      p_increment: increment,
    });

    if (error) {
      console.error(
        `[ml:cf] Failed to record ${eventType} interaction user=${userId} resource=${resourceId}:`,
        error.message
      );
      return { ok: false, error: error.message };
    }

    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown interaction tracking error";
    console.error(
      `[ml:cf] Failed to record ${eventType} interaction user=${userId} resource=${resourceId}:`,
      message
    );
    return { ok: false, error: message };
  }
}

export function cosineSimilarityFromInteractions(
  interactionsA: InteractionVectorItem[],
  interactionsB: InteractionVectorItem[]
): number {
  if (!interactionsA.length || !interactionsB.length) return 0;

  const mapA = new Map(interactionsA.map((item) => [item.resource_id, Number(item.score) || 0]));
  const mapB = new Map(interactionsB.map((item) => [item.resource_id, Number(item.score) || 0]));
  const allResources = new Set([...Array.from(mapA.keys()), ...Array.from(mapB.keys())]);

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (const resourceId of Array.from(allResources)) {
    const a = mapA.get(resourceId) ?? 0;
    const b = mapB.get(resourceId) ?? 0;
    dotProduct += a * b;
    normA += a * a;
    normB += b * b;
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Compute cosine similarity between two users from the interaction matrix.
 */
export async function computeUserSimilarity(userA: string, userB: string): Promise<number> {
  const supabase = createAdminClient();

  const [aRes, bRes] = await Promise.all([
    supabase
      .from("user_resource_interactions")
      .select("resource_id, score")
      .eq("user_id", userA),
    supabase
      .from("user_resource_interactions")
      .select("resource_id, score")
      .eq("user_id", userB),
  ]);

  if (aRes.error) {
    console.error(`[ml:cf] Failed to load interactions for user=${userA}:`, aRes.error.message);
    return 0;
  }
  if (bRes.error) {
    console.error(`[ml:cf] Failed to load interactions for user=${userB}:`, bRes.error.message);
    return 0;
  }

  return cosineSimilarityFromInteractions(
    (aRes.data ?? []) as InteractionVectorItem[],
    (bRes.data ?? []) as InteractionVectorItem[]
  );
}

/**
 * Refresh top-N similar users for one user. Intended for nightly cron,
 * not request-time recommendation.
 */
export async function refreshUserSimilarities(userId: string, topN = 20) {
  const supabase = createAdminClient();

  const { data: interactions, error } = await supabase
    .from("user_resource_interactions")
    .select("user_id")
    .neq("user_id", userId);

  if (error) {
    throw new Error(`Failed to load similarity candidates: ${error.message}`);
  }

  const counts = new Map<string, number>();
  for (const row of (interactions ?? []) as Array<{ user_id: string }>) {
    counts.set(row.user_id, (counts.get(row.user_id) ?? 0) + 1);
  }

  const candidates = Array.from(counts.entries())
    .filter(([, count]) => count >= 3)
    .map(([candidateId]) => candidateId);

  const similarities = await Promise.all(
    candidates.map(async (otherId) => ({
      user_b: otherId,
      similarity: await computeUserSimilarity(userId, otherId),
    }))
  );

  const topSimilar = similarities
    .filter((item) => item.similarity > 0.1)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topN);

  const { error: deleteErr } = await supabase
    .from("user_similarity")
    .delete()
    .eq("user_a", userId);

  if (deleteErr) {
    throw new Error(`Failed to clear previous similarities: ${deleteErr.message}`);
  }

  if (topSimilar.length === 0) {
    return { userId, refreshed: 0 };
  }

  const { error: insertErr } = await supabase.from("user_similarity").insert(
    topSimilar.map((item) => ({
      user_a: userId,
      user_b: item.user_b,
      similarity: item.similarity,
    }))
  );

  if (insertErr) {
    throw new Error(`Failed to store refreshed similarities: ${insertErr.message}`);
  }

  return { userId, refreshed: topSimilar.length };
}

/**
 * Resources liked/saved by similar users that this user has not interacted
 * with yet, normalized to a 0-1 collaborative filtering score.
 */
export async function getCollaborativeRecommendations(
  userId: string,
  limit = 30
): Promise<CollaborativeRecommendation[]> {
  const supabase = createAdminClient();

  const { data: similar, error: similarErr } = await supabase
    .from("user_similarity")
    .select("user_b, similarity")
    .eq("user_a", userId)
    .order("similarity", { ascending: false })
    .limit(50);

  if (similarErr) {
    console.error(`[ml:cf] Failed to load similar users for user=${userId}:`, similarErr.message);
    return [];
  }
  if (!similar?.length) return [];

  const { data: ownInteractions, error: ownErr } = await supabase
    .from("user_resource_interactions")
    .select("resource_id")
    .eq("user_id", userId);

  if (ownErr) {
    console.error(`[ml:cf] Failed to load own interactions for user=${userId}:`, ownErr.message);
    return [];
  }

  const ownIds = new Set(
    ((ownInteractions ?? []) as Array<{ resource_id: string }>).map((item) => item.resource_id)
  );
  const similarRows = similar as Array<{ user_b: string; similarity: number }>;
  const similarUserIds = similarRows.map((item) => item.user_b);
  const similarityMap = new Map(
    similarRows.map((item) => [item.user_b, Number(item.similarity) || 0])
  );

  const { data: theirInteractions, error: theirErr } = await supabase
    .from("user_resource_interactions")
    .select("user_id, resource_id, score")
    .in("user_id", similarUserIds)
    .gte("score", 0.5);

  if (theirErr) {
    console.error(
      `[ml:cf] Failed to load neighbor interactions for user=${userId}:`,
      theirErr.message
    );
    return [];
  }
  if (!theirInteractions?.length) return [];

  const scores = new Map<string, number>();
  for (const interaction of theirInteractions as Array<{
    user_id: string;
    resource_id: string;
    score: number;
  }>) {
    if (ownIds.has(interaction.resource_id)) continue;

    const userSimilarity = similarityMap.get(interaction.user_id) ?? 0;
    const weighted = (Number(interaction.score) || 0) * userSimilarity;
    scores.set(interaction.resource_id, (scores.get(interaction.resource_id) ?? 0) + weighted);
  }

  if (scores.size === 0) return [];

  const maxScore = Math.max(...Array.from(scores.values()));
  if (maxScore <= 0) return [];

  return Array.from(scores.entries())
    .map(([resource_id, rawScore]) => ({
      resource_id,
      cf_score: rawScore / maxScore,
    }))
    .sort((a, b) => b.cf_score - a.cf_score)
    .slice(0, limit);
}
