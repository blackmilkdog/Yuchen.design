"use client";

import { motion } from "framer-motion";
import FooterDog from "./FooterDog";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden px-8 pb-16 pt-32 lg:px-16">
      <FooterDog />
      {/* Big CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease }}
        className="relative z-10 text-center"
      >
<a
          href="mailto:yuchen666333@gmail.com"
          onMouseEnter={() => window.dispatchEvent(new CustomEvent("dog-eyes-scale", { detail: true }))}
          onMouseLeave={() => window.dispatchEvent(new CustomEvent("dog-eyes-scale", { detail: false }))}
          className="group mt-6 inline-flex items-center gap-4 font-serif text-[48px] leading-[1.2] tracking-[-1px] text-white md:text-[72px]"
        >
          <span>Get in Touch</span>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="translate-x-0 translate-y-0 opacity-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100 md:w-10 md:h-10"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      </motion.div>

      {/* Bottom bar */}
      <div className="relative z-10 mt-24 flex flex-col items-start gap-3">
        <div className="flex items-center gap-4">
          <a
            href="mailto:yuchen666333@gmail.com"
            className="text-white/30 transition-colors duration-200 hover:text-white"
            aria-label="Email"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13 2 4" />
            </svg>
          </a>
          <a
            href="https://instagram.com/yuchen_0.0_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 transition-colors duration-200 hover:text-white"
            aria-label="Instagram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/yuchen-zhang"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 transition-colors duration-200 hover:text-white"
            aria-label="LinkedIn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
        <p className="font-satoshi text-[13px] text-white">
          Made with &lt;3 by Yuchen :)
        </p>
      </div>
    </footer>
  );
}
