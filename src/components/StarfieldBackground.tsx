import React, { useEffect, useRef } from 'react';

const StarfieldBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; radius: number; vx: number; vy: number; alpha: number; twinkleSpeed: number, color: string }[] = [];
    let meteors: { x: number; y: number; length: number; speed: number; angle: number; opacity: number }[] = [];

    const colors = ['#ffffff', '#e2f2ff', '#fff3e2', '#f0e6ff']; // Real star hues

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 1500); 
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.2 + 0.2, // Smaller, more realistic sizes
          vx: Math.random() * 0.1 + 0.05, // Drift right
          vy: Math.random() * 0.1 + 0.05, // Drift down
          alpha: Math.random(),
          twinkleSpeed: (Math.random() * 0.01) + 0.005,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const spawnMeteor = () => {
      // 1.5% chance per frame to spawn a meteor (creates a subtle meteor shower)
      if (Math.random() < 0.015) { 
        meteors.push({
          x: Math.random() * canvas.width * 1.5 - canvas.width * 0.5, 
          y: Math.random() * -200, // Spawn above the screen
          length: Math.random() * 100 + 40,
          speed: Math.random() * 15 + 10, // Fast movement
          angle: Math.PI / 4 + (Math.random() * 0.1 - 0.05), // ~45 degrees right-down
          opacity: 1
        });
      }
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw standard stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
        ctx.fillStyle = s.color;
        
        // Twinkle effect
        s.alpha += s.twinkleSpeed;
        if (s.alpha <= 0.1 || s.alpha >= 1) {
          s.twinkleSpeed = -s.twinkleSpeed;
        }
        
        // Dynamic glow for slightly bigger stars
        if (s.radius > 1) {
           ctx.shadowBlur = 5;
           ctx.shadowColor = s.color;
        } else {
           ctx.shadowBlur = 0;
        }

        ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
        ctx.fill();

        // Slow movement (Left to Right, Top to Bottom)
        s.x += s.vx;
        s.y += s.vy;

        // Wrap around seamlessly
        if (s.x > canvas.width) s.x = 0;
        if (s.y > canvas.height) s.y = 0;
      }
      
      ctx.shadowBlur = 0; // Reset shadow for meteors

      // Draw meteors
      spawnMeteor();
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        
        // Update position
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.opacity -= 0.012; // Fade out as it falls
        
        if (m.opacity <= 0) {
          meteors.splice(i, 1);
          continue;
        }

        // Draw meteor trail
        const gradient = ctx.createLinearGradient(
          m.x, m.y, 
          m.x - Math.cos(m.angle) * m.length, 
          m.y - Math.sin(m.angle) * m.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${m.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(
          m.x - Math.cos(m.angle) * m.length, 
          m.y - Math.sin(m.angle) * m.length
        );
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(drawStars);
    };

    window.addEventListener('resize', resize);
    resize();
    drawStars();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default StarfieldBackground;
