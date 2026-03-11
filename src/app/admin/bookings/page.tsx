import { createClient } from '@/lib/supabase/server';
import { Booking } from '@/types';
import BookingActions from '@/components/admin/BookingActions';
import { format } from 'date-fns';

const statusBadge = (status: string) => {
  const styles: Record<string, string> = {
    pending: 'bg-yellow-500/10 text-yellow-400',
    confirmed: 'bg-green-500/10 text-green-400',
    cancelled: 'bg-red-500/10 text-red-400',
  };
  return `inline-block rounded-full px-2.5 py-1 font-body text-xs font-medium ${styles[status] || styles.pending}`;
};

export default async function AdminBookingsPage() {
  const supabase = await createClient();
  const { data: bookings } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold">Bookings</h1>

      {!bookings?.length ? (
        <div className="rounded-2xl border border-brand-border bg-brand-card p-10 text-center">
          <p className="font-body text-white/50">No bookings yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-brand-border">
          <table className="w-full text-left">
            <thead className="border-b border-brand-border bg-brand-card">
              <tr>
                <th className="px-4 py-3 font-body text-xs font-semibold uppercase tracking-wider text-white/40">
                  Received
                </th>
                <th className="px-4 py-3 font-body text-xs font-semibold uppercase tracking-wider text-white/40">
                  Name
                </th>
                <th className="px-4 py-3 font-body text-xs font-semibold uppercase tracking-wider text-white/40">
                  Course
                </th>
                <th className="px-4 py-3 font-body text-xs font-semibold uppercase tracking-wider text-white/40">
                  Date
                </th>
                <th className="px-4 py-3 font-body text-xs font-semibold uppercase tracking-wider text-white/40">
                  Pax
                </th>
                <th className="px-4 py-3 font-body text-xs font-semibold uppercase tracking-wider text-white/40">
                  Status
                </th>
                <th className="px-4 py-3 font-body text-xs font-semibold uppercase tracking-wider text-white/40">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {(bookings as Booking[]).map((booking) => (
                <tr
                  key={booking.id}
                  className="bg-brand-dark transition-colors hover:bg-brand-card/50"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-body text-sm text-white/60">
                    {format(new Date(booking.created_at), 'dd MMM yyyy')}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-body text-sm font-medium">
                      {booking.first_name} {booking.last_name}
                    </p>
                    <p className="font-body text-xs text-white/40">
                      {booking.email}
                    </p>
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-white/80">
                    {booking.course_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-body text-sm text-white/60">
                    {booking.course_date
                      ? format(new Date(booking.course_date), 'dd MMM yyyy')
                      : '—'}
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-white/60">
                    {booking.participants}
                  </td>
                  <td className="px-4 py-3">
                    <span className={statusBadge(booking.status)}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <BookingActions
                      bookingId={booking.id}
                      status={booking.status}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
