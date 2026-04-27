import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { config } from '../config';

const slides = [
  {
    type: 'video' as const,
    src: '/videos/smaatech-clip1.mp4',
    poster: '/images/hero/img1.jpg',
    position: 'center center',
  },
  {
    type: 'image' as const,
    src: '/images/hero/img1.jpg',
    position: 'center center',
  },
  {
    type: 'video' as const,
    src: '/videos/smaatech-clip2.mp4',
    poster: '/images/hero/img2.jpg',
    position: 'center center',
  },
  {
    type: 'image' as const,
    src: '/images/hero/img2.jpg',
    position: 'center center',
  },
  {
    type: 'video' as const,
    src: '/videos/smaatech-clip3.mp4',
    poster: '/images/hero/img1.jpg',
    position: 'center center',
  },
];

const SLIDE_DURATION = 6500;

export function Hero() {
  const [current, setCurrent] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null, null, null]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === current) { v.currentTime = 0; v.play().catch(() => {}); }
      else v.pause();
    });
  }, [current]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section id="home" className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-20">

      {/* ── BACKGROUND CAROUSEL — all slides always mounted, fade via opacity ── */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            style={{ zIndex: i === current ? 1 : 0 }}
          >
            {slide.type === 'image' ? (
              <img
                src={slide.src}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: slide.position }}
              />
            ) : (
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
                src={slide.src}
                poster={slide.poster}
                muted
                playsInline
                autoPlay
                loop
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: slide.position }}
              />
            )}
          </motion.div>
        ))}

        {/* Overlay — readable text on any background */}
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.48)', zIndex: 10 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%, rgba(0,0,0,0.15) 100%)', zIndex: 11 }} />
      </div>

      {/* ── HERO CONTENT — original design, white text on dark overlay ── */}
      <motion.div
        className="container-custom relative flex flex-col items-center text-center w-full max-w-none"
        style={{ zIndex: 20 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <span
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase backdrop-blur-md"
            style={{ border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)', color: '#ffffff' }}
          >
            <span className="w-2 h-2 rounded-full bg-brand-400 mr-2 animate-pulse" />
            Building The Future
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] mb-8"
          style={{ color: '#ffffff', textShadow: '0 2px 24px rgba(0,0,0,0.35)' }}
        >
          Smaatech Group: <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-cyan-300 to-white">
            Industrial Innovation
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl mb-12 max-w-3xl leading-relaxed font-normal"
          style={{ color: 'rgba(255,255,255,0.85)', textShadow: '0 1px 12px rgba(0,0,0,0.4)' }}
        >
          Transforming industries across Odisha with Water Management, IoT Automation, and Sustainable Energy. Driven by innovation, excellence, and community impact.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <a href="#services" className="btn-primary text-lg group">
            Explore Capabilities
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={config.platformDashboardUrl}
            className="text-lg rounded-full font-semibold px-6 py-3 inline-flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
            style={{ border: '1px solid rgba(255,255,255,0.4)', color: '#ffffff', background: 'rgba(255,255,255,0.08)' }}
          >
            Client Login
          </a>
        </motion.div>

        {/* Slide dots */}
        <motion.div variants={itemVariants} className="mt-12 flex items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className="flex items-center justify-center transition-all duration-300"
              style={{ minWidth: '44px', minHeight: '44px', background: 'transparent', border: 'none', padding: '0 4px' }}
            >
              <span
                className="rounded-full block transition-all duration-300"
                style={{
                  width: i === current ? '2rem' : '0.5rem',
                  height: '0.5rem',
                  background: i === current ? '#ffffff' : 'rgba(255,255,255,0.4)',
                }}
              />
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ zIndex: 30, background: 'rgba(255,255,255,0.15)' }}>
        <motion.div
          key={current}
          className="h-full bg-brand-400"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(to top, rgba(211,223,235,0.5), transparent)', zIndex: 12 }} />
    </section>
  );
}
