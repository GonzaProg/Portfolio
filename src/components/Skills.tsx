import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Skills: React.FC = () => {
  const { t } = useTranslation();

  const skillCategories = [
    {
      titleKey: 'skills.frontend',
      skills: ['React & React DOM', 'Next.js', 'Angular', 'TypeScript / JavaScript', 'HTML5 & CSS (Vite, TailwindCSS)', 'Capacitor', 'Electron']
    },
    {
      titleKey: 'skills.backend',
      skills: ['Node.js & Express', 'PostgreSQL (TypeORM)', 'Firebase Admin', 'APIs de Terceros', 'JWT & Bcrypt']
    },
    {
      titleKey: 'skills.tools',
      skills: ['Object Pascal (Lazarus)', 'SmallTalk (VisualWorks)', 'SWIProlog', 'LispWorks', 'Tagui']
    },
    {
      titleKey: 'skills.hardware',
      skills: ['Arduino', 'ESP32']
    }
  ];

  return (
    <section id="skills" className="section container">
      <h2 className="section-title">{t('skills.title')}</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.titleKey}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-panel"
            style={{ padding: '25px' }}
          >
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--accent-purple)' }}>
              {t(category.titleKey)}
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {category.skills.map((skill, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-blue)' }} />
                  <span style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{skill}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
