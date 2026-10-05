import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ElectricBorder from '../animations/ElectricBorder';
import SpecularButton from '../animations/SpecularButton';
import miCara from '../assets/MiCara.jpeg';
import fondoNombre from '../assets/FondoNombre.jpg';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="section" style={{ minHeight: '100vh', position: 'relative', paddingTop: '120px' }}>
      <div className="container hero-layout">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ flex: '1 1 min(100%, 500px)' }}
        >
          <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-purple)', marginBottom: '10px' }}>
            {t('hero.greeting')}
          </h2>
          <h1 className="hero-title">
            <span style={{
              backgroundImage: `url(${fondoNombre})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextStroke: '2px var(--accent-purple)',
              filter: 'drop-shadow(0 0 10px var(--accent-purple))'
            }}>
              {t('hero.name')}
            </span><br/>
            <span className="text-gradient hero-role">{t('hero.role')}</span>
          </h1>
          <p className="hero-description">
            {t('hero.description')}
          </p>
          
          <div style={{ display: 'inline-block' }}>
            <SpecularButton
              size="lg"
              radius={30}
              tint="#8b5cf6"
              tintOpacity={0.15}
              blur={0}
              textColor="#f5f5f5"
              lineColor="#ffffff"
              baseColor="#8b5cf6"
              intensity={2.5}
              shineSize={20}
              shineFade={60}
              thickness={4}
              speed={0.4}
              followMouse
              proximity={300}
              autoAnimate={true}
              onClick={() => { window.location.hash = '#contact'; }}
            >
              {t('hero.contact')}
            </SpecularButton>
          </div>
        </motion.div>

        <motion.div 
          className="hero-image-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ flex: '1 1 min(100%, 300px)', display: 'flex', justifyContent: 'center' }}
        >
          <ElectricBorder
            color="#8b5cf6"
            speed={1}
            chaos={0.12}
            borderRadius={150}
            style={{ borderRadius: '50%', width: '100%', height: '100%', maxWidth: '300px', maxHeight: '300px', aspectRatio: '1/1' }}
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
              {/* User Image */}
              <img src={miCara} alt="Gonzalo Vaschchuk" style={{ width: '90%', height: '90%', objectFit: 'cover' }} />
            </div>
          </ElectricBorder>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
