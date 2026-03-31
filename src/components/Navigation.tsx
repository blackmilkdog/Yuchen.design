"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);

    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          <a
            href="#"
            className="text-sm tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            Yuchen Zhang
          </a>

          <div className="hidden md:flex items-center gap-12">
            {["Work", "About", "Gallery", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs tracking-[0.25em] uppercase text-muted hover:text-foreground transition-colors duration-500"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {item}
              </a>
            ))}
          </div>

          <span
            className="text-xs tracking-[0.2em] text-muted tabular-nums"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {time}
          </span>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
}
