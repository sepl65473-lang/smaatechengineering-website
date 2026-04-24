import { Mail, MapPin, Phone } from 'lucide-react';
import seplLogo from '../assets/sepl-logo.png';
import { config } from '../config';
import { companyProfile } from '../data/company';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-space-950 border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-brand-500/5 blur-[100px] pointer-events-none"></div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <img src={seplLogo} alt="SEPL Logo" className="h-8 w-auto object-contain" />
              <span className="font-bold text-2xl tracking-tight text-white">
                Smaatech<span className="text-brand-500">.</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed font-light pr-4 mb-8">
              Architecting the infrastructure of tomorrow. Smaatech Group delivers highly engineered solutions across heavy civil, automation, and intelligent agritech ecosystems.
            </p>
            <div className="space-y-3 text-sm font-light">
              <a href={`mailto:${companyProfile.email}`} className="flex items-center gap-3 text-slate-400 hover:text-brand-400 transition-colors">
                <Mail className="w-4 h-4" />
                <span>{companyProfile.email}</span>
              </a>
              <a href={companyProfile.phoneHref} className="flex items-center gap-3 text-slate-400 hover:text-brand-400 transition-colors">
                <Phone className="w-4 h-4" />
                <span>{companyProfile.phoneCompact}</span>
              </a>
              <div className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{companyProfile.locationShort}</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Divisions</h4>
            <ul className="space-y-4">
              {['Water Infrastructure', 'Electro-Mechanical', 'Industrial Automation', 'Solar EPC', 'Agritech IoT'].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-slate-400 hover:text-brand-400 font-light transition-colors text-sm">{item}</a>
                </li>
              ))}
              <li>
                <a href="/career" className="text-slate-400 hover:text-brand-400 font-bold transition-colors text-sm mt-4 block">Careers</a>
              </li>
            </ul>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Quick Access</h4>
            <ul className="space-y-4">
              {[
                { label: 'About Us', href: '#about' },
                { label: 'Capabilities', href: '#services' },
                { label: 'Team', href: '#team' },
                { label: 'Insights', href: '#blog' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-slate-400 hover:text-brand-400 font-light transition-colors text-sm">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:col-span-3">
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Resources</h4>
            <p className="text-slate-400 text-sm font-light leading-relaxed mb-4">
              Connect with our team for project discussions, technical support, and access to the client platform.
            </p>
            <div className="space-y-3">
              <a href={config.platformDashboardUrl} className="block w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white hover:border-brand-500/50 transition-colors font-medium">
                Client Login
              </a>
              <button 
                type="button" 
                className="w-full text-left bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white/70 transition-colors font-medium cursor-default"
              >
                Brochure available on request
              </button>
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm font-light">
            &copy; {currentYear} Smaatech Engineering Group. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm font-light">
            <a href="#home" className="text-slate-500 hover:text-white transition-colors">Home</a>
            <a href="#contact" className="text-slate-500 hover:text-white transition-colors">Contact</a>
            <a href={config.platformDashboardUrl} className="text-slate-500 hover:text-white transition-colors">Client Login</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
