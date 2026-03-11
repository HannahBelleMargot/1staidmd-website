import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { CalendarCheck, MessageSquare, Clock } from 'lucide-react';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: totalBookings },
    { count: pendingBookings },
    { count: unreadMessages },
  ] = await Promise.all([
    supabase.from('bookings').select('*', { count: 'exact', head: true }),
    supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending'),
    supabase
      .from('contact_messages')
      .select('*', { count: 'exact', head: true })
      .eq('replied', false),
  ]);

  const stats = [
    {
      label: 'Total Bookings',
      value: totalBookings ?? 0,
      icon: CalendarCheck,
      href: '/admin/bookings',
    },
    {
      label: 'Pending Bookings',
      value: pendingBookings ?? 0,
      icon: Clock,
      href: '/admin/bookings',
      accent: true,
    },
    {
      label: 'Unread Messages',
      value: unreadMessages ?? 0,
      icon: MessageSquare,
      href: '/admin/messages',
    },
  ];

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="rounded-2xl border border-brand-border bg-brand-card p-6 transition-colors hover:border-brand-red/20"
            >
              <Icon
                size={24}
                className={stat.accent ? 'text-brand-red' : 'text-white/40'}
              />
              <p className="mt-4 font-display text-3xl font-bold">
                {stat.value}
              </p>
              <p className="mt-1 font-body text-sm text-white/50">
                {stat.label}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
