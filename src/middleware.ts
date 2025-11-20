import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent")?.toLowerCase() || "";

  const isMobile =
    ua.includes("iphone") ||
    ua.includes("android") ||
    ua.includes("ipad") ||
    ua.includes("mobile");

  // Se for mobile e estiver tentando acessar a página web:
  if (isMobile && req.nextUrl.pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/mobile"; // rota mobile
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
