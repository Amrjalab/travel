// app/page.js
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetch('/api/destinations')
      .then((res) => res.json())
      .then((data) => setDestinations(data.slice(2, 5)));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')] bg-cover bg-center h-[80vh] flex items-center justify-center text-white text-center px-4">
        <div className="bg-white bg-opacity-90 text-gray-800 p-8 rounded-xl shadow-lg max-w-xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Unforgettable Journeys Start Here</h1>
          <p className="text-base md:text-lg mb-5 leading-relaxed">
            Discover the beauty of the world with us at great prices and unique experiences.
          </p>
          <Link
            href="/destinations"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full transition"
          >
            View Destinations
          </Link>
        </div>
      </div>

      {/* Destinations Preview */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Top Destinations</h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {destinations.map((dest) => (
            <div key={dest.id} className="bg-white shadow rounded overflow-hidden">
              <img src={dest.image} alt={dest.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{dest.name}</h3>
                <p className="text-gray-600 mb-2">{dest.description}</p>
                <p className="text-blue-600 font-bold mb-4">${dest.price}</p>
                <Link href={`/booking?id=${dest.id}`} className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded inline-block">
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <section id='am' className="bg-gray-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Travelers Say</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 flex">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80"
                alt="Happy Traveler"
                className="w-20 h-20 rounded-full object-cover mr-4"
              />
              <div className="text-left">
                <p className="italic text-gray-700">
                  "It was an amazing experience! The views and vibes were unforgettable. Thank you!"
                </p>
                <p className="mt-4 font-semibold">– Mohamed A.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 flex">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&h=80&q=80"
                alt="Traveler"
                className="w-20 h-20 rounded-full object-cover mr-4"
              />
              <div className="text-left">
                <p className="italic text-gray-700">
                  "Excellent service and great organization. Everything went smoothly from start to end."
                </p>
                <p className="mt-4 font-semibold">– Sarah K.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 flex">
              <img
                src="https://thumbs.dreamstime.com/b/full-length-side-portrait-happy-traveler-walking-sea-luggage-cellphone-full-length-happy-traveler-walking-sea-100789028.jpg"
                alt="Smiling Traveler"
                className="w-20 h-20 rounded-full object-cover mr-4"
              />
              <div className="text-left">
                <p className="italic text-gray-700">
                  "The places I visited were some of the best travel experiences I’ve ever had."
                </p>
                <p className="mt-4 font-semibold">– Ali M.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 flex">
              <img
                src="https://images.stockcake.com/public/1/1/e/11e5fb66-6200-4507-af27-4172ee0985f2_large/excited-traveler-posing-stockcake.jpg"
                alt="Smiling Woman"
                className="w-20 h-20 rounded-full object-cover mr-4"
              />
              <div className="text-left">
                <p className="italic text-gray-700">
                  "Not only the views were stunning, but the service was also super professional."
                </p>
                <p className="mt-4 font-semibold">– Lina T.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
   {/* Contact + Footer */}
<section  className="bg-gray-100 py-12 px-4 mt-16">
  <div  className="max-w-4xl mx-auto text-center">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h2>
    <form
      action="https://formspree.io/f/xovwpkbw"
      method="POST"
      className="grid gap-4 max-w-md mx-auto"
    >
      <input
        type="email"
        name="email"
        required
        placeholder="Your Email"
        className="p-3 border border-gray-300 rounded"
      />
      <textarea
        name="message"
        required
        placeholder="Your Message"
        className="p-3 border border-gray-300 rounded h-32"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Send Message
      </button>
    </form>
  </div>
</section>


<footer className="bg-gray-900 text-gray-300 py-8 px-4">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
    {/* Left Section: Copyright */}
    <p className="text-sm">&copy; {new Date().getFullYear()} Travel Agency. All rights reserved.</p>

    {/* Center Section: Quick Links */}
    <nav className="flex space-x-6 mt-4 md:mt-0">
      <a href="/" className="hover:text-white transition">Home</a>
      <a href="/destinations" className="hover:text-white transition">Destinations</a>
<span className="hover:text-white transition cursor-pointer">About Us</span>
<span className="hover:text-white transition cursor-pointer">Contact</span>

    </nav>

    {/* Right Section: Contact Info */}
    <div className="mt-4 md:mt-0 text-sm">
      <p>Email: <a href="mailto:info@travelagency.com" className="hover:underline">info@travelagency.com</a></p>
      <p>Phone: <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a></p>
    </div>
  </div>
</footer>


    </div>
  );
}
