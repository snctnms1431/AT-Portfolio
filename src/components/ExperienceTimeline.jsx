import { motion } from 'framer-motion';
import { Stethoscope } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { experiences } from '@/data/content';
import { useScrollProgress, usePrefersReducedMotion } from '@/lib/hooks';

export default function ExperienceTimeline() {
  const [sectionRef, progress] = useScrollProgress();
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-bg-light2 overflow-hidden"
    >
      {/* soft accent */}
      <div className="absolute top-10 right-0 h-64 w-64 rounded-full bg-cyan/10 blur-3xl pointer-events-none" />
      <div className="section-pad max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="Clinical Journey"
          title="Experience"
          subtitle="Hands-on nursing exposure built through structured clinical training."
        />

        <div className="relative pl-8 md:pl-0">
          {/* Tracing line (desktop centered, mobile left) */}
          <div className="absolute top-0 bottom-0 left-3 md:left-1/2 md:-translate-x-1/2 w-px bg-med-200/60" />
          <motion.div
            className="absolute top-0 left-3 md:left-1/2 md:-translate-x-1/2 w-px bg-gradient-to-b from-med-500 to-cyan"
            style={{ height: `${progress * 100}%` }}
            transition={reduced ? { duration: 0 } : undefined}
          />

          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, i) => {
              const nodeActive = progress > (i + 0.4) / experiences.length;
              const side = i % 2 === 0;
              return (
                <div key={i} className="relative">
                  {/* Node */}
                  <div className="absolute left-3 md:left-1/2 md:-translate-x-1/2 -translate-x-1/2 top-1">
                    <motion.div
                      className="h-4 w-4 rounded-full border-2 border-white"
                      animate={{
                        backgroundColor: nodeActive ? '#21C4D6' : '#A6CBD9',
                        boxShadow: nodeActive
                          ? '0 0 18px rgba(33,196,214,0.7)'
                          : '0 0 0px rgba(33,196,214,0)',
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className={`md:w-1/2 ${side ? 'md:pr-12' : 'md:ml-auto md:pl-12'}`}
                  >
                    <Reveal variant={side ? 'right' : 'left'} delay={0.05}>
                      <article className="glass-light rounded-2xl p-5 md:p-6 shadow-glass hover:shadow-glass-lg transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-med-500 to-cyan grid place-items-center text-white shadow-glow-med">
                            <Stethoscope className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-display font-bold text-navy text-lg leading-snug">
                              {exp.role}
                            </h3>
                            <p className="text-sm text-med-600 font-semibold mt-0.5">
                              {exp.duration}
                            </p>
                            <p className="text-xs text-muted mt-0.5">{exp.org}</p>
                          </div>
                        </div>
                        <ul className="mt-4 space-y-2.5">
                          {exp.points.map((pt, j) => (
                            <motion.li
                              key={j}
                              initial={reduced ? {} : { opacity: 0, x: side ? 12 : -12 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: '-60px' }}
                              transition={{ delay: 0.1 + j * 0.08, duration: 0.5 }}
                              className="flex gap-2.5 text-sm text-ink/80 leading-relaxed"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan shrink-0" />
                              <span>{pt}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </article>
                    </Reveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
