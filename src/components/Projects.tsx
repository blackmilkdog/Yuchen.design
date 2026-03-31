"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    num: "01",
    title: "B2B Payments Suite",
    category: "Product Design / Fintech",
    description:
      "End-to-end payment infrastructure with AI-powered business health insights. Transforming raw transaction data into actionable intelligence.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    year: "2024—Now",
  },
  {
    num: "02",
    title: "AI Refund Actions",
    category: "AI / Interface Design",
    description:
      "Safe, explainable AI actions for financial operations — making complex refund workflows feel like a single confident decision.",
    image:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200&q=80",
    year: "2025",
  },
  {
    num: "03",
    title: "Execution Engine",
    category: "Productivity / Systems",
    description:
      "An execution-focused productivity tool designed for builders who ship. Structure without ceremony.",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=80",
    year: "2025",
  },
  {
    num: "04",
    title: "Dynamic Island for Two",
    category: "iOS / Companion App",
    description:
      "A Dynamic Island companion app for couples — ambient awareness through the smallest screen real estate.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80",
    year: "2025",
  },
];

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="work" className="py-32 md:py-48 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
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
            003 — Selected Work
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-5xl md:text-8xl font-light mb-24 max-w-5xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Things I&apos;ve
          <br />
          <span className="italic">built & shaped</span>
        </motion.h2>

        {/* Project list */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <motion.div
              key={project.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group border-t border-white/[0.06] py-10 md:py-14 cursor-pointer relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Number */}
                <div className="md:col-span-1">
                  <span
                    className="text-xs text-muted/40 tracking-wider"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {project.num}
                  </span>
                </div>

                {/* Title */}
                <div className="md:col-span-4">
                  <h3
                    className="text-2xl md:text-4xl font-light group-hover:text-foreground transition-colors duration-500"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {project.title}
                  </h3>
                </div>

                {/* Category */}
                <div className="md:col-span-3">
                  <span
                    className="text-sm text-muted tracking-wider"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Year */}
                <div className="md:col-span-2">
                  <span
                    className="text-sm text-muted/50 tracking-wider"
                    style={{ fontFamily: "'Bodoni Moda', serif" }}
                  >
                    {project.year}
                  </span>
                </div>

                {/* Arrow */}
                <div className="md:col-span-2 text-right">
                  <motion.span
                    animate={{
                      x: hoveredIndex === index ? 8 : 0,
                      opacity: hoveredIndex === index ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-xl inline-block"
                  >
                    →
                  </motion.span>
                </div>
              </div>

              {/* Hover image preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? 1 : 0.95,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="hidden md:block absolute right-12 top-1/2 -translate-y-1/2 w-80 aspect-video overflow-hidden pointer-events-none z-10"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  style={{ filter: "grayscale(100%) contrast(1.1)" }}
                />
              </motion.div>

              {/* Description (visible on mobile or hover) */}
              <motion.p
                initial={false}
                animate={{
                  height: hoveredIndex === index ? "auto" : 0,
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden md:col-span-12 text-sm text-muted leading-relaxed mt-4 max-w-xl"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {project.description}
              </motion.p>
            </motion.div>
          ))}

          {/* Bottom border */}
          <div className="border-t border-white/[0.06]" />
        </div>
      </div>
    </section>
  );
}
