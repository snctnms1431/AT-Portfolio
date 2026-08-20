import { motion } from 'framer-motion';
import {
  MessageCircle, HandHeart, Users, Heart, Clock, ScanSearch,
  BadgeCheck, Shuffle, Sparkles,
} from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { professionalStrengths } from '@/data/content';
import { usePrefersReducedMotion } from '@/lib/hooks';

const icons = {
  MessageCircle, HandHeart, Users, Heart, Clock, ScanSearch,
  BadgeCheck, Shuffle, Sparkles,
};

const drift = [5, -6, 7, -5, 6, -7, 5, -6];

export default function ProfessionalStrengths() {
  const reduced = usePrefersReducedMotion();
  const half = Math.ceil(professionalStrengths.length / 2);
  const groups = [professionalStrengths.slice(0, half), professionalStrengths.slice(half)];

  return (
    <section id="strengths" className="relative py-20 md:py-28 bg-bg-light2 overflow-hidden">
      <div className="absolute bottom-10 right-0 h-56 w-56 rounded-full bg-med-500/10 blur-3xl pointer-events-none" />
      <div className="section-pad max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Beyond Clinical"
          title="Professional Strengths"
          subtitle="The qualities that shape dependable, compassionate nursing care."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {groups.map((group, gi) => (
            <Reveal key={gi} variant={gi === 0 ? 'right' : 'left'} delay={gi * 0.1}>
              <div className="relative glass-light rounded-3xl p-5 md:p-7 shadow-glass hover:shadow-glass-lg transition-shadow min-h-[240px] overflow-hidden">
                <div className="absolute top-3 right-3 text-cyan/20">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="flex flex-wrap justify-center gap-3 md:gap-5">
                  {group.map((s, i) => {
                    const Icon = icons[s.icon] || Heart;
                    return (
                      <motion.div
                        key={s.name}
                        initial={reduced ? {} : { opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ delay: i * 0.08, duration: 0.5 }}
                        whileHover={reduced ? {} : { scale: 1.05 }}
                        className="group flex flex-col items-center gap-2"
                      >
                        <motion.div
                          animate={reduced ? {} : { y: [0, drift[(gi * group.length + i) % drift.length], 0] }}
                          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
                          className="h-11 w-11 rounded-full bg-gradient-to-br from-med-500 to-cyan grid place-items-center text-white shadow-glow-med group-hover:shadow-glow transition-all"
                        >
                          <Icon className="h-5 w-5" />
                        </motion.div>
                        <span className="text-center text-[11px] md:text-xs font-semibold text-navy leading-tight max-w-[120px]">
                          {s.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
