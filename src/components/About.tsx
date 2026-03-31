"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="about" ref={ref} className="py-32 md:py-48 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
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
            001 — About
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Image column */}
          <motion.div
            className="md:col-span-5 image-reveal"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <motion.div className="overflow-hidden aspect-[3/4]" style={{ y: imgY }}>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                alt="Portrait"
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(100%) contrast(1.1)" }}
              />
            </motion.div>
          </motion.div>

          {/* Text column */}
          <div className="md:col-span-6 md:col-start-7 flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl leading-[1.1] mb-10 font-light"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Designing at the
              <br />
              <span className="italic">edge of clarity</span>
              <br />& complexity
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6 text-lg leading-relaxed text-muted"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <p>
                I&apos;m Yuchen — a founding designer and product manager building
                at the intersection of fintech, AI, and human-centered design.
                Currently shaping a B2B payments suite that transforms raw
                transaction data into clear business health insights.
              </p>
              <p>
                I believe the best products feel inevitable — as if they
                couldn&apos;t have been designed any other way. My work lives in
                that tension between sophisticated systems and effortless
                interfaces.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-12 grid grid-cols-2 gap-8"
            >
              {[
                { label: "Focus", value: "Product & Design" },
                { label: "Based in", value: "Building Everywhere" },
                { label: "Currently", value: "Fintech Startup" },
                { label: "Side Projects", value: "3 Active" },
              ].map((item) => (
                <div key={item.label}>
                  <span
                    className="text-[10px] tracking-[0.3em] uppercase text-muted/50 block mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-sm tracking-wide"
                    style={{ fontFamily: "'Bodoni Moda', serif" }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
