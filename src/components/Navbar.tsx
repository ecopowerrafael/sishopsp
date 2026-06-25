import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';
import { useSeo } from '../seo/MetaTags';

interface NavbarProps {
  onOpenDemo: (challenge?: string) => void;
}

export default function Navbar({ onOpenDemo }: NavbarProps) {
  const { currentPath, setCurrentPath } = useSeo();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Soluções', href: '#solucoes' },
    { label: 'Calculadora de ROI', href: '#calculadora' },
    { label: 'Painel Demonstrativo', href: '#dashboard-demo' },
    { label: 'Comparativo', href: '#comparativo' },
    { label: 'Casos Reais', href: '#casos-sucesso' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (currentPath !== '/') {
      // Navigate back to home first, then scroll
      setCurrentPath('/');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 py-3'
          : 'bg-transparent py-5'
      }`}
      id="portal-navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Brand */}
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              setCurrentPath('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center group"
          >
            <img
              src="https://sishosp.com.br/wp-content/uploads/2025/03/cropped-logo-sishosp.webp"
              alt="SisHOSP"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Call to Action */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:0800000000" 
              className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-teal-600 transition-all"
              onClick={(e) => {
                e.preventDefault();
                alert('Ligando para a nossa central de vendas especializada: 0800 591 2341 (Demonstrações Gratuitas)');
              }}
            >
              <PhoneCall className="w-4 h-4 text-teal-600" />
              <span>0800 591 2341</span>
            </a>
            
            <button
              onClick={() => onOpenDemo()}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs px-4.5 py-2.5 rounded-lg transition-all shadow-md shadow-teal-600/10 hover:shadow-lg flex items-center gap-1.5 hover:translate-y-[-1px]"
              id="navbar-cta-button"
            >
              Falar com Especialista
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => onOpenDemo()}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-all flex items-center gap-1"
            >
              Agendar
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Abrir menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-slate-100 py-4 px-4 shadow-lg absolute top-full left-0 w-full" id="mobile-menu-drawer">
          <div className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-base font-semibold text-slate-800 hover:text-teal-600 py-2 border-b border-slate-50 transition-colors"
              >
                {item.label}
              </a>
            ))}
            
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <a
                href="#call"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Central de Atendimento: 0800 591 2341');
                }}
                className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 border border-slate-200 py-2.5 rounded-lg hover:bg-slate-50"
              >
                <PhoneCall className="w-4 h-4 text-teal-600" />
                <span>0800 591 2341</span>
              </a>
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2"
              >
                Solicitar Demonstração Grátis
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
