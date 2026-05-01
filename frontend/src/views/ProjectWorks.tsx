import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Mail, MapPin, Phone, X } from 'lucide-react';

import { companyProfile } from '../data/company';

import project1 from '../assets/project-works/project-1.jpeg';
import project3 from '../assets/project-works/project-3.jpeg';
import project4 from '../assets/project-works/project-4.jpeg';
import project5 from '../assets/project-works/project-5.jpeg';
import project6 from '../assets/project-works/project-6.jpeg';
import project7 from '../assets/project-works/project-7.jpeg';
import project8 from '../assets/project-works/project-8.jpeg';
import project9 from '../assets/project-works/project-9.jpeg';
import project10 from '../assets/project-works/project-10.jpeg';
import project11 from '../assets/project-works/project-11.jpeg';
import project12 from '../assets/project-works/project-12.jpeg';
import project13 from '../assets/project-works/project-13.jpeg';

interface Project {
  id: number;
  img: string;
  title: string;
  category: string;
  description: string;
}

interface ProjectWorksProps {
  setView: (view: string) => void;
}

const projects: Project[] = [
  {
    id: 1,
    img: project1,
    title: 'Corporate Excellence & Recognition',
    category: 'Awards',
    description: "Celebrating our team's commitment to delivering high-performance engineering solutions across Odisha.",
  },
  {
    id: 3,
    img: project3,
    title: 'Large-Scale Water Treatment (STP)',
    category: 'Infrastructure',
    description: 'Implementation of circular sedimentation tanks and automated processing systems for urban water infrastructure.',
  },
  {
    id: 4,
    img: project4,
    title: 'Industrial Reservoir Infrastructure',
    category: 'Civil Engineering',
    description: 'Construction of dome-structured reservoirs designed for municipal and industrial water storage.',
  },
  {
    id: 5,
    img: project5,
    title: 'Precision Pipeline Integration',
    category: 'Utility Piping',
    description: 'Execution of underground piping networks using heavy-duty valves and precision-engineered industrial fittings.',
  },
  {
    id: 6,
    img: project6,
    title: 'Cross-Country Utility Deployment',
    category: 'Field Services',
    description: 'Installation and commissioning of utility pipelines in challenging geological terrains.',
  },
  {
    id: 7,
    img: project7,
    title: 'Heavy-Duty Mechanical Assembly',
    category: 'Technical Design',
    description: 'On-site fabrication and assembly of large-diameter industrial piping systems for fluid management.',
  },
  {
    id: 8,
    img: project8,
    title: 'External Flow Control Systems',
    category: 'Automation',
    description: 'Deployment of multi-channel valve networks for efficient fluid distribution and pressure management.',
  },
  {
    id: 9,
    img: project9,
    title: 'Site Supervision & Quality Control',
    category: 'Consultation',
    description: 'Technical inspection and project management support for large-scale industrial facility development.',
  },
  {
    id: 10,
    img: project10,
    title: 'Custom L.T. Control Panels',
    category: 'Electrical',
    description: 'Setup of bespoke low-tension control centres for industrial power distribution and monitoring.',
  },
  {
    id: 11,
    img: project11,
    title: 'Field Engineering Support Team',
    category: 'Operations',
    description: 'Dedicated on-site engineering support focused on execution quality and operational handover.',
  },
  {
    id: 12,
    img: project12,
    title: 'Foundational Site Infrastructure',
    category: 'Construction',
    description: 'Civil engineering and site preparation works for industrial complexes and greenfield projects.',
  },
  {
    id: 13,
    img: project13,
    title: 'Elevated Storage Reservoir (ESR)',
    category: 'Municipal Works',
    description: 'Turnkey delivery of elevated storage tanks with structural integrity and monitoring readiness.',
  },
];

export function ProjectWorks({ setView }: ProjectWorksProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const brochureActionHref = companyProfile.brochureUrl ?? `mailto:${companyProfile.email}?subject=Brochure%20Request`;
  const brochureActionLabel = companyProfile.brochureUrl ? 'Download Brochure' : 'Request Brochure';

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
    <div className="min-h-screen bg-space-900 text-white font-sans selection:bg-brand-500/30 selection:text-white">
      <Helmet>
        <title>Project Works | Smaatech Engineering Group</title>
      </Helmet>

      <section className="relative overflow-hidden border-b border-white/5 pt-32 pb-16">
        <div className="absolute inset-0 bg-space-900" />
        <div className="absolute left-0 top-8 h-72 w-72 rounded-full bg-brand-500/10 blur-[130px]" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-accent-500/10 blur-[150px]" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
          >
            <button
              type="button"
              onClick={() => goHome()}
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </button>

            <div className="mb-6 inline-flex items-center rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-brand-300">
              Project Works
            </div>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.9fr)] lg:items-start">
              <div>
                <h1 className="mb-6 text-4xl font-black tracking-tight text-white md:text-6xl">
                  Engineering works delivered across core infrastructure and industrial operations.
                </h1>
                <p className="max-w-3xl text-lg font-light leading-relaxed text-slate-400 md:text-xl">
                  This gallery highlights selected site execution, fabrication, water infrastructure, panel works, and project support delivered by the Smaatech team.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <button type="button" onClick={() => goHome('contact')} className="btn-primary">
                    Discuss Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                  <a href={brochureActionHref} className="btn-secondary">
                    {brochureActionLabel}
                  </a>
                </div>
              </div>

              <div className="glass-card space-y-4 p-6">
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

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-400" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Office</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-200">{companyProfile.registeredOffice}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="container-custom">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">Selected Site Gallery</h2>
              <p className="mt-3 max-w-2xl text-base font-light leading-relaxed text-slate-400">
                Each project card opens a larger view so you can inspect the work without changing the current site flow.
              </p>
            </div>
            <button type="button" onClick={() => goHome('services')} className="text-left text-sm font-semibold text-brand-400 transition-colors hover:text-brand-300">
              View Smaatech capabilities
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <motion.button
                key={project.id}
                type="button"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                onClick={() => setSelectedProject(project)}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-space-800/70 text-left shadow-[0_16px_50px_-30px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:bg-space-800"
              >
                <div className="aspect-[16/11] overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <span className="inline-flex rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-300">
                    {project.category}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-slate-400">{project.description}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-400">
                    View project
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 pb-20 pt-8">
        <div className="container-custom">
          <div className="glass-card flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold text-white md:text-3xl">Need a similar execution partner for your next project?</h3>
              <p className="mt-3 text-base font-light leading-relaxed text-slate-400">
                Reach our team for project discussions, site coordination, and product support from a single contact point.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a href={companyProfile.phoneHref} className="btn-secondary">
                Call Us
              </a>
              <button type="button" onClick={() => goHome('contact')} className="btn-primary">
                Go to Contact Section
              </button>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0 bg-space-950/90 backdrop-blur-md" onClick={() => setSelectedProject(null)} />

            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative z-10 flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-space-900 shadow-2xl lg:flex-row"
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-space-950/70 p-2 text-white transition-colors hover:border-brand-500/40 hover:text-brand-300"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="lg:w-[55%]">
                <img src={selectedProject.img} alt={selectedProject.title} className="h-full w-full object-cover" />
              </div>

              <div className="flex flex-1 flex-col justify-center p-8 md:p-10">
                <span className="inline-flex w-fit rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-300">
                  {selectedProject.category}
                </span>
                <h2 className="mt-5 text-3xl font-black tracking-tight text-white">{selectedProject.title}</h2>
                <p className="mt-5 text-base font-light leading-relaxed text-slate-400">{selectedProject.description}</p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <button type="button" onClick={() => goHome('contact')} className="btn-primary">
                    Discuss Similar Work
                  </button>
                  <button type="button" onClick={() => setSelectedProject(null)} className="btn-secondary">
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
