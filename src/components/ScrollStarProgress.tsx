import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star } from 'lucide-react';

const ScrollStarProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // We map the scroll progress (0 to 1) to an array of stars
  const numStars = 6;
  const starsArray = Array.from({ length: numStars });

  return (
    <div
      style={{
        position: 'fixed',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        zIndex: 50,
      }}
    >
      {starsArray.map((_, index) => {
        // Calculate the range of scroll for this specific star to light up
        const threshold = index / (numStars - 1);
        
        // When scroll reaches the threshold, color changes, glow appears
        const glowOpacity = useTransform(
          scrollYProgress,
          [Math.max(0, threshold - 0.1), threshold],
          [0, 1]
        );

        const color = useTransform(
          scrollYProgress,
          [Math.max(0, threshold - 0.1), threshold],
          ['#475569', '#fcd34d'] // From slate-600 to amber-300
        );
        
        const scale = useTransform(
          scrollYProgress,
          [Math.max(0, threshold - 0.1), threshold, Math.min(1, threshold + 0.1)],
          [1, 1.3, 1]
        );

        return (
          <motion.div
            key={index}
            style={{
              position: 'relative',
              scale,
            }}
          >
            {/* Glow effect */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: '#fcd34d',
                borderRadius: '50%',
                filter: 'blur(8px)',
                opacity: glowOpacity,
              }}
            />
            {/* Star Icon */}
            <motion.div style={{ color, position: 'relative', zIndex: 2 }}>
              <Star size={24} fill="currentColor" strokeWidth={0} />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ScrollStarProgress;
