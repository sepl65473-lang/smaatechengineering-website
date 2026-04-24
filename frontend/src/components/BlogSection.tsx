import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

const posts = [
  {
    category: 'Water Infrastructure',
    date: 'April 10, 2025',
    title: 'Water Treatment Automation in Odisha: What\'s Changing in 2025',
    excerpt: 'From manual valve operation to real-time SCADA dashboards — how smart automation is transforming water delivery across rural Odisha.',
    photo: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=380&fit=crop&q=80',
  },
  {
    category: 'IoT & Agritech',
    date: 'March 22, 2025',
    title: 'How IoT Sensors Are Reducing Post-Harvest Losses in Agriculture',
    excerpt: 'Precision temperature and humidity monitoring inside cold storage units is helping farmers across Eastern India save up to 40% of their produce.',
    photo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=380&fit=crop&q=80',
  },
  {
    category: 'Solar EPC',
    date: 'February 14, 2025',
    title: 'Solar EPC Projects: A Complete Guide for Rural Communities',
    excerpt: 'Off-grid solar solutions are becoming the backbone of rural electrification. Here\'s what communities need to know before starting a solar EPC project.',
    photo: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=380&fit=crop&q=80',
  },
];

export function BlogSection() {
  return (
    <section id="blog" className="section-padding bg-space-900 border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Insights & <span className="text-gradient">Updates</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl font-light"
          >
            Engineering knowledge, project insights, and industry trends from our team.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="glass-card overflow-hidden group hover:-translate-y-2 transition-transform duration-400 shadow-2xl flex flex-col"
            >
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                <img
                  src={post.photo}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-900/80 to-transparent" />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-400 text-xs font-bold tracking-wide">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-4">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-brand-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed flex-grow">
                  {post.excerpt}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-brand-400 text-sm font-semibold mt-6 hover:gap-3 transition-all"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
