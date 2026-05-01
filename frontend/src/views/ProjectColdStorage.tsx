import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Gauge, ShieldCheck, Snowflake, SunMedium, ThermometerSun } from 'lucide-react';

interface ProjectColdStorageProps {
  setView: (view: string) => void;
}

const supportItems = [
  'Cold room temperature and humidity monitoring',
  'Solar power, backup, and utility integration planning',
  'Alert workflow for operators and supervisors',
  'Basic dashboard visibility for storage condition tracking',
  'Site handover support for daily operation and maintenance',
  'Practical coordination across civil, electrical, refrigeration, and IoT scopes',
];

const useCases = [
  {
    title: 'Fruits & Vegetables',
    image: '/images/industry_fruits_veg.png',
    copy: 'Condition awareness for storage rooms, collection points, and produce handling teams.',
  },
  {
    title: 'Dairy & Food Handling',
    image: '/images/industry_dairy.png',
    copy: 'Temperature-led monitoring support for facilities where routine checks and timely alerts matter.',
  },
  {
    title: 'Fisheries & Rural Storage',
    image: '/images/industry_fisheries.png',
    copy: 'Support for storage operators who need simple visibility and reliable response workflows.',
  },
];

export function ProjectColdStorage({ setView }: ProjectColdStorageProps) {
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
        <title>Cold Storage Service | Smaatech Engineering Group</title>
        <meta
          name="description"
          content="Cold storage monitoring, solar integration, and operating support from Smaatech Engineering Group."
        />
      </Helmet>

      <section className="relative overflow-hidden border-b border-slate-200 pt-32 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(8,145,178,0.18),transparent_32%),radial-gradient(circle_at_82%_20%,rgba(37,99,235,0.16),transparent_34%),linear-gradient(180deg,#eef5f8_0%,#dfeaf2_100%)]" />
        <div className="container-custom relative z-10">
          <button
            type="button"
            onClick={() => goHome('services')}
            className="group mb-8 inline-flex items-center text-sm font-bold uppercase tracking-widest text-slate-600 transition-colors hover:text-brand-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Services
          </button>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] lg:items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-brand-500/25 bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-brand-700 shadow-sm backdrop-blur">
                <Snowflake className="h-4 w-4" />
                Cold Storage Service
              </div>
              <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
                Solar-ready cold storage monitoring and support
              </h1>
              <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-slate-400 md:text-xl">
                A practical service page for cold room projects, storage operators, and agriculture-linked facilities that need
                temperature visibility, alert workflows, power integration, and handover support without unnecessary complexity.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <button type="button" onClick={() => goHome('contact')} className="btn-primary">
                  Discuss Cold Storage
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button type="button" onClick={() => { setView('project-works'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn-secondary">
                  View Project Works
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="glass-card overflow-hidden p-3"
            >
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src="/images/hero_solar_refrigeration.png"
                  alt="Cold storage and solar refrigeration reference"
                  className="h-[420px] w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/5 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-white/90 p-5 shadow-2xl backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-700">Media Reference</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    Cold storage visuals are kept as practical service references, not fake project claims or copied media.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-custom grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="glass-card p-8 md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-600">What We Support</p>
            <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">Cold storage that is easier to monitor and operate</h2>
            <p className="mt-5 text-base font-light leading-relaxed text-slate-400">
              The service is suitable when the project needs a connected view of refrigeration, power availability, sensors,
              alerts, and operator handover. It can support a new facility discussion or improve monitoring around an existing site.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {supportItems.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/70 p-5 shadow-sm">
                <CheckCircle2 className="mb-4 h-5 w-5 text-brand-600" />
                <p className="text-sm font-medium leading-relaxed text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 py-16 md:py-20">
        <div className="container-custom">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-600">Operating View</p>
            <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">A realistic workflow for storage teams</h2>
            <p className="mt-4 text-base font-light leading-relaxed text-slate-400">
              The page keeps the story simple: measure the right values, make alerts visible, and help the site team respond on time.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {[
              { icon: ThermometerSun, title: 'Measure', copy: 'Temperature and humidity readings from the storage area.' },
              { icon: Gauge, title: 'Monitor', copy: 'A simple view for daily checks and supervisor awareness.' },
              { icon: SunMedium, title: 'Power', copy: 'Solar, grid, or backup planning based on site conditions.' },
              { icon: ShieldCheck, title: 'Respond', copy: 'Alerts and handover notes that help reduce confusion.' },
            ].map((step) => (
              <div key={step.title} className="glass-card p-6">
                <step.icon className="mb-5 h-7 w-7 text-brand-600" />
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-slate-400">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-custom">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-600">Use Cases</p>
              <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">Where cold storage support can fit</h2>
            </div>
            <p className="max-w-xl text-sm font-light leading-relaxed text-slate-400">
              These are practical categories for discussion, not exaggerated coverage claims.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {useCases.map((item) => (
              <article key={item.title} className="glass-card overflow-hidden">
                <img src={item.image} alt={`${item.title} cold storage use case`} className="h-52 w-full object-cover" loading="lazy" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-slate-400">{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
