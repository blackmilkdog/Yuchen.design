"use client";

import { motion } from "framer-motion";

const words = [
  "Product Design",
  "Fintech",
  "AI-First",
  "B2B Payments",
  "Data Visualization",
  "Interaction Design",
  "Productivity",
  "Systems Thinking",
  "Typography",
  "User Research",
];

export default function Marquee() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="py-12 border-y border-white/[0.06] overflow-hidden"
    >
      <div className="marquee-track flex items-center gap-8 whitespace-nowrap w-max">
        {[...words, ...words].map((word, i) => (
          <span key={i} className="flex items-center gap-8">
            <span
              className="text-lg md:text-xl tracking-[0.15em] uppercase text-muted/60"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              {word}
            </span>
            <span className="text-muted/20">✦</span>
          </span>
        ))}
      </div>
    </motion.section>
  );
}
