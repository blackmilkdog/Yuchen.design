"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const hobbies = [
  { mark: "▲", label: "snowboarding" },
  { mark: "∿", label: "surfing" },
  { mark: "✈", label: "traveling" },
  { mark: "⊞", label: "city walking" },
  { mark: "★", label: "space aesthetics" },
];

/* Polaroid-style placeholder card. Renders an Image if `src` is given,
   otherwise a soft cream block with a centered label. */
function Polaroid({
  src,
  alt,
  caption,
  width,
  aspect = "aspect-[4/5]",
  rotate,
  className = "",
  hue = "#E8E0D2",
}: {
  src?: string;
  alt?: string;
  caption?: string;
  width: string; // e.g. "w-[200px]"
  aspect?: string; // tailwind aspect class
  rotate: number;
  className?: string;
  hue?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: rotate * 1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease }}
      whileHover={{ rotate: 0, y: -4, transition: { duration: 0.4, ease } }}
      className={`relative bg-white p-3 pb-10 shadow-[0_8px_24px_-8px_rgba(60,40,20,0.22)] ${width} ${className}`}
      style={{ transformOrigin: "center" }}
    >
      <div className={`relative ${aspect} w-full overflow-hidden bg-gray-100`} style={!src ? { background: hue } : undefined}>
        {src ? (
          <Image src={src} alt={alt || ""} fill className="object-cover" sizes="(max-width: 768px) 60vw, 320px" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.22em] text-[#A89E8C]">
            placeholder
          </div>
        )}
      </div>
      {caption && (
        <p className="absolute bottom-2 left-3 right-3 truncate font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B6358]">
          {caption}
        </p>
      )}
    </motion.div>
  );
}

export default function Story() {
  return (
    <section id="story" className="px-6 pb-24 pt-32 sm:px-8 lg:px-16 lg:pb-32">
      <div className="mx-auto max-w-[1200px]">
        {/* Section header — matches Works/Playground rhythm */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mb-20"
        >
          <p className="mb-4 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.22em] text-[#C25430]">
            <span className="h-px w-10 bg-[#C25430]/50" />
            About
          </p>
          <h2 className="font-serif text-[64px] font-normal leading-[1.0] tracking-[-1.8px] text-[#2A2620] lg:text-[88px]">
            Story
          </h2>
        </motion.div>

        {/* Journal-page composition — irregular polaroid layout + writing */}
        <div className="relative grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          {/* Main portrait — polaroid, slight tilt, takes left column */}
          <div className="lg:col-span-5">
            <Polaroid
              src="/images/me.jpeg"
              alt="Yuchen"
              caption="me, somewhere · 2025"
              width="w-[260px] sm:w-[300px]"
              aspect="aspect-[4/5]"
              rotate={-2.5}
              className="ml-2 sm:ml-6 lg:ml-10"
            />
          </div>

          {/* Right column — writing + currently chip + hobby tags + sign-off */}
          <div className="relative lg:col-span-7 lg:pt-6">
            {/* Currently chip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease }}
              className="inline-flex items-center gap-2 rounded-[3px] border border-[#C25430]/45 bg-[#C25430]/8 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#C25430]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#C25430]" />
              Currently @ CodePay · NYC
            </motion.div>

            {/* Brief intro — italic serif, journal-letter feel */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="mt-7 max-w-[560px] font-serif text-[18px] italic leading-[1.55] text-[#2A2620] lg:text-[22px]"
            >
              I make things — sometimes from a visual idea, sometimes from a small
              frustration in daily life. The work I love most is the kind that
              actually lands with real people.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.18, ease }}
              className="mt-5 max-w-[520px] font-sans text-[15px] leading-[1.7] text-[#6B6358] lg:text-[16px]"
            >
              Right now: leaning into product work, prototyping fast with vibe-coding
              tools, and chasing the moment design becomes something people can
              actually use.
            </motion.p>

            {/* Outside work — small hobby tags */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.26, ease }}
              className="mt-9"
            >
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#A89E8C]">
                outside work
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {hobbies.map((h) => (
                  <span
                    key={h.label}
                    className="inline-flex items-center gap-1.5 font-sans text-[14px] text-[#6B6358]"
                  >
                    <span className="text-[#C25430]/70">{h.mark}</span>
                    {h.label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Sign-off */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
              className="mt-12 font-serif text-[14px] italic text-[#A89E8C]"
            >
              — written with care, by Yuchen :)
            </motion.p>
          </div>
        </div>

        {/* Bottom row of small placeholder polaroids — irregular, scattered */}
        <div className="relative mt-20 hidden h-[180px] sm:block lg:mt-24 lg:h-[220px]">
          <div className="absolute left-[6%] top-2">
            <Polaroid
              width="w-[140px] lg:w-[170px]"
              aspect="aspect-square"
              rotate={3}
              caption="snowy days"
              hue="#E8E0D2"
            />
          </div>
          <div className="absolute left-[34%] -top-4">
            <Polaroid
              width="w-[120px] lg:w-[150px]"
              aspect="aspect-[4/5]"
              rotate={-4}
              caption="city walks"
              hue="#DDE5DC"
            />
          </div>
          <div className="absolute left-[58%] top-6">
            <Polaroid
              width="w-[160px] lg:w-[190px]"
              aspect="aspect-[5/4]"
              rotate={2.5}
              caption="surf trip"
              hue="#D8E2EE"
            />
          </div>
          <div className="absolute right-[4%] -top-2">
            <Polaroid
              width="w-[120px] lg:w-[150px]"
              aspect="aspect-square"
              rotate={-3}
              caption="space stuff"
              hue="#F0DDD8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
