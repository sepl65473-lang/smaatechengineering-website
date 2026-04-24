import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { config } from '../config';

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 bg-space-900">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[150px]"></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMTI0LCA1OCwgMjM3LCAwLjA4KSIvPjwvc3ZnPl0=')] opacity-20"></div>
      </div>

      <motion.div 
        className="container-custom relative z-10 flex flex-col items-center text-center w-full max-w-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-sm font-bold tracking-widest uppercase backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-brand-400 mr-2 animate-pulse"></span>
            Building The Future
          </span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
          Smaatech Group: <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-emerald-300 to-accent-400">
             Industrial Innovation
          </span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl leading-relaxed font-light">
          Transforming industries across Odisha with Water Management, IoT Automation, and Sustainable Energy. Driven by innovation, excellence, and community impact.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <a href="#services" className="btn-primary text-lg group">
            Explore Capabilities
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href={config.platformDashboardUrl} className="btn-secondary text-lg">
            Client Login
          </a>
        </motion.div>
        

      </motion.div>
      
      {/* Bottom fade out */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-space-900 to-transparent z-0"></div>
    </section>
  );
}
