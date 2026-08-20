import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, ImageOff } from 'lucide-react';
import { usePrefersReducedMotion } from '@/lib/hooks';

export default function CertificateViewer({ certs, index, onClose, onNavigate }) {
  const reduced = usePrefersReducedMotion();
  const [zoom, setZoom] = useState(1);
  const open = index !== null && index >= 0;

  useEffect(() => {
    setZoom(1);
  }, [index]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((index + 1) % certs.length);
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + certs.length) % certs.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, index, certs.length, onClose, onNavigate]);

  const touchStartX = useRef(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
        >
          <div className="absolute inset-0 bg-navy-deep/85 backdrop-blur-md" onClick={onClose} />

          <motion.div
            key={index}
            initial={reduced ? {} : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="text-white min-w-0">
                <p className="font-display font-semibold text-sm truncate">
                  {certs[index].title}
                </p>
                <p className="text-xs text-slate-400">{certs[index].org} · {certs[index].year}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
                  className="touchable grid place-items-center h-9 w-9 rounded-lg glass-dark text-white hover:bg-white/20"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setZoom((z) => Math.min(2.5, z + 0.25))}
                  className="touchable grid place-items-center h-9 w-9 rounded-lg glass-dark text-white hover:bg-white/20"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button
                  onClick={onClose}
                  className="touchable grid place-items-center h-9 w-9 rounded-lg bg-white/10 text-white hover:bg-white/20"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Image stage */}
            <div
              className="relative flex-1 overflow-auto no-scrollbar rounded-2xl glass-dark p-3 grid place-items-center"
              onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                const start = touchStartX.current;
                if (start == null) return;
                const dx = e.changedTouches[0].clientX - start;
                if (dx < -50) onNavigate((index + 1) % certs.length);
                if (dx > 50) onNavigate((index - 1 + certs.length) % certs.length);
                touchStartX.current = null;
              }}
            >
              <img
                src={certs[index].image}
                alt={certs[index].title}
                style={{ transform: `scale(${zoom})` }}
                className="max-w-full max-h-[72vh] object-contain rounded-lg transition-transform duration-200"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextSibling;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div
                className="hidden flex-col items-center justify-center text-slate-300 h-[72vh] w-full"
                style={{ display: 'none' }}
              >
                <ImageOff className="h-10 w-10 mb-3 text-slate-500" />
                <p className="text-sm font-medium">Certificate image not found</p>
                <p className="text-xs text-slate-500 mt-1">
                  Place the image at {certs[index].image}
                </p>
              </div>
            </div>

            {/* Nav arrows */}
            <button
              onClick={() => onNavigate((index - 1 + certs.length) % certs.length)}
              className="absolute left-1 sm:-left-3 top-1/2 -translate-y-1/2 touchable grid place-items-center h-11 w-11 rounded-full glass-dark text-white hover:bg-white/20"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => onNavigate((index + 1) % certs.length)}
              className="absolute right-1 sm:-right-3 top-1/2 -translate-y-1/2 touchable grid place-items-center h-11 w-11 rounded-full glass-dark text-white hover:bg-white/20"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* dots */}
            <div className="flex justify-center gap-1.5 mt-3">
              {certs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => onNavigate(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? 'w-5 bg-cyan' : 'w-1.5 bg-white/30'
                  }`}
                  aria-label={`Go to ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
