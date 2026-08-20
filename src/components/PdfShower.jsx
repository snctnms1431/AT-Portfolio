import { AnimatePresence, motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { usePrefersReducedMotion } from '@/lib/hooks';

/**
 * PDF shower — document particles fall briefly while a download starts.
 */
export default function PdfShower({ active }) {
  const reduced = usePrefersReducedMotion();
  const particles = Array.from({ length: 14 });

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[90] pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute inset-0 grid place-items-center">
            <motion.div
              initial={reduced ? {} : { scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-dark rounded-2xl px-6 py-4 flex items-center gap-3 shadow-glow"
            >
              <FileText className="h-6 w-6 text-cyan-400" />
              <span className="text-white font-medium text-sm">Preparing your resume…</span>
            </motion.div>
          </div>
          {particles.map((_, i) => {
            const left = (i / particles.length) * 100 + (Math.random() * 6 - 3);
            const delay = Math.random() * 0.25;
            const dur = 0.8 + Math.random() * 0.4;
            const size = 10 + Math.random() * 10;
            return (
              <motion.div
                key={i}
                initial={{ y: -40, x: 0, opacity: 0, rotate: Math.random() * 30 - 15 }}
                animate={{ y: '110vh', opacity: [0, 1, 1, 0], rotate: Math.random() * 60 - 30 }}
                transition={{ duration: dur, delay, ease: 'easeIn' }}
                className="absolute top-0"
                style={{ left: `${left}%` }}
              >
                <div
                  className="rounded-sm bg-white/90 shadow-md border border-slate-200"
                  style={{ width: size, height: size * 1.3 }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
