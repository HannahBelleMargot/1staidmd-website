import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Course } from '@/types';
import CourseCard from '@/components/CourseCard';
import { MessageCircle } from 'lucide-react';

const enquiryCourses = [
  { name: 'Asthma & Anaphylaxis', icon: '💨' },
  { name: 'Teachers & Carers First Aid', icon: '📚' },
  { name: 'Emergency First Aid', icon: '🚑' },
];

export default async function CoursesPage() {
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  return (
    <div className="px-4 pt-32 pb-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl font-black sm:text-5xl">
            Our Courses
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-white/60">
            Professional first aid and CPR training designed for everyday people.
            All courses include a nationally recognised certificate.
          </p>
          <p className="mt-3 font-body text-sm text-white/40">
            $15 non-refundable deposit secures your spot. 15% off for returning
            students.
          </p>
        </div>

        {/* Course grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(courses as Course[])?.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Enquiry-only courses */}
        <div className="mt-20">
          <h2 className="mb-8 text-center font-display text-2xl font-bold sm:text-3xl">
            Additional Courses
          </h2>
          <p className="mb-8 text-center font-body text-white/60">
            These courses are available on request. Contact us for pricing and
            availability.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {enquiryCourses.map((course) => (
              <div
                key={course.name}
                className="flex flex-col justify-between rounded-2xl border border-brand-border bg-brand-card p-6"
              >
                <div>
                  <span className="text-3xl">{course.icon}</span>
                  <h3 className="mt-4 font-display text-xl font-bold">
                    {course.name}
                  </h3>
                  <p className="mt-2 font-body text-sm text-white/50">
                    Pricing available on enquiry
                  </p>
                </div>
                <Link
                  href="/contact?subject=Course+Information"
                  className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
                >
                  <MessageCircle size={16} />
                  Enquire
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
