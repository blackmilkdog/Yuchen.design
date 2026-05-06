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
    tagGradient: "linear-gradient(135deg, #fef3c7, #ffffff)",
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
    tagGradient: "linear-gradient(135deg, #dbeafe, #ffffff)",
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
    tagGradient: "linear-gradient(135deg, #ede9fe, #ffffff)",
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
    tagGradient: "linear-gradient(135deg, #dcfce7, #ffffff)",
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
    tagGradient: "linear-gradient(135deg, #dbeafe, #ffffff)",
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
    <motion.div
      ref={ref}
      style={{ rotateY, rotate, perspective: 800 }}
      className="overflow-hidden rounded-[36px]"
    >
      <div className="relative aspect-[4/3] w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 660px"
        />
      </div>
    </motion.div>
  );
}

function ParallaxTags({ tags, imageFirst, gradient }: { tags: string[]; imageFirst: boolean; gradient: string }) {
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
      style={{ y, rotateY, rotate, perspective: 800, background: gradient }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3, ease }}
      className={`absolute bottom-0 z-20 flex translate-y-[12.5%] flex-col gap-2.5 rounded-2xl px-5 py-4 shadow-lg sm:px-6 sm:py-5 ${
        imageFirst ? "right-0 translate-x-[12.5%]" : "left-0 -translate-x-[12.5%]"
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
  return (
    <section id="works" className="px-8 lg:px-16">
      <div className="mx-auto max-w-[1200px] py-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mb-10 font-serif text-[64px] font-normal leading-[1.2] tracking-[-1px] text-white"
        >
          Works
        </motion.h2>

        <div className="flex flex-col gap-24 lg:gap-32">
          {projects.map((project, i) => {
            const imageFirst = i % 2 === 0;
            const isInternal = project.link.startsWith("/");

            const cardContent = (
              <div className={`flex flex-col lg:flex-row lg:items-center lg:gap-16 ${imageFirst ? "" : "lg:flex-row-reverse"}`}>
                {/* Image with tag list */}
                <div className="relative lg:w-[55%] lg:flex-shrink-0" style={{ perspective: 800 }}>
                  <Perspective3DImage src={project.image} alt={project.title} imageFirst={imageFirst} />
                  <ParallaxTags tags={project.tags} imageFirst={imageFirst} gradient={project.tagGradient} />
                </div>

                {/* Text content */}
                <div className="mt-16 lg:mt-0 lg:flex-1">
                  <p className="font-mono text-[13px] uppercase tracking-[0.15em] text-white/40">
                    {project.company}
                  </p>

                  <h3 className="mt-2 font-serif text-[36px] font-normal leading-[1.2] tracking-[-0.5px] text-white lg:text-[42px]">
                    {project.title}
                  </h3>

                  <p className="mt-2 font-mono text-[13px] tracking-[0.05em] text-white/35">
                    {project.date}
                  </p>

                  <p className="mt-2 font-sans text-[17px] leading-[1.7] tracking-[-0.17px] text-white/70 lg:text-[20px]">
                    {project.description}
                  </p>
                </div>
              </div>
            );

            return (
              <motion.div
                key={project.title}
                custom={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
