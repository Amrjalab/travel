import { Suspense } from "react";
import BookingClient from "./bokki";

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading booking form...</div>}>
      <BookingClient />
    </Suspense>
  );
}