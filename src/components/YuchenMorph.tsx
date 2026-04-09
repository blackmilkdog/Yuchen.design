"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { animate } from "framer-motion";

export default function YuchenMorph() {
  const [chinese, setChinese] = useState(false);
  const [displayText, setDisplayText] = useState("Yuchen");
  const containerRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const sizerRef = useRef<HTMLSpanElement>(null);
  const animating = useRef(false);
  const queued = useRef<boolean | null>(null);

  // measure and animate width on text change
  useEffect(() => {
    const container = containerRef.current;
    const sizer = sizerRef.current;
    if (!container || !sizer) return;
    const targetWidth = sizer.offsetWidth;
    animate(container.offsetWidth, targetWidth, {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        container.style.width = `${v}px`;
      },
    });
  }, [displayText]);

  const runBlur = useCallback((toChinese: boolean) => {
    const el = textRef.current;
    if (!el) return;
    animating.current = true;
    const nextText = toChinese ? "雨晨" : "Yuchen";

    animate(0, 4, {
      duration: 0.12,
      ease: [0.4, 0, 1, 1],
      onUpdate: (v) => {
        el.style.filter = `blur(${v}px)`;
      },
      onComplete: () => {
        setDisplayText(nextText);
        animate(4, 0, {
          duration: 0.18,
          ease: [0, 0, 0.2, 1],
          onUpdate: (v) => {
            el.style.filter = `blur(${v}px)`;
          },
          onComplete: () => {
            el.style.filter = "blur(0px)";
            animating.current = false;
            // If a trigger was queued while animating, replay it
            if (queued.current !== null) {
              const next = queued.current;
              queued.current = null;
              runBlur(next);
            }
          },
        });
      },
    });
  }, []);

  const trigger = useCallback((toChinese: boolean) => {
    setChinese(toChinese);
    if (animating.current) {
      queued.current = toChinese;
      return;
    }
    runBlur(toChinese);
  }, [runBlur]);

  return (
    <span
      ref={containerRef}
      data-cursor="none"
      className="relative inline-flex cursor-pointer overflow-hidden align-baseline"
      onMouseEnter={() => trigger(true)}
      onMouseLeave={() => trigger(false)}
    >
      {/* hidden sizer to measure target width */}
      <span ref={sizerRef} className="invisible whitespace-nowrap">
        {displayText}
      </span>

      <span
        ref={textRef}
        className="absolute inset-0 bg-gradient-to-r from-accent via-[#ffb366] to-accent bg-clip-text text-transparent whitespace-nowrap"
      >
        {displayText}
      </span>
    </span>
  );
}
