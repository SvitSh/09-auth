import { NextResponse, type NextRequest } from "next/server";
import { checkServerSession } from "./lib/api/edgeSession";

/** Какие пути перехватываем */
export const config = {
  matcher: ["/notes/:path*", "/profile/:path*", "/sign-in", "/sign-up"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);

  const isPrivate =
    pathname.startsWith("/profile") || pathname.startsWith("/notes");
  const isAuthPage =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  // ВАЖНО: функция возвращает boolean. Не трогаем headers.
  const authed = await checkServerSession(request);

  if (!authed && isPrivate) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (authed && isAuthPage) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}
