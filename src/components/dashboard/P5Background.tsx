import React, { useRef, useEffect } from 'react';

const P5Background: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let animationId: number;
    let waves: any[] = [];
    let particles: any[] = [];
    let prismShift = 0;

    const createCanvas = () => {
      if (!sketchRef.current) return;
      
      const canvas = document.createElement('canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.zIndex = '1';
      canvas.style.pointerEvents = 'none';
      
      sketchRef.current.appendChild(canvas);
      canvasRef.current = canvas;
      
      return canvas.getContext('2d');
    };

    const setup = (ctx: CanvasRenderingContext2D) => {
      // Initialize prismatic waves
      for (let i = 0; i < 4; i++) {
        waves.push({
          y: window.innerHeight * (0.2 + i * 0.2),
          amplitude: 30 + i * 15,
          frequency: 0.003 + i * 0.001,
          speed: 0.008 + i * 0.003,
          phase: i * Math.PI / 2,
          color: i % 2 === 0 ? 'rgba(96, 165, 250, 0.1)' : 'rgba(52, 211, 153, 0.1)'
        });
      }

      // Initialize floating particles
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.4 + 0.1,
          sparkle: Math.random() > 0.9
        });
      }
    };

    const draw = (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Prismatic gradient background
      const gradient = ctx.createLinearGradient(0, 0, window.innerWidth, window.innerHeight);
      gradient.addColorStop(0, 'rgba(230, 240, 250, 0.02)');
      gradient.addColorStop(0.5, 'rgba(209, 250, 229, 0.02)');
      gradient.addColorStop(1, 'rgba(243, 232, 255, 0.02)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw prismatic waves
      waves.forEach((wave, index) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 1.5;
        
        const time = Date.now() * 0.001;
        for (let x = 0; x <= window.innerWidth; x += 8) {
          const y = wave.y + Math.sin((x * wave.frequency) + (time * wave.speed) + wave.phase) * wave.amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      // Draw floating particles with sparkles
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
        if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;

        if (particle.sparkle) {
          const sparkleAlpha = Math.sin(Date.now() * 0.01) * 0.3 + 0.3;
          ctx.fillStyle = `rgba(255, 255, 255, ${sparkleAlpha})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(96, 165, 250, 0.5)';
        } else {
          ctx.fillStyle = `rgba(96, 165, 250, ${particle.alpha})`;
          ctx.shadowBlur = 0;
        }
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Prismatic grid overlay
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.05)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < window.innerWidth; x += 120) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, window.innerHeight);
        ctx.stroke();
      }
      for (let y = 0; y < window.innerHeight; y += 120) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(window.innerWidth, y);
        ctx.stroke();
      }

      // Prism shift effect
      prismShift += 0.01;
      const prismGradient = ctx.createRadialGradient(
        window.innerWidth * 0.7, window.innerHeight * 0.3, 0,
        window.innerWidth * 0.7, window.innerHeight * 0.3, 400
      );
      prismGradient.addColorStop(0, `rgba(249, 168, 212, ${0.1 + Math.sin(prismShift) * 0.05})`);
      prismGradient.addColorStop(1, 'rgba(249, 168, 212, 0)');
      ctx.fillStyle = prismGradient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const animate = (ctx: CanvasRenderingContext2D) => {
      draw(ctx);
      animationId = requestAnimationFrame(() => animate(ctx));
    };

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    const ctx = createCanvas();
    if (ctx) {
      setup(ctx);
      animate(ctx);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (canvasRef.current && sketchRef.current) {
        sketchRef.current.removeChild(canvasRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={sketchRef} className="fixed inset-0 pointer-events-none" />;
};

export default P5Background;
