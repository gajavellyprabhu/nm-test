// import { type NextRequest, type NextFetchEvent, NextResponse } from 'next/server';
import { type NextRequest, type NextFetchEvent } from 'next/server';
import middleware from 'lib/middleware';

// const PUBLIC_FILE = /\.(.*)$/;

// eslint-disable-next-line
export default async function (req: NextRequest, ev: NextFetchEvent) {
  // const isHomePage = /^(http|https):\/\/[^\/]+(:\d+)?\/?$/.test(req.nextUrl?.href);

  // if (isHomePage) {
  //   const preLanguage = req.cookies?.get('murabba-site#lang')?.value;

  //   if (!!preLanguage && preLanguage !== 'en') {
  //     return NextResponse.redirect(new URL(`/${preLanguage}${req.nextUrl.pathname}`, req.url));
  //   }
  // } else {
  //   return middleware(req, ev);
  // }
  return middleware(req, ev);
}

export const config = {
  /*
   * Match all paths except for:
   * 1. /api routes
   * 2. /_next (Next.js internals)
   * 3. /sitecore/api (Sitecore API routes)
   * 4. /- (Sitecore media)
   * 5. /healthz (Health check)
   * 6. all root files inside /public
   */
  matcher: ['/', '/((?!api/|_next/|healthz|sitecore/api/|-/|favicon.ico|sc_logo.svg).*)'],
};
