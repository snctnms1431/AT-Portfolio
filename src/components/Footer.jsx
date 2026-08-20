import { ArrowBigRight, HeartPulse, Linkedin, Mail, Phone, MessageCircle, Globe } from 'lucide-react';
import { contact, profile, navLinks } from '@/data/content';

export default function Footer() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="relative bg-navy-deep pt-14 pb-8 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
      <div className="section-pad max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-med-500 to-cyan text-white">
                <HeartPulse className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display font-bold text-white">{profile.name}</p>
                <p className="text-xs text-cyan-400">{profile.role}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-400 max-w-sm mx-auto md:mx-0">
              Dedicated nursing candidate open to entry-level opportunities in patient care.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-xs">
              {navLinks.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  {l.label}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <a href={`mailto:${contact.email}`} className="touchable grid place-items-center h-10 w-10 rounded-xl glass-dark text-white hover:text-cyan-400 transition-colors" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="touchable grid place-items-center h-10 w-10 rounded-xl glass-dark text-white hover:text-cyan-400 transition-colors" aria-label="Phone">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-7 pt-6 border-t border-white/10 flex flex-col items-center gap-9">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center sm:flex-row ">
              <p className="text-xs text-slate-300 ">Developed By · Sanchit Nimse</p>
              <span className="hidden sm:inline text-slate-600">|</span>
              <p className="text-xs text-slate-500">BTech · Computer Science & Engineering</p>
            </div>
            
            <p className="text-xs text-slate-500">
              Visit Developer to make your own website · 
              <a className="cursor-pointer underline text-white hover:text-cyan-400 transition-colors ml-1" href="https://snctnms.vercel.app">
                Click Here
              </a>
            </p>

            {/* Icons on new line */}
            <div className="flex items-center gap-4 mt-1">
              <a 
                href="tel:+919579114393" 
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Call"
              >
                <Phone size={16} />
              </a>

              <a 
                href="https://wa.me/919579114393?text=Hi%20Sanchit%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect!" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-green-400 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>

              <a 
                href="https://www.linkedin.com/in/harshal-nimse-73b496326/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>

              <a 
                href="https://snctnms.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
                aria-label="Portfolio"
              >
                <Globe size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}