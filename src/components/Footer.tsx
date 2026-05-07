"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import FooterDog from "./FooterDog";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Footer() {
  const boneRef = useRef<HTMLDivElement>(null);
  const [boneDragging, setBoneDragging] = useState(false);
  const [boneVisible, setBoneVisible] = useState(true);
  const boneScaleRaw = useMotionValue(1);
  const boneScale = useSpring(boneScaleRaw, { stiffness: 200, damping: 20 });
  const pointerPos = useRef({ x: 0, y: 0 });
  const lastDragUpdate = useRef(0);

  // Spring-based drag position so bone trails the cursor
  const dragXRaw = useMotionValue(0);
  const dragYRaw = useMotionValue(0);
  const dragX = useSpring(dragXRaw, { stiffness: 80, damping: 14 });
  const dragY = useSpring(dragYRaw, { stiffness: 80, damping: 14 });
  const dragOrigin = useRef({ x: 0, y: 0 });


  const handleDragEnd = useCallback(() => {
    setBoneDragging(false);
    const dogEl = document.querySelector("[data-cursor='dog']");
    if (dogEl) {
      const rect = dogEl.getBoundingClientRect();
      const { x, y } = pointerPos.current;
      // Generous hit area (expand by 40px each side)
      if (
        x >= rect.left - 40 &&
        x <= rect.right + 40 &&
        y >= rect.top - 40 &&
        y <= rect.bottom + 40
      ) {
        setBoneVisible(false);
        window.dispatchEvent(new CustomEvent("dog-bone-drop"));
        setTimeout(() => setBoneVisible(true), 3000);
      }
    }
  }, []);

  return (
    <footer className="relative overflow-hidden px-8 pb-16 pt-12 lg:px-16 lg:pt-20">
      <FooterDog />
      {/* Big CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease }}
        className="relative z-10 text-center"
      >
<a
          href="mailto:yuchen666333@gmail.com"
          onMouseEnter={() => { if (!boneDragging) window.dispatchEvent(new CustomEvent("dog-eyes-scale", { detail: 0.3 })); }}
          onMouseLeave={() => { if (!boneDragging) window.dispatchEvent(new CustomEvent("dog-eyes-scale", { detail: 0 })); }}
          className="group mt-6 inline-flex items-center gap-4 font-serif text-[48px] leading-[1.2] tracking-[-1px] text-[#2A2620] md:text-[72px]"
        >
          <span>Get in Touch</span>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="translate-x-0 translate-y-0 opacity-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100 md:w-10 md:h-10"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      </motion.div>

      {/* Bottom bar */}
      <div className="relative z-10 mt-24 flex flex-col items-start gap-3">
        <div className="flex items-center gap-4">
          <a
            href="mailto:yuchen666333@gmail.com"
            className="text-[#A89E8C] transition-colors duration-200 hover:text-[#2A2620]"
            aria-label="Email"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13 2 4" />
            </svg>
          </a>
          <a
            href="https://instagram.com/yuchen_0.0_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#A89E8C] transition-colors duration-200 hover:text-[#2A2620]"
            aria-label="Instagram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/yuchenzhang333/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#A89E8C] transition-colors duration-200 hover:text-[#2A2620]"
            aria-label="LinkedIn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
        <p className="font-satoshi text-[13px] text-[#2A2620]">
          Made with &lt;3 by Yuchen :)
        </p>
      </div>

      {/* Draggable bone for the dog */}
      {boneVisible && (
        <motion.div
          ref={boneRef}
          onPointerDown={(e) => {
            e.preventDefault();
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
            const rect = boneRef.current!.getBoundingClientRect();
            dragOrigin.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
            setBoneDragging(true);
          }}
          onPointerMove={(e) => {
            if (!boneDragging) return;
            const { x, y } = { x: e.clientX, y: e.clientY };
            pointerPos.current = { x, y };
            dragXRaw.set(x - dragOrigin.current.x);
            dragYRaw.set(y - dragOrigin.current.y);
            // Throttle expensive operations (CustomEvent + querySelector) to ~30fps
            const now = performance.now();
            if (now - lastDragUpdate.current < 33) return;
            lastDragUpdate.current = now;
            const progress = Math.max(0, Math.min(1, x / window.innerWidth));
            window.dispatchEvent(new CustomEvent("dog-eyes-scale", { detail: progress }));
            const dogEl = document.querySelector("[data-cursor='dog']");
            if (dogEl) {
              const rect = dogEl.getBoundingClientRect();
              const dogCx = rect.left + rect.width / 2;
              const dogCy = rect.top + rect.height / 2;
              const dist = Math.sqrt((x - dogCx) ** 2 + (y - dogCy) ** 2);
              const maxDist = 400;
              const proximity = Math.max(0, 1 - dist / maxDist);
              boneScaleRaw.set(1 + proximity * 1.2);
            }
          }}
          onPointerUp={() => {
            window.dispatchEvent(new CustomEvent("dog-eyes-scale", { detail: 0 }));
            boneScaleRaw.set(1);
            handleDragEnd();
            setBoneDragging(false);
            dragXRaw.set(0);
            dragYRaw.set(0);
          }}
          onHoverStart={() => window.dispatchEvent(new CustomEvent("dog-eyes-scale", { detail: 0.3 }))}
          onHoverEnd={() => { if (!boneDragging) window.dispatchEvent(new CustomEvent("dog-eyes-scale", { detail: 0 })); }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ scale: boneScale, x: dragX, y: dragY }}
          data-cursor="bone"
          className="absolute bottom-4 left-8 z-20 cursor-grab select-none text-2xl active:cursor-grabbing lg:left-16"
          title="Drag me to the dog!"
        >
          <motion.span
            animate={boneDragging ? {} : { y: [0, -4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            🦴
          </motion.span>
        </motion.div>
      )}
    </footer>
  );
}
