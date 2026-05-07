"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import TransitionLink from "./TransitionLink";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Project {
  company: string;
  title: string;
  date: string;
  image: string;
  description: string;
  tags: string[];
  link: string;
  tagGradient: string;
}

const tagIcons: Record<string, React.ReactNode> = {
  // CodePay Go (0→1 + AI Vision)
  "0→1 Product Definition": <><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></>,
  "AI-first Prototyping": <><path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5V11h-4V9.5A4 4 0 0 1 12 2z" /><path d="M10 11h4v2h-4z" /><path d="M9 15h6" /><path d="M10 18h4" /></>,
  "PM Decision-making": <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
  "Data Truth as Product Surface": <><path d="M3 3v18h18" /><path d="M7 14l4-4 4 4 5-5" /></>,
  "Trust-aware AI Design": <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></>,
  // CodePay (existing product redesign)
  "Design Systems at Scale": <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />,
  "High-Trust UX (Risk & Clarity)": <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  "Workflow Simplification": <><path d="M4 12h16" /><path d="M4 6h16" /><path d="M4 18h10" /><path d="M17 15l3 3-3 3" /></>,
  "Feedback-to-Release Loop": <><path d="M21 12a9 9 0 1 1-6.2-8.6" /><path d="M21 3v6h-6" /></>,
  "AI-assisted Prototyping": <><path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5V11h-4V9.5A4 4 0 0 1 12 2z" /><path d="M10 11h4v2h-4z" /><path d="M9 15h6" /><path d="M10 18h4" /></>,
  // BonCamel
  "0→1 Feature Design": <><path d="M12 5l7 14H5z" /></>,
  "User Research + Usability Testing": <><circle cx="12" cy="8" r="4" /><path d="M6 20v-2a6 6 0 0 1 12 0v2" /></>,
  "Conversion Optimization": <><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></>,
  "Hi-Fi Prototyping": <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></>,
  "Interaction Design": <><path d="M15 15l-2 5L9 9l11 4-5 2z" /><path d="M18.5 18.5L22 22" /></>,
  // DiDi
  "Safety-Critical UX": <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><circle cx="12" cy="17" r="0.5" fill="currentColor" /></>,
  "Dispatch Ops Workflows": <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M9 15l2 2 4-4" /></>,
  "Simulation / Validation": <><circle cx="12" cy="12" r="10" /><path d="M10 8l6 4-6 4V8z" /></>,
  "Edge-Case Design": <><path d="M2 12h4" /><path d="M18 12h4" /><path d="M12 2v4" /><path d="M12 18v4" /><circle cx="12" cy="12" r="4" /></>,
  "Prototype → Ship": <><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></>,
  // Philly Truce
  "Information Architecture": <><path d="M3 3h7v7H3zM14 3h7v4h-7zM14 10h7v4h-7zM3 13h7v8H3zM14 17h7v4h-7z" /></>,
  "Hierarchy & Progressive Disclosure": <><path d="M6 9l6 6 6-6" /></>,
  "Scope & Prioritization": <><path d="M4 6h16M4 10h12M4 14h8M4 18h4" /></>,
  "Cross-functional Collaboration": <><circle cx="9" cy="7" r="3" /><circle cx="15" cy="7" r="3" /><path d="M3 19v-2a4 4 0 0 1 4-4h2" /><path d="M15 13h2a4 4 0 0 1 4 4v2" /></>,
};

const projects: Project[] = [
  {
    company: "CodePay Go / Fintech Startup",
    title: "0-to-1 Mobile Product + AI Vision",
    date: "July 2025 - Present",
    image: "/images/codepay.png",
    description:
      "Sole PM and founding designer for CodePay Go — took a mobile merchant intelligence app from concept to launch (3× user growth, 85% engaged session rate). Then designed AI as a trust-preserving layer for the payment stack, aligning CEO + investors with interactive prototypes and a Draft→Review→Confirm→Audit guardrail model.",
    tags: [
      "0→1 Product Definition",
      "AI-first Prototyping",
      "PM Decision-making",
      "Data Truth as Product Surface",
      "Trust-aware AI Design",
    ],
    tagGradient: "linear-gradient(135deg, #F4E4C1, #FAF6EB)",
    link: "/codepay-go",
  },
  {
    company: "CodePay / Fintech Startup",
    title: "B2B Payment Platform Redesign",
    date: "July 2025 - Present",
    image: "/images/codepay.png",
    description:
      "Founding designer across CodePay’s B2B payments suite (in-person solution + ops platform). Built a cross-product design system, ran risk-ranked patches from real partner feedback, and led the v3.0 Register UI/UX rebuild for 7,000+ active terminals.",
    tags: [
      "Design Systems at Scale",
      "High-Trust UX (Risk & Clarity)",
      "Workflow Simplification",
      "Feedback-to-Release Loop",
      "AI-assisted Prototyping",
    ],
    tagGradient: "linear-gradient(135deg, #D8E2EE, #FAF6EB)",
    link: "/codepay",
  },
  {
    company: "BonCamel / E-Commerce Startup",
    title: "Chat-based AI Agent",
    date: "March 2024 - May 2024",
    image: "/images/boncamel.png",
    description:
      "Defined the end-to-end AI shopping flow (intent capture → recommendations → shortlist → checkout) and iterated through usability testing and A/B validation to improve purchase intent.",
    tags: [
      "0→1 Feature Design",
      "User Research + Usability Testing",
      "Conversion Optimization",
      "Hi-Fi Prototyping",
      "Interaction Design",
    ],
    tagGradient: "linear-gradient(135deg, #F0DDD8, #FAF6EB)",
    link: "/novibox",
  },
  {
    company: "DiDi / Mobility Platform",
    title: "Autonomous Trucking",
    date: "May 2024 - July 2024",
    image: "/images/phillytruce.png",
    description:
      "Designed fleet ops + HMI interactions for autonomous trucking — mapping dispatch-to-execution workflows and defining risk-aware UI patterns for safety-critical scenarios. Built prototypes and simulations to validate faster, and shipped iterative improvements with engineering in a tight build–test loop.",
    tags: [
      "Safety-Critical UX",
      "Dispatch Ops Workflows",
      "Simulation / Validation",
      "Edge-Case Design",
      "Prototype → Ship",
    ],
    tagGradient: "linear-gradient(135deg, #DDE5DC, #FAF6EB)",
    link: "/didi",
  },
  {
    company: "Philly Truce / Community Safety NGO",
    title: "Case Response Platform",
    date: "November 2023 - January 2024",
    image: "/images/didi.png",
    description:
      "Designed a high-trust case response platform for rapid incident intake and triage — turning SMS reports into trackable cases with status, ownership, and resolution workflows.",
    tags: [
      "Information Architecture",
      "Hierarchy & Progressive Disclosure",
      "0→1 Product Definition",
      "Scope & Prioritization",
      "Cross-functional Collaboration",
    ],
    tagGradient: "linear-gradient(135deg, #E5D8C8, #FAF6EB)",
    link: "#",
  },
];

function Perspective3DImage({ src, alt, imageFirst }: { src: string; alt: string; imageFirst: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], imageFirst ? [-6, 3, 6] : [6, -3, -6]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], imageFirst ? [3, -1.5, -3] : [-3, 1.5, 3]);

  return (
    <div ref={ref} className="relative">
      {/* Crop marks — incomplete frame, 4 corner L-shapes (don't rotate with image) */}
      <span className="pointer-events-none absolute -left-2 -top-2 z-[5] h-5 w-5 border-l border-t border-[#A89E8C]/55" />
      <span className="pointer-events-none absolute -right-2 -top-2 z-[5] h-5 w-5 border-r border-t border-[#A89E8C]/55" />
      <span className="pointer-events-none absolute -bottom-2 -left-2 z-[5] h-5 w-5 border-b border-l border-[#A89E8C]/55" />
      <span className="pointer-events-none absolute -bottom-2 -right-2 z-[5] h-5 w-5 border-b border-r border-[#A89E8C]/55" />

      {/* Image — sharp corners, journal-page feel */}
      <motion.div
        style={{ rotateY, rotate, perspective: 800 }}
        className="overflow-hidden"
      >
        <div className="relative aspect-[3/2] w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 660px"
          />
        </div>
      </motion.div>
    </div>
  );
}

function ParallaxTags({ tags, imageFirst }: { tags: string[]; imageFirst: boolean; gradient?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], imageFirst ? [6, -3, -6] : [-6, 3, 6]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], imageFirst ? [-3, 1.5, 3] : [3, -1.5, -3]);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        rotateY,
        rotate,
        perspective: 800,
        WebkitMask: `radial-gradient(circle 5px at 50% 0, transparent 99%, #000 100%) 0 0/14px 100% repeat-x, radial-gradient(circle 5px at 50% 100%, transparent 99%, #000 100%) 0 0/14px 100% repeat-x, radial-gradient(circle 5px at 0 50%, transparent 99%, #000 100%) 0 0/100% 14px repeat-y, radial-gradient(circle 5px at 100% 50%, transparent 99%, #000 100%) 0 0/100% 14px repeat-y`,
        WebkitMaskComposite: "source-in",
        mask: `radial-gradient(circle 5px at 50% 0, transparent 99%, #000 100%) 0 0/14px 100% repeat-x, radial-gradient(circle 5px at 50% 100%, transparent 99%, #000 100%) 0 0/14px 100% repeat-x, radial-gradient(circle 5px at 0 50%, transparent 99%, #000 100%) 0 0/100% 14px repeat-y, radial-gradient(circle 5px at 100% 50%, transparent 99%, #000 100%) 0 0/100% 14px repeat-y`,
        maskComposite: "intersect",
        filter: "drop-shadow(0 14px 24px rgba(60,40,20,0.28))",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3, ease }}
      className={`absolute bottom-0 z-20 flex translate-y-[28%] flex-col gap-2.5 bg-white px-6 py-5 sm:px-7 sm:py-6 ${
        imageFirst ? "right-0 translate-x-[20%]" : "left-0 -translate-x-[20%]"
      }`}
    >
      {tags.map((tag, idx) => (
        <motion.span
          key={tag}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 + idx * 0.06, ease }}
          className="flex items-center gap-2 whitespace-nowrap font-satoshi text-[12px] tracking-[-0.1px] text-black sm:text-[13px]"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-black/50">
            {tagIcons[tag]}
          </svg>
          {tag}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default function Works() {
  // Per-project washi tape + stamp colors aligned to each image's dominant color
  // (blue codepay → blue tape, purple boncamel → purple tape, green kargobot → sage tape, etc.)
  const projectAccents = [
    // CodePay Go — blue dashboard image
    { tape1: "rgba(180,200,222,0.85)", tape2: "rgba(160,182,208,0.85)", stamp: "#5B7BA8" },
    // CodePay — same blue image
    { tape1: "rgba(180,200,222,0.85)", tape2: "rgba(160,182,208,0.85)", stamp: "#5B7BA8" },
    // BonCamel — purple/violet NOVI BOX image
    { tape1: "rgba(196,178,222,0.85)", tape2: "rgba(178,160,210,0.85)", stamp: "#7B5BA8" },
    // DiDi — green kargobot truck image
    { tape1: "rgba(180,210,180,0.85)", tape2: "rgba(160,196,160,0.85)", stamp: "#5B8B5F" },
    // Philly Truce — blue mobile app
    { tape1: "rgba(186,206,228,0.85)", tape2: "rgba(168,190,216,0.85)", stamp: "#6580AC" },
  ];

  return (
    <section id="works" className="px-6 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[1200px] pt-20 pb-44">
        {/* Section header — journal entry mark */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mb-20"
        >
          <p className="mb-4 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.22em] text-[#C25430]">
            <span className="h-px w-10 bg-[#C25430]/50" />
            From My Desk
          </p>
          <h2 className="font-serif text-[64px] font-normal leading-[1.0] tracking-[-1.8px] text-[#2A2620] lg:text-[88px]">
            Works
          </h2>
        </motion.div>

        <div className="flex flex-col gap-24 lg:gap-32">
          {projects.map((project, i) => {
            const imageFirst = i % 2 === 0;
            const isInternal = project.link.startsWith("/");
            const projectNum = String(i + 1).padStart(2, "0");
            const accent = projectAccents[i % projectAccents.length];

            const cardContent = (
              <div className={`flex flex-col lg:flex-row lg:items-center lg:gap-16 ${imageFirst ? "" : "lg:flex-row-reverse"}`}>
                {/* Image side — image, washi tape, project stamp, and floating tag panel */}
                <div className="relative lg:w-[55%] lg:flex-shrink-0" style={{ perspective: 800 }}>
                  <Perspective3DImage src={project.image} alt={project.title} imageFirst={imageFirst} />

                  {/* Washi tape on top of image, varies side per project for rhythm */}
                  <div
                    className="absolute -top-3 z-30 h-[24px] w-[110px] shadow-[0_2px_4px_rgba(60,40,20,0.12)]"
                    style={{
                      left: imageFirst ? "44px" : "auto",
                      right: imageFirst ? "auto" : "44px",
                      transform: imageFirst ? "rotate(-4deg)" : "rotate(4deg)",
                      background: `repeating-linear-gradient(45deg, ${accent.tape1} 0px, ${accent.tape1} 4px, ${accent.tape2} 4px, ${accent.tape2} 8px)`,
                    }}
                  />

                  {/* Project number stamp — opposite corner from tape */}
                  <div
                    className="absolute -top-2 z-30 border bg-[#FAF6EB] px-2.5 py-1 shadow-[0_2px_8px_rgba(60,40,20,0.14)]"
                    style={{
                      right: imageFirst ? "-10px" : "auto",
                      left: imageFirst ? "auto" : "-10px",
                      transform: imageFirst ? "rotate(6deg)" : "rotate(-6deg)",
                      borderColor: `${accent.stamp}66`,
                    }}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: accent.stamp }}>
                      No. {projectNum}
                    </p>
                  </div>

                  <ParallaxTags tags={project.tags} imageFirst={imageFirst} gradient={project.tagGradient} />
                </div>

                {/* Text side — journal entry layout */}
                <div className="relative mt-16 lg:mt-0 lg:flex-1">
                  {/* Company + industry tag — chip-style with colored dot indicator */}
                  <span
                    className="inline-flex items-center gap-2 rounded-[3px] border px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] backdrop-blur-sm"
                    style={{
                      borderColor: `${accent.stamp}55`,
                      color: accent.stamp,
                      background: `${accent.stamp}10`,
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: accent.stamp }}
                    />
                    {project.company}
                  </span>

                  <h3 className="mt-4 font-serif text-[32px] font-normal leading-[1.1] tracking-[-0.6px] text-[#2A2620] lg:text-[42px]">
                    {project.title}
                  </h3>

                  {/* Thin rule separating title from meta */}
                  <span className="mt-5 block h-px w-12 bg-[#A89E8C]/40" />

                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#A89E8C]">
                    {project.date}
                  </p>

                  {/* Description — vertical hairline on the left, marginalia feel */}
                  <div className="mt-6 border-l border-[#A89E8C]/30 pl-5">
                    <p className="font-sans text-[15px] leading-[1.75] tracking-[-0.15px] text-[#6B6358] lg:text-[17px]">
                      {project.description}
                    </p>
                  </div>

                  {/* Read-more affordance — terra cotta with growing dash */}
                  <p className="mt-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#C25430] transition-all duration-300 group-hover:gap-3">
                    <span className="h-px w-6 bg-[#C25430]/55 transition-all duration-300 group-hover:w-12" />
                    open the page
                  </p>
                </div>
              </div>
            );

            return (
              <React.Fragment key={project.title}>
                <motion.div
                  custom={i}
                  initial={{ opacity: 0, y: 60, x: imageFirst ? -16 : 16 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.85, delay: i * 0.05, ease }}
                >
                  {isInternal ? (
                    <TransitionLink href={project.link} data-cursor="look" className="group block no-underline">
                      {cardContent}
                    </TransitionLink>
                  ) : (
                    <a href={project.link} data-cursor="look" className="group block no-underline">
                      {cardContent}
                    </a>
                  )}
                </motion.div>

              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
