import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { createAdminClient } from "@/lib/supabase";
import {
  hydratePostsWithAuthors,
  type LoungePostRow,
  type LoungeRow,
  type PostPublic,
} from "@/lib/lounges";
import LoungeFeed from "@/components/lounges/LoungeFeed";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

interface LoungeMeta {
  slug: string;
  name: string;
  subjectCategory: string | null;
  description: string | null;
}

async function loadLounge(slug: string): Promise<
  { lounge: LoungeMeta; posts: PostPublic[] } | null
> {
  noStore();
  const supabase = createAdminClient();
  const { data: lounge } = await supabase
    .from("lounges")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (!lounge) return null;

  const { data: rawPosts } = await supabase
    .from("lounge_posts")
    .select("*")
    .eq("lounge_id", (lounge as LoungeRow).id)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false })
    .limit(50);

  const posts = await hydratePostsWithAuthors(
    (rawPosts ?? []) as LoungePostRow[],
    (lounge as LoungeRow).slug,
    null
  );

  return {
    lounge: {
      slug: (lounge as LoungeRow).slug,
      name: (lounge as LoungeRow).name,
      subjectCategory: (lounge as LoungeRow).subject_category,
      description: (lounge as LoungeRow).description,
    },
    posts,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = await loadLounge(params.slug);
  if (!data) return { title: "Lounge | InHero" };
  return {
    title: `${data.lounge.name} | InHero Lounges`,
    description: data.lounge.description ?? undefined,
  };
}

export default async function LoungePage({ params }: PageProps) {
  const data = await loadLounge(params.slug);
  if (!data) notFound();
  const { lounge, posts } = data;

  return (
    <main className="lp-root">
      <header className="lp-head">
        <div className="lp-head-nav">
          <Link href="/lounges" className="lp-back">← All lounges</Link>
          <Link href={`/lounges/${lounge.slug}/chat`} className="lp-chat-cta">
            Open chat view →
          </Link>
        </div>
        {lounge.subjectCategory && (
          <div className="lp-cat">{lounge.subjectCategory}</div>
        )}
        <h1 className="lp-title">{lounge.name}</h1>
        {lounge.description && <p className="lp-desc">{lounge.description}</p>}
      </header>

      <LoungeFeed slug={lounge.slug} initialPosts={posts} />

      <style>{`
        .lp-root {
          max-width: 760px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 5rem;
          color: #d8d9e6;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
        }
        .lp-head { margin-bottom: 2rem; }
        .lp-head-nav {
          display: flex; justify-content: space-between; align-items: center;
          gap: 0.85rem; flex-wrap: wrap;
          margin-bottom: 1rem;
        }
        .lp-back {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          color: rgba(148,163,184,0.7);
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.15s;
        }
        .lp-back:hover { color: #5eead4; }
        .lp-chat-cta {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 0.45rem 0.8rem;
          color: #0a0a10;
          background: #5eead4;
          border-radius: 0.4rem;
          text-decoration: none;
          transition: filter 0.15s, box-shadow 0.2s;
        }
        .lp-chat-cta:hover { filter: brightness(1.08); box-shadow: 0 0 14px rgba(94,234,212,0.4); }
        .lp-cat {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          color: #5eead4;
          text-transform: uppercase;
          margin-bottom: 0.55rem;
        }
        .lp-title {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: clamp(2rem, 4vw, 2.6rem);
          font-weight: 500;
          color: #f3f3fb;
          margin: 0 0 0.6rem;
          letter-spacing: -0.01em;
          line-height: 1.15;
        }
        .lp-desc {
          font-size: 0.96rem;
          color: rgba(216,217,230,0.78);
          line-height: 1.6;
          margin: 0;
          max-width: 620px;
        }
      `}</style>
    </main>
  );
}
