"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Header() {
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

      {/* Header content */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.2 }}
        className="relative flex items-center justify-between px-6 py-5 sm:px-10 lg:px-14"
      >
        <a href="#" className="flex items-center gap-2 font-serif text-[22px] tracking-[-0.5px] text-white sm:text-[26px]">
          Yuchen Zhang
          <svg
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
          className="font-sans text-[14px] tracking-[-0.14px] text-white/60 transition-colors duration-200 hover:text-white sm:text-[15px]"
        >
          Resume
        </a>
      </motion.div>
    </header>
  );
}
