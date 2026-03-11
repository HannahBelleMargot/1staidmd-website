'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Course } from '@/types';
import { formatPrice } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react';

const bookingSchema = z.object({
  course_name: z.string().min(1, 'Please select a course'),
  course_date: z.string().min(1, 'Please select a date'),
  location: z.string().min(1, 'Please select a location'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  participants: z.number().min(1),
  concession: z.boolean(),
  returning_student: z.boolean(),
  group_booking: z.boolean(),
  group_name: z.string().optional(),
});

type BookingData = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const searchParams = useSearchParams();
  const preselectedCourse = searchParams.get('course') || '';

  const [step, setStep] = useState(1);
  const [courses, setCourses] = useState<Course[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<BookingData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      course_name: '',
      course_date: '',
      location: '',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      participants: 1,
      concession: false,
      returning_student: false,
      group_booking: false,
      group_name: '',
    },
  });

  const values = watch();

  useEffect(() => {
    async function fetchCourses() {
      const supabase = createClient();
      const { data } = await supabase
        .from('courses')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (data) {
        setCourses(data as Course[]);
        if (preselectedCourse) {
          const match = data.find(
            (c: Course) => c.slug === preselectedCourse
          );
          if (match) setValue('course_name', match.name);
        }
      }
    }
    fetchCourses();
  }, [preselectedCourse, setValue]);

  const selectedCourse = courses.find((c) => c.name === values.course_name);

  const getPrice = () => {
    if (!selectedCourse) return 0;
    let price = values.concession && selectedCourse.concession_price_cents
      ? selectedCourse.concession_price_cents
      : selectedCourse.price_cents;
    if (values.returning_student) {
      price = Math.round(price * 0.85);
    }
    return price * (values.participants || 1);
  };

  const depositAmount = (values.participants || 1) * 1500;

  const nextStep = async () => {
    if (step === 1) {
      const valid = await trigger(['course_name', 'course_date', 'location']);
      if (valid) setStep(2);
    } else if (step === 2) {
      const valid = await trigger([
        'first_name',
        'last_name',
        'email',
      ]);
      if (valid) setStep(3);
    }
  };

  const onSubmit = async (data: BookingData) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setBookingId(result.id);
        setSubmitted(true);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-brand-border bg-brand-card p-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <Check size={32} className="text-green-500" />
        </div>
        <h2 className="font-display text-2xl font-bold">Booking Received!</h2>
        <p className="mt-3 font-body text-white/60">
          Your booking reference is{' '}
          <span className="font-semibold text-white">{bookingId.slice(0, 8).toUpperCase()}</span>.
          We&apos;ll be in touch at <span className="text-white">{values.email}</span> to
          confirm your spot.
        </p>
        <p className="mt-2 font-body text-sm text-white/40">
          Remaining balance payable on the day of training.
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-lg border border-brand-border bg-brand-dark px-4 py-3 font-body text-sm text-white placeholder-white/30 focus:border-brand-red focus:outline-none';
  const labelClass = 'block mb-1.5 font-body text-sm font-medium text-white/80';
  const errorClass = 'mt-1 font-body text-xs text-brand-red';

  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-6 sm:p-8">
      {/* Step indicators */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full font-body text-sm font-semibold ${
                s <= step
                  ? 'bg-brand-red text-white'
                  : 'bg-brand-border text-white/40'
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`h-0.5 w-8 ${
                  s < step ? 'bg-brand-red' : 'bg-brand-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1 — Choose Course */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="font-display text-xl font-bold">Choose Your Course</h2>
            <div>
              <label className={labelClass}>Course</label>
              <select {...register('course_name')} className={inputClass}>
                <option value="">Select a course...</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name} — {formatPrice(c.price_cents)}
                  </option>
                ))}
              </select>
              {errors.course_name && (
                <p className={errorClass}>{errors.course_name.message}</p>
              )}
            </div>
            <div>
              <label className={labelClass}>Preferred Date</label>
              <input type="date" {...register('course_date')} className={inputClass} />
              {errors.course_date && (
                <p className={errorClass}>{errors.course_date.message}</p>
              )}
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <select {...register('location')} className={inputClass}>
                <option value="">Select a location...</option>
                <option value="Victoria">Victoria</option>
                <option value="Queensland">Queensland</option>
              </select>
              {errors.location && (
                <p className={errorClass}>{errors.location.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2 — Your Details */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="font-display text-xl font-bold">Your Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>First Name</label>
                <input {...register('first_name')} placeholder="First name" className={inputClass} />
                {errors.first_name && <p className={errorClass}>{errors.first_name.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Last Name</label>
                <input {...register('last_name')} placeholder="Last name" className={inputClass} />
                {errors.last_name && <p className={errorClass}>{errors.last_name.message}</p>}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" {...register('email')} placeholder="you@example.com" className={inputClass} />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Phone (optional)</label>
                <input type="tel" {...register('phone')} placeholder="04XX XXX XXX" className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Number of Participants</label>
              <input
                type="number"
                min={1}
                {...register('participants', { valueAsNumber: true })}
                className={inputClass}
              />
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-3 font-body text-sm text-white/80">
                <input type="checkbox" {...register('concession')} className="h-4 w-4 accent-brand-red" />
                Concession card holder (HCC/Pension)
              </label>
              <label className="flex items-center gap-3 font-body text-sm text-white/80">
                <input type="checkbox" {...register('returning_student')} className="h-4 w-4 accent-brand-red" />
                Returning student (15% off)
              </label>
              <label className="flex items-center gap-3 font-body text-sm text-white/80">
                <input type="checkbox" {...register('group_booking')} className="h-4 w-4 accent-brand-red" />
                Group booking (workplace/school/club)
              </label>
            </div>
            {values.group_booking && (
              <div>
                <label className={labelClass}>Organisation Name</label>
                <input {...register('group_name')} placeholder="Organisation name" className={inputClass} />
              </div>
            )}
          </div>
        )}

        {/* Step 3 — Review & Pay */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="font-display text-xl font-bold">Review & Pay Deposit</h2>
            <div className="space-y-3 rounded-xl bg-brand-dark p-5">
              <div className="flex justify-between font-body text-sm">
                <span className="text-white/60">Course</span>
                <span className="font-medium">{values.course_name}</span>
              </div>
              <div className="flex justify-between font-body text-sm">
                <span className="text-white/60">Date</span>
                <span className="font-medium">{values.course_date}</span>
              </div>
              <div className="flex justify-between font-body text-sm">
                <span className="text-white/60">Location</span>
                <span className="font-medium">{values.location}</span>
              </div>
              <div className="flex justify-between font-body text-sm">
                <span className="text-white/60">Name</span>
                <span className="font-medium">
                  {values.first_name} {values.last_name}
                </span>
              </div>
              <div className="flex justify-between font-body text-sm">
                <span className="text-white/60">Email</span>
                <span className="font-medium">{values.email}</span>
              </div>
              <div className="flex justify-between font-body text-sm">
                <span className="text-white/60">Participants</span>
                <span className="font-medium">{values.participants}</span>
              </div>
              {values.concession && (
                <div className="flex justify-between font-body text-sm">
                  <span className="text-white/60">Concession</span>
                  <span className="font-medium text-green-400">Applied</span>
                </div>
              )}
              {values.returning_student && (
                <div className="flex justify-between font-body text-sm">
                  <span className="text-white/60">Returning Student (15% off)</span>
                  <span className="font-medium text-green-400">Applied</span>
                </div>
              )}
              <hr className="border-brand-border" />
              <div className="flex justify-between font-body text-sm">
                <span className="text-white/60">Course Total</span>
                <span className="font-semibold">{formatPrice(getPrice())}</span>
              </div>
              <div className="flex justify-between font-body">
                <span className="font-semibold text-brand-red">
                  Deposit Due Now
                </span>
                <span className="text-lg font-bold text-brand-red">
                  {formatPrice(depositAmount)}
                </span>
              </div>
            </div>
            <p className="font-body text-sm text-white/40">
              Remaining balance payable on the day of training. The $15 deposit
              per person is non-refundable but transferable with 48 hours notice.
            </p>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="mt-8 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1 font-body text-sm font-medium text-white/60 hover:text-white"
            >
              <ChevronLeft size={16} /> Back
            </button>
          ) : (
            <div />
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-1 rounded-lg bg-brand-red px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-brand-red-light"
            >
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 rounded-lg bg-brand-red px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-brand-red-light disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Processing...
                </>
              ) : (
                `Pay ${formatPrice(depositAmount)} Deposit`
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
