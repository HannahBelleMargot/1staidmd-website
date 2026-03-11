'use client';

import { useState } from 'react';
import { updateBookingStatus } from '@/app/admin/bookings/actions';
import { Check, X, Loader2 } from 'lucide-react';

export default function BookingActions({
  bookingId,
  status,
}: {
  bookingId: string;
  status: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (newStatus: 'confirmed' | 'cancelled') => {
    setLoading(true);
    await updateBookingStatus(bookingId, newStatus);
    setLoading(false);
  };

  if (loading) {
    return <Loader2 size={16} className="animate-spin text-white/40" />;
  }

  return (
    <div className="flex gap-2">
      {status !== 'confirmed' && (
        <button
          onClick={() => handleUpdate('confirmed')}
          className="flex items-center gap-1 rounded-md bg-green-500/10 px-2.5 py-1.5 font-body text-xs font-medium text-green-400 transition-colors hover:bg-green-500/20"
        >
          <Check size={12} /> Confirm
        </button>
      )}
      {status !== 'cancelled' && (
        <button
          onClick={() => handleUpdate('cancelled')}
          className="flex items-center gap-1 rounded-md bg-red-500/10 px-2.5 py-1.5 font-body text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20"
        >
          <X size={12} /> Cancel
        </button>
      )}
    </div>
  );
}
