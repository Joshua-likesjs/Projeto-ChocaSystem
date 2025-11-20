import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent")?.toLowerCase()

  const isMobile =
    ua?.includes("iphone") ||
    ua?.includes("android") ||
    ua?.includes("ipad")

  if (isMobile) {
    return NextResponse.redirect("https://seu-mobile.vercel.app")
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/'
}
