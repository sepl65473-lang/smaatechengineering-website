import { motion } from 'framer-motion';

const partners = [
  {
    label: 'AWS IoT Core',
    logo: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Amazon_Web_Services_Logo.svg',
  },
  {
    label: 'Schneider Electric',
    logo: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Schneider_Electric_2007.svg',
  },
  {
    label: 'Espressif Systems',
    logo: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Espressif_Logo.svg',
  },
  {
    label: 'JICA',
    logo: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Logo_jica.svg',
  },
  {
    label: 'ISO 9001:2015',
    logo: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/ISO_9001-2015.svg',
  },
  {
    label: 'Siemens',
    logo: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Siemens_AG_logo.svg',
  },
  {
    label: 'LTM Limited',
    logo: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/LTM_Coral.svg',
  },
  {
    label: 'IOCL',
    logo: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Indian_Oil_Logo.svg',
  },
];

export function PartnersStrip() {
  const marqueePartners = [...partners, ...partners];

  return (
    <section
      className="relative overflow-hidden border-y border-[#6e8fa2]/50 py-16"
      style={{ background: 'linear-gradient(180deg, #143646 0%, #0f2f3f 100%)' }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="relative">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 w-fit rounded-full border border-[#7ee7f4]/40 bg-[#007a88] px-5 py-2 text-center text-xs font-black uppercase tracking-widest text-[#ffffff] shadow-[0_14px_30px_-22px_rgba(0,0,0,0.8)]"
        >
          Trusted Technology & Certification Partners
        </motion.p>
        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#123140] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#123140] to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex w-max items-center"
          >
            <motion.div
              className="flex w-max items-center gap-6 px-6"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
            >
              {marqueePartners.map((partner, i) => (
                <div
                  key={`${partner.label}-${i}`}
                  data-partner-card
                  className="flex h-24 w-52 shrink-0 items-center justify-center rounded-lg border border-[#d7e4ec] bg-[#f8fbff] px-6 shadow-[0_22px_44px_-30px_rgba(0,0,0,0.75)]"
                  aria-label={partner.label}
                  title={partner.label}
                >
                  <span className="sr-only">{partner.label}</span>
                  <img
                    src={partner.logo}
                    alt=""
                    loading="lazy"
                    className="max-h-12 max-w-[150px] object-contain"
                    referrerPolicy="no-referrer"
                    onError={(event) => {
                      event.currentTarget.closest('[data-partner-card]')?.remove();
                    }}
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
