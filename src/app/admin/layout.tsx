import Link from 'next/link';
import { LayoutDashboard, CalendarCheck, MessageSquare } from 'lucide-react';
import LogoutButton from '@/components/admin/LogoutButton';

const adminLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Top bar */}
      <header className="border-b border-brand-border bg-brand-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-display text-lg font-bold">
              1ST AID M.D <span className="text-brand-red">Admin</span>
            </Link>
            <nav className="hidden items-center gap-1 sm:flex">
              {adminLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 font-body text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <Icon size={16} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden font-body text-sm text-white/40 hover:text-white sm:block"
            >
              View Site
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      <div className="border-b border-brand-border bg-brand-card px-4 py-2 sm:hidden">
        <nav className="flex gap-1">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 font-body text-xs text-white/60 transition-colors hover:bg-white/5 hover:text-white"
              >
                <Icon size={14} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {children}
      </main>
    </div>
  );
}
