import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  const { username, password } = await req.json();

  // المقارنة بالقيم من .env
  const isValid =
    username === "amr" &&
    password === "amr";

  if (isValid) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });

    return new Response(JSON.stringify({ message: 'تم تسجيل الدخول' }), {
      status: 200,
      headers: {
        'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`,
        'Content-Type': 'application/json',
      },
    });
  } else {
    return new Response(JSON.stringify({ message: 'بيانات غير صحيحة' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
