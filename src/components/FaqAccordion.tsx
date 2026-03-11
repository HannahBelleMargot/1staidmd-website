'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    q: 'What should I wear to training?',
    a: 'Comfortable clothing you can move in. Closed-toe shoes are required.',
  },
  {
    q: 'Do I need prior experience?',
    a: 'No experience needed. Our courses are designed for everyday people with no medical background.',
  },
  {
    q: 'Do I get a certificate?',
    a: 'Yes, all participants receive a nationally recognised certificate upon successful completion.',
  },
  {
    q: 'What if I cannot kneel for CPR?',
    a: 'Please let us know before your course and we will make reasonable adjustments where possible.',
  },
  {
    q: 'How long is certification valid?',
    a: 'Most first aid certificates are valid for 3 years. CPR certificates should be renewed annually.',
  },
  {
    q: 'Can workplaces book private training?',
    a: 'Yes. We offer customised group sessions for workplaces, schools, sporting clubs and community groups. Contact us to arrange.',
  },
  {
    q: 'Is the $15 deposit refundable?',
    a: 'The deposit is non-refundable but can be transferred to another course date with 48 hours notice.',
  },
  {
    q: 'What if I need to reschedule?',
    a: 'Contact us at least 48 hours before your course and we will transfer your booking to another available date.',
  },
  {
    q: 'Do you train schools and sports clubs?',
    a: 'Yes. We offer group bookings and can come to your venue. Contact us to discuss your needs.',
  },
  {
    q: 'Is the course suitable for teenagers?',
    a: 'Yes, anyone aged 16 and over can participate. Parental consent may be required for under-18s.',
  },
  {
    q: 'Do you offer concession pricing?',
    a: 'Yes. BCC and Pension Card holders receive a $20 discount on most courses. Valid ID must be presented on the day.',
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="rounded-xl border border-brand-border bg-brand-card overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between px-6 py-4 text-left"
          >
            <span className="font-body text-sm font-medium text-white/90 pr-4">
              {faq.q}
            </span>
            <ChevronDown
              size={18}
              className={cn(
                'shrink-0 text-white/40 transition-transform duration-200',
                openIndex === i && 'rotate-180 text-brand-red'
              )}
            />
          </button>
          <div
            className={cn(
              'grid transition-all duration-200',
              openIndex === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            )}
          >
            <div className="overflow-hidden">
              <p className="px-6 pb-4 font-body text-sm text-white/60 leading-relaxed">
                {faq.a}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
