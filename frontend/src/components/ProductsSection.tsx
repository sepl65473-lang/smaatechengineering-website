import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Droplets,
  FlaskConical,
  Gauge,
  Settings2,
  ShieldCheck,
  SlidersVertical,
  Zap,
} from 'lucide-react';

const products = [
  {
    icon: Zap,
    name: 'Power & Control Panel',
    description: 'Engineered control systems for dependable electrical distribution, field safety, and plant operations.',
  },
  {
    icon: Activity,
    name: 'Electromagnetic Flow Meter',
    description: 'Accurate flow monitoring for water networks, treatment plants, and industrial process lines.',
  },
  {
    icon: Droplets,
    name: 'Water Meter',
    description: 'Reliable measurement solutions for distribution networks, storage systems, and utility monitoring.',
  },
  {
    icon: Gauge,
    name: 'Industrial RO Plant',
    description: 'Practical purification systems designed for operational efficiency and long service life.',
  },
  {
    icon: SlidersVertical,
    name: 'Level Sensor & Switch',
    description: 'Field-ready level sensing for tanks, reservoirs, and automated liquid management systems.',
  },
  {
    icon: FlaskConical,
    name: 'pH Analyzer',
    description: 'Process monitoring tools for treatment quality, compliance, and plant performance tracking.',
  },
  {
    icon: ShieldCheck,
    name: 'Chlorine Analyzer',
    description: 'Built for consistent monitoring across water treatment and disinfection control workflows.',
  },
  {
    icon: Settings2,
    name: 'Control Valve',
    description: 'Precision control components for regulated pressure, flow handling, and system balancing.',
  },
] as const;

export function ProductsSection() {
  return (
    <section id="products" className="section-padding bg-space-900 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent" />
      <div className="absolute right-0 top-10 w-[420px] h-[420px] bg-accent-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Products & <span className="text-gradient">Solutions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl font-light"
          >
            A focused portfolio of industrial components and packaged systems aligned with Smaatech project delivery.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <motion.article
              key={product.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="glass-card p-7 flex flex-col h-full group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-space-800 border border-white/10 flex items-center justify-center mb-6 group-hover:border-brand-500/40 transition-colors">
                <product.icon className="w-7 h-7 text-brand-400" strokeWidth={1.5} />
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{product.name}</h3>
              <p className="text-slate-400 font-light leading-relaxed text-sm flex-grow">{product.description}</p>

              <a href="#contact" className="inline-flex items-center gap-2 text-brand-400 font-semibold text-sm mt-6 hover:gap-3 transition-all">
                Enquire Now <ArrowRight className="w-4 h-4" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
