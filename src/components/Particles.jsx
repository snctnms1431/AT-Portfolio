import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks';

/**
 * Lightweight canvas falling-particle background.
 * Particles drift downward with subtle horizontal sway and low opacity.
 */
export default function Particles({ density = 90, color = '#1677A8' }) {
  const canvasRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let particles = [];
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const parent = canvas.parentElement;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      // INCREASED PARTICLE COUNT - removed density cap and reduced divisor
      const count = Math.max(30, Math.floor((w * h) / 4000));
      particles = Array.from({ length: count }, () => createParticle());
    };

    const createParticle = () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.4,
      vy: Math.random() * 0.4 + 0.12,
      vx: (Math.random() - 0.5) * 0.25,
      a: Math.random() * 0.5 + 0.1,
      phase: Math.random() * Math.PI * 2,
    });

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.phase += 0.01;
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.phase) * 0.15;
        if (p.y > h + 4) {
          p.y = -4;
          p.x = Math.random() * w;
        }
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        const alpha = p.a * (0.6 + Math.sin(p.phase) * 0.2);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(color)}, ${alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };

    const hexToRgb = (hex) => {
      const h = hex.replace('#', '');
      const n = parseInt(h, 16);
      return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
    };

    resize();
    tick();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [density, color, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      aria-hidden="true"
    />
  );
}