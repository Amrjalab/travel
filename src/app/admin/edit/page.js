import { Suspense } from 'react';
import BookingClient from './editAdmin';

export default function EditPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading edit form...</div>}>
      <BookingClient />
    </Suspense>
  );
}
