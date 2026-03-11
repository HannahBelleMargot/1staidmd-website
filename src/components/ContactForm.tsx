'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, Loader2 } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactData) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
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
        <h3 className="font-display text-xl font-bold">Message Sent!</h3>
        <p className="mt-2 font-body text-sm text-white/60">
          We&apos;ll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-lg border border-brand-border bg-brand-dark px-4 py-3 font-body text-sm text-white placeholder-white/30 focus:border-brand-red focus:outline-none';
  const labelClass = 'block mb-1.5 font-body text-sm font-medium text-white/80';
  const errorClass = 'mt-1 font-body text-xs text-brand-red';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className={labelClass}>Name</label>
        <input {...register('name')} placeholder="Your name" className={inputClass} />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>
      <div>
        <label className={labelClass}>Email</label>
        <input type="email" {...register('email')} placeholder="you@example.com" className={inputClass} />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>
      <div>
        <label className={labelClass}>Subject</label>
        <select {...register('subject')} className={inputClass}>
          <option value="">Select a subject...</option>
          <option value="General Enquiry">General Enquiry</option>
          <option value="Group Booking">Group Booking</option>
          <option value="Course Information">Course Information</option>
          <option value="Other">Other</option>
        </select>
        {errors.subject && <p className={errorClass}>{errors.subject.message}</p>}
      </div>
      <div>
        <label className={labelClass}>Message</label>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="How can we help?"
          className={inputClass}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-red px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-brand-red-light disabled:opacity-50"
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}
