import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const gallerySlides = [
  {
    image: '/images/project-gallery/iot-control-board-lab.jpg',
    title: 'IoT Control Board Assembly',
    category: 'Electronics Lab',
    description: 'Prototype board assembly and testing for connected field-control hardware.',
    position: 'center 28%',
    note: 'Custom IoT control boards assembled in-house at our Electronics Lab. Each board is tested for field deployment in remote monitoring and automation applications.',
  },
  {
    image: '/images/project-gallery/cold-storage-iot-monitoring-dashboard.png',
    title: 'Cold Storage IoT Monitoring Dashboard',
    category: 'IoT Platform',
    description: 'Remote view of chamber temperature, humidity, gas levels, and door alerts across cold-storage assets.',
    position: 'center center',
    note: 'Cloud dashboard for cold-storage monitoring — live temperature and humidity against set limits, CO2 and PH3 readings, asset online/offline status, location mapping, temperature trends, and door-open alerts per chamber.',
  },
  {
    image: '/images/project-gallery/electromagnetic-flow-meter-converter.jpeg',
    title: 'Electromagnetic Flow Meter Converter',
    category: 'Flow Instrumentation',
    description: 'Field-mounted flow measurement hardware used for water-network monitoring.',
    position: 'center center',
    note: 'Electromagnetic flow meter converters installed for accurate real-time flow measurement across municipal water distribution and treatment plant networks.',
  },
  {
    image: '/images/project-gallery/plc-control-panel-wiring.jpeg',
    title: 'PLC Control Panel Wiring',
    category: 'Automation Panel',
    description: 'Panel-side PLC, relay, and terminal wiring prepared for operational control logic.',
    position: 'center top',
    note: 'Panel wiring executed to IEC standards — PLC, relay, and terminal blocks configured for programmable logic control in industrial and water-sector installations.',
  },
  {
    image: '/images/project-gallery/clear-water-pump-house-new.jpg',
    title: 'Clear Water Pump House',
    category: 'Water Utility',
    description: 'Pump-house layout serving treated-water movement through plant distribution lines.',
    position: 'center center',
    note: 'Pump house infrastructure built for treated water delivery, integrating VFD-controlled pumps and SCADA-linked flow monitoring for efficient distribution.',
  },
  {
    image: '/images/project-gallery/wtp-inlet-chamber-flash-mixer.jpg',
    title: 'WTP Inlet Chamber & Flash Mixer',
    category: 'Water Treatment',
    description: 'Inlet channel with sluice gate and flash-mixer drive ahead of the clariflocculator.',
    position: 'center center',
    note: 'Raw-water inlet works at a treatment plant — hand-wheel sluice gate for flow isolation and a flash-mixer drive for rapid coagulant mixing before water enters the clariflocculator.',
  },
  {
    image: '/images/project-gallery/aeration-unit-hmi-screen.jpeg',
    title: 'Aeration Unit HMI Screen',
    category: 'SCADA Interface',
    description: 'Operator display for aeration-stage monitoring within a water-treatment workflow.',
    position: 'center center',
    note: 'SCADA-based HMI for real-time aeration monitoring — operators control dissolved oxygen levels and blower states directly from this screen during treatment.',
  },
  {
    image: '/images/project-gallery/chemical-dosing-hmi-screen.jpeg',
    title: 'Chemical Dosing HMI Screen',
    category: 'Process Control',
    description: 'HMI view for alum and lime dosing control in treatment-plant operations.',
    position: 'center center',
    note: 'Chemical dosing control interface deployed at KWSS Gunpur Chemical House — manages alum and lime dosing with automated setpoint control and live pump status.',
  },
  {
    image: '/images/project-gallery/dosing-house-scada-workstation.jpg',
    title: 'Dosing House SCADA Workstation',
    category: 'SCADA Operations',
    description: 'Operator monitoring alum, lime, chlorine, and PAC dosing from the panel-mounted SCADA station.',
    position: 'center center',
    note: 'Panel-mounted SCADA workstation for the treatment-plant dosing house — alum, lime, chlorine, and PAC dosing tanks, agitators, and pumps are monitored and controlled from a single screen.',
  },
  {
    image: '/images/project-gallery/backwash-pump-hmi-screen.jpeg',
    title: 'Backwash Pump HMI Screen',
    category: 'Filter Backwash',
    description: 'Backwash sequence monitoring interface used during filter cleaning operations.',
    position: 'center center',
    note: 'Automated backwash sequence control screen — reduces manual intervention during filter cleaning cycles and improves filter bed recovery efficiency.',
  },
  {
    image: '/images/project-gallery/backwash-pump-starter-panels.jpg',
    title: 'Backwash Pump Starter Panels',
    category: 'Electrical Panels',
    description: 'Wall-mounted pump starter panels with phase and trip indication, fed through a dedicated cable tray.',
    position: 'center center',
    note: 'Motor starter panels for the backwash pumps — each panel carries R-Y-B phase indication, ON/TRIP status lamps, and an auto/manual selector, alongside the 440 V incoming panel.',
  },
  {
    image: '/images/project-gallery/dma-2-nimapara-scada-hmi.jpg',
    title: 'DMA-2 Nimapara SCADA Overview',
    category: 'Water Distribution SCADA',
    description: 'Live distribution overview for the Nimapara section of the Puri WATCO network.',
    position: 'center center',
    note: 'SCADA overview for DMA-2 Nimapara (Puri, WATCO) — UGR and ESR levels, pump auto/manual control, control valves, and flow and pressure readings on four outgoing lines.',
  },
];

export function CaseStudySection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return undefined;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % gallerySlides.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, [isHovered]);

  const prevSlide = () => {
    setActiveSlide((current) => (current - 1 + gallerySlides.length) % gallerySlides.length);
  };

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % gallerySlides.length);
  };

  return (
    <section id="engineering-excellence" className="bg-space-900 relative z-10 pb-24">
      <div className="pt-24 pb-16 px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-white">
            Engineering Excellence
          </h2>
          <p className="text-lg md:text-xl text-slate-400 font-light max-w-3xl mx-auto">
            Specialized engineering services tailored for the needs of modern India.
          </p>
        </motion.div>
      </div>

      <div className="container-custom mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col gap-24 py-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col"
            >
              <div className="text-brand-400 font-bold tracking-widest uppercase mb-4 text-sm">
                WATER SOLUTIONS
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">Civil & Water Infrastructure</h3>
              <p className="text-lg text-slate-400 font-light mb-8 leading-relaxed">
                From Water Treatment Plants (WTP) to intake wells and overhead tanks, we design and build resilient water infrastructure compliant with IRC and IS standards.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-[1.1rem] font-medium text-white"><CheckCircle className="w-5 h-5 text-emerald-500 mr-3" /> Drinking water security expert</li>
                <li className="flex items-center text-[1.1rem] font-medium text-white"><CheckCircle className="w-5 h-5 text-emerald-500 mr-3" /> Wastewater treatment plants</li>
                <li className="flex items-center text-[1.1rem] font-medium text-white"><CheckCircle className="w-5 h-5 text-emerald-500 mr-3" /> IRC & IS compliant designs</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl overflow-hidden glass-card border border-white/10 aspect-video shadow-2xl"
            >
              {/* 16:9 frame matches the photo so the whole plant is visible uncropped */}
              <img
                src="/images/water-treatment-plant.jpg"
                alt="Water treatment plant with clarifiers and an overhead tank"
                width={1600}
                height={900}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center flex-col-reverse md:flex-row">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl overflow-hidden glass-card border border-white/10 aspect-[1570/1002] md:order-1 order-2 shadow-2xl"
            >
              {/* Frame matches the photo's ratio so every HMI panel stays readable */}
              <img
                src="/images/scada-hmi-watco-dashboard.jpg"
                alt="SCADA HMI overview screen for the WATCO 24x7 water supply project"
                width={1570}
                height={1002}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:order-2 order-1"
            >
              <div className="text-emerald-400 font-bold tracking-widest uppercase mb-4 text-sm">
                CONTROL SYSTEMS
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">Industrial Automation & SCADA</h3>
              <p className="text-lg text-slate-400 font-light mb-8 leading-relaxed">
                SCADA systems, PLC integration, and real-time monitoring support for process industries and water-sector operations.
              </p>
              <div className="glass-card p-6 border border-white/10 rounded-2xl shadow-inner">
                <div className="text-emerald-400 font-bold text-[1.1rem] mb-2">Energy Efficiency</div>
                <p className="text-[1.05rem] text-slate-400">Improving operational visibility through practical automation and instrumentation.</p>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col"
            >
              <div className="text-amber-500 font-bold tracking-widest uppercase mb-4 text-sm">
                SMART AGRICULTURE
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">Solar Powered IoT Based Cold Storage System</h3>
              <p className="text-lg text-slate-400 font-light mb-8 leading-relaxed">
                Bridging the gap between technology and the field with IoT monitoring, climate awareness, and practical smart warehousing support.
              </p>
              <div className="flex gap-6 mb-6">
                <div className="glass-card p-5 border border-white/10 rounded-2xl w-44 shadow-inner">
                  <div className="text-3xl md:text-4xl font-black mb-2 text-white">20+</div>
                  <div className="text-[0.8rem] font-bold text-white/60 uppercase tracking-wider">Villages Enabled</div>
                </div>
                <div className="glass-card p-5 border border-white/10 rounded-2xl w-44 shadow-inner">
                  <div className="text-3xl md:text-4xl font-black mb-2 text-white">500+</div>
                  <div className="text-[0.8rem] font-bold text-white/60 uppercase tracking-wider">Farmers Supported</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mx-auto w-full max-w-[400px] rounded-3xl overflow-hidden glass-card border border-white/10 aspect-[1086/1449] shadow-2xl"
            >
              {/* Portrait photo: narrower frame at the photo's own ratio shows the whole unit uncropped */}
              <img
                src="/images/solar-iot-cold-storage-system.jpg"
                alt="Smaafrost solar powered IoT cold storage unit with rooftop solar panels and a temperature monitor"
                width={1086}
                height={1449}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black inline-block text-white">
            Project Gallery
          </h2>
          <div className="mt-4 w-16 h-[3px] bg-brand-500 mx-auto rounded-full"></div>
        </div>

        <div className="overflow-hidden">
          <div
            className="grid min-h-[360px] md:min-h-[560px] lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative overflow-hidden bg-[#10202f]">
                <motion.div
                  animate={{ x: `-${activeSlide * 100}%` }}
                  transition={{ duration: 0.65, ease: 'easeInOut' }}
                  className="flex h-full w-full"
                >
                  {gallerySlides.map((slide) => (
                    <div key={slide.image} className="relative h-[360px] min-w-full md:h-[560px]">
                      <div
                        className="absolute inset-0 scale-110 bg-center bg-cover opacity-12 blur-2xl"
                        style={{ backgroundImage: `url(${slide.image})` }}
                      />
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="absolute inset-0 h-full w-full object-contain"
                        style={{ objectPosition: slide.position }}
                      />
                    </div>
                  ))}
                </motion.div>

                {/* Gradient overlay — hides phone watermark at bottom of images */}
                <div className="pointer-events-none absolute bottom-0 inset-x-0 h-[16%] z-10 bg-gradient-to-t from-[#10202f] to-transparent" />

                {/* Prev / Next buttons — inside image panel only */}
                <div className="absolute inset-y-0 left-0 z-20 flex items-center pl-3 md:pl-5">
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-slate-950/70 text-[#f8fafc] transition-colors hover:border-brand-300/70 hover:text-brand-300"
                    aria-label="Previous slide"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 z-20 flex items-center pr-3 md:pr-5">
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-slate-950/70 text-[#f8fafc] transition-colors hover:border-brand-300/70 hover:text-brand-300"
                    aria-label="Next slide"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="relative flex flex-col justify-between bg-[#0f1b2b] px-6 py-8 md:px-10 md:py-10">
                <div className="flex flex-col gap-5">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[#4dd6e4]">
                    {gallerySlides[activeSlide].category}
                  </p>
                  <h3 className="text-[1.6rem] font-black leading-tight text-[#f8fafc] md:text-[2.2rem]">
                    {gallerySlides[activeSlide].title}
                  </h3>
                  <p className="text-[0.95rem] font-normal leading-relaxed text-[#cbd5e1] md:text-base">
                    {gallerySlides[activeSlide].description}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
                  <div className="flex gap-2">
                    {gallerySlides.map((slide, index) => (
                      <button
                        key={slide.title}
                        type="button"
                        onClick={() => setActiveSlide(index)}
                        className={`h-2.5 rounded-full transition-all ${
                          activeSlide === index ? 'w-8 bg-brand-400' : 'w-2.5 bg-white/30'
                        }`}
                        aria-label={`Show ${slide.title}`}
                      />
                    ))}
                  </div>
                  <div className="min-w-14 rounded-full border border-brand-300/40 bg-brand-500 px-3 py-2 text-center text-xs font-black shadow-[0_10px_26px_-18px_rgba(0,214,228,0.75)]">
                    <span className="text-[#ffffff]">{activeSlide + 1}</span>
                    <span className="text-[#d9fbff]"> / {gallerySlides.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
