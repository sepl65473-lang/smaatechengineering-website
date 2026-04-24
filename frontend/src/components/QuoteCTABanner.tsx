import { motion } from 'framer-motion';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { companyProfile } from '../data/company';

export function QuoteCTABanner() {
  return (
    <section className="bg-space-900 border-t border-white/5 py-24 relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card p-12 md:p-16 text-center relative overflow-hidden"
        >
          {/* Corner glows inside card */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/10 rounded-full blur-[80px] -mr-12 -mt-12 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-500/10 rounded-full blur-[80px] -ml-12 -mb-12 pointer-events-none" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-8"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Free Consultation
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
              Ready to Start Your<br />
              <span className="text-gradient">Next Project?</span>
            </h2>

            <p className="text-slate-400 text-xl font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              Connect with our expert engineering team for a free consultation and project estimate. We respond within 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="btn-primary text-lg group px-8"
              >
                Get Free Quote
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={companyProfile.phoneHref}
                className="btn-secondary text-lg px-8"
              >
                Call Us: {companyProfile.phoneCompact}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
