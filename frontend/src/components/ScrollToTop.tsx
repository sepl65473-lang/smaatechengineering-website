import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-brand-500 text-space-950 shadow-[0_12px_30px_-12px_rgba(16,185,129,0.7)] flex items-center justify-center hover:bg-brand-400 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
