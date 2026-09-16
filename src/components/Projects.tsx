import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink, Download } from 'lucide-react';

const Projects: React.FC = () => {
  const { t } = useTranslation();

  const projects = [
    {
      key: 'item4',
      link: 'https://contacto-gym-mate.vercel.app',
      features: ['f1', 'f2', 'f3', 'f4', 'f5']
    },
    { key: 'item1', download: '/chatterbot.zip' },
    { key: 'item2', download: '/consultorio.zip' },
    { key: 'item3', download: '/viajes.zip' }
  ];

  return (
    <section id="projects" className="section container">
      <h2 className="section-title">{t('projects.title')}</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
        {projects.map((proj, index) => {
          const isFeatured = proj.key === 'item4';
          
          return (
            <motion.div
              key={proj.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-panel"
              style={{
                padding: '40px',
                border: isFeatured ? '1px solid var(--accent-purple)' : '1px solid var(--glass-border)',
                boxShadow: isFeatured ? '0 10px 40px rgba(139, 92, 246, 0.15)' : 'none',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {isFeatured && (
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '-35px',
                  background: 'var(--accent-purple)',
                  color: 'white',
                  padding: '5px 40px',
                  transform: 'rotate(45deg)',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}>
                  {t(`projects.${proj.key}.status`)}
                </div>
              )}

              <h3 style={{ fontSize: '1.8rem', marginBottom: '15px', color: 'var(--text-main)', maxWidth: '90%' }}>
                {t(`projects.${proj.key}.title`)}
              </h3>
              
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '1.05rem' }}>
                {t(`projects.${proj.key}.description`)}
              </p>

              {proj.features && (
                <ul style={{ listStyle: 'none', marginBottom: '25px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {proj.features.map(f => (
                    <li key={f} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-purple)', marginTop: '8px', flexShrink: 0 }} />
                      <span style={{ color: 'var(--text-main)' }}>{t(`projects.${proj.key}.features.${f}`)}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                {proj.link ? (
                  <a 
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'var(--accent-blue)',
                      color: '#fff',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      fontWeight: 500,
                      transition: 'background 0.3s ease'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = '#2563eb' }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'var(--accent-blue)' }}
                  >
                    <ExternalLink size={18} />
                    {t('projects.visit')}
                  </a>
                ) : null}
                
                {proj.download && (
                  <a 
                    href={proj.download}
                    download
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-main)',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      fontWeight: 500,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)' }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)' }}
                  >
                    <Download size={18} />
                    {t('projects.download')}
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
