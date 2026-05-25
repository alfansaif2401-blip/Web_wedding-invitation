"use client";
import { useEffect, useRef } from "react";

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: {
      x: number; y: number; size: number; speedY: number;
      speedX: number; opacity: number; life: number; maxLife: number;
      hue: number;
    }[] = [];

    const spawn = () => {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        size: Math.random() * 3 + 1,
        speedY: -(Math.random() * 0.8 + 0.3),
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: 0,
        life: 0,
        maxLife: Math.random() * 300 + 200,
        hue: Math.random() * 30 + 35, // gold hues
      });
    };

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      if (frame % 8 === 0) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.life * 0.02) * 0.3;
        p.opacity = p.life < 30 ? p.life / 30 : p.life > p.maxLife - 30
          ? (p.maxLife - p.life) / 30 : 0.6;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${p.opacity * 0.4})`;
        ctx.fill();

        // Glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        grad.addColorStop(0, `hsla(${p.hue}, 80%, 80%, ${p.opacity * 0.3})`);
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        if (p.life >= p.maxLife) particles.splice(i, 1);
      }
      requestAnimationFrame(animate);
    };
    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
