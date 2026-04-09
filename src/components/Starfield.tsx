"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number; // depth 0-1, controls size + parallax strength
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  life: number;
  maxLife: number;
  opacity: number;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let w = 0;
    let h = 0;
    let scrollY = 0;
    let animId = 0;
    // --- Stars ---
    const STAR_COUNT = 260;
    const stars: Star[] = [];

    function initStars() {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        const z = Math.random();
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h * 2.5, // spread beyond viewport for scroll
          z,
          size: 0.2 + z * 0.8,
          opacity: 0.1 + z * 0.4,
          twinkleSpeed: 0.5 + Math.random() * 2,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    }

    // --- Meteors ---
    const meteors: Meteor[] = [];
    let meteorTimer = 2000 + Math.random() * 4000;

    function spawnMeteor() {
      const startX = Math.random() * w * 0.8 + w * 0.1;
      const startY = Math.random() * h * 0.3;
      const angle = Math.PI * 0.2 + Math.random() * 0.15; // mostly diagonal down-right
      const speed = 8 + Math.random() * 6;
      meteors.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: 80 + Math.random() * 120,
        life: 0,
        maxLife: 40 + Math.random() * 30,
        opacity: 0.6 + Math.random() * 0.4,
      });
    }

    // --- Resize ---
    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
    }

    // --- Scroll ---
    function onScroll() {
      scrollY = window.scrollY;
    }

    // --- Draw ---
    let lastTime = 0;
    const FADE_IN_DURATION = 1800; // ms
    let fadeStart = 0;

    function draw(time: number) {
      if (!fadeStart) fadeStart = time;
      const dt = lastTime ? (time - lastTime) / 16.67 : 1; // normalise to ~60fps
      lastTime = time;

      // Global fade-in
      const fadeProgress = Math.min((time - fadeStart) / FADE_IN_DURATION, 1);
      const globalAlpha = fadeProgress * fadeProgress; // ease-in quadratic

      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = globalAlpha;

      const t = time * 0.001;

      // Draw stars
      for (const star of stars) {
        // Parallax: deeper stars (lower z) move slower
        const parallax = star.z * 0.35;
        const sy = star.y - scrollY * parallax;

        const drawX = star.x;
        const rawY = sy;

        // Wrap vertically
        const drawY = ((rawY % (h * 2.5)) + h * 2.5) % (h * 2.5) - h * 0.5;
        if (drawY < -10 || drawY > h + 10) continue;

        // Twinkle
        const twinkle =
          0.5 + 0.5 * Math.sin(t * star.twinkleSpeed + star.twinkleOffset);
        const alpha = star.opacity * (0.4 + twinkle * 0.6);

        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        // Subtle warm glow on brighter stars
        if (star.z > 0.6) {
          ctx.beginPath();
          ctx.arc(drawX, drawY, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 200, 130, ${alpha * 0.05})`;
          ctx.fill();
        }
      }

      // Meteor spawning
      meteorTimer -= 16.67 * dt;
      if (meteorTimer <= 0) {
        spawnMeteor();
        meteorTimer = 3000 + Math.random() * 6000;
      }

      // Draw meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        m.life += dt;

        const progress = m.life / m.maxLife;
        if (progress >= 1) {
          meteors.splice(i, 1);
          continue;
        }

        // Fade in then out
        const fade =
          progress < 0.15
            ? progress / 0.15
            : progress > 0.6
              ? 1 - (progress - 0.6) / 0.4
              : 1;

        const alpha = m.opacity * fade;
        const tailX = m.x - (m.vx / Math.sqrt(m.vx * m.vx + m.vy * m.vy)) * m.length * fade;
        const tailY = m.y - (m.vy / Math.sqrt(m.vx * m.vx + m.vy * m.vy)) * m.length * fade;

        const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        grad.addColorStop(0, `rgba(255, 255, 255, 0)`);
        grad.addColorStop(0.6, `rgba(255, 220, 170, ${alpha * 0.3})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${alpha})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.stroke();

        // Bright head
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
    />
  );
}
