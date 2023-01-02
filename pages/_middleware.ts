import { NextRequest, NextResponse } from 'next/server'

const signinPages = ['/', '/playlist', '/library']

export default function middleware(req: NextRequest) {
  if (signinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.access_token

    if (!token) {
      return NextResponse.redirect('/signin')
    }
  }
}
