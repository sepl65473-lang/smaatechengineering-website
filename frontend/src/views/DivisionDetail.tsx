import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, CheckCircle2, Mail, Phone } from 'lucide-react';

import { companyProfile } from '../data/company';
import type { DivisionRecord } from '../data/divisions';

interface DivisionDetailProps {
  division: DivisionRecord;
  setView: (view: string) => void;
}

export function DivisionDetail({ division, setView }: DivisionDetailProps) {
  const Icon = division.icon;

  const goHome = (sectionId?: string) => {
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

  return (
    <div className="min-h-screen bg-space-900 text-white">
      <Helmet>
        <title>{division.title} | Smaatech Engineering Group</title>
        <meta name="description" content={division.summary} />
      </Helmet>

      <section className="relative overflow-hidden border-b border-slate-200 pt-32 pb-18">
        <div className="absolute inset-0 bg-space-900" />
        <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-brand-500/10 blur-[130px]" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-accent-500/10 blur-[150px]" />

        <div className="container-custom relative z-10">
          <button
            type="button"
            onClick={() => goHome()}
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.85fr)] lg:items-start">
            <div className="max-w-4xl">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-brand-300">
                <Icon className="h-4 w-4" />
                Service Overview
              </div>

              <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">{division.title}</h1>
              <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-slate-400 md:text-xl">
                {division.overview}
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <button type="button" onClick={() => goHome('contact')} className="btn-primary">
                  Discuss This Service
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button type="button" onClick={() => goHome('services')} className="btn-secondary">
                  View All Services
                </button>
              </div>
            </div>

            <div className="glass-card overflow-hidden p-0">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={division.heroImage}
                  alt={`${division.title} field reference`}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/35 to-transparent" />
              </div>

              <div className="p-6">
              <div className="mb-6 rounded-2xl border border-slate-300 bg-white p-5 shadow-[0_18px_42px_-36px_rgba(15,23,42,0.7)]">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-700">Service Snapshot</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{division.summary}</p>
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Contact Support</p>

              <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-400" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Phone</p>
                    <a href={companyProfile.phoneHref} className="mt-1 block text-sm text-slate-200 transition-colors hover:text-white">
                      {companyProfile.phoneCompact}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-400" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Email</p>
                    <a href={`mailto:${companyProfile.email}`} className="mt-1 block text-sm text-slate-200 transition-colors hover:text-white">
                      {companyProfile.email}
                    </a>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-custom">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-stretch">
            <div className="glass-card overflow-hidden">
              <img
                src={division.detailImage}
                alt={`${division.title} practical site work`}
                className="h-72 w-full object-cover md:h-full"
                loading="lazy"
              />
            </div>

            <div className="glass-card p-8 md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-600">Field Media Reference</p>
              <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">How this service appears in real execution</h2>
              <p className="mt-5 text-base font-light leading-relaxed text-slate-400">
                {division.mediaCaption}
              </p>
              <p className="mt-5 text-base font-light leading-relaxed text-slate-400">
                {division.mediaDetail ??
                  'The focus remains practical: site coordination, equipment access, operating visibility, and clear handover planning for teams responsible for daily operation.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-custom grid gap-8 lg:grid-cols-2">
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white md:text-3xl">Core Focus Areas</h2>
            <div className="mt-6 space-y-4">
              {division.focusAreas.map((focus) => (
                <div key={focus} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/5 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-400" />
                  <p className="text-sm font-light leading-relaxed text-slate-300">{focus}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white md:text-3xl">Execution Approach</h2>
            <div className="mt-6 space-y-4">
              {division.deliveryPoints.map((point) => (
                <div key={point} className="rounded-2xl border border-white/8 bg-space-800/70 p-4">
                  <p className="text-sm font-light leading-relaxed text-slate-300">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-16 md:py-20">
        <div className="container-custom">
          <div className="glass-card p-8 md:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Relevant Product Support</p>
                <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">Products often aligned with this service</h2>
                <p className="mt-4 text-base font-light leading-relaxed text-slate-400">
                  These product categories can support planning discussions, instrumentation requirements, and operational needs around this service.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[360px]">
                {division.relatedProducts.map((product) => (
                  <div key={product} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200">
                    {product}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
