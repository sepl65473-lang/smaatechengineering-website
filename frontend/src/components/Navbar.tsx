import { useEffect, useState } from 'react';
import { ChevronDown, Component, Menu, X } from 'lucide-react';

import seplLogo from '../assets/sepl-logo.png';
import { companyProfile } from '../data/company';

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
  openLoginModal: () => void;
}

type NavChild = { name: string; href: string };
type NavLink = {
  name: string;
  href: string;
  isAnchor: boolean;
  action?: () => void;
  children?: NavChild[];
};

const divisionLinks: NavChild[] = [
  { name: 'Water Infrastructure', href: '#services' },
  { name: 'Electro-Mechanical', href: '#services' },
  { name: 'Automation & SCADA', href: '#services' },
  { name: 'Agritech IoT', href: '#services' },
  { name: 'Solar EPC', href: '#services' },
  { name: 'Skilled Training', href: '#services' },
];

export function Navbar({ currentView, setView, openLoginModal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const brochureHref = companyProfile.brochureUrl ?? `mailto:${companyProfile.email}?subject=Brochure%20Request`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = currentView === 'home'
    ? [
        { name: 'Home', href: '#home', isAnchor: true },
        { name: 'About', href: '#about', isAnchor: true },
        { name: 'Divisions', href: '#services', isAnchor: true, children: divisionLinks },
        { name: 'Products', href: '#products', isAnchor: true },
        { name: 'Careers', href: '/career', isAnchor: false },
        { name: 'Project Works', href: '#', isAnchor: false, action: () => { setView('project-works'); window.scrollTo(0, 0); } },
      ]
    : [
        { name: 'Back to Home', href: '#', isAnchor: false, action: () => { setView('home'); window.scrollTo(0, 0); } },
      ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => { setView('home'); window.scrollTo(0, 0); }}>
            <img src={seplLogo} alt="SEPL Logo" className="h-10 w-auto object-contain" />
            <span className="font-bold text-2xl tracking-tight text-white">
              Smaatech<span className="text-brand-500">.</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center justify-center space-x-8 flex-1 px-8">
            {navLinks.map((link) => (
              link.children ? (
                <div key={link.name} className="relative group">
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white font-medium text-sm transition-colors relative inline-flex items-center gap-1"
                  >
                    {link.name}
                    <ChevronDown className="w-4 h-4" />
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all group-hover:w-full"></span>
                  </a>

                  <div className="absolute left-1/2 top-full mt-4 -translate-x-1/2 w-60 glass-card p-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
                    <div className="space-y-1">
                      {link.children.map((child) => (
                        <a
                          key={child.name}
                          href={child.href}
                          className="block rounded-xl px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (!link.isAnchor && link.action) {
                      e.preventDefault();
                      link.action();
                    }
                  }}
                  className="text-slate-400 hover:text-white font-medium text-sm transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all group-hover:w-full"></span>
                </a>
              )
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <a href={brochureHref} className="btn-secondary text-sm px-5 py-2.5">
              {companyProfile.brochureUrl ? 'Download Brochure' : 'Request Brochure'}
            </a>

            <button
              onClick={() => { setView('projects'); window.scrollTo(0, 0); }}
              className={`btn-secondary text-sm px-5 py-2.5 flex items-center ${currentView === 'projects' ? 'border-brand-500/50 bg-brand-500/10 text-brand-300' : ''}`}
            >
              <Component className="w-4 h-4 mr-2" />
              Public Projects
            </button>

            <button
              onClick={openLoginModal}
              className="btn-primary text-sm px-6 py-2.5"
            >
              Client Login
            </button>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 bg-space-950/95 backdrop-blur-2xl z-40 transition-transform duration-300 lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'} pt-24 px-6`}>
        <div className="flex flex-col space-y-6 text-center h-full">
          {navLinks.map((link) => (
            <div key={link.name}>
              <a
                href={link.href}
                className="text-2xl font-bold text-slate-400 hover:text-white transition-colors"
                onClick={(e) => {
                  setIsOpen(false);
                  if (!link.isAnchor && link.action) {
                    e.preventDefault();
                    link.action();
                  }
                }}
              >
                {link.name}
              </a>
              {link.children && (
                <div className="mt-3 space-y-3">
                  {link.children.map((child) => (
                    <a
                      key={child.name}
                      href={child.href}
                      className="block text-sm font-medium tracking-wide text-slate-500 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {child.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="pt-8 border-t border-white/10 mt-8 space-y-4">
            <a
              href={brochureHref}
              className="btn-secondary w-full justify-center text-lg border-white/10 opacity-80"
              onClick={() => setIsOpen(false)}
            >
              {companyProfile.brochureUrl ? 'Download Brochure' : 'Request Brochure'}
            </a>

            <button
              onClick={() => { setView('project-works'); setIsOpen(false); window.scrollTo(0, 0); }}
              className="btn-secondary w-full justify-center text-lg"
            >
              Project Works
            </button>

            <button
              onClick={() => { setView('projects'); setIsOpen(false); window.scrollTo(0, 0); }}
              className="btn-secondary w-full justify-center text-lg border-white/10 opacity-60"
            >
              Public Projects
            </button>

            <button
              onClick={() => { openLoginModal(); setIsOpen(false); }}
              className="btn-primary w-full justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)] text-lg"
            >
              Client Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
