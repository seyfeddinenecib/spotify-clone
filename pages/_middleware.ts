import { NextRequest, NextResponse } from 'next/server'

const signinPages = ['/', '/playlist', '/library']

export default function middleware(req: NextRequest) {
  if (signinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies[process.env.ACCESS_TOKEN_COOKIE]

    if (!token) {
      return NextResponse.redirect('/signin')
    }
  }
}
