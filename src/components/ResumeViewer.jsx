import { AnimatePresence, motion } from 'framer-motion';
import { X, Download, FileText } from 'lucide-react';
import { profile } from '@/data/content';
import { usePrefersReducedMotion } from '@/lib/hooks';

export default function ResumeViewer({ open, onClose }) {
  const reduced = usePrefersReducedMotion();
  const resumeUrl = profile.resume;

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
          <div
            className="absolute inset-0 bg-navy-deep/80 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={reduced ? {} : { opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? {} : { opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl h-[88vh] glass-dark rounded-2xl overflow-hidden flex flex-col shadow-glass-lg"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2 text-white min-w-0">
                <FileText className="h-5 w-5 text-cyan-400 shrink-0" />
                <span className="font-medium text-sm truncate">Amruta_Thakare_Resume.pdf</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={resumeUrl}
                  download
                  className="touchable inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-med-500 to-cyan text-white text-xs font-semibold hover:scale-[1.03] transition-transform"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button
                  onClick={onClose}
                  className="touchable grid place-items-center h-9 w-9 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Close resume"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-navy-deep/40 relative">
              <object
                data={resumeUrl}
                type="application/pdf"
                className="absolute inset-0 h-full w-full"
                aria-label="Resume preview"
              >
                <div className="absolute inset-0 grid place-items-center p-8 text-center">
                  <div>
                    <FileText className="h-12 w-12 text-cyan-400 mx-auto mb-3" />
                    <p className="text-white font-medium">Resume preview unavailable</p>
                    <p className="text-slate-400 text-sm mt-1 mb-4">
                      Place the PDF at {resumeUrl}
                    </p>
                    <a
                      href={resumeUrl}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-med-500 to-cyan text-white text-sm font-semibold"
                    >
                      <Download className="h-4 w-4" /> Download instead
                    </a>
                  </div>
                </div>
              </object>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
