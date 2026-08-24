import React, { useEffect, useRef } from 'react';

export const StarfieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate stars
    const starCount = Math.floor((width * height) / 3500);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.15 + 0.05,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Deep space ambient nebula gradients
      const grad1 = ctx.createRadialGradient(width * 0.2, height * 0.3, 50, width * 0.2, height * 0.3, width * 0.6);
      grad1.addColorStop(0, 'rgba(255, 90, 31, 0.03)');
      grad1.addColorStop(1, 'rgba(10, 10, 12, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 50, width * 0.8, height * 0.7, width * 0.5);
      grad2.addColorStop(0, 'rgba(56, 189, 248, 0.02)');
      grad2.addColorStop(1, 'rgba(10, 10, 12, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Draw stars
      for (const star of stars) {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        const currentAlpha = star.alpha + Math.sin(tick * star.twinkleSpeed + star.twinklePhase) * 0.25;
        const clampedAlpha = Math.max(0.1, Math.min(1, currentAlpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 243, 240, ${clampedAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: '#0A0A0C' }}
    />
  );
};
