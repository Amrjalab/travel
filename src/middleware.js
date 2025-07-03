import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token'); // خذ التوكن من الكوكيز

  if (!token) {
    // إذا ما فيه توكن، ارجع المستخدم لتسجيل الدخول
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // إذا فيه توكن، خلي الطلب يكمل
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
