import { Mail, PhoneCall } from 'lucide-react';
import { companyProfile } from '../data/company';

export function FloatingContact() {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
      <a
        href={companyProfile.phoneHref}
        aria-label="Call Smaatech"
        className="w-12 h-12 rounded-full bg-brand-500 text-space-950 shadow-[0_12px_30px_-12px_rgba(16,185,129,0.7)] flex items-center justify-center hover:bg-brand-400 transition-colors"
      >
        <PhoneCall className="w-5 h-5" />
      </a>
      <a
        href="#contact"
        aria-label="Go to contact section"
        className="w-12 h-12 rounded-full bg-space-800 border border-white/10 text-white shadow-2xl flex items-center justify-center hover:border-brand-500/40 hover:text-brand-400 transition-colors"
      >
        <Mail className="w-5 h-5" />
      </a>
    </div>
  );
}
