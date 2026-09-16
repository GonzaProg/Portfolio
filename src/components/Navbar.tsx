import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(nextLang);
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: isScrolled ? '15px 0' : '25px 0',
        transition: 'all 0.3s ease',
        background: isScrolled ? 'var(--glass-bg)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
        zIndex: 100,
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#hero" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-heading)' }}>
          GV<span className="text-gradient">.</span>
        </a>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }} className="desktop-nav">
          <a href="#about" style={{ color: '#fff', fontWeight: 500 }}>{t('nav.about')}</a>
          <a href="#education" style={{ color: '#fff', fontWeight: 500 }}>{t('nav.education')}</a>
          <a href="#skills" style={{ color: '#fff', fontWeight: 500 }}>{t('nav.skills')}</a>
          <a href="#projects" style={{ color: '#fff', fontWeight: 500 }}>{t('nav.projects')}</a>
          
          <button 
            onClick={toggleLanguage}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--space-light)',
              border: '1px solid var(--glass-border)',
              padding: '8px 16px',
              borderRadius: '20px',
              color: '#fff',
              cursor: 'pointer',
              transition: 'background 0.3s ease',
            }}
          >
            <Globe size={18} />
            <span>{i18n.language.toUpperCase()}</span>
          </button>
        </div>

        {/* Mobile Menu Toggle (simplified for this example, logic can be extended) */}
        <div className="mobile-nav-toggle" style={{ display: 'none', cursor: 'pointer' }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X color="#fff" /> : <Menu color="#fff" />}
        </div>
      </div>
      
      {/* We would add basic CSS in index.css to handle desktop-nav and mobile-nav-toggle display states */}
    </nav>
  );
};

export default Navbar;
