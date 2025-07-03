import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

export function middleware(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    // ما في توكن؟ روح للصفحة تسجيل الدخول
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    jwt.verify(token, SECRET);
    // التوكن صحيح، خلي المستخدم يكمل
    return NextResponse.next();
  } catch (err) {
    // التوكن غير صالح أو منتهي، رجع لتسجيل الدخول
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'], // يحمي كل صفحات /admin وأي مسارات فرعية
};
