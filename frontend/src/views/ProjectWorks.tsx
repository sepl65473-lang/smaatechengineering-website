import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { LayoutGrid, Globe, Award, Target, ArrowLeft, X, Maximize2 } from 'lucide-react';

// Import images
import project1 from '../assets/project-works/project-1.jpeg';
import project2 from '../assets/project-works/project-2.jpeg';
import project3 from '../assets/project-works/project-3.jpeg';
import project4 from '../assets/project-works/project-4.jpeg';
import project5 from '../assets/project-works/project-5.jpeg';
import project6 from '../assets/project-works/project-6.jpeg';
import project7 from '../assets/project-works/project-7.jpeg';
import project8 from '../assets/project-works/project-8.jpeg';
import project9 from '../assets/project-works/project-9.jpeg';
import project10 from '../assets/project-works/project-10.jpeg';
import project11 from '../assets/project-works/project-11.jpeg';
import project12 from '../assets/project-works/project-12.jpeg';
import project13 from '../assets/project-works/project-13.jpeg';
import project14 from '../assets/project-works/project-14.jpeg';

interface Project {
  id: number;
  img: string;
  title: string;
  category: string;
  description: string;
}

interface ProjectWorksProps {
  setView: (view: string) => void;
}

export function ProjectWorks({ setView }: ProjectWorksProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    { 
      id: 1, 
      img: project1, 
      title: 'Industrial Power Systems', 
      category: 'Infrastructure',
      description: 'Custom-engineered electrical infrastructure designed for heavy manufacturing plants, ensuring stable power distribution and load management.'
    },
    { 
      id: 2, 
      img: project2, 
      title: 'Solar Cold Storage', 
      category: 'Agriculture',
      description: 'Innovative solar-powered refrigeration units providing off-grid agricultural logistics solutions for remote farming communities.'
    },
    { 
      id: 3, 
      img: project3, 
      title: 'Smart Monitoring Networks', 
      category: 'IoT & Automation',
      description: 'Advanced telemetry and sensor networks for real-time data acquisition and performance monitoring of industrial assets.'
    },
    { 
      id: 4, 
      img: project4, 
      title: 'Sustainable Irrigation', 
      category: 'Water Management',
      description: 'Eco-friendly water management systems utilizing integrated renewables to optimize resource usage in large-scale agriculture.'
    },
    { 
      id: 5, 
      img: project5, 
      title: 'Precision Engineering', 
      category: 'Technical Design',
      description: 'High-tolerance mechanical components and structural assemblies designed for resilience in extreme operational environments.'
    },
    { 
      id: 6, 
      img: project6, 
      title: 'Field Commissioning', 
      category: 'Execution',
      description: 'Comprehensive end-to-end installation, testing, and operational handover services for complex multi-disciplinary engineering projects.'
    },
    { 
      id: 7, 
      img: project7, 
      title: 'Technical Audits', 
      category: 'Research',
      description: 'Detailed safety assessments and efficiency audits for existing industrial facilities to ensure compliance with global standards.'
    },
    { 
      id: 8, 
      img: project8, 
      title: 'Commercial Solar Integration', 
      category: 'Renewables',
      description: 'Large-scale photovoltaic system integration for commercial buildings, focused on energy cost optimization and sustainability goals.'
    },
    { 
      id: 9, 
      img: project9, 
      title: 'Climate Control Solutions', 
      category: 'Logistics',
      description: 'Precision HVAC and environmental control systems tailored for pharmaceutical storage and temperature-sensitive food logistics.'
    },
    { 
      id: 10, 
      img: project10, 
      title: 'Tailored Industrial Solutions', 
      category: 'Custom Engineering',
      description: 'Bespoke engineering designs and prototypes addressing unique operational challenges across various industrial sectors.'
    },
    { 
      id: 11, 
      img: project11, 
      title: 'Proactive Systems Support', 
      category: 'Maintenance',
      description: 'Dedicated ongoing maintenance and technical support packages to maximize uptime and longevity of infrastructure projects.'
    },
    { 
      id: 12, 
      img: project12, 
      title: 'Eco-Friendly Power Grids', 
      category: 'Sustainability',
      description: 'Design and implementation of low-carbon power distribution networks supporting sustainable urbanization and green initiatives.'
    },
    { 
      id: 13, 
      img: project13, 
      title: 'Structural Engineering', 
      category: 'Consultancy',
      description: 'High-level structural analysis and consultancy for robust industrial frameworks, ensuring safety and durability under load.'
    },
    { 
      id: 14, 
      img: project14, 
      title: 'Next-Gen Industrial IoT', 
      category: 'Innovation',
      description: 'Future-ready connectivity and automation solutions driving Industry 4.0 transformation for modern manufacturing enterprises.'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-space-900 pt-28 pb-20 overflow-hidden relative">
      <Helmet>
        <title>Project Works | Smaatech Engineering</title>
        <meta name="description" content="Explore Smaatech Engineering's portfolio of industrial projects, from Solar Cold Storage to advanced IoT Power Systems. Delivering world-class engineering solutions globally." />
        <meta property="og:title" content="Project Works | Smaatech Engineering Portfolio" />
        <meta property="og:description" content="A curated gallery of our latest engineering masterpieces and sustainable industrial solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <button 
            onClick={() => setView('home')}
            className="flex items-center text-slate-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-xs font-bold tracking-widest uppercase mb-4">
                <Globe className="w-3.5 h-3.5 mr-2" />
                Global Impact
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 leading-tight">
                Project <span className="text-gradient">Works</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl font-light">
                Explore our portfolio of cutting-edge engineering solutions and industrial masterpieces delivered across the globe.
              </p>
            </div>
            
            <div className="flex gap-4">
              <div className="glass-card px-6 py-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-brand-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white leading-none">100+</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Completed</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="glass-card overflow-hidden h-full flex flex-col border-white/5 group-hover:border-brand-500/30 transition-all duration-500 shadow-lg hover:shadow-brand-500/10">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-brand-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)] transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <Maximize2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center text-xs text-slate-500 gap-1.5 group-hover:text-brand-400 transition-colors">
                      <Target className="w-3.5 h-3.5" />
                      View Project Details
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-500 transition-all duration-300">
                      <LayoutGrid className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 p-12 glass-card text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white mb-6">Have a project in mind?</h2>
            <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
              We bring world-class engineering expertise to every challenge. Let's build the future together.
            </p>
            <button 
              onClick={() => setView('home')}
              className="btn-primary px-10"
            >
              Get In Touch
            </button>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <div 
              className="absolute inset-0 bg-space-950/95 backdrop-blur-2xl"
              onClick={() => setSelectedProject(null)}
            ></div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-5xl w-full glass-card overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border-white/10 flex flex-col md:flex-row h-full max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-brand-500 transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Section */}
              <div className="md:w-2/3 bg-black/40 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
                <img 
                  src={selectedProject.img} 
                  alt={selectedProject.title}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Content Section */}
              <div className="md:w-1/3 p-8 md:p-10 overflow-y-auto bg-space-900/50 flex flex-col">
                <div className="flex-grow">
                  <span className="inline-block px-3 py-1 rounded-lg bg-brand-500/10 border border-brand-500/30 text-[10px] font-bold text-brand-400 uppercase tracking-widest mb-6">
                    {selectedProject.category}
                  </span>
                  
                  <h2 className="text-3xl font-black text-white mb-6 leading-tight">
                    {selectedProject.title}
                  </h2>
                  
                  <div className="h-1 w-12 bg-brand-500 mb-8 rounded-full"></div>
                  
                  <p className="text-slate-400 leading-relaxed mb-8 text-sm">
                    {selectedProject.description}
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-300 group">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                        <Globe className="w-4 h-4 text-brand-400" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider">International Delivery</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300 group">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                        <Award className="w-4 h-4 text-brand-400" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider">ISO 9001 Certified</span>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5">
                  <button 
                    onClick={() => {
                        setSelectedProject(null);
                        setView('home'); 
                        setTimeout(() => {
                           const contactSection = document.getElementById('contact');
                           if (contactSection) {
                              contactSection.scrollIntoView({ behavior: 'smooth' });
                           }
                        }, 300);
                    }}
                    className="btn-primary w-full justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)] group"
                  >
                    Discuss This Project
                    <motion.span 
                        animate={{ x: [0, 4, 0] }} 
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="ml-2"
                    >
                        →
                    </motion.span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
