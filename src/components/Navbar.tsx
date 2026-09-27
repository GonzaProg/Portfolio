import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

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
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginRight: '10px' }}>
            <a 
              href="https://github.com/GonzaProg" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'var(--text-muted)', transition: 'color 0.3s ease', display: 'flex', alignItems: 'center' }}
              onMouseOver={(e) => { e.currentTarget.style.color = '#fff' }}
              onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              <GithubIcon size={22} />
            </a>
            <a 
              href="https://www.linkedin.com/in/gonzalo-vaschchuk-a4b4033a7/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'var(--text-muted)', transition: 'color 0.3s ease', display: 'flex', alignItems: 'center' }}
              onMouseOver={(e) => { e.currentTarget.style.color = '#fff' }}
              onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              <LinkedinIcon size={22} />
            </a>
          </div>

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
