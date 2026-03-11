import Link from 'next/link';
import { Crosshair, ShieldCheck, HeartHandshake } from 'lucide-react';

const pillars = [
  {
    title: 'Practical Skills',
    description:
      'Hands-on training with real equipment. You will practise CPR, use defibrillators, and manage real-world scenarios.',
    icon: Crosshair,
  },
  {
    title: 'Real Confidence',
    description:
      'We build your confidence so that when a moment comes, you do not freeze — you act.',
    icon: ShieldCheck,
  },
  {
    title: 'Community Impact',
    description:
      'Every person trained is another link in the chain of survival. Together, we make communities safer.',
    icon: HeartHandshake,
  },
];

export default function AboutPage() {
  return (
    <div className="px-4 pt-32 pb-24">
      <div className="mx-auto max-w-4xl">
        {/* Hero */}
        <div className="mb-16 text-center">
          <h1 className="font-display text-4xl font-black sm:text-5xl">
            Why 1st Aid M.D Exists
          </h1>
        </div>

        {/* Body */}
        <div className="mx-auto max-w-3xl space-y-6 font-body text-lg leading-relaxed text-white/80">
          <p>
            Every year, Australians lose their lives to cardiac arrests, choking,
            and other emergencies — not because help wasn&apos;t close, but because no
            one nearby knew what to do.
          </p>
          <p>
            At 1st Aid M.D, we believe that changes with education. We provide
            professional, practical first aid and CPR training designed for
            everyday people — parents, teachers, carers, workplaces and
            communities across Victoria and Queensland.
          </p>
          <p>
            Our courses are engaging, hands-on and delivered by qualified
            instructors. We focus on building real confidence so that when a
            moment comes, you&apos;re ready to act.
          </p>
        </div>

        {/* Mission pillars */}
        <div className="mt-20">
          <h2 className="mb-12 text-center font-display text-3xl font-bold">
            Our Mission
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-brand-border bg-brand-card p-6 text-center"
                >
                  <Icon size={36} className="mx-auto text-brand-red" />
                  <h3 className="mt-4 font-display text-xl font-bold">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 font-body text-sm text-white/60 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-20 rounded-2xl border border-brand-border bg-brand-card p-10 text-center">
          <h3 className="font-display text-2xl font-bold">
            Want to learn more?
          </h3>
          <p className="mt-3 font-body text-white/60">
            Get in touch and we&apos;ll help you find the right course.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-brand-red px-8 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-brand-red-light"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
