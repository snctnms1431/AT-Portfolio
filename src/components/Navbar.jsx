import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, HeartPulse } from 'lucide-react';
import { navLinks } from '@/data/content';
import { useActiveSection, usePrefersReducedMotion } from '@/lib/hooks';

const ids = navLinks.map((l) => l.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-2.5 bg-bg-light/70 backdrop-blur-xl border-b border-white/50 shadow-sm'
            : 'py-4 bg-transparent'
        }`}
      >
        <nav className="section-pad flex items-center justify-between max-w-7xl mx-auto">
          <button
            onClick={() => go('home')}
            className="flex items-center gap-2 touchable px-2"
            aria-label="Go to top"
          >
            <span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-med-500 to-cyan text-white shadow-glow-med">
              <p className="h-5 w-5" >AT</p>
            </span>
            <span className="hidden sm:flex flex-col leading-none text-left">
              <span className="font-display font-bold text-navy text-sm">Amruta Thakare</span>
              <span className="text-[10px] text-muted font-medium tracking-wide">B.Sc Nursing Graduate</span>
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    active === l.id ? 'text-med-600' : 'text-ink/70 hover:text-navy'
                  }`}
                >
                  {l.label}
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-med-500 to-cyan"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <button
            className="lg:hidden grid place-items-center h-11 w-11 rounded-xl glass-light text-navy touchable"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-navy-deep/70 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="absolute right-0 top-0 h-full w-[82%] max-w-xs glass-dark p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-display font-bold text-white">Menu</span>
                <button
                  className="grid place-items-center h-11 w-11 rounded-xl bg-white/10 text-white touchable"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.04 }}
                  >
                    <button
                      onClick={() => go(l.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors touchable ${
                        active === l.id
                          ? 'text-white bg-white/10'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {l.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <p className="text-xs text-slate-400">Amruta Thakare</p>
                <p className="text-xs text-cyan-400">B.Sc Nursing Student</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
