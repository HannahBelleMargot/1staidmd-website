import { Suspense } from 'react';
import BookingForm from '@/components/BookingForm';

export default function BookPage() {
  return (
    <div className="px-4 pt-32 pb-24">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <h1 className="font-display text-4xl font-black sm:text-5xl">
            Book a Course
          </h1>
          <p className="mt-4 font-body text-lg text-white/60">
            Secure your spot with a $15 deposit. Remaining balance payable on
            the day.
          </p>
        </div>
        <Suspense fallback={<div className="text-center font-body text-white/40">Loading...</div>}>
          <BookingForm />
        </Suspense>
      </div>
    </div>
  );
}
