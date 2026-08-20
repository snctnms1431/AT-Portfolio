import { motion } from 'framer-motion';
import { GraduationCap, School, MapPin } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { education } from '@/data/content';
import { useScrollProgress, usePrefersReducedMotion } from '@/lib/hooks';

export default function EducationTimeline() {
  const [sectionRef, progress] = useScrollProgress();
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-navy-deep overflow-hidden"
    >
      <div className="absolute top-20 left-0 h-64 w-64 rounded-full bg-med-500/20 blur-3xl pointer-events-none" />
      <div className="section-pad max-w-4xl mx-auto relative">
        <SectionHeading
          dark
          eyebrow="Academic Path"
          title="Education"
          subtitle="The academic foundation behind the clinical practice."
        />

        <div className="relative pl-8 md:pl-0">
          <div className="absolute top-0 bottom-0 left-3 md:left-1/2 md:-translate-x-1/2 w-px bg-white/10" />
          <motion.div
            className="absolute top-0 left-3 md:left-1/2 md:-translate-x-1/2 w-px bg-gradient-to-b from-cyan to-med-400"
            style={{ height: `${progress * 100}%` }}
          />

          <div className="space-y-12 md:space-y-16">
            {education.map((edu, i) => {
              const nodeActive = progress > (i + 0.45) / education.length;
              const isCurrent = edu.status === 'current';
              const side = i % 2 === 0;
              return (
                <div key={i} className="relative">
                  <div className="absolute left-3 md:left-1/2 md:-translate-x-1/2 -translate-x-1/2 top-1">
                    <motion.div
                      className="h-4 w-4 rounded-full border-2 border-navy-deep"
                      animate={{
                        backgroundColor: nodeActive ? '#21C4D6' : 'rgba(255,255,255,0.2)',
                        boxShadow: nodeActive
                          ? '0 0 18px rgba(33,196,214,0.8)'
                          : '0 0 0px rgba(33,196,214,0)',
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>

                  <div className={`md:w-1/2 ${side ? 'md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                    <Reveal variant={side ? 'right' : 'left'} delay={0.05}>
                      <article
                        className={`rounded-2xl p-5 md:p-6 transition-shadow hover:shadow-glass-lg ${
                          isCurrent ? 'glass-dark shadow-glow' : 'glass-dark shadow-glass'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-med-500 to-cyan grid place-items-center text-white">
                            <GraduationCap className="h-5 w-5" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-display font-bold text-white text-lg leading-snug">
                              {edu.degree}
                            </h3>
                            <p className="text-sm text-slate-200 mt-0.5 flex items-center gap-1.5">
                              <School className="h-3.5 w-3.5 text-cyan-400" />
                              {edu.org}
                            </p>
                            {edu.location && (
                              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                                <MapPin className="h-3.5 w-3.5" />
                                {edu.location}
                              </p>
                            )}
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-slate-300">{edu.detail}</p>
                        {isCurrent && (
                          <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400 bg-cyan/10 px-2.5 py-1 rounded-full">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
                            In Progress
                          </span>
                        )}
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
