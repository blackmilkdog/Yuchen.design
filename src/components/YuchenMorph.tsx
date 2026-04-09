"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function YuchenMorph() {
  const [chinese, setChinese] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = useCallback(() => setChinese(true), []);
  const handleMouseLeave = useCallback(() => setChinese(false), []);

  return (
    <span
      ref={containerRef}
      data-cursor="underline"
      className="relative inline-block cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="invisible">{chinese ? "雨晨" : "Yuchen"}</span>

      <AnimatePresence mode="wait">
        {!chinese ? (
          <motion.span
            key="english"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.15, ease }}
            className="absolute inset-0 bg-gradient-to-r from-accent via-[#ffb366] to-accent bg-clip-text text-transparent"
          >
            Yuchen
          </motion.span>
        ) : (
          <motion.span
            key="chinese"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.15, ease }}
            className="absolute inset-0 bg-gradient-to-r from-accent via-[#ffb366] to-accent bg-clip-text text-transparent"
          >
            雨晨
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
