import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Estrella from '../assets/Estrella.png';

const TypewriterText = ({ text, isHovered }: { text: string; isHovered: boolean }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, x: 5 },
    visible: { opacity: 1, x: 0 }
  };

  if (!isHovered) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        position: 'absolute',
        right: '65px',
        top: '3px',
        whiteSpace: 'nowrap',
        color: '#fff',
        fontSize: '1rem',
        fontWeight: 600,
        pointerEvents: 'none',
        textShadow: '0 2px 10px rgba(0,0,0,0.8)'
      }}
    >
      {text.split('').map((char, i) => (
        <motion.span key={i} variants={childVariants}>
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

const ScrollStarProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const { t } = useTranslation();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  // Real layout scroll thresholds (0 to 1) for the sections
  const [thresholds, setThresholds] = useState<number[]>([0, 0.25, 0.5, 0.75, 1]);

  const sections = [
    { id: 'about', key: 'nav.about', x: 70, y: 30 },
    { id: 'education', key: 'nav.education', x: 20, y: 130 },
    { id: 'skills', key: 'nav.skills', x: 80, y: 250 },
    { id: 'projects', key: 'nav.projects', x: 30, y: 360 },
    { id: 'contact', key: 'nav.contact', x: 70, y: 470 }
  ];

  // SVG milestones based on exact line lengths between points
  // 1: (70, 30) -> 2: (20, 130) = dist 111.8
  // 2: (20, 130) -> 3: (80, 250) = dist 134.16
  // 3: (80, 250) -> 4: (30, 360) = dist 120.83
  // 4: (30, 360) -> 5: (70, 470) = dist 117.05
  // Total = 483.84
  const svgMilestones = [0, 0.231, 0.508, 0.758, 1];

  useEffect(() => {
    const calculateThresholds = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const newThresholds = sections.map((sec, index) => {
        if (index === 0) return 0;
        
        const el = document.getElementById(sec.id);
        if (el) {
          // Point where the section is halfway up the screen
          const rect = el.getBoundingClientRect();
          const offsetTop = rect.top + window.scrollY;
          const targetScroll = offsetTop - (window.innerHeight / 3);
          
          return Math.max(0, Math.min(1, targetScroll / scrollHeight));
        }
        return svgMilestones[index];
      });

      // Ensure thresholds are strictly increasing for useTransform
      for (let i = 1; i < newThresholds.length; i++) {
        if (newThresholds[i] <= newThresholds[i - 1]) {
          newThresholds[i] = newThresholds[i - 1] + 0.01;
        }
      }

      setThresholds(newThresholds);
    };

    calculateThresholds();
    window.addEventListener('resize', calculateThresholds);
    const timeout = setTimeout(calculateThresholds, 1000); // Recalculate after images load
    
    return () => {
      window.removeEventListener('resize', calculateThresholds);
      clearTimeout(timeout);
    };
  }, []);

  // Map the document scroll to the SVG path progress perfectly
  const pathProgress = useTransform(scrollYProgress, thresholds, svgMilestones);

  const pathString = `M ${sections.map(p => `${p.x} ${p.y}`).join(' L ')}`;

  return (
    <div className="scroll-star-container">
      <svg width="100" height="500" viewBox="0 0 100 500" style={{ overflow: 'visible', pointerEvents: 'none' }}>
        <path
          d={pathString}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1"
        />
        
        <motion.path
          d={pathString}
          fill="transparent"
          stroke="rgba(139, 92, 246, 0.8)"
          strokeWidth="2"
          style={{ pathLength: pathProgress }}
        />

        {sections.map((p, index) => {
          const svgMilestone = svgMilestones[index];
          
          const opacity = useTransform(
            pathProgress,
            [Math.max(0, svgMilestone - 0.1), svgMilestone],
            [0.3, 1]
          );

          const scale = useTransform(
            pathProgress,
            [Math.max(0, svgMilestone - 0.1), svgMilestone, Math.min(1, svgMilestone + 0.1)],
            [1, 1.5, 1.2]
          );

          const glowOpacity = useTransform(
            pathProgress,
            [Math.max(0, svgMilestone - 0.1), svgMilestone],
            [0, 0.8]
          );

          const isHovered = hoveredId === p.id;

          return (
            <g key={index} transform={`translate(${p.x}, ${p.y})`}>
              {/* Efecto de luminiscencia (Glow) */}
              <motion.circle
                r="14"
                fill="rgba(252, 211, 77, 0.6)"
                style={{ 
                  opacity: isHovered ? 1 : glowOpacity, 
                  scale: isHovered ? 1.5 : scale, 
                  filter: 'blur(6px)', 
                  transition: 'all 0.3s ease' 
                }}
              />
              
              {/* Imagen de la estrella */}
              <motion.image
                href={Estrella}
                x="-12"
                y="-12"
                width="24"
                height="24"
                style={{ 
                  opacity: isHovered ? 1 : opacity, 
                  scale: isHovered ? 1.5 : scale, 
                  transition: 'all 0.3s ease',
                  filter: 'drop-shadow(0 0 5px rgba(252,211,77,0.8))'
                }}
              />
            </g>
          );
        })}
      </svg>

      {sections.map((sec) => (
        <div
          key={sec.id}
          style={{
            position: 'absolute',
            left: `${sec.x}px`,
            top: `${sec.y}px`,
            width: '40px',
            height: '40px',
            transform: 'translate(-20px, -20px)',
            cursor: 'pointer',
            zIndex: 10
          }}
          onMouseEnter={() => setHoveredId(sec.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => { window.location.hash = `#${sec.id}`; }}
        >
          <TypewriterText text={t(sec.key)} isHovered={hoveredId === sec.id} />
        </div>
      ))}
    </div>
  );
};

export default ScrollStarProgress;
