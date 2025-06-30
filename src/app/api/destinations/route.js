import pool from '@/lib/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, description, image, price, duration } = body;

    await pool.query(
      'INSERT INTO destinations (name, description, image, price, duration) VALUES ($1, $2, $3, $4, $5)',
      [name, description, image, price, duration]
    );

    return new Response(JSON.stringify({ message: 'Destination added' }), { status: 200 });
  } catch (error) {
    console.error('Add destination error:', error);
    return new Response(JSON.stringify({ message: 'Error adding destination' }), { status: 500 });
  }
}
