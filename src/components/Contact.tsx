"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="py-32 md:py-48 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
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
            005 — Connect
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-5xl md:text-[8rem] leading-[0.9] font-light mb-16"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Let&apos;s build
          <br />
          <span className="italic text-stroke">something</span>
          <br />
          together
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-12 mt-20"
        >
          {[
            { label: "Email", value: "hello@yuchen.design", href: "mailto:hello@yuchen.design" },
            { label: "Twitter", value: "@yuchen", href: "#" },
            { label: "LinkedIn", value: "in/yuchen", href: "#" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group flex flex-col items-center gap-2"
            >
              <span
                className="text-[10px] tracking-[0.4em] uppercase text-muted/50"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {link.label}
              </span>
              <span
                className="text-lg tracking-wide text-muted group-hover:text-foreground transition-colors duration-500"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                {link.value}
              </span>
            </a>
          ))}
        </motion.div>

        {/* Large decorative image */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mt-32 image-reveal aspect-[16/7] overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1920&q=80"
            alt="Contact"
            className="w-full h-full object-cover"
            style={{ filter: "grayscale(100%) contrast(1.15)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
