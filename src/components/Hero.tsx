"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Starfield from "./Starfield";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const words = ["I build clear systems", "and polished experiences,", "turning complexity into", "simple, shippable flows."];

const floatingSkills = [
  { label: "Product Design", x: "-12%", y: "15%", delay: 0 },
  { label: "Design Systems", x: "85%", y: "8%", delay: 0.8 },
  { label: "Prototyping", x: "90%", y: "75%", delay: 1.2 },
  { label: "User Research", x: "-8%", y: "70%", delay: 0.4 },
  { label: "AI-first UX", x: "40%", y: "-8%", delay: 1.6 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse-reactive glow
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      section.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      section.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    section.addEventListener("mousemove", handleMove);
    return () => section.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-[180px] pb-[100px] sm:px-8 lg:px-16"
    >
      <Starfield />

      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div
          className="absolute -right-[20%] -top-[20%] h-[70vh] w-[70vh] animate-orb-drift-1 rounded-full opacity-[0.12] blur-[120px]"
          style={{ background: "radial-gradient(circle, #ff8c42 0%, #d44a1a 40%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-[15%] -left-[15%] h-[60vh] w-[60vh] animate-orb-drift-2 rounded-full opacity-[0.10] blur-[100px]"
          style={{ background: "radial-gradient(circle, #ffcc00 0%, #ff8c42 40%, transparent 70%)" }}
        />
        <div
          className="absolute left-[30%] top-[40%] h-[50vh] w-[50vh] animate-orb-drift-3 rounded-full opacity-[0.08] blur-[100px]"
          style={{ background: "radial-gradient(circle, #1a6a7c 0%, #0a1628 40%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-[10%] right-[10%] h-[40vh] w-[40vh] animate-orb-drift-4 rounded-full opacity-[0.10] blur-[80px]"
          style={{ background: "radial-gradient(circle, #ffb366 0%, #ff6b35 40%, transparent 70%)" }}
        />
      </div>

      {/* Cursor glow */}
      <div
        className="pointer-events-none absolute z-[2] h-[400px] w-[400px] rounded-full opacity-[0.06] blur-[80px] transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle, #ff8c42, transparent 70%)",
          left: "var(--mx, 50%)",
          top: "var(--my, 50%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-[3] flex w-full max-w-[1200px] flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
        {/* Left — text */}
        <div className="flex max-w-[650px] flex-col items-center text-center lg:items-start lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-mono text-[13px] uppercase tracking-[0.2em] text-accent/80 sm:text-[14px]"
          >
            Product Designer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="mt-6 font-serif text-[42px] leading-[1.15] font-normal tracking-[-1.5px] text-white sm:text-[56px] lg:text-[68px]"
          >
            Hi, I&apos;m{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-accent via-[#ffb366] to-accent bg-clip-text text-transparent">
                Yuchen
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease }}
                className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-accent to-[#ffb366]"
              />
            </span>
            .
          </motion.h1>

          {/* Word-by-word reveal */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-[0.35em] gap-y-1 lg:justify-start">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.12, ease }}
                className="font-satoshi text-[20px] leading-[1.6] tracking-[-0.3px] text-white/70 sm:text-[24px] lg:text-[28px]"
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0, ease }}
            className="mt-6 font-satoshi text-[16px] leading-[1.4] tracking-[-0.3px] text-white/40 sm:text-[18px]"
          >
            @ CodePay &middot; NYC &middot; Open to opportunities
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease }}
            className="mt-10 flex items-center gap-4"
          >
            <a
              href="#works"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-3 font-satoshi text-[15px] font-medium text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,140,66,0.3)]"
            >
              View Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-y-0.5">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
            <a
              href="mailto:yuchen666333@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-satoshi text-[15px] text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:text-white"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Right — portrait with aurora halo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease }}
          className="relative hidden lg:block"
        >
          {/* Warm gradient glow rings */}
          <div className="absolute -inset-12 animate-aurora-spin rounded-full opacity-50 blur-[60px]" style={{
            background: "conic-gradient(from 0deg, #ffcc00 0deg, #ff8c42 90deg, #e63b2e 180deg, #ff6b35 270deg, #ffcc00 360deg)",
          }} />
          <div className="absolute -inset-8 animate-aurora-spin-reverse rounded-full opacity-30 blur-[40px]" style={{
            background: "conic-gradient(from 180deg, #ff4500 0deg, #ffb366 90deg, #ffcc00 180deg, #e63b2e 270deg, #ff4500 360deg)",
          }} />

          {/* Portrait */}
          <div className="relative h-[380px] w-[380px] overflow-hidden rounded-full border-2 border-white/10 xl:h-[420px] xl:w-[420px]">
            <Image
              src="/images/portrait.jpg"
              alt="Yuchen Zhang"
              fill
              className="object-cover"
              sizes="420px"
              priority
            />
          </div>

          {/* Floating skill pills */}
          {floatingSkills.map((skill, i) => (
            <motion.span
              key={skill.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.0 + skill.delay, ease }}
              className="animate-float-pill absolute z-10 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-satoshi text-[12px] tracking-[-0.1px] text-white/60 backdrop-blur-md"
              style={{
                left: skill.x,
                top: skill.y,
                animationDelay: `${i * 0.8}s`,
              }}
            >
              {skill.label}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 z-[3] -translate-x-1/2"
      >
        <a href="#works" className="flex flex-col items-center gap-2">
          <span className="font-satoshi text-[11px] uppercase tracking-[0.15em] text-white/25">
            Scroll
          </span>
          <div className="flex h-8 w-5 items-start justify-center rounded-full border border-white/15 p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-white/40"
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
}
