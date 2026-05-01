import { Mail, MapPin, Phone } from 'lucide-react';

import seplLogo from '../assets/sepl-logo.png';
import { companyProfile } from '../data/company';
import { divisions } from '../data/divisions';

interface FooterProps {
  setView: (view: string) => void;
}

const quickAccessLinks = [
  { label: 'About Us', sectionId: 'about' },
  { label: 'Capabilities', sectionId: 'services' },
  { label: 'Products', sectionId: 'products' },
  { label: 'Contact', sectionId: 'contact' },
] as const;

export function Footer({ setView }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { label: 'LinkedIn', href: companyProfile.socials.linkedin },
    { label: 'Facebook', href: companyProfile.socials.facebook },
    { label: 'Instagram', href: companyProfile.socials.instagram },
    { label: 'YouTube', href: companyProfile.socials.youtube },
  ].filter((item): item is { label: string; href: string } => Boolean(item.href));

  const goToHomeSection = (sectionId?: string) => {
    setView('home');

    requestAnimationFrame(() => {
      if (!sectionId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      requestAnimationFrame(() => {
        const target = document.getElementById(sectionId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });
  };

  const goToCareer = () => {
    setView('career');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToProjectWorks = () => {
    setView('project-works');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToDivision = (slug: string) => {
    setView(`division:${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToColdStorage = () => {
    setView('project-cold-storage');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-space-950 pt-10 pb-10 md:pt-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-24 w-3/4 -translate-x-1/2 bg-brand-500/5 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-10 h-40 w-40 rounded-full bg-accent-500/5 blur-[120px]" />

      <div className="container-custom relative z-10">
        <div className="grid gap-8 border-b border-white/6 pb-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(190px,0.72fr)_minmax(190px,0.82fr)] lg:gap-12">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <img src={seplLogo} alt="SEPL Logo" className="h-8 w-auto object-contain" />
              <span className="text-2xl font-bold tracking-tight text-white">
                Smaatech<span className="text-brand-500">.</span>
              </span>
            </div>

            <p className="max-w-xl pr-4 text-sm font-light leading-relaxed text-slate-400 md:text-[15px]">
              Smaatech Engineering Group supports practical work across water infrastructure, electro-mechanical systems, automation, agritech IoT, solar EPC, and technical training.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/14 bg-[#1b2940] p-5 shadow-[0_18px_44px_-30px_rgba(0,0,0,0.9)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#e2e8f0]">Registered Office</p>
                <div className="mt-4 flex items-start gap-3 text-sm font-semibold text-[#ffffff]">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#38d5e6]" />
                  <span className="leading-relaxed">{companyProfile.registeredOffice}</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/14 bg-[#1b2940] p-5 shadow-[0_18px_44px_-30px_rgba(0,0,0,0.9)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#e2e8f0]">Reach Us</p>
                <div className="mt-4 space-y-4 text-sm font-semibold">
                  <a href={`mailto:${companyProfile.email}`} className="flex items-center gap-3 text-[#ffffff] transition-colors hover:text-[#67e8f9]">
                    <Mail className="h-4 w-4 text-[#38d5e6]" />
                    <span>{companyProfile.email}</span>
                  </a>
                  <a href={companyProfile.phoneHref} className="flex items-center gap-3 text-[#ffffff] transition-colors hover:text-[#67e8f9]">
                    <Phone className="h-4 w-4 text-[#38d5e6]" />
                    <span>{companyProfile.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>

            {socialLinks.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-slate-300 transition-colors hover:border-brand-500/30 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="lg:pt-1">
            <h4 className="mb-5 text-xs font-bold uppercase tracking-widest text-white">Services</h4>
            <ul className="space-y-3.5">
              {divisions.map((division) => (
                <li key={division.slug}>
                  <button
                    type="button"
                    onClick={() => goToDivision(division.slug)}
                    className="text-sm font-light text-slate-400 transition-colors hover:text-brand-400"
                  >
                    {division.shortLabel}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={goToColdStorage}
                  className="text-sm font-light text-slate-400 transition-colors hover:text-brand-400"
                >
                  Cold Storage
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:pt-1">
            <h4 className="mb-5 text-xs font-bold uppercase tracking-widest text-white">Quick Access</h4>
            <ul className="space-y-3.5">
              <li>
                <button
                  type="button"
                  onClick={() => goToHomeSection()}
                  className="text-sm font-light text-slate-400 transition-colors hover:text-brand-400"
                >
                  Home
                </button>
              </li>
              {quickAccessLinks.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => goToHomeSection(item.sectionId)}
                    className="text-sm font-light text-slate-400 transition-colors hover:text-brand-400"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={goToProjectWorks}
                  className="text-sm font-light text-slate-400 transition-colors hover:text-brand-400"
                >
                  Project Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={goToCareer}
                  className="text-sm font-light text-slate-400 transition-colors hover:text-brand-400"
                >
                  Careers
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-center text-sm font-light text-slate-500 md:text-left">
            &copy; {currentYear} {companyProfile.legalName}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-light md:justify-end">
            <button
              type="button"
              onClick={() => goToHomeSection()}
              className="text-slate-500 transition-colors hover:text-white"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => goToHomeSection('contact')}
              className="text-slate-500 transition-colors hover:text-white"
            >
              Contact
            </button>
            <button
              type="button"
              onClick={goToCareer}
              className="text-slate-500 transition-colors hover:text-white"
            >
              Careers
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
