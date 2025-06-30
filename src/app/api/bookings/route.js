import pool from '@/lib/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { destination_id, full_name, email, people_count, travel_date } = body;

    await pool.query(
      'INSERT INTO bookings (destination_id, full_name, email, people_count, travel_date) VALUES ($1, $2, $3, $4, $5)',
      [destination_id, full_name, email, people_count, travel_date]
    );

    return new Response(JSON.stringify({ message: 'Booking successful' }), { status: 200 });
  } catch (error) {
    console.error('Booking Error:', error);
    return new Response(JSON.stringify({ message: 'Booking failed' }), { status: 500 });
  }
}

