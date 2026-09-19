import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollStarProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Constellation points within a 100x400 viewBox
  const points = [
    { x: 50, y: 20 },
    { x: 20, y: 92 },
    { x: 80, y: 164 },
    { x: 40, y: 236 },
    { x: 90, y: 308 },
    { x: 30, y: 380 }
  ];

  // SVG Path connecting the points
  const pathString = `M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`;

  return (
    <div
      style={{
        position: 'fixed',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '100px',
        height: '400px',
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      <svg width="100" height="400" viewBox="0 0 100 400" style={{ overflow: 'visible' }}>
        {/* Background dimmed line */}
        <path
          d={pathString}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1"
        />
        
        {/* Animated bright line drawing on scroll */}
        <motion.path
          d={pathString}
          fill="transparent"
          stroke="rgba(139, 92, 246, 0.8)" /* accent-purple */
          strokeWidth="2"
          style={{ pathLength: scrollYProgress }}
        />

        {/* Constellation Stars */}
        {points.map((p, index) => {
          // Calculate when the scroll reaches this point (roughly)
          const threshold = index / (points.length - 1);
          
          // Glow and size change as we scroll past the threshold
          const opacity = useTransform(
            scrollYProgress,
            [Math.max(0, threshold - 0.1), threshold],
            [0.3, 1]
          );

          const scale = useTransform(
            scrollYProgress,
            [Math.max(0, threshold - 0.1), threshold, Math.min(1, threshold + 0.1)],
            [1, 1.5, 1.2]
          );

          const glowOpacity = useTransform(
            scrollYProgress,
            [Math.max(0, threshold - 0.1), threshold],
            [0, 0.8]
          );

          return (
            <g key={index} transform={`translate(${p.x}, ${p.y})`}>
              {/* Outer Glow */}
              <motion.circle
                r="6"
                fill="rgba(252, 211, 77, 0.6)" /* Amber-300 with opacity */
                style={{ opacity: glowOpacity, scale, filter: 'blur(3px)' }}
              />
              
              {/* Inner Core (Real Star Look) */}
              <motion.circle
                r="2.5"
                fill="#ffffff"
                style={{ opacity, scale }}
              />

              {/* Flare effect for brighter stars */}
              {index % 2 === 0 && (
                <motion.path
                  d="M -6 0 L 6 0 M 0 -6 L 0 6"
                  stroke="#ffffff"
                  strokeWidth="0.5"
                  style={{ opacity: glowOpacity }}
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default ScrollStarProgress;
