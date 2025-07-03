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

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        bookings.*, 
        destinations.name AS destination_name 
      FROM bookings 
      JOIN destinations ON bookings.destination_id = destinations.id
      ORDER BY bookings.created_at DESC
    `);

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Get Bookings Error:', error);
    return new Response(JSON.stringify({ message: 'Failed to get bookings' }), {
      status: 500,
    });
  }
}