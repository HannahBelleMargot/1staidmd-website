'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/courses', label: 'Courses' },
  { href: '/book', label: 'Book' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-brand-dark/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-brand-red">
              <Image
                src="/logo.jpg"
                alt="1st Aid M.D"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <span className="font-display text-xl font-bold tracking-wide text-white">
              1ST AID M.D
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative font-body text-sm font-medium transition-colors hover:text-white',
                  pathname === link.href
                    ? 'text-white'
                    : 'text-white/70'
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-brand-red" />
                )}
              </Link>
            ))}
            <Link
              href="/book"
              className="rounded-lg bg-brand-red px-5 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-brand-red-light"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 md:hidden',
          mobileOpen ? 'max-h-96 border-t border-white/10' : 'max-h-0'
        )}
      >
        <div className="bg-brand-dark/95 backdrop-blur-md px-4 pb-6 pt-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'block rounded-lg px-4 py-3 font-body text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'bg-brand-red/10 text-brand-red'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="mt-3 block rounded-lg bg-brand-red px-4 py-3 text-center font-body text-sm font-semibold text-white transition-colors hover:bg-brand-red-light"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
