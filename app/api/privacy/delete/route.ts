import { NextResponse } from "next/server";
import { requestDataDeletion } from '@/app/lib/privacyCompliance'
import { requireAuthenticatedUser } from "@/lib/auth";

export async function DELETE(req: Request) {
  const user = await requireAuthenticatedUser(req)
  if (user instanceof NextResponse) return user

  const result = await requestDataDeletion(user.id)
  return Response.json(result)
}
