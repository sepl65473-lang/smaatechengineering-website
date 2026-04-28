import { motion } from 'framer-motion';
import { CheckCircle, MapPin, ShieldCheck } from 'lucide-react';

const founderHighlights = [
  'Practical project leadership across water infrastructure, automation, and electro-mechanical works.',
  'Focused on field-ready execution, operator-friendly systems, and dependable commissioning.',
  'Builds Smaatech around local engineering capability, accountability, and long-term service support.',
];

export function TeamSection() {
  return (
    <section
      id="team"
      className="relative overflow-hidden border-y border-[#7894a7]/70 py-20 md:py-24"
      style={{ background: 'linear-gradient(180deg, #d6e3ee 0%, #bfd1df 48%, #d8e5ef 100%)' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.055)_1px,transparent_1px)] bg-[size:76px_76px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#8fa8ba]/45 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#8fa8ba]/45 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-brand-500/14 blur-[110px]" />

      <div className="container-custom relative z-10">
        <div className="mb-10 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex rounded-full border border-brand-300/30 bg-white/45 px-4 py-2 text-xs font-black uppercase tracking-widest text-brand-600"
          >
            Managing Director & CEO
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-4xl font-black leading-tight text-slate-950 md:text-5xl"
          >
            Meet the Managing Director & CEO <span className="text-gradient">Smaatech Group</span>
          </motion.h2>
        </div>

        <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(340px,0.92fr)_minmax(0,1.08fr)]">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="relative overflow-hidden rounded-[28px] border border-[#9bb2c2] bg-[#dce9f1] p-5 shadow-[0_28px_74px_-46px_rgba(15,23,42,0.72)]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.055)_1px,transparent_1px)] bg-[size:54px_54px]" />
            <div className="absolute inset-x-8 bottom-4 h-32 rounded-full bg-brand-400/18 blur-3xl" />
            <div className="relative z-10 flex h-full items-end justify-center overflow-hidden rounded-[22px] border border-white bg-white shadow-[inset_0_0_0_1px_rgba(15,23,42,0.05),0_20px_42px_-34px_rgba(15,23,42,0.85)]">
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#f8fbff] to-transparent" />
              <img
                src="/images/team/smaatech-founder.png"
                alt="Managing Director and CEO of Smaatech Group"
                className="relative z-10 h-[500px] w-full object-cover object-top md:h-[600px] lg:h-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="flex flex-col justify-center rounded-[28px] border border-slate-300 bg-[#f8fbff] p-7 shadow-[0_28px_74px_-48px_rgba(15,23,42,0.65)] md:p-10 lg:p-12"
          >
            <div className="mb-7">
              <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-brand-500">
                Managing Director & CEO, Smaatech Group
              </p>
              <h3 className="text-3xl font-black leading-tight text-slate-950 md:text-4xl">
                Manoj Kumar Mallick
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-bold text-brand-600">
                  <MapPin className="h-4 w-4" />
                  Bhubaneswar, Odisha
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700">
                  <ShieldCheck className="h-4 w-4 text-brand-500" />
                  Engineering Execution
                </span>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-slate-700">
              As the Founder and CEO of Smaatech Engineering Private Limited since September 2021, I lead
              with a strong focus on delivering innovative solutions in the water sector. With expertise in
              electro-mechanical and instrumentation automation, I oversee the construction of critical
              infrastructure, including water treatment plants, intake wells, and ESR tanks, ensuring
              precision and efficiency in all projects.
            </p>

            <p className="mt-5 text-lg leading-relaxed text-slate-700">
              With over 19 years of professional experience, including leadership roles at Solvierone
              Corporation and Godrej &amp; Boyce, I have honed skills in sales and marketing leadership,
              product development, and business development. My mission is to drive strategic growth and
              create impactful solutions that address the challenges faced by the water industry through
              advanced technology and collaborative efforts.
            </p>

            <div className="mt-8 grid gap-4">
              {founderHighlights.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
                  <p className="text-sm font-medium leading-relaxed text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
