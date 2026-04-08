"use client";

import { motion } from "framer-motion";
import Starfield from "./Starfield";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-8 pt-[240px] pb-[120px] lg:px-16">
      <Starfield />


      <div className="relative z-[3] flex w-full max-w-[900px] flex-col items-center text-center lg:items-start lg:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="font-serif text-[38px] leading-[1.2] font-normal tracking-[-1px] text-accent"
        >
          Hi, I&apos;m Yuchen.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="mt-8 max-w-[900px] font-satoshi text-[26px] leading-[1.5] font-normal tracking-[-0.32px] text-white/80"
        >
          I&apos;m a Product Designer who builds clear systems and polished
          experiences, turning complexity into simple, shippable flows.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="mt-4 font-satoshi text-[20px] leading-[1.2] tracking-[-0.54px] text-white/50"
        >
          Product Designer @ CodePay &middot; NYC &middot; Open to opportunities
        </motion.p>
      </div>
    </section>
  );
}
