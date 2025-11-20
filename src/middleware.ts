import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent")?.toLowerCase()

  const isMobile =
    ua?.includes("iphone") ||
    ua?.includes("android") ||
    ua?.includes("ipad")

  if (isMobile) {
    return NextResponse.redirect("https://expo.dev/artifacts/eas/aCm3RZaF2AAZdM7EA4sh1r.apk")
  }
//dd
  return NextResponse.next()
}

export const config = {
  matcher: '/'
}
