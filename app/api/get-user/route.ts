// app/api/get-user/route.ts
import { getCurrentSession } from "@/lib/server/session";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await getCurrentSession();

  if (result.session === null || result.user === null) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(result.user); // full user object
}
