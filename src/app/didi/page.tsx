"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CaseStudyNav from "@/components/CaseStudyNav";
import CaseStudyFooter from "@/components/CaseStudyFooter";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease },
};

const metadata = [
  { label: "Industry", value: "Autonomous Trucking / Mobility" },
  { label: "Timeline", value: "May \u2013 Jul 2024 (3 months)" },
  { label: "Role", value: "Product Designer Intern" },
  {
    label: "Tools",
    value:
      "Figma, JavaScript, Adobe Premiere, After Effects, Blender, Procreate, Midjourney, Photoshop",
  },
  {
    label: "Team",
    value: "Senior Software Engineers, Product Manager, Senior Product Designer",
  },
];

const metrics = [
  { value: "10K+", label: "Views on promotional video" },
  { value: "1K+", label: "Engagements on social platforms" },
  { value: "5", label: "Lighting scenarios defined & tested" },
  { value: "2", label: "Products shipped end-to-end" },
];

export default function DiDiPage() {
  return (
    <main className="relative min-h-screen w-full bg-white text-gray-900">
      <CaseStudyNav />

      {/* ── Hero Header ── */}
      <header className="border-b border-gray-200 px-8 lg:px-16">
        <div className="mx-auto max-w-[1200px] pb-16 pt-20 lg:pt-28">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-mono text-sm uppercase tracking-[0.15em] text-[#fa5c40]"
          >
            DiDi &middot; Mobility Platform
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-4 max-w-[800px] font-serif text-[48px] font-normal leading-[1.15] tracking-[-1.5px] text-gray-900 lg:text-[72px]"
          >
            Autonomous Trucking
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-6 max-w-[640px] font-sans text-lg leading-[1.7] text-gray-500 lg:text-xl"
          >
            Designing fleet ops + HMI interactions for autonomous trucking &mdash;
            mapping dispatch-to-execution workflows and defining risk-aware UI
            patterns for safety-critical scenarios.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-5"
          >
            {metadata.map((item) => (
              <div key={item.label}>
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-gray-300">
                  {item.label}
                </p>
                <p className="mt-1 font-sans text-sm text-gray-600">
                  {item.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* ── Impact Metrics ── */}
      <section className="px-8 py-16 lg:px-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div {...fadeUp}>
            <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-gray-300">
              Impact
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-6 backdrop-blur-sm"
                >
                  <p className="font-serif text-[40px] leading-[1] tracking-[-1px] text-gray-900 lg:text-[48px]">
                    {metric.value}
                  </p>
                  <p className="mt-3 font-sans text-[14px] leading-[1.5] text-gray-400">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="px-8 lg:px-16">
        <div className="mx-auto max-w-[1200px] border-t border-gray-200" />
      </div>

      {/* ── Overview ── */}
      <section className="px-8 py-16 lg:px-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div {...fadeUp}>
            <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-gray-300">
              Overview
            </p>
            <h2 className="mt-4 max-w-[800px] font-serif text-[32px] leading-[1.25] tracking-[-0.5px] text-gray-900 md:text-[40px]">
              Two parallel workstreams, one mission
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
                <p className="font-mono text-[13px] uppercase tracking-[0.1em] text-accent">
                  Workstream A
                </p>
                <p className="mt-4 font-sans text-[17px] leading-[1.7] text-gray-600">
                  Enhanced the existing convoy trucking product through software and
                  hardware upgrades &mdash; designing a driver dispatch app, refining
                  HMI lane-change warnings, and defining an external lighting system
                  for autonomous vehicles.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
                <p className="font-mono text-[13px] uppercase tracking-[0.1em] text-accent">
                  Workstream B
                </p>
                <p className="mt-4 font-sans text-[17px] leading-[1.7] text-gray-600">
                  Contributed to the L4 autonomous concept truck definition for the
                  April unveiling, and led the production of a promotional video that
                  showcased product differentiation and key features to 10K+ viewers.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="px-8 lg:px-16">
        <div className="mx-auto max-w-[1200px] border-t border-gray-200" />
      </div>

      {/* ── Section 01: Dispatch App ── */}
      <section className="px-8 py-16 lg:px-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div {...fadeUp}>
            <span className="font-mono text-[80px] font-bold leading-[1] text-gray-200 lg:text-[120px]">
              01
            </span>
            <h2 className="-mt-4 font-serif text-[32px] leading-[1.25] tracking-[-0.5px] text-gray-900 md:text-[40px]">
              Dispatch App for Drivers
            </h2>
          </motion.div>

          {/* Problem */}
          <motion.div
            {...fadeUp}
            className="mt-12 grid gap-10 lg:grid-cols-2"
          >
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-accent">
                Problem
              </p>
              <p className="mt-4 font-sans text-[17px] leading-[1.7] text-gray-600 lg:text-[18px]">
                Previous dispatch operations relied on <em>WeChat group chats</em>,
                which was cumbersome and difficult to manage. Drivers had no
                centralized way to view orders, track status, or coordinate with
                the fleet in real time &mdash; creating friction that slowed
                operations and increased errors.
              </p>
            </div>
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-accent">
                Solution
              </p>
              <p className="mt-4 font-sans text-[17px] leading-[1.7] text-gray-600 lg:text-[18px]">
                Designed a dedicated mobile dispatch app that replaced ad-hoc
                messaging with a structured workflow. The app provides
                identity-based authentication, real-time order lists, status
                tracking, and information displays that highlight key details
                at a glance.
              </p>
            </div>
          </motion.div>

          {/* Feature Breakdown */}
          <motion.div {...fadeUp} className="mt-12">
            <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-gray-300">
              Key Features
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Sign In / Sign Up",
                  desc: "Identity-based authentication ensuring only verified drivers access dispatch.",
                },
                {
                  title: "Order List",
                  desc: "Real-time display of available and assigned orders with filtering and sorting.",
                },
                {
                  title: "My Order",
                  desc: "Personal order tracking with status updates from assignment through delivery.",
                },
                {
                  title: "My Account",
                  desc: "Driver profile management for personal info, truck type, and preferences.",
                },
                {
                  title: "Information Display",
                  desc: "Highlighted key details and contextual information to speed decision-making.",
                },
                {
                  title: "Smart Prioritization",
                  desc: "Strategy to surface suitable orders based on driver location, truck type, and preferences.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-gray-200 bg-gray-50/80 p-6"
                >
                  <p className="font-sans text-[16px] font-medium text-gray-900">
                    {feature.title}
                  </p>
                  <p className="mt-2 font-sans text-[14px] leading-[1.6] text-gray-400">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Design Spec Callout */}
          <motion.div {...fadeUp} className="mt-12">
            <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-100 to-gray-50 p-8">
              <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-gray-400">
                Design Handoff
              </p>
              <p className="mt-3 font-sans text-[17px] leading-[1.7] text-gray-500">
                Used the Lanhu platform to deliver design specifications and assets
                to software engineers, enabling seamless dev handoff and
                reducing back-and-forth during implementation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="px-8 lg:px-16">
        <div className="mx-auto max-w-[1200px] border-t border-gray-200" />
      </div>

      {/* ── Section 02: HMI Lane Change Warning ── */}
      <section className="px-8 py-16 lg:px-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div {...fadeUp}>
            <span className="font-mono text-[80px] font-bold leading-[1] text-gray-200 lg:text-[120px]">
              02
            </span>
            <h2 className="-mt-4 font-serif text-[32px] leading-[1.25] tracking-[-0.5px] text-gray-900 md:text-[40px]">
              HMI Lane Change Warning Design
            </h2>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="mt-12 grid gap-10 lg:grid-cols-2"
          >
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-accent">
                Context
              </p>
              <p className="mt-4 font-sans text-[17px] leading-[1.7] text-gray-600 lg:text-[18px]">
                V2X information visualization is the main component of the HMI,
                dynamically displaying real-time statistics from road inspection.
                A critical alert triggers when a turn signal indicates lane-change
                intention for nearby vehicles or obstacles &mdash; demanding
                immediate, unambiguous driver attention.
              </p>
            </div>
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-accent">
                Challenge
              </p>
              <p className="mt-4 font-sans text-[17px] leading-[1.7] text-gray-600 lg:text-[18px]">
                The initial design (Version 1) was too visually dominant &mdash;
                it overwhelmed the driver&rsquo;s attention and obstructed other
                critical information on the display. The warning needed to be
                <em> noticeable without being disruptive</em>, balancing safety
                urgency with information clarity.
              </p>
            </div>
          </motion.div>

          {/* Iteration Callout */}
          <motion.div {...fadeUp} className="mt-12">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-accent/10 to-transparent p-8">
              <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-accent">
                Iteration Insight
              </p>
              <p className="mt-3 font-sans text-[17px] leading-[1.7] text-gray-500">
                Version 1 was flagged as &ldquo;too obvious, affecting the
                driver&rsquo;s attention and obstructing other information.&rdquo;
                Through iterative refinement, the warning was redesigned to use
                subtler visual cues &mdash; peripheral color shifts and directional
                indicators &mdash; that communicate urgency without hijacking
                the driver&rsquo;s primary field of view.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="px-8 lg:px-16">
        <div className="mx-auto max-w-[1200px] border-t border-gray-200" />
      </div>

      {/* ── Section 03: Lighting System ── */}
      <section className="px-8 py-16 lg:px-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div {...fadeUp}>
            <span className="font-mono text-[80px] font-bold leading-[1] text-gray-200 lg:text-[120px]">
              03
            </span>
            <h2 className="-mt-4 font-serif text-[32px] leading-[1.25] tracking-[-0.5px] text-gray-900 md:text-[40px]">
              Lighting System Design &amp; Testing
            </h2>
          </motion.div>

          <motion.div {...fadeUp} className="mt-12">
            <p className="max-w-[700px] font-sans text-[17px] leading-[1.7] text-gray-600 lg:text-[18px]">
              During autonomous convoy driving on both public and closed roads, it
              is necessary to communicate specific information to the external
              environment &mdash; other drivers, pedestrians, and roadside
              infrastructure. The lighting system serves as the vehicle&rsquo;s
              primary non-verbal communication channel.
            </p>
          </motion.div>

          {/* Scenarios */}
          <motion.div {...fadeUp} className="mt-12">
            <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-gray-300">
              Driving Scenarios
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  scenario: "Deactivated",
                  desc: "Manual driving mode \u2014 standard vehicle lighting behavior.",
                  light: "Standard lights",
                  color: "bg-white/20",
                },
                {
                  scenario: "Autonomous Driving",
                  desc: "Autonomous driving is activated and the truck is operating within convoy.",
                  light: "Flowing green light strip",
                  color: "bg-emerald-500/30",
                },
                {
                  scenario: "Cut-in",
                  desc: "A social vehicle merges into the autonomous convoy, requiring awareness signals.",
                  light: "Fast flashing yellow light strip",
                  color: "bg-yellow-500/30",
                },
                {
                  scenario: "Fallback (Mobile)",
                  desc: "An autonomous truck separates from the convoy and operates alone but can still drive.",
                  light: "Double flashing yellow light strip",
                  color: "bg-amber-500/30",
                },
                {
                  scenario: "Fallback (Stopping)",
                  desc: "The truck is in fallback mode and pulling over or stopping on the roadside.",
                  light: "Double flashing red light strip + rear strobe",
                  color: "bg-red-500/30",
                },
              ].map((item) => (
                <div
                  key={item.scenario}
                  className="rounded-xl border border-gray-200 bg-gray-50/80 p-6"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-3 w-3 rounded-full ${item.color}`}
                    />
                    <p className="font-sans text-[16px] font-medium text-gray-900">
                      {item.scenario}
                    </p>
                  </div>
                  <p className="mt-3 font-sans text-[14px] leading-[1.6] text-gray-400">
                    {item.desc}
                  </p>
                  <p className="mt-3 font-mono text-[12px] tracking-[0.05em] text-gray-300">
                    {item.light}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Definitions */}
          <motion.div {...fadeUp} className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-8">
              <p className="font-mono text-[13px] uppercase tracking-[0.1em] text-accent">
                Cut-in
              </p>
              <p className="mt-3 font-sans text-[16px] leading-[1.6] text-gray-500">
                A scenario where a social vehicle merges into the autonomous
                convoy. The lighting system must immediately signal awareness
                to surrounding vehicles to maintain safety.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-8">
              <p className="font-mono text-[13px] uppercase tracking-[0.1em] text-accent">
                Fallback
              </p>
              <p className="mt-3 font-sans text-[16px] leading-[1.6] text-gray-500">
                A scenario where an autonomous truck separates from the convoy
                and operates alone. Lighting escalates from yellow to red
                depending on whether the vehicle can continue driving or must
                pull over.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="px-8 lg:px-16">
        <div className="mx-auto max-w-[1200px] border-t border-gray-200" />
      </div>

      {/* ── Section 04: Video Creation ── */}
      <section className="px-8 py-16 lg:px-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div {...fadeUp}>
            <span className="font-mono text-[80px] font-bold leading-[1] text-gray-200 lg:text-[120px]">
              04
            </span>
            <h2 className="-mt-4 font-serif text-[32px] leading-[1.25] tracking-[-0.5px] text-gray-900 md:text-[40px]">
              Promotional Video Creation
            </h2>
          </motion.div>

          <motion.div {...fadeUp} className="mt-12 grid gap-10 lg:grid-cols-2">
            <div>
              <p className="font-sans text-[17px] leading-[1.7] text-gray-600 lg:text-[18px]">
                Led the production of a promotional video that effectively
                showcased product differentiation and key features of KargoBot&rsquo;s
                autonomous trucking platform. The video reached over 10,000 views
                and generated 1,000+ engagements across social platforms.
              </p>
              <p className="mt-4 font-sans text-[17px] leading-[1.7] text-gray-600 lg:text-[18px]">
                The production leveraged a multi-tool pipeline &mdash; from Blender
                for 3D renders and After Effects for motion graphics, to Premiere
                for final edit and color grading &mdash; telling a compelling story
                that started from real-world scenarios and challenges.
              </p>
            </div>
            <div className="flex items-center">
              <div className="w-full rounded-2xl border border-gray-200 bg-gradient-to-br from-accent/10 to-accent-secondary/5 p-8">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-[48px] leading-[1] tracking-[-1px] text-accent">
                    10K+
                  </span>
                  <span className="font-sans text-[16px] text-gray-400">
                    video views
                  </span>
                </div>
                <div className="mt-4 flex items-baseline gap-4">
                  <span className="font-serif text-[48px] leading-[1] tracking-[-1px] text-accent-secondary">
                    1K+
                  </span>
                  <span className="font-sans text-[16px] text-gray-400">
                    social engagements
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="px-8 lg:px-16">
        <div className="mx-auto max-w-[1200px] border-t border-gray-200" />
      </div>

      {/* ── Section 05: Concept L4 Product ── */}
      <section className="px-8 py-16 lg:px-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div {...fadeUp}>
            <span className="font-mono text-[80px] font-bold leading-[1] text-gray-200 lg:text-[120px]">
              05
            </span>
            <h2 className="-mt-4 font-serif text-[32px] leading-[1.25] tracking-[-0.5px] text-gray-900 md:text-[40px]">
              L4 Concept Truck Definition
            </h2>
          </motion.div>

          <motion.div {...fadeUp} className="mt-12">
            <p className="max-w-[700px] font-sans text-[17px] leading-[1.7] text-gray-600 lg:text-[18px]">
              Contributed to defining the L4 autonomous concept truck for the
              April unveiling event. This workstream involved envisioning the
              future state of fully autonomous freight &mdash; from exterior
              communication design to the reimagined cab experience when no
              human driver is required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="px-8 lg:px-16">
        <div className="mx-auto max-w-[1200px] border-t border-gray-200" />
      </div>

      {/* ── Design Principles ── */}
      <section className="px-8 py-16 lg:px-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div {...fadeUp}>
            <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-gray-300">
              Design Principles
            </p>
            <h2 className="mt-4 font-serif text-[32px] leading-[1.25] tracking-[-0.5px] text-gray-900 md:text-[40px]">
              Guiding the work
            </h2>
          </motion.div>

          <motion.div {...fadeUp} className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                num: "01",
                title: "Safety First, Always",
                desc: "Every design decision was filtered through a safety lens. In autonomous trucking, a confusing UI element is not just a UX problem \u2014 it is a safety hazard. Warnings must be clear but not disruptive; information must be timely but not overwhelming.",
              },
              {
                num: "02",
                title: "Communicate Without Words",
                desc: "From external lighting to HMI alerts, the vehicles must communicate their intent to humans who cannot hear or speak to them. Color, motion, and timing become the primary design language for non-verbal communication at highway speeds.",
              },
              {
                num: "03",
                title: "Design for the Edge Case",
                desc: "Autonomous systems fail at the margins. Cut-ins, fallbacks, and separation events are rare but critical. Designing for these edge cases \u2014 not just the happy path \u2014 is what makes the difference between a demo and a product.",
              },
            ].map((principle) => (
              <div
                key={principle.num}
                className="rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-100 to-transparent p-8"
              >
                <span className="font-mono text-[14px] text-accent">
                  {principle.num}
                </span>
                <h3 className="mt-3 font-serif text-[22px] leading-[1.3] tracking-[-0.3px] text-gray-900">
                  {principle.title}
                </h3>
                <p className="mt-3 font-sans text-[15px] leading-[1.7] text-gray-400">
                  {principle.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="px-8 lg:px-16">
        <div className="mx-auto max-w-[1200px] border-t border-gray-200" />
      </div>

      {/* ── Takeaways ── */}
      <section className="px-8 py-16 lg:px-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div {...fadeUp}>
            <span className="font-mono text-[80px] font-bold leading-[1] text-gray-200 lg:text-[120px]">
              06
            </span>
            <h2 className="-mt-4 font-serif text-[32px] leading-[1.25] tracking-[-0.5px] text-gray-900 md:text-[40px]">
              Key Takeaways
            </h2>
          </motion.div>

          <motion.div {...fadeUp} className="mt-12 grid gap-8 lg:grid-cols-3">
            <div className="relative rounded-2xl border border-gray-200 bg-gray-50/80 p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                >
                  <path d="M4 6h16M4 10h12M4 14h8M4 18h4" />
                </svg>
              </div>
              <h3 className="mt-5 font-serif text-[22px] leading-[1.3] tracking-[-0.3px] text-gray-900">
                Managing Parallel Tasks
              </h3>
              <p className="mt-3 font-sans text-[15px] leading-[1.7] text-gray-400">
                Learned how to handle multiple tasks efficiently, allocate time
                wisely, and prioritize based on importance and urgency. Balancing
                the dispatch app, HMI design, and lighting system simultaneously
                demanded rigorous time management and clear communication.
              </p>
            </div>

            <div className="relative rounded-2xl border border-gray-200 bg-gray-50/80 p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <h3 className="mt-5 font-serif text-[22px] leading-[1.3] tracking-[-0.3px] text-gray-900">
                Product Sense
              </h3>
              <p className="mt-3 font-sans text-[15px] leading-[1.7] text-gray-400">
                Developed broader strategic thinking by analyzing potential
                scenarios and features comprehensively. Went beyond pixel-perfect
                screens to consider how the product behaves in edge cases,
                participating in testing and validation alongside engineering.
              </p>
            </div>

            <div className="relative rounded-2xl border border-gray-200 bg-gray-50/80 p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h3 className="mt-5 font-serif text-[22px] leading-[1.3] tracking-[-0.3px] text-gray-900">
                Storytelling
              </h3>
              <p className="mt-3 font-sans text-[15px] leading-[1.7] text-gray-400">
                Enhanced storytelling skills through the promotional video and
                concept definition work. By starting from real-world scenarios
                and challenges, learned to present a technology-driven product
                in a simple and compelling way that resonates with diverse
                audiences.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <CaseStudyFooter />
    </main>
  );
}
