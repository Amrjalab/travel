// src/app/destinations/[id]/page.js
'use client';
import Link from 'next/link';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function DestinationDetails() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    fetch(`/api/destinations`)
      .then((res) => res.json())
      .then((data) => {
        const selected = data.find((dest) => dest.id === parseInt(id));
        setDestination(selected);
      });
  }, [id]);

  if (!destination) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-96 object-cover rounded-lg shadow"
      />
      <h1 className="text-3xl font-bold mt-6 text-blue-800">
        {destination.name}
      </h1>
      <p className="text-gray-700 mt-4">{destination.description}</p>
      <div className="flex justify-between mt-6">
        <span className="text-xl font-semibold text-green-600">
          ${destination.price}
        </span>
        <span className="text-gray-600">{destination.duration}</span>
      </div>
      <Link  href={`/booking?id=${destination.id}`}>
      <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
        احجز الآن
      </button>
      </Link>
    </div>
  );
}
