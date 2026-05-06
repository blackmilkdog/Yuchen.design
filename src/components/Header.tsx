"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, animate } from "framer-motion";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Header() {
  const [displayName, setDisplayName] = useState("Yuchen Zhang");
  const nameRef = useRef<HTMLSpanElement>(null);
  const starRef = useRef<SVGSVGElement>(null);
  const animatingRef = useRef(false);
  const queuedRef = useRef<boolean | null>(null);

  const runBlur = useCallback((toChinese: boolean) => {
    const nameEl = nameRef.current;
    const starEl = starRef.current;
    if (!nameEl || !starEl) return;
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

    // Lerp star closer / back
    const targetX = toChinese ? 4 : 0;
    animate(toChinese ? 0 : 4, targetX, {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        starEl.style.transform = `translateX(${v}px)`;
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
      {/* Top-to-bottom drop shadow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[150px]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, transparent 100%)",
        }}
      />

      {/* Header content — constrained to the same 1200px frame as the rest of the page */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.2 }}
        className="relative mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5 sm:px-8 lg:px-16"
      >
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex items-center gap-2 font-serif text-[22px] tracking-[-0.5px] text-white sm:text-[26px]">
          <span ref={nameRef}>{displayName}</span>
          <svg
            ref={starRef}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <path
              d="M8 0L9.69 6.31L16 8L9.69 9.69L8 16L6.31 9.69L0 8L6.31 6.31L8 0Z"
              fill="currentColor"
            />
          </svg>
        </a>

        <a
          href="https://drive.google.com/file/d/1gWz4HvOsHAi1Yj_CGT_X247A5x4kLIcH/view"
          target="_blank"
          rel="noopener noreferrer"
          className="font-serif text-[22px] tracking-[-0.5px] text-white/60 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-white sm:text-[26px]"
        >
          Resume
        </a>
      </motion.div>
    </header>
  );
}
