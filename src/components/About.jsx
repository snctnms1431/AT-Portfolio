import {
  GraduationCap, BookOpen, Stethoscope, MapPin, CalendarCheck,
} from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { about } from '@/data/content';

const icons = {
  GraduationCap, BookOpen, Stethoscope, MapPin, CalendarCheck,
};

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-28 bg-bg-light">
      <div className="section-pad max-w-6xl mx-auto">
        <SectionHeading eyebrow="Introduction" title={about.heading} />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <Reveal variant="right" className="lg:col-span-3">
            <p className="text-base md:text-lg text-ink/85 leading-relaxed">
              {about.body}
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm text-muted">
              <span className="h-px flex-1 bg-gradient-to-r from-med-300 to-transparent" />
              <span className="font-semibold text-med-600">Compassionate · Clinically Trained · Reliable</span>
              <span className="h-px flex-1 bg-gradient-to-l from-med-300 to-transparent" />
            </div>
          </Reveal>

          <div className="lg:col-span-2 grid grid-cols-2 gap-3">
            {about.quickInfo.map((item, i) => {
              const Icon = icons[item.icon] || GraduationCap;
              return (
                <Reveal key={item.label} variant="up" delay={0.08 * i}>
                  <div className="glass-light rounded-2xl p-4 h-full shadow-glass hover:shadow-glass-lg hover:-translate-y-1 transition-all duration-300 group">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-med-500/15 to-cyan/15 grid place-items-center text-med-600 group-hover:text-med-600 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-navy leading-snug">{item.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
