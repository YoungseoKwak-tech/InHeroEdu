import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

type Meta = Record<string, unknown> & { seminarApplication?: Record<string, unknown> };
type AuthUser = { id: string; email?: string | null; user_metadata?: Meta | null };

const s = (v: unknown) => (typeof v === "string" ? v : null);

export async function GET(req: Request) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  const supabase = createAdminClient();

  const { data: rows, error } = await supabase
    .from("waitlist_signups")
    .select("email, source, created_at")
    .like("source", "seminar%")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[admin.seminar-applications]", error);
    return NextResponse.json({ error: "query failed" }, { status: 500 });
  }

  const apps = rows ?? [];
  const wanted = new Set(apps.map((a) => String(a.email ?? "").toLowerCase()));

  // Map applicant emails → auth user (for the stored form payload in metadata).
  const userByEmail = new Map<string, AuthUser>();
  if (wanted.size > 0) {
    let page = 1;
    while (true) {
      const { data, error: e } = await supabase.auth.admin.listUsers({ page, perPage: 200 });
      if (e) break;
      const batch = (data.users ?? []) as AuthUser[];
      for (const u of batch) {
        const em = String(u.email ?? "").toLowerCase();
        if (em && wanted.has(em)) userByEmail.set(em, u);
      }
      if (!data.nextPage || batch.length === 0) break;
      page = data.nextPage;
    }
  }

  const applicants = apps.map((a) => {
    const em = String(a.email ?? "").toLowerCase();
    const meta = userByEmail.get(em)?.user_metadata ?? {};
    const app = (meta.seminarApplication ?? {}) as Record<string, unknown>;
    return {
      email: a.email,
      appliedAt: s(app.appliedAt) ?? a.created_at,
      name: s(app.name) ?? s(meta.name),
      phone: s(app.phone) ?? s(meta.phone),
      grade: s(app.grade),
      school: s(app.school),
      role: s(app.role),
      memo: s(app.memo),
      userId: userByEmail.get(em)?.id ?? null,
    };
  });

  return NextResponse.json({ applicants, total: applicants.length });
}
