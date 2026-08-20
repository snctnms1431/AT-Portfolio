import { motion } from 'framer-motion';
import { Stethoscope, GraduationCap, Briefcase, Sparkles, HeartPulse, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { jobRoles } from '@/data/content';
import { usePrefersReducedMotion } from '@/lib/hooks';

const icons = { Stethoscope, GraduationCap, Briefcase, Sparkles, HeartPulse };

export default function Opportunities() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="opportunities" className="relative py-20 md:py-28 bg-navy-deep overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-med-500/20 blur-3xl animate-blobDrift" />
        <div className="absolute bottom-10 right-1/4 h-56 w-56 rounded-full bg-cyan/15 blur-3xl animate-blobDrift [animation-delay:8s]" />
      </div>

      <div className="section-pad max-w-5xl mx-auto relative">
        <SectionHeading
          dark
          eyebrow="Career Availability"
          title="Currently Open for Opportunities"
          subtitle="Open to entry-level nursing opportunities where I can apply my clinical training and contribute to quality patient care."
        />

        {/* Status indicator */}
        <Reveal variant="scale" className="flex justify-center mb-10">
          <div className="glass-dark inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full shadow-glow">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan opacity-60 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan" />
            </span>
            <span className="text-sm font-semibold text-white">Open to Opportunities</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {jobRoles.map((role, i) => {
            const Icon = icons[role.icon] || Briefcase;
            return (
              <Reveal key={role.title} variant="up" delay={i * 0.08}>
                <div className="group glass-dark rounded-2xl p-5 h-full shadow-glass hover:shadow-glow hover:-translate-y-1 transition-all duration-300">
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-med-500 to-cyan grid place-items-center text-white shadow-glow-med mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-bold text-white text-sm leading-snug">
                    {role.title}
                  </h3>
                  <motion.div
                    className="mt-3 flex items-center gap-1 text-cyan-400 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={reduced ? {} : undefined}
                  >
                    <span>Interested</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal variant="up" delay={0.2} className="mt-10 text-center">
          <a
            href="#contact"
            className="touchable inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-med-500 to-cyan text-white font-semibold shadow-glow-med hover:shadow-glow hover:scale-[1.02] active:scale-95 transition-all"
          >
            Get in Touch
            <ArrowRight className="h-5 w-5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
