import { useState } from 'react';
import { Award, ChevronRight, ImageOff } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import CertificateViewer from './CertificateViewer';
import { certifications } from '@/data/content';

export default function Certifications() {
  const [active, setActive] = useState(null);

  return (
    <section id="certifications" className="relative py-20 md:py-28 bg-bg-light overflow-hidden">
      <div className="absolute top-10 right-1/4 h-56 w-56 rounded-full bg-cyan/10 blur-3xl pointer-events-none" />
      <div className="section-pad max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Verified Training"
          title="Certifications"
          subtitle="Specialized modules completed through structured healthcare training programs."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certifications.map((cert, i) => (
            <Reveal key={cert.title} variant="up" delay={i * 0.08}>
              <button
                onClick={() => setActive(i)}
                className="group w-full text-left glass-light rounded-2xl overflow-hidden shadow-glass hover:shadow-glass-lg hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] bg-gradient-to-br from-med-50 to-bg-light2 overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div
                    className="absolute inset-0 hidden flex-col items-center justify-center text-med-500 bg-gradient-to-br from-med-50 to-bg-light2"
                    style={{ display: 'none' }}
                  >
                    <ImageOff className="h-8 w-8 mb-2" />
                    <span className="text-xs font-medium">Add {cert.image.split('/').pop()}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-3 right-3 h-8 w-8 rounded-lg glass-light grid place-items-center text-med-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-med-600 uppercase tracking-wide">
                    <Award className="h-3.5 w-3.5" />
                    {cert.year}
                  </div>
                  <h3 className="mt-2 font-display font-bold text-navy text-sm leading-snug min-h-[2.5rem]">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{cert.org}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <CertificateViewer
        certs={certifications}
        index={active}
        onClose={() => setActive(null)}
        onNavigate={setActive}
      />
    </section>
  );
}
