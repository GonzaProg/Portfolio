import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const Navbar: React.FC = () => {
  const { i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

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
        background: isScrolled ? 'rgba(10, 12, 22, 0.2)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.03)' : '1px solid transparent',
        zIndex: 100,
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#about" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-heading)' }}>
          GV<span className="text-gradient">.</span>
        </a>

        {/* Desktop Menu - Nav links moved to constellation */}
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          
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
      </div>
    </nav>
  );
};

export default Navbar;
