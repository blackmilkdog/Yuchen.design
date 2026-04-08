"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CaseStudyNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-[1200px] items-center px-8 py-4 lg:px-16">
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
          className="group flex items-center gap-2 font-mono text-[14px] tracking-[0.05em] text-gray-400 transition-colors hover:text-gray-900"
        >
          <span className="inline-block transition-transform group-hover:-translate-x-1">
            &larr;
          </span>
          Back
        </motion.a>
      </div>
    </nav>
  );
}
