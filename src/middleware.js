import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token'); // ناخد التوكن من الكوكيز

  // إذا ما فيه توكن أو التوكن غير صحيح نوجهه لصفحة تسجيل الدخول
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // إذا فيه توكن نسمح بالوصول
  return NextResponse.next();
}

// حدد أي مسارات يبنيش عليها الميدل وير
export const config = {
  matcher: ['/admin/:path*'], // كل الروابط تحت /admin محمية
};
