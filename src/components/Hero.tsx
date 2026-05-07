"use client";

import { motion } from "framer-motion";
import YuchenMorph from "./YuchenMorph";
import HeroDecoration from "./HeroDecoration";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const words = [
  "I build clear systems",
  "and polished experiences,",
  "turning complexity into",
  "simple, shippable flows.",
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-[180px] pb-[140px] sm:px-8 lg:px-16">
      {/* Subtle paper grain — adds tactile feel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "url('/images/grain-texture.png')",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Warm sun bleeding through paper, upper right (full-bleed glow) */}
      <div
        className="pointer-events-none absolute -right-40 -top-20 h-[640px] w-[640px] rounded-full opacity-50 blur-[140px]"
        style={{
          background: "radial-gradient(circle, #F2C087 0%, #F4D9B8 30%, transparent 70%)",
        }}
      />

      {/* Soft secondary glow, lower left */}
      <div
        className="pointer-events-none absolute -left-32 bottom-12 h-[420px] w-[420px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, #E8C599, transparent 70%)" }}
      />

      {/* Inner 1200px frame — all aligned content lives in here */}
      <div className="relative z-[7] mx-auto w-full max-w-[1200px]">
        {/* Washi-tape strip, upper-left of the 1200 frame */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.85, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="absolute -top-8 -left-2 z-[5] h-[26px] w-[180px] origin-left -rotate-[6deg]"
          style={{
            background:
              "repeating-linear-gradient(45deg, rgba(232,197,153,0.85) 0px, rgba(232,197,153,0.85) 4px, rgba(220,181,135,0.85) 4px, rgba(220,181,135,0.85) 8px)",
            boxShadow: "0 1px 4px rgba(60,40,20,0.12)",
          }}
        />

        {/* Volume tag, upper-right of the 1200 frame */}
        <motion.div
          initial={{ opacity: 0, y: -10, rotate: 6 }}
          animate={{ opacity: 1, y: 0, rotate: 3 }}
          transition={{ duration: 0.7, delay: 0.55, ease }}
          className="absolute -top-12 right-0 z-[6] hidden sm:block"
        >
          <div className="border border-[#A89E8C]/35 bg-[#FAF6EB] px-3 py-2 shadow-[0_3px_10px_-4px_rgba(60,40,20,0.18)]">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C25430]">
              vol. 01
            </p>
            <p className="mt-0.5 font-mono text-[10px] tracking-[0.05em] text-[#A89E8C]">
              2026
            </p>
          </div>
        </motion.div>

        {/* Right-side journal decoration — sun + threads + paper swallows + leaf */}
        <HeroDecoration />

        {/* Main text content — left-aligned within the 1200 frame */}
        <div className="flex max-w-[760px] flex-col items-start text-left">
          {/* Eyebrow with terra cotta star */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease }}
            className="flex items-center gap-2"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 0L9.69 6.31L16 8L9.69 9.69L8 16L6.31 9.69L0 8L6.31 6.31L8 0Z"
                fill="#C25430"
              />
            </svg>
            <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#C25430]">
              Product Designer
            </p>
          </motion.div>

          {/* Title with name morph */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease }}
            className="mt-5 font-serif text-[52px] font-normal leading-[1.05] tracking-[-1.8px] text-[#2A2620] sm:text-[68px] lg:text-[88px]"
          >
            Hi, I&apos;m <YuchenMorph />.
          </motion.h1>

          {/* Subtitle — word-by-word reveal */}
          <div className="mt-9 flex flex-wrap gap-x-[0.35em] gap-y-1">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 1.1 + i * 0.1, ease }}
                className="font-sans text-[18px] leading-[1.6] tracking-[-0.2px] text-[#6B6358] sm:text-[22px] lg:text-[24px]"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Mono caption */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.7, ease }}
            className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-[#A89E8C]"
          >
            @ CodePay &nbsp;·&nbsp; NYC
          </motion.p>

          {/* Thin horizontal rule */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.85, ease }}
            className="mt-10 h-px w-full max-w-[420px] origin-left bg-[#A89E8C]/30"
          />

          {/* CTA — terra cotta sticker button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0, ease }}
            className="mt-10 flex items-center gap-6"
          >
            <button
              onClick={() => {
                const worksSection = document.getElementById("works");
                if (worksSection) {
                  worksSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#C25430] px-7 py-3.5 font-sans text-[15px] font-medium text-[#FAF6EB] shadow-[0_4px_16px_-4px_rgba(194,84,48,0.5)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(194,84,48,0.6)]"
            >
              View Work
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </button>

            <a
              href="#works"
              className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-[#6B6358] transition-colors duration-300 hover:text-[#C25430]"
            >
              <span className="h-px w-6 bg-[#A89E8C]/40 transition-all duration-300 group-hover:w-10 group-hover:bg-[#C25430]/60" />
              the work
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — anchored to viewport bottom-center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.4 }}
        className="absolute bottom-8 left-1/2 z-[11] -translate-x-1/2"
      >
        <a href="#works" className="flex flex-col items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#A89E8C]">
            Scroll
          </span>
          <div className="flex h-8 w-5 items-start justify-center rounded-full border border-[#A89E8C]/40 p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-[#C25430]/70"
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
}
