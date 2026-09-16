import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GraduationCap, Code, Download } from 'lucide-react';

const Education: React.FC = () => {
  const { t } = useTranslation();

  const educationItems = [
    {
      key: 'item1',
      icon: <GraduationCap size={32} color="var(--accent-blue)" />,
    },
    {
      key: 'item2',
      icon: <Code size={32} color="var(--accent-purple)" />,
    },
  ];

  return (
    <section id="education" className="section container">
      <h2 className="section-title">{t('education.title')}</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {educationItems.map((item, index) => (
          <motion.div 
            key={item.key}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="glass-panel"
            style={{ padding: '30px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}
          >
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '15px',
              borderRadius: '12px',
            }}>
              {item.icon}
            </div>
            
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{t(`education.${item.key}.title`)}</h3>
              <p style={{ color: 'var(--accent-purple)', fontWeight: 500, marginBottom: '5px' }}>
                {t(`education.${item.key}.institution`)}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '15px' }}>
                {t(`education.${item.key}.date`)}
              </p>
              {(() => {
                const desc = t(`education.${item.key}.description`, { returnObjects: true });
                if (Array.isArray(desc)) {
                  return (
                    <ul style={{ color: 'var(--text-main)', marginBottom: '20px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem' }}>
                      {desc.map((d, i) => (
                        <li key={i} style={{ lineHeight: '1.5' }}>{d}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p style={{ color: 'var(--text-main)', marginBottom: '20px' }}>
                    {desc as unknown as string}
                  </p>
                );
              })()}
              
              <a 
                href={item.key === 'item1' ? "/titulo-secundario.zip" : "/titulo-fullstack.zip"} 
                download
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--accent-blue)',
                  fontSize: '0.9rem',
                  border: '1px solid var(--accent-blue)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)' }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                <Download size={16} />
                {t(`education.${item.key}.download`)}
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
