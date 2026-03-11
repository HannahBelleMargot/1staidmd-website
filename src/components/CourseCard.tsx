import Link from 'next/link';
import { Course } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Clock } from 'lucide-react';

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-brand-border bg-brand-card p-6 transition-colors hover:border-brand-red/20">
      <div>
        <span className="text-3xl">{course.icon}</span>
        <h3 className="mt-4 font-display text-xl font-bold">{course.name}</h3>
        {course.duration && (
          <div className="mt-2 flex items-center gap-1.5 font-body text-sm text-white/50">
            <Clock size={14} />
            {course.duration}
          </div>
        )}
        {course.description && (
          <p className="mt-3 font-body text-sm text-white/60 leading-relaxed">
            {course.description}
          </p>
        )}
      </div>
      <div className="mt-6">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold text-brand-red">
            {formatPrice(course.price_cents)}
          </span>
          {course.concession_price_cents && (
            <span className="font-body text-sm text-white/40">
              / {formatPrice(course.concession_price_cents)} concession
            </span>
          )}
        </div>
        <Link
          href={`/book?course=${course.slug}`}
          className="mt-4 block rounded-lg bg-brand-red px-4 py-2.5 text-center font-body text-sm font-semibold text-white transition-colors hover:bg-brand-red-light"
        >
          Book This Course
        </Link>
      </div>
    </div>
  );
}
