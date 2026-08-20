import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import Particles from './Particles';
import { profile } from '@/data/content';
import { usePrefersReducedMotion } from '@/lib/hooks';

export default function Hero({ onCheckResume, onDownloadResume, showering }) {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-bg-light pt-24 pb-16"
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-20 h-72 w-72 md:h-96 md:w-96 rounded-full bg-med-200/50 blur-3xl animate-blobDrift" />
        <div className="absolute bottom-0 right-0 h-72 w-72 md:h-96 md:w-96 rounded-full bg-cyan/20 blur-3xl animate-blobDrift [animation-delay:6s]" />
        <div className="absolute top-1/3 right-1/4 h-56 w-56 rounded-full bg-med-100/60 blur-3xl animate-blobDrift [animation-delay:12s]" />
      </div>
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(22,119,168,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(22,119,168,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <Particles density={90} color="#1677A8" />

      <div className="relative section-pad max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-1 flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Pulsing glow halo (animated color) */}
              <motion.div
                className="absolute -inset-8 rounded-full"
                animate={
                  reduced
                    ? {}
                    : {
                        boxShadow: [
                          '0 0 40px 8px rgba(22,119,168,0.35)',
                          '0 0 60px 14px rgba(33,196,214,0.45)',
                          '0 0 40px 8px rgba(22,119,168,0.35)',
                        ],
                      }
                }
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Animated rotating gradient ring */}
              <motion.div
                className="absolute -inset-3 rounded-full"
                style={{
                  background:
                    'conic-gradient(from 0deg, #1677A8, #21C4D6, #5DD7E3, #1677A8, #21C4D6, #1677A8)',
                  filter: 'blur(1px)',
                }}
                animate={reduced ? {} : { rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              {/* Inner ring color pulse */}
              <motion.div
                className="absolute -inset-1.5 rounded-full"
                animate={
                  reduced
                    ? {}
                    : {
                        borderColor: [
                          'rgba(22,119,168,0.0)',
                          'rgba(33,196,214,0.0)',
                        ],
                      }
                }
              />
              <div className="relative h-44 w-44 sm:h-52 sm:w-52 md:h-64 md:w-64 rounded-full overflow-hidden border-4 border-white/90 bg-bg-light2 shadow-glass-lg">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                
              </div>
              {/* Floating status chip */}
              <motion.div
                initial={reduced ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 glass-light px-3 py-1.5 rounded-full text-[11px] text-navy font-semibold whitespace-nowrap shadow-glass"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-cyan mr-2 animate-pulse" />
                Open for Opportunities
              </motion.div>
            </div>
          </motion.div>

          {/* Text */}
          <div className="order-2 lg:order-2 text-center lg:text-left">
            <motion.p
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-med-600 font-semibold tracking-[0.2em] text-xs uppercase"
            >
              B.Sc Nursing · Class of 2028
            </motion.p>
            <motion.h1
              initial={reduced ? {} : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.8 }}
              className="mt-3 text-4xl sm:text-5xl md:text-6xl font-extrabold font-display text-navy leading-[1.1]"
            >
              Amruta<br className="sm:hidden" /> Thakare
            </motion.h1>
            <motion.p
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="mt-3 text-lg md:text-xl text-med-600 font-semibold"
            >
              B.Sc Nursing Student
            </motion.p>
            <motion.p
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.7 }}
              className="mt-5 max-w-xl mx-auto lg:mx-0 text-sm md:text-base text-ink/80 leading-relaxed"
            >
              {profile.intro}
            </motion.p>

            <motion.div
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.7 }}
              className="mt-7 flex flex-col sm:flex-row gap-3 sm:justify-center lg:justify-start"
            >
              <button
                onClick={onCheckResume}
                className="touchable inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-med-500 to-cyan text-white font-semibold shadow-glow-med hover:shadow-glow hover:scale-[1.02] active:scale-95 transition-all"
              >
                <FileText className="h-5 w-5" />
                Check Resume
              </button>
              <button
                onClick={onDownloadResume}
                disabled={showering}
                className="touchable relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass-light text-navy font-semibold hover:bg-white/80 active:scale-95 transition-all overflow-hidden border border-med-100"
              >
                <Download className="h-5 w-5 text-med-600" />
                Download Resume
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center text-muted"
      >
        <span className="text-[10px] tracking-widest uppercase mb-1">Scroll</span>
        <div className="h-8 w-5 rounded-full border border-med-300/60 flex justify-center pt-1.5">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-med-500"
            animate={reduced ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
