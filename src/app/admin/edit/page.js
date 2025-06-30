'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function EditDestination() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/destinations/${id}`)
      .then(res => res.json())
      .then(data => {
        setDestination(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch destination:', err);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const updatedDestination = {
      name: formData.get('name'),
      description: formData.get('description'),
      image: formData.get('image'),
      price: parseFloat(formData.get('price')),
      duration: formData.get('duration'),
    };

    const res = await fetch(`/api/destinations/${id}`, {
      method: 'PUT', // Use PUT to update
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedDestination),
    });

    if (res.ok) {
      alert('✅ Destination updated successfully');
      router.push('/admin'); // Redirect to admin dashboard after update
    } else {
      alert('❌ Error occurred during update');
    }
  };

  if (loading) return <div className="p-10 text-center">Loading destination data...</div>;
  if (!destination) return <div className="p-10 text-center text-red-600">Destination not found</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white mt-10 shadow rounded">
      <h1 className="text-2xl font-bold mb-6">Edit Destination</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Destination Name</label>
          <input
            type="text"
            name="name"
            defaultValue={destination.name}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            defaultValue={destination.description}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            defaultValue={destination.image}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price $</label>
          <input
            type="number"
            name="price"
            step="0.01"
            defaultValue={destination.price}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Duration (e.g., 5 days)</label>
          <input
            type="text"
            name="duration"
            defaultValue={destination.duration}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Update Destination
        </button>
      </form>
    </div>
  );
}
