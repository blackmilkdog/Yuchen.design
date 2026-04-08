"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Project {
  company: string;
  title: string;
  date: string;
  image: string;
  description: string;
  tags: string[];
  link: string;
}

const projects: Project[] = [
  {
    company: "CodePay . Fintech Startup",
    title: "B2B Payment System",
    date: "07/2025 - Now",
    image: "/images/codepay.png",
    description:
      "Founding designer across CodePay\u2019s B2B payments suite (in-person solution + operations) \u2014 building a cross-product design system, refactoring high-trust workflows, and prototyping AI-first experiences.",
    tags: [
      "Design Systems at Scale",
      "High-Trust UX (Risk & Clarity)",
      "Workflow Simplification",
      "Feedback-to-Release Loop",
      "AI-first Prototyping",
    ],
    link: "#",
  },
  {
    company: "BonCamel . E-Commerce Startup",
    title: "Chat-based AI Agent",
    date: "03/2024 - 05/2024",
    image: "/images/boncamel.png",
    description:
      "Defined the end-to-end AI shopping flow (intent capture \u2192 recommendations \u2192 shortlist \u2192 checkout) and iterated through usability testing and A/B validation to improve purchase intent.",
    tags: [
      "0\u21921 Feature Design",
      "User Research + Usability Testing",
      "Conversion Optimization",
      "Hi-Fi Prototyping",
      "Interaction Design",
    ],
    link: "#",
  },
  {
    company: "DiDi . Mobility Platform",
    title: "Autonomous Trucking",
    date: "05/2024 - 07/2024",
    image: "/images/didi.png",
    description:
      "Designed fleet ops + HMI interactions for autonomous trucking \u2014 mapping dispatch-to-execution workflows and defining risk-aware UI patterns for safety-critical scenarios. Built prototypes and simulations to validate faster, and shipped iterative improvements with engineering in a tight build\u2013test loop.",
    tags: [
      "Safety-Critical UX",
      "Dispatch Ops Workflows",
      "Simulation / Validation",
      "Edge-Case Design",
      "Prototype \u2192 Ship",
    ],
    link: "#",
  },
  {
    company: "Philly Truce . NGO of Community Safety",
    title: "Case Response Platform",
    date: "11/2023 - 01/2024",
    image: "/images/phillytruce.png",
    description:
      "Built a high-trust case response platform for rapid incident intake and triage \u2014 turning SMS reports into trackable cases with status, ownership, and resolution workflows.",
    tags: [
      "Information Architecture",
      "Hierarchy & Progressive Disclosure",
      "0\u21921 Product Definition",
      "Scope & Prioritization",
      "Cross-functional Collaboration",
    ],
    link: "#",
  },
];

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
            return (
              <motion.a
                key={project.title}
                href={project.link}
                custom={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
                className="group block"
              >
                <div className={`flex flex-col lg:flex-row lg:items-center lg:gap-16 ${imageFirst ? "" : "lg:flex-row-reverse"}`}>
                  {/* Image */}
                  <div className="overflow-hidden rounded-[8px] lg:w-[55%] lg:flex-shrink-0">
                    <div className="relative aspect-[4/3] w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 660px"
                      />
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="mt-6 lg:mt-0 lg:flex-1">
                    <p className="font-serif text-[18px] italic leading-[1.6] tracking-[-0.18px] text-white/60">
                      {project.company}
                    </p>

                    <h3 className="mt-1 font-serif text-[36px] font-normal leading-[1.2] tracking-[-0.5px] text-white lg:text-[42px]">
                      {project.title}
                    </h3>

                    <p className="mt-3 font-sans text-[16px] italic leading-[1.6] text-white/50">
                      {project.date}
                    </p>

                    <p className="mt-4 font-sans text-[17px] leading-[1.7] tracking-[-0.17px] text-white/70 lg:text-[18px]">
                      {project.description}
                    </p>

                    {/* Tags - mobile only */}
                    <div className="mt-4 flex flex-wrap gap-2 lg:hidden">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full border border-white/15 bg-black/80 px-4 py-2 font-satoshi text-[16px] leading-[2] tracking-[-0.2px] text-white/80 transition-colors hover:border-white/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
