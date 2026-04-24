import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';

const team = [
  {
    name: 'Rajesh Kumar Mohanty',
    role: 'Founder & Managing Director',
    bio: 'Visionary leader with 20+ years in water infrastructure and industrial automation across Odisha.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80',
  },
  {
    name: 'Priya Nayak',
    role: 'Head of Engineering',
    bio: 'Drives technical excellence across SCADA, PLC, and IoT deployments for large-scale civil projects.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80',
  },
  {
    name: 'Suresh Behera',
    role: 'Operations Manager',
    bio: 'Ensures seamless field execution and project delivery — from planning to final commissioning.',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80',
  },
  {
    name: 'Ananya Pattnaik',
    role: 'IoT & Software Lead',
    bio: 'Architects the cloud platforms and embedded firmware powering Smaatech\'s smart monitoring systems.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80',
  },
];

export function TeamSection() {
  return (
    <section id="team" className="section-padding bg-space-900 border-t border-white/5 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Meet Our <span className="text-gradient">Team</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl font-light"
          >
            The dedicated professionals behind every project we deliver.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="glass-card overflow-hidden group hover:-translate-y-2 transition-transform duration-400 shadow-2xl"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-900 via-space-900/20 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-1 leading-snug">{member.name}</h3>
                <p className="text-brand-400 text-xs font-bold uppercase tracking-widest mb-3">{member.role}</p>
                <p className="text-slate-400 text-sm font-light leading-relaxed mb-5">{member.bio}</p>

                <div className="flex gap-3 border-t border-white/5 pt-4">
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="w-9 h-9 rounded-lg bg-space-800 border border-white/10 flex items-center justify-center hover:border-brand-500/50 hover:bg-brand-500/10 transition-all"
                  >
                    <Linkedin className="w-4 h-4 text-slate-400 hover:text-brand-400" />
                  </a>
                  <a
                    href="#"
                    aria-label="Email"
                    className="w-9 h-9 rounded-lg bg-space-800 border border-white/10 flex items-center justify-center hover:border-brand-500/50 hover:bg-brand-500/10 transition-all"
                  >
                    <Mail className="w-4 h-4 text-slate-400 hover:text-brand-400" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
