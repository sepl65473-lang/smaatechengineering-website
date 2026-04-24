import { motion } from 'framer-motion';

const partners = [
  'AWS IoT Core',
  'Schneider Electric',
  'Espressif Systems',
  'TimescaleDB',
  'OSDMA',
  'JICA',
  'ISO 9001:2015',
  'Make in India',
];

export function PartnersStrip() {
  return (
    <section className="bg-space-900 border-t border-white/5 py-16 overflow-hidden">
      <div className="container-custom">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-500 uppercase tracking-widest text-xs font-bold mb-10"
        >
          Trusted Technology & Certification Partners
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-4 md:gap-6"
        >
          {partners.map((name, i) => (
            <div
              key={i}
              className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-sm font-semibold tracking-wide hover:border-brand-500/40 hover:text-white transition-all duration-300"
            >
              {name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
