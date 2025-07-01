'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function EditClient() {
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
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updated = {
      name: formData.get('name'),
      description: formData.get('description'),
      image: formData.get('image'),
      price: formData.get('price'),
      duration: formData.get('duration')
    };

    const res = await fetch(`/api/destinations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });

    if (res.ok) {
      alert('✅ Updated!');
      router.push('/admin');
    } else {
      alert('❌ Failed');
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!destination) return <div className="text-center text-red-600">Destination not found</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 space-y-4">
      <input defaultValue={destination.name} name="name" required className="w-full p-2 border" />
      <textarea defaultValue={destination.description} name="description" required className="w-full p-2 border" />
      <input defaultValue={destination.image} name="image" required className="w-full p-2 border" />
      <input defaultValue={destination.price} name="price" type="number" required className="w-full p-2 border" />
      <input defaultValue={destination.duration} name="duration" required className="w-full p-2 border" />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Update</button>
    </form>
  );
}
