import React from 'react';
import { useTranslation } from 'react-i18next';
import OrbitImages from '../animations/OrbitImages';
import { MagicCard, MagicCardContainer } from '../animations/MagicCard';

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

      <div style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '40px', alignItems: 'center' }}>
        
        {/* Lado izquierdo: Grilla 2x2 */}
        <div style={{ flex: '1 1 500px' }}>
          <MagicCardContainer>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {skillCategories.map((category, index) => (
                <MagicCard
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
                </MagicCard>
              ))}
            </div>
          </MagicCardContainer>
        </div>

        {/* Lado derecho: Órbita (Sistema Solar) */}
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', aspectRatio: '1 / 1', maxWidth: '500px', margin: '0 auto' }}>
          
          {/* Órbita exterior (7 imágenes) */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
            <OrbitImages
              images={[
                "https://skillicons.dev/icons?i=angular",
                "https://skillicons.dev/icons?i=vite",
                "https://skillicons.dev/icons?i=nodejs",
                "https://skillicons.dev/icons?i=express",
                "https://skillicons.dev/icons?i=postgres",
                "https://skillicons.dev/icons?i=firebase",
                "https://skillicons.dev/icons?i=arduino"
              ]}
              shape="circle"
              radius={190}
              baseWidth={500}
              duration={50}
              itemSize={40}
              responsive={true}
              showPath={true}
              pathColor="rgba(139, 92, 246, 0.2)"
            />
          </div>

          {/* Órbita media (4 imágenes) */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
            <OrbitImages
              images={[
                "https://skillicons.dev/icons?i=nextjs",
                "https://skillicons.dev/icons?i=html",
                "https://skillicons.dev/icons?i=css",
                "https://skillicons.dev/icons?i=tailwind"
              ]}
              shape="circle"
              radius={130}
              baseWidth={500}
              duration={35}
              direction="reverse"
              itemSize={45}
              responsive={true}
              showPath={true}
              pathColor="rgba(59, 130, 246, 0.2)"
            />
          </div>

          {/* Órbita interior (3 imágenes) */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
            <OrbitImages
              images={[
                "https://skillicons.dev/icons?i=react",
                "https://skillicons.dev/icons?i=ts",
                "https://skillicons.dev/icons?i=js"
              ]}
              shape="circle"
              radius={70}
              baseWidth={500}
              duration={20}
              itemSize={50}
              responsive={true}
              showPath={true}
              pathColor="rgba(139, 92, 246, 0.4)"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
