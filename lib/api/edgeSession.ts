import type { NextRequest } from "next/server";

/** Проверка сессии в Edge Runtime (middleware) */
export async function checkServerSession(req: NextRequest): Promise<boolean> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`;
  const res = await fetch(url, {
    method: "GET",
    headers: { cookie: req.headers.get("cookie") || "" },
    credentials: "include",
    cache: "no-store",
  });
  return res.ok; // 200 => true, 401 => false
}
