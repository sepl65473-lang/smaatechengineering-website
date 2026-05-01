import { motion } from 'framer-motion';
import { ArrowRight, BriefcaseBusiness, Mail } from 'lucide-react';

import { divisions } from '../data/divisions';

interface ServicesSectionProps {
  setView: (view: string) => void;
}

export function ServicesSection({ setView }: ServicesSectionProps) {
  const goToDivision = (slug: string) => {
    setView(`division:${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToProjectWorks = () => {
    setView('project-works');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="services" className="section-padding bg-space-900 relative border-t border-white/5">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>

      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Capabilities & <span className="text-gradient">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl font-light"
          >
            Practical engineering support across infrastructure, automation, energy, and technical delivery.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {divisions.map((division) => (
            <motion.div key={division.slug} variants={item} className="h-full">
              <article className="glass-card p-8 h-full hover:bg-white/5 transition-colors duration-300 group relative overflow-hidden shadow-2xl flex flex-col">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-brand-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="w-16 h-16 rounded-2xl bg-space-800 border border-white/10 flex items-center justify-center mb-8 group-hover:border-brand-500/40 transition-colors relative z-10 shadow-inner">
                  <division.icon className="w-8 h-8 text-brand-400 group-hover:text-brand-300 transition-colors" strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-bold text-white mb-4 relative z-10">{division.title}</h3>
                <p className="text-slate-400 leading-relaxed font-light relative z-10 flex-grow">{division.summary}</p>

                <div className="relative z-10 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => goToDivision(division.slug)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-500/25 bg-brand-500/10 px-4 py-2.5 text-sm font-semibold text-brand-300 transition-all hover:border-brand-500/45 hover:bg-brand-500/15 hover:text-white"
                  >
                    View Service
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-1 py-2 text-sm font-semibold text-slate-400 transition-colors hover:text-white"
                  >
                    Discuss Project
                  </a>
                </div>
              </article>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl md:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-400">Project Support</p>
              <h3 className="text-2xl font-bold text-white md:text-3xl">Need a project-ready engineering team?</h3>
              <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-slate-400 md:text-base">
                Share your site requirement and the Smaatech team can guide the next practical step across design support,
                supply, execution, or commissioning.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-shrink-0">
              <a href="#contact" className="btn-primary justify-center">
                Discuss Your Project
                <Mail className="ml-2 h-5 w-5" />
              </a>
              <button type="button" onClick={goToProjectWorks} className="btn-secondary justify-center">
                See Project Works
                <BriefcaseBusiness className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
