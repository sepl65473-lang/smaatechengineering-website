import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';

// Views
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { CaseStudySection } from './components/CaseStudySection';
import { StatsSection } from './components/StatsSection';
import { PartnersStrip } from './components/PartnersStrip';
import { TeamSection } from './components/TeamSection';
import { BlogSection } from './components/BlogSection';
import { QuoteCTABanner } from './components/QuoteCTABanner';
import { ProductsSection } from './components/ProductsSection';
import { ScrollToTop } from './components/ScrollToTop';
import { FloatingContact } from './components/FloatingContact';

import { ProjectsDirectory } from './views/ProjectsDirectory';
import { ProjectColdStorage } from './views/ProjectColdStorage';
import { ProjectWorks } from './views/ProjectWorks';
import { CareersView } from './views/Careers.tsx';
import { DivisionDetail } from './views/DivisionDetail';
import { divisionMap } from './data/divisions';

function App() {
  const [view, setView] = useState<string>('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const activeDivision = view.startsWith('division:') ? divisionMap.get(view.replace('division:', '')) : null;

  return (
    <div className="min-h-screen flex flex-col bg-space-900 text-white font-sans selection:bg-brand-500 selection:text-white">
      <Navbar 
        currentView={view} 
        setView={setView} 
        openLoginModal={() => setIsLoginModalOpen(true)} 
      />
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
      
      <main className="flex-grow">
        {view === 'home' && (
          <div className="animate-in fade-in duration-500">
            <Hero />
            <StatsSection />
            <PartnersStrip />
            <AboutSection />
            <ServicesSection setView={setView} />
            <ProductsSection />
            <TeamSection />
            <CaseStudySection />
            <BlogSection />
            <QuoteCTABanner />
            <ContactSection />
            <FloatingContact />
          </div>
        )}
        
        {view === 'projects' && (
          <div className="animate-in fade-in duration-500">
            <ProjectsDirectory setView={setView} />
          </div>
        )}
        
        {view === 'project-cold-storage' && (
          <div className="animate-in fade-in duration-500 slide-in-from-bottom-4">
            <ProjectColdStorage setView={setView} />
          </div>
        )}

        { view === 'career' && (
          <div className="animate-in fade-in duration-500">
            <CareersView />
          </div>
        )}

        {view === 'project-works' && (
          <div className="animate-in fade-in duration-500">
            <ProjectWorks setView={setView} />
          </div>
        )}

        {activeDivision && (
          <div className="animate-in fade-in duration-500">
            <DivisionDetail division={activeDivision} setView={setView} />
          </div>
        )}
      </main>
      
      <Footer setView={setView} />
      <ScrollToTop />
    </div>
  );
}

export default App;
