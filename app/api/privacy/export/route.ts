import { NextResponse } from "next/server";
import { exportUserData } from '@/app/lib/privacyCompliance'
import { requireAuthenticatedUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await requireAuthenticatedUser(req)
  if (user instanceof NextResponse) return user

  const data = await exportUserData(user.id)
  return Response.json(data)
}
