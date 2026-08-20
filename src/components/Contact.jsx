import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, User, AtSign, Mail, MapPin, Phone, Linkedin } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { contact } from '@/data/content';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, message: false });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));

  const nameError = touched.name && !form.name.trim();
  const messageError = touched.message && !form.message.trim();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setTouched({ name: true, message: true });
      return;
    }
    const lines = [
      'Hello Amruta,',
      '',
      `Name: ${form.name.trim()}`,
      form.email.trim() ? `Email: ${form.email.trim()}` : '',
      '',
      'Message:',
      form.message.trim(),
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join('\n'));
    const url = `https://wa.me/${contact.whatsapp}?text=${text}`;
    window.open(url, '_blank');
  };

  const directItems = [
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, label: 'Location', value: contact.location, href: null },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-bg-light overflow-hidden">
      <div className="absolute top-20 left-0 h-56 w-56 rounded-full bg-cyan/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 h-56 w-56 rounded-full bg-med-200/40 blur-3xl pointer-events-none" />
      <div className="section-pad max-w-3xl mx-auto">
        <SectionHeading
          eyebrow="Let's Connect"
          title="Contact"
          subtitle="Send a message and it will open WhatsApp with your details pre-filled — just hit send there."
        />

        <Reveal variant="up">
          <form onSubmit={onSubmit} className="glass-light rounded-3xl p-6 md:p-8 shadow-glass">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field icon={User} label="Your Name" required error={nameError}>
                <input
                  required
                  value={form.name}
                  onChange={update('name')}
                  onBlur={blur('name')}
                  placeholder="Jane Doe"
                  className="w-full bg-transparent outline-none text-sm text-navy placeholder:text-muted/60"
                />
              </Field>
              <Field icon={AtSign} label="Your Email (optional)">
                <input
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="jane@hospital.com"
                  className="w-full bg-transparent outline-none text-sm text-navy placeholder:text-muted/60"
                />
              </Field>
            </div>
            <div className="mt-4">
              <Field icon={MessageCircle} label="Your Message" required error={messageError} align="start">
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  onBlur={blur('message')}
                  placeholder="Write your message here…"
                  className="w-full bg-transparent outline-none text-sm text-navy placeholder:text-muted/60 resize-none"
                />
              </Field>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="touchable mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-med-500 to-cyan text-white font-semibold shadow-glow-med hover:shadow-glow transition-all"
            >
              <Send className="h-5 w-5" />
              Send Message 
            </motion.button>
            <p className="mt-3 text-center text-xs text-muted">
              Name and message are required.
            </p>
          </form>
        </Reveal>

        {/* Direct contact chips */}
        <Reveal variant="up" delay={0.1}>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {directItems.map((it) => {
              const Icon = it.icon;
              const inner = (
                <div className="glass-light rounded-2xl p-4 flex flex-col items-center gap-2 text-center shadow-glass hover:shadow-glass-lg hover:-translate-y-1 transition-all h-full">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-med-500/15 to-cyan/15 grid place-items-center text-med-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-muted font-semibold">{it.label}</p>
                    <p className="text-xs font-medium text-navy truncate max-w-[140px] mx-auto mt-0.5">{it.value}</p>
                  </div>
                </div>
              );
              return it.href ? (
                <a key={it.label} href={it.href} target={it.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="touchable block">
                  {inner}
                </a>
              ) : (
                <div key={it.label}>{inner}</div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ icon: Icon, label, children, align = 'center', required = false, error = false }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wide text-muted font-semibold">
        {label}
        {required && <span className="text-cyan-600 ml-0.5">*</span>}
      </span>
      <div
        className={`mt-1.5 flex gap-2 ${align === 'start' ? 'items-start' : 'items-center'} bg-white/60 border rounded-xl px-3.5 py-3 focus-within:ring-2 transition-all ${
          error
            ? 'border-red-400 focus-within:ring-red-200'
            : 'border-med-100 focus-within:border-med-400 focus-within:ring-cyan/30'
        }`}
      >
        <Icon className="h-4 w-4 text-med-500 shrink-0 mt-0.5" />
        {children}
      </div>
      {error && (
        <span className="mt-1 block text-[11px] text-red-500 font-medium">This field is required.</span>
      )}
    </label>
  );
}
