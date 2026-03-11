import FaqAccordion from '@/components/FaqAccordion';
import Link from 'next/link';

export default function FaqPage() {
  return (
    <div className="px-4 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl font-black sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 font-body text-lg text-white/60">
            Everything you need to know before your course.
          </p>
        </div>
        <FaqAccordion />
        <div className="mt-12 text-center">
          <p className="font-body text-white/50">
            Still have questions?{' '}
            <Link href="/contact" className="text-brand-red hover:text-brand-red-light font-medium">
              Get in touch
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
