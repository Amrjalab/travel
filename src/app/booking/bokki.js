'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function BookingClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [destination, setDestination] = useState(null);

  useEffect(() => {
    fetch('/api/destinations')
      .then(res => res.json())
      .then(data => {
        const selected = data.find(d => d.id === parseInt(id));
        setDestination(selected);
      });
  }, [id]);

  if (!destination) return <div className="p-10 text-center">Loading destination...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const booking = {
      destination_id: destination.id,
      full_name: formData.get('full_name'),
      email: formData.get('email'),
      people_count: parseInt(formData.get('people_count')),
      travel_date: formData.get('travel_date'),
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      });

      if (res.ok) {
        alert('✅ Booking successful!');
        e.target.reset();
      } else {
        alert('❌ Booking failed!');
      }
    } catch (error) {
      alert('❌ An error occurred, please try again.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white mt-10 shadow rounded">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        Book your trip to {destination.name}
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" name="full_name" required className="mt-1 block w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" name="email" required className="mt-1 block w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of People</label>
          <input type="number" name="people_count" min="1" required className="mt-1 block w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Travel Date</label>
          <input type="date" name="travel_date" required className="mt-1 block w-full p-2 border rounded" />
        </div>

        <button type="submit" className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
