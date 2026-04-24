import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FolderCheck, IndianRupee, Users, MapPin } from 'lucide-react';

const stats = [
  { icon: FolderCheck, label: 'Successful Projects', target: 50, suffix: '+', prefix: '' },
  { icon: IndianRupee,  label: 'Engineering Value',  target: 15, suffix: 'Cr+', prefix: '₹' },
  { icon: Users,        label: 'Team Experts',        target: 50, suffix: '+', prefix: '' },
  { icon: MapPin,       label: 'Villages Served',     target: 20, suffix: '+', prefix: '' },
];

function useCountUp(target: number, duration = 1800, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

function StatCard({ stat, active, index }: { stat: typeof stats[0]; active: boolean; index: number }) {
  const count = useCountUp(stat.target, 1800, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="glass-card p-8 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="w-14 h-14 rounded-2xl bg-space-800 border border-white/10 flex items-center justify-center mb-5 group-hover:border-brand-500/40 transition-colors">
        <stat.icon className="w-7 h-7 text-brand-400" strokeWidth={1.5} />
      </div>
      <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
        {stat.prefix}{count}{stat.suffix}
      </div>
      <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">{stat.label}</p>
    </motion.div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-space-900 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Our <span className="text-gradient">Impact</span> in Numbers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl font-light"
          >
            Delivering measurable results across Odisha and beyond.
          </motion.p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} active={active} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
