import React, { useState, useEffect, useRef } from 'react';
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

type WaveType = 'sin' | 'cos' | 'tan';

interface SectionPoint {
  id: string;
  key: string;
  x: number;
  y: number;
}

const sections: SectionPoint[] = [
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

// Mathematical offset calculations for each trigonometric function
function getTrigOffset(fnType: WaveType, u: number, t: number): number {
  // Envelope pinning the wave offset strictly to 0 at the star coordinates (u = 0 and u = 1)
  const env = Math.sin(Math.PI * u);
  const amplitude = 9.5; // pixel amplitude perpendicular to segment

  if (fnType === 'sin') {
    // Pure Sine harmonic oscillation
    return amplitude * env * Math.sin(2 * Math.PI * 1.5 * u - 2.4 * t);
  }

  if (fnType === 'cos') {
    // Pure Cosine harmonic oscillation with different phase and speed
    return amplitude * env * Math.cos(2 * Math.PI * 1.5 * u - 1.9 * t + 0.6);
  }

  if (fnType === 'tan') {
    // Tangent harmonic oscillation (bounded safely within [-1.15, 1.15] rad to prevent asymptotes while keeping steep slopes)
    const thetaMax = 1.15; // ~66 degrees, safely away from pi/2
    const theta = thetaMax * Math.sin(2 * Math.PI * 1.5 * u - 2.8 * t + 1.2);
    const tanVal = Math.tan(theta) / Math.tan(thetaMax);
    return amplitude * env * tanVal;
  }

  return 0;
}

interface PathResult {
  pathString: string;
  lastPoint: { x: number; y: number } | null;
}

// Generates smooth SVG path string up to a maximum scroll progress fraction [0, 1]
function generatePathData(
  fnType: WaveType,
  t: number,
  maxProgress: number,
  numStepsPerSeg = 30
): PathResult {
  if (maxProgress <= 0) {
    return { pathString: '', lastPoint: null };
  }

  const points: { x: number; y: number }[] = [];

  for (let i = 0; i < sections.length - 1; i++) {
    const mStart = svgMilestones[i];
    const mEnd = svgMilestones[i + 1];

    if (maxProgress < mStart) {
      break;
    }

    const pStart = sections[i];
    const pEnd = sections[i + 1];

    const dx = pEnd.x - pStart.x;
    const dy = pEnd.y - pStart.y;
    const segLen = Math.hypot(dx, dy);

    // Unit normal vector perpendicular to direction of segment
    const nx = dy / segLen;
    const ny = -dx / segLen;

    // Segment progress fraction [0, 1]
    const uMax = maxProgress >= mEnd ? 1.0 : Math.max(0, (maxProgress - mStart) / (mEnd - mStart));

    const steps = Math.max(1, Math.ceil(numStepsPerSeg * uMax));
    const startStep = i === 0 ? 0 : 1;

    for (let s = startStep; s <= steps; s++) {
      const u = Math.min(uMax, s / numStepsPerSeg);
      const bx = pStart.x + u * dx;
      const by = pStart.y + u * dy;
      const off = getTrigOffset(fnType, u, t);
      const px = bx + nx * off;
      const py = by + ny * off;

      points.push({ x: px, y: py });

      if (u >= uMax) {
        break;
      }
    }
  }

  if (points.length === 0) {
    return { pathString: '', lastPoint: null };
  }

  const pathString = `M ${points.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ')}`;
  const lastPoint = points[points.length - 1];

  return { pathString, lastPoint };
}

const ScrollStarProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const { t } = useTranslation();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Real layout scroll thresholds (0 to 1) for the sections
  const [thresholds, setThresholds] = useState<number[]>([0, 0.25, 0.5, 0.75, 1]);

  // SVG path references for direct, hardware-accelerated 60fps undulation without React re-renders
  const sinBgRef = useRef<SVGPathElement>(null);
  const cosBgRef = useRef<SVGPathElement>(null);
  const tanBgRef = useRef<SVGPathElement>(null);

  const sinColorRef = useRef<SVGPathElement>(null);
  const cosColorRef = useRef<SVGPathElement>(null);
  const tanColorRef = useRef<SVGPathElement>(null);

  const sinTipRef = useRef<SVGCircleElement>(null);
  const cosTipRef = useRef<SVGCircleElement>(null);
  const tanTipRef = useRef<SVGCircleElement>(null);

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
          const targetScroll = offsetTop - window.innerHeight / 3;

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

  // Constant undulating animation loop via requestAnimationFrame
  useEffect(() => {
    let animId: number;

    const animate = () => {
      const time = performance.now() * 0.0018;
      const progress = Math.max(0, Math.min(1, pathProgress.get()));

      // 1. Generate full uncolored background guide paths (constantly undulating)
      const sinFull = generatePathData('sin', time, 1.0);
      const cosFull = generatePathData('cos', time, 1.0);
      const tanFull = generatePathData('tan', time, 1.0);

      if (sinBgRef.current) sinBgRef.current.setAttribute('d', sinFull.pathString);
      if (cosBgRef.current) cosBgRef.current.setAttribute('d', cosFull.pathString);
      if (tanBgRef.current) tanBgRef.current.setAttribute('d', tanFull.pathString);

      // 2. Generate active colored paths up to the current scroll progress
      if (progress > 0.005) {
        const sinActive = generatePathData('sin', time, progress);
        const cosActive = generatePathData('cos', time, progress);
        const tanActive = generatePathData('tan', time, progress);

        if (sinColorRef.current) {
          sinColorRef.current.setAttribute('d', sinActive.pathString);
          sinColorRef.current.style.opacity = '1';
        }
        if (cosColorRef.current) {
          cosColorRef.current.setAttribute('d', cosActive.pathString);
          cosColorRef.current.style.opacity = '1';
        }
        if (tanColorRef.current) {
          tanColorRef.current.setAttribute('d', tanActive.pathString);
          tanColorRef.current.style.opacity = '1';
        }

        // 3. Leading glowing heads tracing the tip of each wave
        if (progress < 0.999) {
          if (sinTipRef.current && sinActive.lastPoint) {
            sinTipRef.current.setAttribute('cx', sinActive.lastPoint.x.toFixed(1));
            sinTipRef.current.setAttribute('cy', sinActive.lastPoint.y.toFixed(1));
            sinTipRef.current.style.opacity = '1';
          }
          if (cosTipRef.current && cosActive.lastPoint) {
            cosTipRef.current.setAttribute('cx', cosActive.lastPoint.x.toFixed(1));
            cosTipRef.current.setAttribute('cy', cosActive.lastPoint.y.toFixed(1));
            cosTipRef.current.style.opacity = '1';
          }
          if (tanTipRef.current && tanActive.lastPoint) {
            tanTipRef.current.setAttribute('cx', tanActive.lastPoint.x.toFixed(1));
            tanTipRef.current.setAttribute('cy', tanActive.lastPoint.y.toFixed(1));
            tanTipRef.current.style.opacity = '1';
          }
        } else {
          if (sinTipRef.current) sinTipRef.current.style.opacity = '0';
          if (cosTipRef.current) cosTipRef.current.style.opacity = '0';
          if (tanTipRef.current) tanTipRef.current.style.opacity = '0';
        }
      } else {
        // At the top of the page, waves remain uncolored
        if (sinColorRef.current) sinColorRef.current.style.opacity = '0';
        if (cosColorRef.current) cosColorRef.current.style.opacity = '0';
        if (tanColorRef.current) tanColorRef.current.style.opacity = '0';

        if (sinTipRef.current) sinTipRef.current.style.opacity = '0';
        if (cosTipRef.current) cosTipRef.current.style.opacity = '0';
        if (tanTipRef.current) tanTipRef.current.style.opacity = '0';
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [pathProgress]);

  return (
    <div className="scroll-star-container">
      <svg
        width="100"
        height="500"
        viewBox="0 0 100 500"
        style={{ overflow: 'visible', pointerEvents: 'none' }}
      >
        <defs>
          <clipPath id="star-circle-clip" clipPathUnits="objectBoundingBox">
            <circle cx="0.5" cy="0.5" r="0.5" />
          </clipPath>
        </defs>

        {/* 1. Base uncolored guide lines (subtle transparent paths undulating constantly) */}
        <g opacity="0.45">
          {/* Seno guide */}
          <path
            ref={sinBgRef}
            fill="none"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Coseno guide */}
          <path
            ref={cosBgRef}
            fill="none"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Tangente guide */}
          <path
            ref={tanBgRef}
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* 2. Active colored lines painted as the user scrolls, each function with its distinct color */}
        {/* Seno: Electric Cyan / Sky Blue */}
        <path
          ref={sinColorRef}
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            opacity: 0,
            filter: 'drop-shadow(0 0 4px rgba(56, 189, 248, 0.85))'
          }}
        />

        {/* Coseno: Radiant Neon Purple / Violet */}
        <path
          ref={cosColorRef}
          fill="none"
          stroke="#c084fc"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            opacity: 0,
            filter: 'drop-shadow(0 0 4px rgba(192, 132, 252, 0.85))'
          }}
        />

        {/* Tangente: Vibrant Neon Rose / Coral Pink */}
        <path
          ref={tanColorRef}
          fill="none"
          stroke="#fb7185"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            opacity: 0,
            filter: 'drop-shadow(0 0 4px rgba(251, 113, 133, 0.85))'
          }}
        />

        {/* Leading glowing beads that lead the painting edge */}
        <circle
          ref={sinTipRef}
          r="2.8"
          fill="#38bdf8"
          style={{ opacity: 0, filter: 'drop-shadow(0 0 6px #38bdf8)' }}
        />
        <circle
          ref={cosTipRef}
          r="2.8"
          fill="#c084fc"
          style={{ opacity: 0, filter: 'drop-shadow(0 0 6px #c084fc)' }}
        />
        <circle
          ref={tanTipRef}
          r="2.8"
          fill="#fb7185"
          style={{ opacity: 0, filter: 'drop-shadow(0 0 6px #fb7185)' }}
        />

        {/* 3. Section Stars with progressive glow and pulse */}
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

              {/* Imagen de la estrella con recorte circular para eliminar bordes cuadrados */}
              <motion.g
                style={{
                  opacity: isHovered ? 1 : opacity,
                  scale: isHovered ? 1.5 : scale,
                  transition: 'all 0.3s ease',
                  filter: 'drop-shadow(0 0 5px rgba(252,211,77,0.8))'
                }}
              >
                <image
                  href={Estrella}
                  x="-12"
                  y="-12"
                  width="24"
                  height="24"
                  clipPath="url(#star-circle-clip)"
                  style={{
                    clipPath: 'circle(50% at center)'
                  }}
                />
              </motion.g>
            </g>
          );
        })}
      </svg>

      {/* Interactive hover and click targets */}
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
          onClick={() => {
            window.location.hash = `#${sec.id}`;
          }}
        >
          <TypewriterText text={t(sec.key)} isHovered={hoveredId === sec.id} />
        </div>
      ))}
    </div>
  );
};

export default ScrollStarProgress;
