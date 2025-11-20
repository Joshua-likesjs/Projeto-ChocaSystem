import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent")?.toLowerCase()

  const isMobile =
    ua?.includes("iphone") ||
    ua?.includes("android") ||
    ua?.includes("ipad")

  if (isMobile) {
    return NextResponse.redirect("https://expo.dev/artifacts/eas/njMuWYf5L85BvMtZ6W41CX.apk")
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/'
}
