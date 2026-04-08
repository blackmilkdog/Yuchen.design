"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const tabs = ["My Vision", "My Work Style", "Outside Work"] as const;
type Tab = (typeof tabs)[number];

const values = [
  { accent: "Impact", sub: "Make work travel farther" },
  { accent: "Exploration", sub: "Learn by building" },
  { accent: "Growth", sub: "Compound skills, not titles" },
];

export default function Story() {
  const [activeTab, setActiveTab] = useState<Tab>("My Vision");
  const sectionRefs = useRef<Record<Tab, HTMLDivElement | null>>({
    "My Vision": null,
    "My Work Style": null,
    "Outside Work": null,
  });

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    tabs.forEach((tab) => {
      const el = sectionRefs.current[tab];
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveTab(tab);
        },
        { rootMargin: "-10% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="story" className="px-5 pt-24 pb-16 sm:px-8 lg:px-16 lg:pt-[160px]">
      <div className="mx-auto max-w-[1200px]">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="font-serif text-[40px] font-normal leading-[1.2] tracking-[-1px] text-white sm:text-[52px] lg:text-[64px]"
        >
          Story
        </motion.h2>

        <div className="mt-8 flex flex-col gap-8 lg:mt-16 lg:flex-row lg:gap-16">
          {/* Tab nav – horizontal scroll on mobile, sticky sidebar on desktop */}
          <nav className="hidden lg:sticky lg:top-20 lg:flex lg:w-[220px] lg:shrink-0 lg:flex-col lg:gap-4 lg:self-start">
            {tabs.map((tab) => (
              <button
                key={tab}
                data-cursor="underline"
                onClick={() => {
                  const el = sectionRefs.current[tab];
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`shrink-0 rounded-full px-4 py-2 text-left font-sans text-[15px] leading-[1.4] tracking-[-0.3px] transition-all duration-300 sm:text-[16px] lg:rounded-none lg:px-0 lg:py-0 lg:text-[30px] lg:tracking-[-1.2px] ${
                  activeTab === tab
                    ? "bg-white/10 text-accent lg:bg-transparent"
                    : "text-white/30 lg:bg-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Middle - scrollable content */}
          <div className="order-2 flex flex-col gap-10 lg:order-none lg:max-w-[635px] lg:flex-1 lg:gap-16">
            <div ref={(el) => { sectionRefs.current["My Vision"] = el; }}>
              <p className="mb-4 font-sans text-[15px] leading-[1.7] tracking-[-0.15px] text-white/80 sm:text-[16px] lg:mb-6 lg:text-[20px] lg:tracking-[-0.20px]">
                I&apos;ve always liked making things, sometimes it starts as a
                visual idea, sometimes it starts as a small frustration I notice
                in daily life. Over time, I realized the work that keeps me most
                engaged is the kind that actually lands with real people.
              </p>
              <p className="mb-4 font-sans text-[15px] leading-[1.7] tracking-[-0.15px] text-white/80 sm:text-[16px] lg:mb-6 lg:text-[20px] lg:tracking-[-0.20px]">
                What I&apos;m chasing isn&apos;t &ldquo;big words&rdquo; impact.
                It&apos;s more concrete, launching something, getting it into
                users&apos; hands, and watching it change how they move through a
                task or a day, whether that&apos;s making work simpler, decisions
                clearer, or the experience a little more delightful.
              </p>
              <p className="font-sans text-[15px] leading-[1.7] tracking-[-0.15px] text-white/80 sm:text-[16px] lg:text-[20px] lg:tracking-[-0.20px]">
                That&apos;s why my path gradually shifted from exploring many
                mediums in school to focusing more on product, because I like the
                moment when design stops being a concept and becomes something
                people can truly use.
              </p>
            </div>

            <div ref={(el) => { sectionRefs.current["My Work Style"] = el; }}>
              <p className="mb-4 font-sans text-[15px] leading-[1.7] tracking-[-0.15px] text-white/80 sm:text-[16px] lg:mb-6 lg:text-[20px] lg:tracking-[-0.20px]">
                I&apos;m comfortable talking to users early, getting past the
                polite &ldquo;sounds good&rdquo; feedback and into what&apos;s
                actually hard, the constraints, the tradeoffs, the moments where
                they hesitate or lose confidence. I like turning those
                conversations into a clear problem framing and a few sharp bets.
              </p>
              <p className="mb-4 font-sans text-[15px] leading-[1.7] tracking-[-0.15px] text-white/80 sm:text-[16px] lg:mb-6 lg:text-[20px] lg:tracking-[-0.20px]">
                Then I prototype quickly, not because research is optional, but
                because prototypes make learning cheaper. Recently, vibe coding
                tools have made this even faster for me, the cost of trying
                something and seeing a real result is much lower, so I can
                iterate more and align with stakeholders earlier.
              </p>
              <p className="font-sans text-[15px] leading-[1.7] tracking-[-0.15px] text-white/80 sm:text-[16px] lg:text-[20px] lg:tracking-[-0.20px]">
                I don&apos;t try to perfect UI at the start. I&apos;d rather
                answer the real questions first, is this the right problem, does
                the flow hold up, what breaks at the edges. Once the direction is
                right, that&apos;s when I slow down, tightening the system,
                polishing the interactions, and making the UI feel intentional
                and reliable.
              </p>
            </div>

            <div ref={(el) => { sectionRefs.current["Outside Work"] = el; }}>
              <p className="mb-4 font-sans text-[15px] leading-[1.7] tracking-[-0.15px] text-white/80 sm:text-[16px] lg:mb-6 lg:text-[20px] lg:tracking-[-0.20px]">
                Right now I&apos;m leaning more into product work and product
                decision-making. It lets me stay creative while staying close to
                real customers, real constraints, metrics, edge cases, and the
                messy parts of go-to-market. That&apos;s the kind of impact
                I&apos;m after, not loud, just real.
              </p>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] sm:rounded-[36px]">
                <img
                  src="/images/奶包.JPG"
                  alt="Surfing"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Hobbies – mobile only, below image */}
              <div className="mt-4 flex flex-wrap gap-2 lg:hidden">
                {["Snowboarding", "Surfing", "Traveling", "City Walking", "Space Aesthetics"].map((hobby) => (
                  <span key={hobby} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 font-sans text-[13px] leading-[1.4] text-white/40 sm:text-[14px]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Values + Hobbies */}
          <div className="order-1 flex flex-col gap-8 lg:order-none lg:w-[200px] lg:shrink-0 lg:flex-col lg:justify-between lg:gap-10 lg:pt-2">
            {/* Values – horizontal cards on mobile, vertical on desktop */}
            <div className="-mx-5 flex gap-4 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:gap-10 lg:overflow-visible lg:px-0">
              {values.map((v, i) => (
                <div key={i} className="flex min-w-[160px] shrink-0 flex-col p-0 lg:min-w-0">
                  <span className="font-serif text-[24px] leading-[1.2] text-accent sm:text-[28px] lg:text-[36px]">
                    {v.accent}
                  </span>
                  <p className="mt-1 font-sans text-[13px] leading-[1.5] tracking-[-0.13px] text-white/80 sm:text-[14px] lg:text-[16px] lg:tracking-[-0.16px]">
                    {v.sub}
                  </p>
                </div>
              ))}
            </div>

            {/* Hobbies – desktop only, centered to image */}
            <div className="hidden lg:flex lg:flex-col lg:gap-2">
              {["Snowboarding", "Surfing", "Traveling", "City Walking", "Space Aesthetics"].map((hobby) => (
                <span key={hobby} className="inline-flex items-center gap-1.5 px-0 py-0 font-sans text-[16px] leading-[1.6] tracking-[-0.16px] text-white/40">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 lg:h-[18px] lg:w-[18px]">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
