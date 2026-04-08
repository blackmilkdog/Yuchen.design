"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface Project {
  title: string;
  description: string;
  image?: string;
  gradient?: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "Magic Diary \u00b7 AI Journaling Companion (Gamification)",
    description:
      "Designed a narrative, object-based navigation system and Lottie-powered interaction loop that turns journaling into a playful \u201cpotion-making\u201d experience.",
    image: "/images/magic-diary.png",
    link: "#",
  },
  {
    title: "AR Try-On Lens for Sustainable Fashion (200k Plays)",
    description:
      "Built a 3D-to-AR virtual try-on Lens for sustainable fashion on Snapchat, reaching 200k+ total plays/views.",
    image: "/images/ar-tryon.png",
    link: "#",
  },
  {
    title: "Interactive Data Visualization (30k+ entries)",
    description:
      "Built a web-based interactive data explorer for 30k+ material records to surface patterns and support faster comparison, filtering, and insight discovery.",
    gradient: "conic-gradient(#fff 0deg, #ffa640 180deg, #fc8f4c 360deg)",
    link: "#",
  },
  {
    title: "p5.js Experiments",
    description:
      "A curated set of interactive p5.js sketches exploring motion, data storytelling, and rapid prototyping.",
    gradient: "conic-gradient(#ffce8f 0deg, #e65c12 215.676deg, #ff1c1c 360deg)",
    link: "#",
  },
];

function PlaygroundCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  const handleCardMouse = useCallback((e: React.MouseEvent) => {
    if (!shimmerRef.current || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    shimmerRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 40%)`;
  }, []);

  const handleCardLeave = useCallback(() => {
    if (!shimmerRef.current) return;
    shimmerRef.current.style.background = "transparent";
  }, []);

  const baseDelay = index * 0.12;

  return (
    <motion.a
      ref={cardRef}
      href={project.link}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: baseDelay, ease }}
      className="group relative block aspect-[4/3] overflow-hidden rounded-[36px] border border-white/15"
      onMouseMove={handleCardMouse}
      onMouseLeave={handleCardLeave}
    >
      {/* Gradient border – appears on hover */}
      <div
        className="pointer-events-none absolute -inset-[1px] z-40 rounded-[36px] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
        style={{
          background: "linear-gradient(135deg, #f5903c, #ffb366, #f5903c, #e8662a)",
          padding: "3px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Glassmorphic shimmer glow – follows cursor */}
      <div
        ref={shimmerRef}
        className="pointer-events-none absolute inset-0 z-30 rounded-[36px] transition-[background] duration-300 ease-out"
      />

      {/* Background image / gradient */}
      <div className="absolute inset-0 transition-all duration-700 ease-out group-hover:scale-110 group-hover:blur-md">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div
            className="h-full w-full"
            style={{ background: project.gradient }}
          />
        )}
      </div>

      {/* Grain texture – visible on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 ease-out group-hover:opacity-30"
        style={{
          backgroundImage: "url('/images/grain-texture.png')",
          backgroundSize: "256px 256px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Dark overlay for default state */}
      <div className="absolute inset-0 bg-black/5 transition-all duration-500 group-hover:bg-transparent" />

      {/* Content overlay – pinned to bottom */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end p-6 sm:p-8">
        {/* Title – clip-path reveal: single smooth upward stroke */}
        <div className="overflow-hidden">
          <motion.h3
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: baseDelay + 0.15, ease: "easeOut" }}
            className="font-serif text-[28px] font-normal leading-[1.3] text-white transition-transform duration-500 ease-out group-hover:-translate-y-2 sm:text-[32px]"
          >
            {project.title}
          </motion.h3>
        </div>

        {/* Description – hidden by default, fades + slides up on card hover */}
        <p className="mt-0 max-h-0 translate-y-4 overflow-hidden font-sans text-[19px] leading-[1.6] tracking-[-0.15px] text-white opacity-0 transition-all duration-700 ease-out group-hover:mt-3 group-hover:max-h-[200px] group-hover:translate-y-0 group-hover:opacity-100">
          {project.description}
        </p>

        {/* Button – hidden by default, fades + slides up after description */}
        <div className="mt-0 max-h-0 translate-y-4 overflow-hidden opacity-0 transition-all duration-500 ease-out [transition-delay:150ms] group-hover:mt-5 group-hover:max-h-[60px] group-hover:translate-y-0 group-hover:opacity-100">
          <span data-cursor="pill" className="group/btn relative inline-flex items-center overflow-hidden rounded-full border-2 border-[#1e2a78] bg-[#1e2a78] py-[3px] pl-5 pr-[3px] transition-[border-color] duration-600 ease-out hover:border-[#ffb347]">
            {/* White ball that expands to fill, then turns orange */}
            <span className="absolute right-[3px] top-1/2 h-[32px] w-[32px] -translate-y-1/2 rounded-full bg-white transition-all duration-500 ease-out group-hover/btn:right-1/2 group-hover/btn:h-[300%] group-hover/btn:w-[300%] group-hover/btn:translate-x-1/2 group-hover/btn:bg-accent" />
            <span className="relative z-10 pr-2.5 font-sans text-[14px] font-medium text-white">
              Take a look
            </span>
            <span className="relative z-10 flex h-[32px] w-[32px] items-center justify-center">
              <span className="text-[15px] text-[#1e2a78] transition-all duration-500 ease-out group-hover/btn:rotate-[360deg] group-hover/btn:text-white">&rarr;</span>
            </span>
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function Playground() {
  const grainRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!grainRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
    grainRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  return (
    <section id="playground" className="relative z-10 px-8 py-12 sm:px-8 md:py-16 lg:px-12">
      <div
        className="relative mx-auto overflow-hidden rounded-[36px] px-10 py-20 sm:px-12 md:py-32 lg:px-16 animate-gradient-shift"
        onMouseMove={handleMouseMove}
        style={{
          background: "linear-gradient(135deg, #d44a1a, #e8662a, #f5903c, #ffb366, #f5903c, #e8662a, #c23a10, #d44a1a)",
          backgroundSize: "400% 400%",
        }}
      >
        {/* Rotating conic flare – blurred layer */}
        <div className="pointer-events-none absolute animate-flare-spin" style={{ width: "140%", height: "140%", left: "-20%", top: "-20%" }}>
          <div
            className="h-full w-full animate-flare-pulse opacity-60 blur-[80px]"
            style={{
              background: "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.35) 40deg, transparent 120deg, rgba(255,200,100,0.3) 200deg, transparent 280deg, rgba(255,255,255,0.2) 340deg, transparent 360deg)",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Rotating conic flare – sharp blend layer */}
        <div className="pointer-events-none absolute animate-flare-spin-reverse mix-blend-soft-light" style={{ width: "120%", height: "120%", left: "-10%", top: "-10%" }}>
          <div
            className="h-full w-full animate-flare-pulse-alt opacity-50 blur-[50px]"
            style={{
              background: "conic-gradient(from 180deg, transparent 0deg, rgba(255,220,150,0.4) 60deg, transparent 150deg, rgba(255,255,255,0.3) 240deg, transparent 330deg, transparent 360deg)",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Dot grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Film grain texture – follows cursor */}
        <div
          ref={grainRef}
          className="pointer-events-none absolute -inset-8 opacity-[0.35] mix-blend-overlay transition-transform duration-300 ease-out"
          style={{ backgroundImage: "url('/images/grain-texture.png')", backgroundSize: "256px 256px", backgroundRepeat: "repeat" }}
        />

        <div className="relative z-10 mx-auto max-w-[1180px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mb-12 text-center md:mb-16"
        >
          <h2 className="font-serif text-[64px] font-normal leading-[1.2] tracking-[-1px] text-white">
            Playground
          </h2>
          <p className="mx-auto mt-3 font-sans text-[20px] leading-[1.6] tracking-[-0.18px] text-white">
            Vibe Coding Projects, XR, Games, Textiles, 3D Arts, Programming Arts etc.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {projects.map((project, i) => (
            <PlaygroundCard key={project.title} project={project} index={i} />
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
