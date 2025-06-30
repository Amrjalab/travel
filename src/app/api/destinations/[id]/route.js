import pool from '@/lib/db';

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const result = await pool.query('SELECT * FROM destinations WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return new Response('Destination not found', { status: 404 });
    }
    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('GET Destination Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  try {
    const body = await req.json();
    const { name, description, image, price, duration } = body;

    const result = await pool.query(
      `UPDATE destinations 
       SET name = $1, description = $2, image = $3, price = $4, duration = $5 
       WHERE id = $6 RETURNING *`,
      [name, description, image, price, duration, id]
    );

    if (result.rows.length === 0) {
      return new Response('Destination not found', { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Destination updated successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('PUT Destination Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const res = await pool.query('DELETE FROM destinations WHERE id = $1', [id]);

    if (res.rowCount === 0) {
      return new Response(JSON.stringify({ message: 'الوجهة غير موجودة' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'تم حذف الوجهة بنجاح' }), { status: 200 });
  } catch (error) {
    console.error('Delete destination error:', error);
    return new Response(JSON.stringify({ message: 'حدث خطأ أثناء الحذف' }), { status: 500 });
  }
}