"use client";

import React from "react";
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
    title: "Magic Diary · AI Journaling Companion",
    description:
      "Narrative, object-based navigation with a Lottie-powered interaction loop that turns journaling into a playful “potion-making” experience.",
    image: "/images/magic-diary.svg",
    link: "https://drive.google.com/file/d/1QrfPZEc8KEO4N3ytfHBGYmvJohhwtbCb/view?usp=sharing",
  },
  {
    title: "AR Try-On Lens for Sustainable Fashion",
    description:
      "A 3D-to-AR virtual try-on Lens for sustainable fashion on Snapchat — 200k+ plays / views.",
    image: "/images/ar-tryon.svg",
    link: "https://creator.snapchat.com/creator/67D-fbK5xxmfPrKV5idmPA",
  },
  {
    title: "Interactive Data Visualization",
    description:
      "A web-based explorer for 30k+ material records — surfaces patterns, supports fast comparison and filtering.",
    image: "/images/data-viz.svg",
    link: "https://public.flourish.studio/visualisation/6037305/",
  },
  {
    title: "p5.js Experiments",
    description:
      "A curated set of interactive p5.js sketches exploring motion, data storytelling, and rapid prototyping.",
    image: "/images/p5js.svg",
    link: "https://editor.p5js.org/Yochen/sketches",
  },
];

// Deterministic tilt angles for the polaroid wall — gives each card a natural lean
const tiltAngles = [-2.5, 3, -3, 2, -2, 3.5, -3.5, 2.5];

const PolaroidCard = React.memo(function PolaroidCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const tilt = tiltAngles[index % tiltAngles.length];

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="arrow"
      initial={{ opacity: 0, y: 24, rotate: tilt }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease }}
      whileHover={{
        rotate: 0,
        y: -8,
        scale: 1.025,
        transition: { duration: 0.4, ease },
      }}
      className="group relative block bg-white p-3 pb-2 no-underline shadow-[0_4px_16px_-6px_rgba(60,40,20,0.18)] transition-shadow duration-500 ease-out hover:shadow-[0_18px_40px_-10px_rgba(60,40,20,0.22)]"
      style={{ transformOrigin: "center" }}
    >
      {/* Image area — square */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            className="h-full w-full"
            style={{ background: project.gradient }}
          />
        )}
      </div>

      {/* Caption — natural flow, polaroid bottom area */}
      <div className="px-0.5 pt-3 pb-1">
        <h3 className="font-serif text-[14px] leading-[1.25] text-gray-900 transition-colors duration-300 group-hover:text-[#c25430]">
          {project.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 font-sans text-[11px] leading-[1.5] text-gray-500">
          {project.description}
        </p>
      </div>
    </motion.a>
  );
});

export default function Playground() {
  return (
    <section
      id="playground"
      className="relative px-6 py-24 sm:px-8 md:py-32 lg:px-16"
      style={{ background: "#F9F7F3" }}
    >
      {/* Subtle paper grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "url('/images/grain-texture.png')",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Soft warm orb — top right, very faint */}
      <div
        className="pointer-events-none absolute -right-32 top-12 h-[400px] w-[400px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, #F5B98A, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mb-16 max-w-[680px]"
        >
          <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.18em] text-[#c25430]">
            Playground
          </p>
          <h2 className="font-serif text-[36px] font-normal leading-[1.1] tracking-[-0.6px] text-gray-900 lg:text-[44px]">
            Side projects, experiments,
            <br />
            and things I made for fun.
          </h2>
          <p className="mt-5 font-sans text-[15px] leading-[1.7] text-gray-500 lg:text-[16px]">
            Vibe-coded prototypes, XR, games, textiles, 3D arts, programming arts.
            More on the way — this corner grows.
          </p>
        </motion.div>

        {/* Polaroid wall — 2/3/4 cols, generous gap so tilted cards breathe */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 md:gap-y-12 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
          {projects.map((project, i) => (
            <PolaroidCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
