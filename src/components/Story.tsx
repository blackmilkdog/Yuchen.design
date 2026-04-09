"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePointer } from "./PointerContext";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const tabs = ["My Vision", "My Work Style", "Outside Work"] as const;
type Tab = (typeof tabs)[number];

const values = [
  { accent: "Impact", sub: "Make work travel farther" },
  { accent: "Exploration", sub: "Learn by building" },
  { accent: "Growth", sub: "Compound skills, not titles" },
];

const hobbyBase =
  "▲ SNOWBOARDING  ∿ SURFING  ✈ TRAVELING  ⊞ CITY WALKING  ★ SPACE AESTHETICS  ";
const HOBBY_REPEATS = 4;
const hobbyText = hobbyBase.repeat(HOBBY_REPEATS);

export default function Story() {
  const [activeTab, setActiveTab] = useState<Tab>("My Vision");
  const [svgKey, setSvgKey] = useState(0);
  const sectionRefs = useRef<Record<Tab, HTMLDivElement | null>>({
    "My Vision": null,
    "My Work Style": null,
    "Outside Work": null,
  });
  const borderRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Force SVG re-render on resize so text border fits new aspect ratio
  useEffect(() => {
    const onResize = () => setSvgKey((k) => k + 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Continuous text-path animation + scroll boost
  useEffect(() => {
    const el = borderRef.current;
    const svg = svgRef.current;
    if (!el || !svg) return;

    const tps = svg.querySelectorAll("textPath");
    let offset = 0;
    let scrollExtra = 0;
    let lastTime = performance.now();
    let raf: number;

    // Measure one repeat as % of path for seamless wrapping
    const pathEl = svg.querySelector("#hobby-frame") as SVGPathElement | null;
    const textEl = svg.querySelector("text") as SVGTextElement | null;
    let oneRepeatPct = 100;
    if (pathEl && textEl) {
      const pathLen = pathEl.getTotalLength();
      const textLen = textEl.getComputedTextLength();
      oneRepeatPct = (textLen / HOBBY_REPEATS / pathLen) * 100;
    }

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      scrollExtra = (center - viewCenter) * 0.012;
    };

    const tick = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;
      offset -= dt * 0.004;
      // Wrap at exactly one repeat length so the loop is seamless
      if (offset < -oneRepeatPct) offset += oneRepeatPct;
      const val = `${offset + scrollExtra}%`;
      tps.forEach((tp) => tp.setAttribute("startOffset", val));
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [svgKey]);

  // 3D tilt tracks cursor globally when image+border is in viewport
  const inViewRef = useRef(false);
  useEffect(() => {
    const el = borderRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { inViewRef.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  usePointer((px, py) => {
    const el = borderRef.current;
    if (!el || !inViewRef.current) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = (px - cx) / (window.innerWidth / 2);
    const y = (py - cy) / (window.innerHeight / 2);
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    el.style.transform = `perspective(600px) rotateX(${-clamp(y) * 2}deg) rotateY(${clamp(x) * 2}deg) scale3d(1.002, 1.002, 1.002)`;
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
    <section id="story" className="px-8 pt-24 pb-16 sm:px-8 lg:px-16 lg:pt-[160px]">
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
                className={`shrink-0 rounded-full px-4 py-2 text-left font-sans text-[15px] leading-[1.4] tracking-[-0.3px] transition-all duration-300 sm:text-[16px] lg:w-fit lg:rounded-none lg:px-0 lg:py-0 lg:text-[30px] lg:tracking-[-1.2px] ${
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
          <div className="flex flex-col gap-10 lg:max-w-[635px] lg:flex-1 lg:gap-16">
            <div ref={(el) => { sectionRefs.current["My Vision"] = el; }}>
              <p className="mb-4 font-sans text-[17px] leading-[1.7] tracking-[-0.17px] text-white/80 sm:text-[17px] lg:mb-6 lg:text-[20px] lg:tracking-[-0.20px]">
                I&apos;ve always liked making things, sometimes it starts as a
                visual idea, sometimes it starts as a small frustration I notice
                in daily life. Over time, I realized the work that keeps me most
                engaged is the kind that actually lands with real people.
              </p>
              <p className="mb-4 font-sans text-[17px] leading-[1.7] tracking-[-0.17px] text-white/80 sm:text-[17px] lg:mb-6 lg:text-[20px] lg:tracking-[-0.20px]">
                What I&apos;m chasing isn&apos;t &ldquo;big words&rdquo; impact.
                It&apos;s more concrete, launching something, getting it into
                users&apos; hands, and watching it change how they move through a
                task or a day, whether that&apos;s making work simpler, decisions
                clearer, or the experience a little more delightful.
              </p>
              <p className="font-sans text-[17px] leading-[1.7] tracking-[-0.17px] text-white/80 sm:text-[17px] lg:text-[20px] lg:tracking-[-0.20px]">
                That&apos;s why my path gradually shifted from exploring many
                mediums in school to focusing more on product, because I like the
                moment when design stops being a concept and becomes something
                people can truly use.
              </p>
            </div>

            <div ref={(el) => { sectionRefs.current["My Work Style"] = el; }}>
              <p className="mb-4 font-sans text-[17px] leading-[1.7] tracking-[-0.17px] text-white/80 sm:text-[17px] lg:mb-6 lg:text-[20px] lg:tracking-[-0.20px]">
                I&apos;m comfortable talking to users early, getting past the
                polite &ldquo;sounds good&rdquo; feedback and into what&apos;s
                actually hard, the constraints, the tradeoffs, the moments where
                they hesitate or lose confidence. I like turning those
                conversations into a clear problem framing and a few sharp bets.
              </p>
              <p className="mb-4 font-sans text-[17px] leading-[1.7] tracking-[-0.17px] text-white/80 sm:text-[17px] lg:mb-6 lg:text-[20px] lg:tracking-[-0.20px]">
                Then I prototype quickly, not because research is optional, but
                because prototypes make learning cheaper. Recently, vibe coding
                tools have made this even faster for me, the cost of trying
                something and seeing a real result is much lower, so I can
                iterate more and align with stakeholders earlier.
              </p>
              <p className="font-sans text-[17px] leading-[1.7] tracking-[-0.17px] text-white/80 sm:text-[17px] lg:text-[20px] lg:tracking-[-0.20px]">
                I don&apos;t try to perfect UI at the start. I&apos;d rather
                answer the real questions first, is this the right problem, does
                the flow hold up, what breaks at the edges. Once the direction is
                right, that&apos;s when I slow down, tightening the system,
                polishing the interactions, and making the UI feel intentional
                and reliable.
              </p>
            </div>

            <div ref={(el) => { sectionRefs.current["Outside Work"] = el; }}>
              <p className="mb-4 font-sans text-[17px] leading-[1.7] tracking-[-0.17px] text-white/80 sm:text-[17px] lg:mb-6 lg:text-[20px] lg:tracking-[-0.20px]">
                Right now I&apos;m leaning more into product work and product
                decision-making. It lets me stay creative while staying close to
                real customers, real constraints, metrics, edge cases, and the
                messy parts of go-to-market. That&apos;s the kind of impact
                I&apos;m after, not loud, just real.
              </p>
              <div
                ref={borderRef}
                className="relative mt-16 p-5 transition-transform duration-300 ease-out will-change-transform sm:p-7 lg:p-10"
                style={{ transform: "perspective(600px) rotateX(0deg) rotateY(0deg)" }}
              >
                {/* Continuous flowing text border */}
                <svg
                  key={svgKey}
                  ref={svgRef}
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                >
                  <defs>
                    <path
                      id="hobby-frame"
                      d="M 50,97 L 10,97 A 7,7 0 0 1 3,90 L 3,10 A 7,7 0 0 1 10,3 L 90,3 A 7,7 0 0 1 97,10 L 97,90 A 7,7 0 0 1 90,97 Z"
                      fill="none"
                    />
                    <filter id="seam-blur">
                      <feGaussianBlur stdDeviation="0.8" />
                    </filter>
                    {/* Mask: sharp text visible everywhere except seam */}
                    <radialGradient id="seam-fade" cx="0.5" cy="1" r="0.14" fx="0.5" fy="1">
                      <stop offset="0%" stopColor="black" />
                      <stop offset="100%" stopColor="white" />
                    </radialGradient>
                    <mask id="sharp-mask">
                      <rect width="100" height="100" fill="url(#seam-fade)" />
                    </mask>
                    {/* Inverse mask: blurred text visible only at seam */}
                    <radialGradient id="seam-fade-inv" cx="0.5" cy="1" r="0.14" fx="0.5" fy="1">
                      <stop offset="0%" stopColor="white" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="black" />
                    </radialGradient>
                    <mask id="blur-mask">
                      <rect width="100" height="100" fill="url(#seam-fade-inv)" />
                    </mask>
                    {/* Opacity fade at seam */}
                    <radialGradient id="seam-opacity" cx="0.5" cy="1" r="0.16" fx="0.5" fy="1">
                      <stop offset="0%" stopColor="black" />
                      <stop offset="60%" stopColor="white" />
                      <stop offset="100%" stopColor="white" />
                    </radialGradient>
                    <mask id="opacity-mask">
                      <rect width="100" height="100" fill="url(#seam-opacity)" />
                    </mask>
                  </defs>
                  <g mask="url(#opacity-mask)">
                    {/* Sharp text */}
                    <text
                      fill="white"
                      fontFamily="Inter, sans-serif"
                      fontWeight="800"
                      fontSize="4.2"
                      letterSpacing="0.12"
                      mask="url(#sharp-mask)"
                    >
                      <textPath href="#hobby-frame" startOffset="0%">
                        {hobbyText}
                      </textPath>
                    </text>
                    {/* Blurred + scaled-down text at seam */}
                    <text
                      fill="white"
                      fontFamily="Inter, sans-serif"
                      fontWeight="800"
                      fontSize="4.2"
                      letterSpacing="0.12"
                      mask="url(#blur-mask)"
                      filter="url(#seam-blur)"
                      transform="translate(50,97) scale(0.92) translate(-50,-97)"
                    >
                      <textPath href="#hobby-frame" startOffset="0%">
                        {hobbyText}
                      </textPath>
                    </text>
                  </g>
                </svg>

                {/* Image */}
                <div
                  className="relative aspect-[1/1] w-full overflow-hidden rounded-[16px] sm:rounded-[28px] lg:rounded-[36px]"
                >
                  <Image
                    src="/images/naibaov2.jpeg"
                    alt="milkdog"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 635px"
                  />
                  {/* Orange overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-accent/20 mix-blend-multiply" />
                  {/* Grain texture */}
                  <div className="pointer-events-none absolute -inset-8 animate-grain opacity-[0.05]" />
                </div>
              </div>
            </div>
          </div>

          {/* Right - Values + Hobbies */}
          <div className="hidden lg:flex lg:w-[200px] lg:shrink-0 lg:flex-col lg:justify-between lg:gap-10 lg:pt-2">
            {/* Values – hidden on mobile, vertical on desktop */}
            <div className="hidden lg:mx-0 lg:flex lg:flex-col lg:gap-10 lg:overflow-visible lg:px-0">
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

          </div>
        </div>
      </div>
    </section>
  );
}
