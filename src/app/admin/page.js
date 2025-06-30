'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [destinations, setDestinations] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const bookingsRes = await fetch('/api/bookings');
        const bookingsData = await bookingsRes.json();
        setBookings(bookingsData);

        const destinationsRes = await fetch('/api/destinations');
        const destinationsData = await destinationsRes.json();
        setDestinations(destinationsData);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }q
    }

    fetchData();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading bookings...</div>;

  // Function to delete a destination
  async function handleDelete(id, name) {
    if (confirm(`Are you sure you want to delete the destination "${name}"?`)) {
      try {
        const res = await fetch(`/api/destinations/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          alert('✅ Destination deleted successfully');
          // Refresh destinations list after deletion without reloading the page
          setDestinations(destinations.filter(dest => dest.id !== id));
        } else {
          alert('❌ Failed to delete destination');
        }
      } catch (error) {
        alert('❌ An error occurred during deletion');
        console.error(error);
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Bookings Dashboard</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Full Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Number of People</th>
              <th className="border border-gray-300 p-2">Travel Date</th>
              <th className="border border-gray-300 p-2">Destination</th>
              <th className="border border-gray-300 p-2">Booking Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="text-center">
                <td className="border border-gray-300 p-2">{booking.full_name}</td>
                <td className="border border-gray-300 p-2">{booking.email}</td>
                <td className="border border-gray-300 p-2">{booking.people_count}</td>
                <td className="border border-gray-300 p-2">{new Date(booking.travel_date).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2">{booking.destination_id}</td>
                <td className="border border-gray-300 p-2">{new Date(booking.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2 className="text-2xl font-bold mt-10 mb-4">Available Destinations</h2>
      {destinations.length === 0 ? (
        <p>No available destinations.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Duration</th>
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Edit</th>
              <th className="border border-gray-300 p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((dest) => (
              <tr key={dest.id} className="text-center">
                <td className="border border-gray-300 p-2">{dest.name}</td>
                <td className="border border-gray-300 p-2">{dest.description}</td>
                <td className="border border-gray-300 p-2">${dest.price}</td>
                <td className="border border-gray-300 p-2">{dest.duration}</td>
                <td className="border border-gray-300 p-2">
                  <img src={dest.image} alt={dest.name} className="h-16 mx-auto" />
                </td>
                <td className="border border-gray-300 p-2">
                  <Link
                    href={`/admin/edit?id=${dest.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleDelete(dest.id, dest.name)}
                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2 className="text-xl font-bold mt-8 mb-2">Add New Destination</h2>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);

          const newDestination = {
            name: formData.get('name'),
            description: formData.get('description'),
            image: formData.get('image'),
            price: parseFloat(formData.get('price')),
            duration: formData.get('duration'),
          };

          const res = await fetch('/api/destinations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newDestination),
          });

          if (res.ok) {
       const saved = await res.json();
  alert('✅ Destination added successfully');
  e.target.reset();
  setDestinations(prev => [...prev, saved]); // Update state with new destination
          } else {
            alert('❌ An error occurred while adding');
          }
        }}
      >
        <input name="name" placeholder="Destination Name" className="border p-2 rounded" required />
        <input name="description" placeholder="Description" className="border p-2 rounded" required />
        <input name="image" placeholder="Image URL" className="border p-2 rounded" required />
        <input name="price" type="number" placeholder="Price $" className="border p-2 rounded" required />
        <input name="duration" placeholder="Duration (e.g., 5 days)" className="border p-2 rounded" required />
        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 col-span-2">
          Add Destination
        </button>
      </form>
    </div>
  );
}
