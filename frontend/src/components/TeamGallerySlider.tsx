import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDE_INTERVAL_MS = 5000;

const slides = [
  {
    src: '/images/team-gallery/team-planning-session.jpg',
    title: 'Engineering Planning Session',
    caption: 'Our engineers reviewing project drawings together.',
  },
  {
    src: '/images/team-gallery/smaatech-office-team.jpg',
    title: 'Our Team at Smaatech Group',
    caption: 'The people behind every project we deliver.',
  },
  {
    src: '/images/team-gallery/sepl-design-review.jpg',
    title: 'Design Review',
    caption: 'Every plan is checked by the team before it reaches site.',
  },
  {
    src: '/images/team-gallery/smaatech-headquarters.jpg',
    title: 'Bhubaneswar Headquarters',
    caption: 'Where our projects across Eastern India are planned.',
  },
];

export function TeamGallerySlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = window.setTimeout(() => goTo(index + 1), SLIDE_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, reduceMotion, goTo]);

  const slide = slides[index];

  return (
    <section id="team-gallery" className="section-padding relative overflow-hidden bg-space-900">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-block bg-brand-500/10 border border-brand-500/20 text-brand-500 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
            Life at Smaatech
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
            The Team Behind <span className="text-gradient">Every Project</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass-card p-2 md:p-3 max-w-5xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Smaatech team photos"
        >
          <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-xl overflow-hidden bg-slate-900">
            <AnimatePresence initial={false}>
              <motion.div
                key={slide.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.8, ease: 'easeInOut' }}
                className="absolute inset-0"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
              >
                {/* Blurred copy fills the frame so the full photo can be shown uncropped */}
                <img
                  src={slide.src}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-60"
                />
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="relative w-full h-full object-contain"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </motion.div>
            </AnimatePresence>

            <div className="hidden md:block absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent px-8 pb-7 pt-16 pointer-events-none">
              <p className="text-2xl font-bold text-[#f8fafc]">{slide.title}</p>
              <p className="text-base text-[#cbd5e1] mt-1">{slide.caption}</p>
            </div>

            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/85 text-slate-900 shadow-lg backdrop-blur transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/85 text-slate-900 shadow-lg backdrop-blur transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* On small screens the caption sits below the photo so it never covers faces */}
          <div className="md:hidden px-3 pt-4 text-center min-h-[4.5rem]">
            <p className="text-lg font-bold text-[#0f172a]">{slide.title}</p>
            <p className="text-sm text-[#475569] mt-1">{slide.caption}</p>
          </div>

          <div className="flex justify-center gap-2 py-4">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show photo ${i + 1}: ${s.title}`}
                aria-current={i === index}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-8 bg-brand-500' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
