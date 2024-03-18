import { NextResponse } from 'next/server';

export function middleware(req) {
  // Basic Auth example taken from https://github.com/vercel/examples/tree/main/edge-functions/basic-auth-password
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    if (user === process.env.AUTH_USERNAME && pwd === process.env.AUTH_PASSWORD) {
      return NextResponse.next();
    }
  }
  url.pathname = '/api/basicauth';

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: '/stratagems-admin/:path*',
};
