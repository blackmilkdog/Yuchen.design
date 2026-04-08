"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const LABELS = [
  "B2B PAYMENT SYSTEM",
  "DESIGN SYSTEMS AT SCALE",
  "HIGH-TRUST UX",
  "WORKFLOW SIMPLIFICATION",
  "FEEDBACK-TO-RELEASE LOOP",
  "AI-FIRST PROTOTYPING",
];

const FULL_TEXT = LABELS.join("  ·  ") + "  ·  ";

const STRIPES = [
  { startX: 1, endX: 0.7, speed: 15, phase: 0, offset: 0 },
  { startX: 0.9, endX: 0.4, speed: 15, phase: Math.PI, offset: 4 },
  // { startX: 0.7, endX: 0.3, speed: 30, phase: 0, offset: 0 }
];

export default function TextSnake3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[][]>([[], [], []]);
  const timeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = useCallback(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    let prev = performance.now();

    const animate = (now: number) => {
      const delta = (now - prev) / 1000;
      prev = now;
      timeRef.current += delta;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const charSpacing = 200;

      // Lerp mouse
      const lerpSpeed = 1 - Math.pow(0.03, delta);
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * lerpSpeed;
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * lerpSpeed;
      const mx = smoothMouseRef.current.x;
      const my = smoothMouseRef.current.y;

      for (let s = 0; s < STRIPES.length; s++) {
        const stripe = STRIPES[s];
        const els = charsRef.current[s];
        if (!els || !els.length) continue;

        const total = els.length;
        const spread = total * charSpacing;
        const timeOffset = timeRef.current * stripe.speed;
        const scrollOffset = scrollRef.current * spread * 0.8;

        for (let i = 0; i < total; i++) {
          const el = els[i];
          if (!el) continue;

          const t = i * charSpacing - spread / 2 + ((timeOffset + scrollOffset + stripe.offset * charSpacing) % spread);
          const wrapped = ((t % spread) + spread * 1.5) % spread - spread / 2;

          const progress = 1 - (wrapped + spread / 2) / spread;
          const xRange = stripe.startX - stripe.endX;
          const baseX = w * (stripe.startX - progress * xRange) + w * 0.1;
          const baseY = h * progress;

          // Sine wave, ramps with progress
          const waveAmp = w * 0.15 * progress;
          const wave = Math.sin(progress * Math.PI * 5 + timeRef.current * 1.2 + stripe.phase) * waveAmp;
          const waveX = wave * 0.55;
          const waveY = wave * 0.45;

          // Cursor attraction for all, stronger toward bottom
          const attraction = 0.05 + progress * progress * 0.15;
          const pullX = (mx * w - baseX) * attraction;
          const pullY = (my * h - baseY) * attraction;

          const fx = baseX + waveX + pullX;
          const fy = baseY + waveY + pullY;

          // Analytical tangent derivative for rotation
          const cosW = Math.cos(progress * Math.PI * 5 + timeRef.current * 1.2 + stripe.phase);
          const sinW = Math.sin(progress * Math.PI * 5 + timeRef.current * 1.2 + stripe.phase);
          const dWave = (cosW * Math.PI * 5 * w * 0.15 * progress + sinW * w * 0.15);
          const dx = -w * xRange + dWave * 0.55;
          const dy = h + dWave * 0.45;
          const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 180;

          const inBounds = fy >= -30 && fy <= h + 30 && fx >= -30 && fx <= w + 30;

          const fadeProgress = (wrapped + spread / 2) / spread;
          const rawOpacity = fadeProgress < 0.5
            ? fadeProgress * 2
            : (1 - fadeProgress) * 2;
          const opacity = inBounds ? rawOpacity : 0;

          el.style.transform = `translate(${fx}px, ${fy}px) rotate(${angle}deg)`;
          el.style.opacity = String(opacity);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 right-0 z-[2] pointer-events-none overflow-hidden"
      style={{
        width: "100vw",
        height: "100vh",
        opacity: visible ? 1 : 0,
        transition: "opacity 1.2s ease",
      }}
    >
      {STRIPES.map((_, s) =>
        FULL_TEXT.split("").map((char, i) => (
          <span
            key={`${s}-${i}`}
            ref={(el) => {
              if (el) charsRef.current[s][i] = el;
            }}
            className="absolute left-0 top-0 font-satoshi text-[14px] font-bold text-[#ff9955] will-change-transform"
            style={{ opacity: 0 }}
          >
            {char === " " ? "\u00A0\u00A0" : char}
          </span>
        ))
      )}
    </div>
  );
}
