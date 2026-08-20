import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, subtitle, dark = false, center = true }) {
  return (
    <div className={`${center ? 'text-center' : 'text-left'} mb-10 md:mb-14`}>
      {eyebrow && (
        <Reveal variant="up" duration={0.6}>
          <span
            className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] ${
              dark ? 'text-cyan-400' : 'text-med-600'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${dark ? 'bg-cyan-400' : 'bg-cyan'}`} />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal variant="up" delay={0.05} duration={0.7}>
        <h2
          className={`mt-3 text-3xl md:text-4xl font-extrabold tracking-tight ${
            dark ? 'text-white' : 'text-navy'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal variant="up" delay={0.1} duration={0.7}>
          <p
            className={`mt-3 max-w-2xl mx-auto text-sm md:text-base ${
              dark ? 'text-slate-300' : 'text-muted'
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
