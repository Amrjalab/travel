// src/app/destinations/page.js
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);

 
  useEffect(() => {
    fetch('api/destinations')
    .then((res) => res.json())
    .then((data) => setDestinations(data))
  },[]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
        Explore Our Destinations 🌍
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {destinations.map((dest) => (
          <div key={dest.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <Link href={`/destinations/${dest.id}`}>
              <div className="cursor-pointer hover:shadow-lg transition">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-48 object-cover"
                />
              </div>
            </Link>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{dest.name}</h2>
              <p className="text-gray-600 mt-2 text-sm">{dest.description}</p>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold">${dest.price}</span>
                  <span className="text-gray-500 text-sm">{dest.duration}</span>
                </div>
                <Link
                  href={`/booking?id=${dest.id}`}
                  className="mt-2 text-center bg-blue-600 hover:bg-blue-700 text-white py-2  px-2 rounded transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
