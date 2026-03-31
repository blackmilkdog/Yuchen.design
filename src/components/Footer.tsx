"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.3em] text-muted/40"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          &copy; {new Date().getFullYear()} Yuchen Zhang
        </motion.span>

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.3em] text-muted/40"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Designed with intention
        </motion.span>
      </div>
    </footer>
  );
}
