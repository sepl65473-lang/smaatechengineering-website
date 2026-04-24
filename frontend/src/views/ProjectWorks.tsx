import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, X, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

// Import images
import project1 from '../assets/project-works/project-1.jpeg';
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
      title: 'Corporate Excellence & Recognition', 
      category: 'Awards',
      description: 'Celebrating our team\'s commitment to delivering high-performance engineering solutions across Odisha.'
    },
    { 
      id: 3, 
      img: project3, 
      title: 'Large-Scale Water Treatment (STP)', 
      category: 'Infrastructure',
      description: 'Implementation of advanced circular sedimentation tanks and automated water processing systems for urban infrastructure.'
    },
    { 
      id: 4, 
      img: project4, 
      title: 'Industrial Reservoir Infrastructure', 
      category: 'Civil Engineering',
      description: 'Construction of high-capacity dome-structured reservoirs designed for municipal and industrial water storage.'
    },
    { 
      id: 5, 
      img: project5, 
      title: 'Precision Pipeline Integration', 
      category: 'Utility Piping',
      description: 'Execution of complex underground piping networks using heavy-duty valves and precision-engineered industrial fittings.'
    },
    { 
      id: 6, 
      img: project6, 
      title: 'Cross-Country Utility Deployment', 
      category: 'Field Services',
      description: 'End-to-end installation and commissioning of strategic utility pipelines in challenging geological terrains.'
    },
    { 
      id: 7, 
      img: project7, 
      title: 'Heavy-Duty Mechanical Assembly', 
      category: 'Technical Design',
      description: 'On-site fabrication and assembly of large-diameter industrial piping systems for massive fluid management.'
    },
    { 
      id: 8, 
      img: project8, 
      title: 'External Flow Control Systems', 
      category: 'Automation',
      description: 'Design and deployment of multi-channel valve networks for efficient fluid distribution and pressure management.'
    },
    { 
      id: 9, 
      img: project9, 
      title: 'Site Supervision & Quality Control', 
      category: 'Consultation',
      description: 'Expert on-site technical inspection and project management services for large-scale industrial facility development.'
    },
    { 
      id: 10, 
      img: project10, 
      title: 'Custom L.T. Control Panels', 
      category: 'Electrical',
      description: 'Setup and configuration of bespoke Low Tension (L.T.) electrical control centers for industrial power distribution.'
    },
    { 
      id: 11, 
      img: project11, 
      title: 'Field Engineering Support Team', 
      category: 'Operations',
      description: 'Our dedicated team of on-site engineers ensuring seamless project execution and operational handover.'
    },
    { 
      id: 12, 
      img: project12, 
      title: 'Foundational Site Infrastructure', 
      category: 'Construction',
      description: 'Strategic civil engineering and site development for complex industrial complexes and greenfield projects.'
    },
    { 
      id: 13, 
      img: project13, 
      title: 'Elevated Storage Reservoir (ESR)', 
      category: 'Municipal Works',
      description: 'Turnkey delivery of elevated water storage tanks (ESR) with integrated structural integrity and smart monitoring.'
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#00A88E]/30">
      <Helmet>
        <title>Portfolio | Smaatech Engineering Group</title>
      </Helmet>

      {/* EATech Style Top Bar */}
      <div className="bg-[#1a1a1a] text-white py-2 px-4 hidden md:block">
        <div className="container-custom flex justify-between items-center text-[11px] font-medium tracking-wide">
            <div className="flex gap-6">
                <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-[#00A88E]" />
                    <span>+91 94371 44444</span>
                </div>
                <div className="flex items-center gap-2 border-l border-white/10 pl-6">
                    <Mail className="w-3 h-3 text-[#00A88E]" />
                    <span>info@smaatechengineering.com</span>
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <Facebook className="w-3 h-3 hover:text-[#00A88E] cursor-pointer transition-colors" />
                <Twitter className="w-3 h-3 hover:text-[#00A88E] cursor-pointer transition-colors" />
                <Linkedin className="w-3 h-3 hover:text-[#00A88E] cursor-pointer transition-colors" />
                <Instagram className="w-3 h-3 hover:text-[#00A88E] cursor-pointer transition-colors" />
            </div>
        </div>
      </div>

      {/* EATech Style Sticky Header */}
      <header className="sticky top-0 bg-white border-b border-gray-100 z-50 py-4 shadow-sm">
        <div className="container-custom flex justify-between items-center">
            <div className="flex items-center gap-10">
                <button 
                    onClick={() => setView('home')}
                    className="flex items-center text-gray-400 hover:text-black transition-all group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
                </button>
                <div className="hidden lg:flex gap-8 text-[12px] font-bold uppercase tracking-wider text-gray-800">
                    <span className="cursor-pointer hover:text-[#00A88E]">About Us</span>
                    <span className="text-[#00A88E] border-b-2 border-[#00A88E]">Projects</span>
                    <span className="cursor-pointer hover:text-[#00A88E]">Services</span>
                    <span className="cursor-pointer hover:text-[#00A88E]">Contact</span>
                </div>
            </div>
            <button className="bg-black text-white px-6 py-2.5 rounded-md text-[11px] font-bold uppercase tracking-widest hover:bg-[#00A88E] transition-all">
                Download Catalogue
            </button>
        </div>
      </header>

      {/* Hero Section (EATech Style) */}
      <section className="bg-gray-50 py-20 border-b border-gray-100">
        <div className="container-custom text-center">
            <h2 className="text-[#00A88E] text-xs font-black uppercase tracking-[0.4em] mb-4">Our Portfolios</h2>
            <h1 className="text-4xl md:text-5xl font-black text-black tracking-tight mb-6">LATEST <span className="text-[#00A88E]">PROJECTS</span></h1>
            <div className="w-20 h-1 bg-[#00A88E] mx-auto mb-8"></div>
            <p className="max-w-2xl mx-auto text-gray-500 text-sm md:text-base leading-relaxed">
                Explore our track record of delivering high-quality engineering solutions and sustainable infrastructure across multiple industrial sectors.
            </p>
        </div>
      </section>

      {/* EATech Style Grid Gallery */}
      <section className="py-24">
        <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-lg overflow-hidden group border border-gray-100 hover:border-[#00A88E] transition-all duration-500 shadow-[0px_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0px_20px_50px_rgba(0,168,142,0.1)]"
                        onClick={() => setSelectedProject(project)}
                    >
                        <div className="aspect-[16/11] overflow-hidden relative">
                            <img 
                                src={project.img} 
                                alt={project.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all"></div>
                        </div>
                        <div className="p-8 text-center border-t-0 border-x-0 border-b-2 border-transparent group-hover:border-[#00A88E] transition-all">
                            <span className="text-[#00A88E] text-[10px] font-black uppercase tracking-[0.2em] mb-3 block">
                                {project.category}
                            </span>
                            <h3 className="text-lg font-black text-black mb-4 uppercase tracking-tighter group-hover:text-[#00A88E] transition-colors leading-tight">
                                {project.title}
                            </h3>
                            <p className="text-gray-400 text-xs font-medium leading-relaxed line-clamp-3 mb-6">
                                {project.description}
                            </p>
                            <button className="text-[10px] font-black uppercase tracking-widest text-black border-b-2 border-black group-hover:border-[#00A88E] group-hover:text-[#00A88E] transition-all pb-1">
                                View Details
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Footer Info Bar (EATech Style) */}
      <footer className="bg-[#1a1a1a] text-white py-16">
        <div className="container-custom text-center">
            <h3 className="text-2xl font-black mb-8 tracking-tighter">SMAATECH <span className="text-[#00A88E]">ENGINEERING</span></h3>
            <p className="text-gray-500 text-sm mb-12 max-w-lg mx-auto leading-relaxed">
                Registered office: Plot No. 1022/2750, Bhubaneswar Sahara Unit No. 34, Bhubaneswar, Odisha.
            </p>
            <div className="flex justify-center gap-8 text-[11px] font-bold uppercase tracking-widest">
                <span className="hover:text-[#00A88E] cursor-pointer">Projects</span>
                <span className="hover:text-[#00A88E] cursor-pointer">Services</span>
                <span className="hover:text-[#00A88E] cursor-pointer">Privacy Policy</span>
                <span className="hover:text-[#00A88E] cursor-pointer">Contact Us</span>
            </div>
            <div className="mt-12 pt-8 border-t border-white/5 text-[10px] text-gray-600 uppercase tracking-widest">
                © 2026 Smaatech Group. All Rights Reserved.
            </div>
        </div>
      </footer>

      {/* Details Lightbox (Matches Theme) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <div 
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            ></div>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto max-h-[85vh]"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black text-white rounded-full hover:bg-[#00A88E] transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="md:w-1/2">
                <img 
                  src={selectedProject.img} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="md:w-1/2 p-12 flex flex-col justify-center">
                  <span className="text-[#00A88E] text-[10px] font-black uppercase tracking-[0.3em] mb-4 inline-block">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-black mb-6 uppercase tracking-tight leading-tight">
                    {selectedProject.title}
                  </h2>
                  <p className="text-gray-500 leading-relaxed text-sm font-medium mb-10">
                    {selectedProject.description}
                  </p>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="py-4 px-8 bg-black text-white font-black text-[10px] uppercase tracking-widest rounded-md hover:bg-[#00A88E] transition-all shadow-lg"
                  >
                    Close Project
                  </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
