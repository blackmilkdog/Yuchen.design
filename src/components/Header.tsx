"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, animate } from "framer-motion";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Header() {
  const [displayName, setDisplayName] = useState("Yuchen Zhang");
  const nameRef = useRef<HTMLSpanElement>(null);
  const animatingRef = useRef(false);
  const queuedRef = useRef<boolean | null>(null);

  const runBlur = useCallback((toChinese: boolean) => {
    const nameEl = nameRef.current;
    if (!nameEl) return;
    animatingRef.current = true;
    const nextName = toChinese ? "张雨晨" : "Yuchen Zhang";

    // Blur-in phase
    animate(0, 4, {
      duration: 0.12,
      ease: [0.4, 0, 1, 1],
      onUpdate: (v) => {
        nameEl.style.filter = `blur(${v}px)`;
      },
      onComplete: () => {
        setDisplayName(nextName);
        // Blur-out phase
        animate(4, 0, {
          duration: 0.18,
          ease: [0, 0, 0.2, 1],
          onUpdate: (v) => {
            nameEl.style.filter = `blur(${v}px)`;
          },
          onComplete: () => {
            nameEl.style.filter = "blur(0px)";
            animatingRef.current = false;
            if (queuedRef.current !== null) {
              const next = queuedRef.current;
              queuedRef.current = null;
              runBlur(next);
            }
          },
        });
      },
    });
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const { chinese } = (e as CustomEvent).detail;
      if (animatingRef.current) {
        queuedRef.current = chinese;
        return;
      }
      runBlur(chinese);
    };
    window.addEventListener("yuchen-hover", handler);
    return () => window.removeEventListener("yuchen-hover", handler);
  }, [runBlur]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Soft cream fade at top — keeps header readable as content scrolls under it */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[120px]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(241,236,224,0.92) 0%, rgba(241,236,224,0.6) 50%, transparent 100%)",
        }}
      />

      {/* Header content — sits across the viewport with a snug edge padding (no 1200 frame).
          Items hug the left/right edges so the header reads as a navbar, not a centered chip. */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.2 }}
        className="relative flex w-full items-center justify-between px-6 py-5 sm:px-8 lg:px-12"
      >
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex items-center font-serif text-[22px] tracking-[-0.5px] text-[#2A2620] sm:text-[26px]">
          <span ref={nameRef}>{displayName}</span>
        </a>

        <a
          href="https://drive.google.com/file/d/1gWz4HvOsHAi1Yj_CGT_X247A5x4kLIcH/view"
          target="_blank"
          rel="noopener noreferrer"
          className="font-serif text-[22px] tracking-[-0.5px] text-[#6B6358] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-[#C25430] sm:text-[26px]"
        >
          Resume
        </a>
      </motion.div>
    </header>
  );
}
