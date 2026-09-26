import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ElectricBorder from '../animations/ElectricBorder';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="section" style={{ minHeight: '100vh', position: 'relative' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ flex: '1 1 500px' }}
        >
          <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-purple)', marginBottom: '10px' }}>
            {t('hero.greeting')}
          </h2>
          <h1 style={{ fontSize: '4rem', marginBottom: '20px', lineHeight: 1.1 }}>
            {t('hero.name')}<br/>
            <span className="text-gradient" style={{ fontSize: '2.5rem' }}>{t('hero.role')}</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '30px', maxWidth: '600px' }}>
            {t('hero.description')}
          </p>
          
          <a 
            href="mailto:gonvasch@gmail.com" 
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
              color: '#fff',
              padding: '12px 32px',
              borderRadius: '30px',
              fontWeight: 600,
              boxShadow: '0 4px 15px var(--accent-glow)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.6)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px var(--accent-glow)'; }}
          >
            {t('hero.contact')}
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}
        >
          <ElectricBorder
            color="#8b5cf6"
            speed={1}
            chaos={0.12}
            borderRadius={150}
            style={{ borderRadius: '50%', width: '300px', height: '300px' }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'var(--glass-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative'
            }}>
              {/* Placeholder for the user's image */}
              <span style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>
                Espacio para imagen<br/>(Subir luego)
              </span>
            </div>
          </ElectricBorder>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
