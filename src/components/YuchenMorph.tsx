"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";

export default function YuchenMorph() {
  const [chinese, setChinese] = useState(false);
  const [displayText, setDisplayText] = useState("Yuchen");
  const [blurKey, setBlurKey] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);

  const trigger = useCallback(
    (toChinese: boolean) => {
      setChinese(toChinese);
      // kick a new blur→deblur cycle
      setBlurKey((k) => k + 1);
      // swap text halfway through the blur
      setTimeout(() => {
        setDisplayText(toChinese ? "雨晨" : "Yuchen");
      }, 80);
    },
    []
  );

  return (
    <span
      ref={containerRef}
      data-cursor="underline"
      className="relative inline-block cursor-pointer"
      onMouseEnter={() => trigger(true)}
      onMouseLeave={() => trigger(false)}
    >
      <span className="invisible">{chinese ? "雨晨" : "Yuchen"}</span>

      <motion.span
        key={blurKey}
        initial={{ filter: "blur(10px)" }}
        animate={{ filter: "blur(0px)" }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-gradient-to-r from-accent via-[#ffb366] to-accent bg-clip-text text-transparent"
      >
        {displayText}
      </motion.span>
    </span>
  );
}
