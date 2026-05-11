import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { FACULTY, isFacultyId } from "@/lib/faculty";

export const runtime = "nodejs";

const BUCKET = "faculty-assets";

function publicUrlFor(path: string): string {
  const supabase = createAdminClient();
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

interface AssetRow {
  faculty_id: string;
  image_url: string | null;
  updated_at: string;
}

// GET — list all faculty + their current illustration URL
export async function GET(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("faculty_assets")
    .select("faculty_id, image_url, updated_at");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const assetMap = new Map<string, AssetRow>(
    ((data ?? []) as AssetRow[]).map((row) => [row.faculty_id, row])
  );
  const faculty = FACULTY.map((meta) => {
    const row = assetMap.get(meta.id);
    return {
      ...meta,
      imageUrl: row?.image_url ?? null,
      updatedAt: row?.updated_at ?? null,
    };
  });

  return NextResponse.json({ ok: true, faculty });
}

// POST — upload one faculty illustration (multipart/form-data: file + facultyId)
export async function POST(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "expected multipart/form-data" }, { status: 400 });
  }

  const facultyId = String(formData.get("facultyId") ?? "").trim();
  if (!isFacultyId(facultyId)) {
    return NextResponse.json({ error: "invalid facultyId" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "file required" }, { status: 400 });
  }

  const ext = (() => {
    const name = file.name || "";
    const dot = name.lastIndexOf(".");
    if (dot >= 0 && dot < name.length - 1) return name.slice(dot + 1).toLowerCase();
    const fromMime = file.type.split("/")[1];
    return (fromMime || "png").toLowerCase().replace("svg+xml", "svg");
  })();
  const path = `${facultyId}/${Date.now()}.${ext}`;

  const supabase = createAdminClient();
  const arrayBuffer = await file.arrayBuffer();
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, Buffer.from(arrayBuffer), {
      contentType: file.type || "application/octet-stream",
      upsert: false,
      cacheControl: "31536000",
    });

  if (uploadError) {
    return NextResponse.json({ error: `Storage upload failed: ${uploadError.message}` }, { status: 500 });
  }

  const imageUrl = publicUrlFor(path);

  const { error: upsertError } = await supabase
    .from("faculty_assets")
    .upsert(
      {
        faculty_id: facultyId,
        image_url: imageUrl,
        uploaded_by: admin.id,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "faculty_id" }
    );

  if (upsertError) {
    return NextResponse.json({ error: `DB save failed: ${upsertError.message}` }, { status: 500 });
  }

  return NextResponse.json({ ok: true, facultyId, imageUrl });
}

// DELETE — clear an illustration (and optionally remove storage object)
export async function DELETE(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  let body: { facultyId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const facultyId = String(body.facultyId ?? "").trim();
  if (!isFacultyId(facultyId)) {
    return NextResponse.json({ error: "invalid facultyId" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("faculty_assets")
    .update({ image_url: null, updated_at: new Date().toISOString() })
    .eq("faculty_id", facultyId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
