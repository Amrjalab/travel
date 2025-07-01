import { Suspense } from 'react';
import AdminDashboard from './admin';

export default function EditPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading edit form...</div>}>
      <AdminDashboard />
    </Suspense>
  );
}
