"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const beliefs = [
  "Great products feel inevitable.",
  "Data should illuminate, never overwhelm.",
  "AI earns trust through transparency.",
  "Simplicity is the ultimate sophistication.",
  "Ship, learn, iterate.",
];

export default function Philosophy() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={ref} className="py-32 md:py-48 overflow-hidden">
      {/* Large parallax text */}
      <motion.div style={{ x }} className="mb-32">
        <h2
          className="text-[clamp(4rem,15vw,14rem)] leading-[0.85] font-light whitespace-nowrap text-foreground/[0.03]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Design is how it works — Design is how it works —
        </h2>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span
            className="text-xs tracking-[0.5em] uppercase text-muted"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            004 — Principles
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="image-reveal aspect-square"
          >
            <img
              src="https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&q=80"
              alt="Philosophy"
              className="w-full h-full object-cover"
              style={{ filter: "grayscale(100%) contrast(1.2)" }}
            />
          </motion.div>

          {/* Beliefs */}
          <div className="flex flex-col justify-center">
            {beliefs.map((belief, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="border-b border-white/[0.06] py-8 first:border-t"
              >
                <span
                  className="text-2xl md:text-3xl font-light leading-snug"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {belief}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
