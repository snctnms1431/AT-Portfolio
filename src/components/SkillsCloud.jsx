import { motion } from 'framer-motion';
import {
  Activity, ClipboardCheck, HandHeart, Layers, Pill, Droplets,
  ShieldCheck, FileText, HeartPulse, LifeBuoy, Syringe, Waves,
} from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { clinicalSkills } from '@/data/content';
import { usePrefersReducedMotion } from '@/lib/hooks';

const icons = {
  Activity, ClipboardCheck, HandHeart, Layers, Pill, Droplets,
  ShieldCheck, FileText, HeartPulse, LifeBuoy, Syringe, Waves,
};

// organic per-chip layout config (margin, drift)
const layout = [
  { mt: 'mt-0', drift: 6, delay: 0 },
  { mt: 'mt-4', drift: -5, delay: 0.4 },
  { mt: 'mt-1', drift: 7, delay: 0.8 },
  { mt: 'mt-6', drift: -6, delay: 0.2 },
  { mt: 'mt-2', drift: 5, delay: 0.6 },
  { mt: 'mt-5', drift: -7, delay: 1.0 },
];

export default function SkillsCloud() {
  const reduced = usePrefersReducedMotion();
  const half = Math.ceil(clinicalSkills.length / 2);
  const groups = [clinicalSkills.slice(0, half), clinicalSkills.slice(half)];

  return (
    <section id="skills" className="relative py-20 md:py-28 bg-bg-light overflow-hidden">
      <div className="absolute top-1/4 -left-10 h-56 w-56 rounded-full bg-cyan/10 blur-3xl pointer-events-none" />
      <div className="section-pad max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Core Competencies"
          title="Clinical Skills"
          subtitle="Practical nursing skills developed through academic study and clinical training."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {groups.map((group, gi) => (
            <Reveal key={gi} variant={gi === 0 ? 'right' : 'left'} delay={gi * 0.1}>
              <div className="glass-light rounded-3xl p-5 md:p-7 shadow-glass hover:shadow-glass-lg transition-shadow min-h-[260px]">
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                  {group.map((skill, i) => {
                    const Icon = icons[skill.icon] || Activity;
                    const cfg = layout[(gi * group.length + i) % layout.length];
                    return (
                      <motion.div
                        key={skill.name}
                        initial={reduced ? {} : { opacity: 0, y: 18, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ delay: (gi * 0.05 + i * 0.07), duration: 0.5 }}
                        whileHover={reduced ? {} : { scale: 1.06 }}
                        className="group"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <motion.div
                            animate={
                              reduced
                                ? {}
                                : { y: [0, cfg.drift, 0] }
                            }
                            transition={{
                              duration: 5 + i,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: cfg.delay,
                            }}
                            className="relative h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-gradient-to-br from-white to-med-50 border border-med-100 grid place-items-center text-med-600 shadow-sm group-hover:shadow-glow group-hover:text-med-600 transition-all"
                          >
                            <Icon className="h-6 w-6" />
                            <span className="absolute inset-0 rounded-2xl ring-1 ring-cyan/0 group-hover:ring-cyan/40 transition-all" />
                          </motion.div>
                          <span className="text-center text-[11px] md:text-xs font-medium text-ink/80 leading-tight max-w-[110px]">
                            {skill.name}
                          </span>
                        </div>
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
