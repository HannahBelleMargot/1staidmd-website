import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Course } from '@/types';
import CourseCard from '@/components/CourseCard';
import { Heart, Users, GraduationCap, Star } from 'lucide-react';

const stats = [
  { value: '6+', sub: 'Courses' },
  { value: '$50', sub: 'From' },
  { value: '15%', sub: 'Returning Discount' },
  { value: 'VIC & QLD', sub: 'Locations' },
];

const audiences = [
  {
    title: 'Parents & Grandparents',
    description: 'Be ready to act when your family needs you most.',
    icon: Heart,
    accent: true,
  },
  {
    title: 'Teachers & Carers',
    description: 'Meet compliance requirements with confidence.',
    icon: GraduationCap,
    accent: false,
  },
  {
    title: 'Workplaces',
    description: 'Keep your team safe with certified first aiders on site.',
    icon: Users,
    accent: false,
  },
  {
    title: 'Schools & Clubs',
    description: 'Group training tailored to your organisation.',
    icon: Users,
    accent: false,
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    text: 'The course was incredibly practical. I feel so much more confident knowing I could help in an emergency.',
    stars: 5,
  },
  {
    name: 'James T.',
    text: 'Best first aid course I have done. The instructor made it engaging and easy to follow.',
    stars: 5,
  },
  {
    name: 'Lisa K.',
    text: 'Booked for our entire office team. Everyone left feeling empowered. Highly recommend.',
    stars: 5,
  },
];

export default async function HomePage() {
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')
    .limit(3);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative flex min-h-screen items-center justify-center px-4 pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-red/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="font-display text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
            You <em className="text-brand-red">Could</em> Save a Life.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-white/70 sm:text-xl">
            Every day people collapse from cardiac arrest while waiting for help.
            Learn the skills that could make the difference — before an ambulance
            arrives.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/book"
              className="rounded-lg bg-brand-red px-8 py-4 font-body text-base font-semibold text-white transition-colors hover:bg-brand-red-light"
            >
              Book a Course
            </Link>
            <Link
              href="/courses"
              className="rounded-lg border border-white/20 px-8 py-4 font-body text-base font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              View All Courses
            </Link>
          </div>

          {/* Stats strip */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.sub}
                className="rounded-xl border border-brand-border bg-brand-card p-4"
              >
                <p className="font-display text-2xl font-bold text-brand-red">
                  {stat.value}
                </p>
                <p className="mt-1 font-body text-sm text-white/60">
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COURSES PREVIEW ===== */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold sm:text-4xl">
                Popular Courses
              </h2>
              <p className="mt-2 font-body text-white/60">
                Practical, hands-on training for everyday Australians.
              </p>
            </div>
            <Link
              href="/courses"
              className="hidden font-body text-sm font-medium text-brand-red hover:text-brand-red-light sm:block"
            >
              View All →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(courses as Course[])?.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/courses"
              className="font-body text-sm font-medium text-brand-red hover:text-brand-red-light"
            >
              View All Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY IT MATTERS ===== */}
      <section className="bg-brand-card px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            Every minute without CPR reduces survival by{' '}
            <span className="text-brand-red">10%</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-white/70">
            In Australia, around 30,000 people experience cardiac arrest outside
            of hospital each year. Bystander CPR can double or even triple the
            chance of survival — but only if someone nearby knows what to do.
            That someone could be you.
          </p>
        </div>
      </section>

      {/* ===== WHO SHOULD LEARN ===== */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold sm:text-4xl">
            Who Should Learn First Aid?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`rounded-2xl border p-6 transition-colors ${
                    item.accent
                      ? 'border-brand-red/30 bg-brand-red/10'
                      : 'border-brand-border bg-brand-card hover:border-brand-red/20'
                  }`}
                >
                  <Icon
                    size={32}
                    className={item.accent ? 'text-brand-red' : 'text-white/50'}
                  />
                  <h3 className="mt-4 font-display text-xl font-bold">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-body text-sm text-white/60">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-brand-card px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold sm:text-4xl">
            What Our Students Say
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-brand-border bg-brand-dark p-6"
              >
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-brand-red text-brand-red"
                    />
                  ))}
                </div>
                <p className="font-body text-sm text-white/80 leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="mt-4 font-body text-sm font-semibold text-white/50">
                  — {t.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="bg-brand-red px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to learn?
          </h2>
          <p className="mt-4 font-body text-lg text-white/90">
            Book a course today and gain the skills to save a life.
          </p>
          <Link
            href="/book"
            className="mt-8 inline-block rounded-lg bg-white px-8 py-4 font-body text-base font-semibold text-brand-red transition-colors hover:bg-white/90"
          >
            Book a Course
          </Link>
        </div>
      </section>
    </>
  );
}
