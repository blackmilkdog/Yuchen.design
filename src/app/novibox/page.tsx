"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CaseStudyNav from "@/components/CaseStudyNav";
import CaseStudyFooter from "@/components/CaseStudyFooter";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.7, ease },
};

/* ---------- Metadata ---------- */
const meta = [
  { label: "Industry", value: "E-Commerce" },
  { label: "Timeline", value: "Feb \u2013 May 2024" },
  { label: "Role", value: "Product Designer Intern" },
  { label: "Team", value: "PM, Engineers, Marketing" },
  { label: "Deliverables", value: "Hi-fi Prototypes" },
  { label: "Tools", value: "Figma" },
];

/* ---------- Metrics ---------- */
const metrics = [
  { stat: "100+", label: "Interactive Hi-fi Prototypes" },
  { stat: "50+", label: "Components Built" },
  { stat: "35+", label: "Key Interfaces Tested" },
  { stat: "92.9%", label: "Task Success Rate" },
];

/* ---------- Sections ---------- */
const sections = [
  {
    num: "01",
    title: "The Problem",
    body: `NoviBox is an online gift shopping platform aiming to enrich everyday lifestyles with uniquely designed products. Their research revealed that most users spend a considerable amount of time browsing and selecting gifts, resulting in prolonged decision-making, user drop-off, and lower purchase conversion rates.\n\nTo address this, NoviBox set out to introduce an AI shopping assistant to enhance the gift selection, purchasing, and post-sale experience through data-driven personalized recommendations.`,
  },
  {
    num: "02",
    title: "Research & Discovery",
    body: `We began with desk research that surfaced a striking insight: 47% of consumers would buy items via a chatbot. A competitive analysis of Urban Outfitters, Amazon, and Bing Copilot revealed a fragmented landscape \u2014 clean but rigid preset flows, strong after-sales UI with no purchase recommendations, and powerful AI suggestions that required redirection to other platforms.\n\nA survey of 100 respondents (15 questions across user needs, interaction styles, and feature design) confirmed that 93% already understood AI-driven features and chatbots, validating a high baseline of user readiness for an AI-first shopping experience.`,
  },
  {
    num: "03",
    title: "Explore Products with AI Swipe",
    body: `The first core flow lets users explore products through an AI-powered swipe experience. By simply collecting users\u2019 preferred styles, the assistant curates a personalized feed and guides users to add items to their cart or purchase directly within the chat.\n\nUsability testing revealed that users needed a more prominent \u201cReview My Favorite List\u201d prompt, along with discount information and detailed product descriptions surfaced earlier in the flow.`,
  },
  {
    num: "04",
    title: "Find a Gift with AI",
    body: `The second flow comprehensively gathers users\u2019 gift-buying needs \u2014 occasion, recipient, budget \u2014 and returns a refreshable recommendation list with three potential matches at a time.\n\nThis flow achieved a 92.9% task success rate with only a 7.1% drop-off. However, the initial misclick rate of 37.5% prompted us to add a direct \u201cView Product Details\u201d button so users could build comprehensive understanding before committing.`,
  },
  {
    num: "05",
    title: "Customer Service & Order Help",
    body: `For post-purchase support, the assistant collects user feedback, provides human customer support hand-off, and surfaces policy and refund/return services \u2014 all within the chat interface.\n\nThe Order Help module supports after-sales services like quick order inquiries, address modifications, order cancellations, and return/refund processing, keeping users inside a single conversational flow rather than navigating disconnected help pages.`,
  },
  {
    num: "06",
    title: "A/B Testing & Iteration",
    body: `We tested two interaction paradigms across the full prototype suite. 69% of testers preferred Version A, which reduced the user misclick rate by 24% compared to Version B.\n\nThe checkout flow surfaced a critical insight: an 82.5% drop-off rate at the add-to-cart stage, caused by the absence of a direct purchase button. Users had to view product details before purchasing, and the \u201cView Details\u201d button lacked clear visibility. These findings drove a redesign that surfaced purchase actions earlier and more prominently.`,
  },
];

/* ---------- Design Principles ---------- */
const principles = [
  {
    title: "Conversational, Not Transactional",
    description:
      "The AI assistant should feel like a knowledgeable friend, not a vending machine. Every interaction captures intent and refines recommendations through natural dialogue.",
  },
  {
    title: "Progressive Disclosure",
    description:
      "Surface just enough information to maintain momentum. Detailed product specs, pricing, and reviews are one tap away but never block the decision flow.",
  },
  {
    title: "Reduce Friction to Zero",
    description:
      "Users should be able to discover, evaluate, and purchase without ever leaving the chat. Every redirect is a potential drop-off.",
  },
  {
    title: "Data-Driven Personalization",
    description:
      "Style preferences, occasion context, and browsing behavior combine to produce recommendations that feel curated, not algorithmic.",
  },
];

/* ---------- Takeaways ---------- */
const takeaways = [
  {
    title: "Test Early with Real Interactions",
    body: "With 100+ interactive prototypes and 35+ tested interfaces, high-fidelity testing uncovered misclick patterns and drop-off points that static mocks would have missed entirely.",
  },
  {
    title: "Visibility Drives Conversion",
    body: "The 82.5% checkout drop-off taught us that even well-designed features fail when critical actions lack visual prominence. Surfacing purchase buttons earlier produced measurable lifts.",
  },
  {
    title: "AI Readiness Is Higher Than You Think",
    body: "93% of surveyed users already understood AI chatbots. The barrier isn\u2019t adoption \u2014 it\u2019s execution. Users expect AI interactions to be as polished as the rest of the product.",
  },
];

/* ========== Page Component ========== */
export default function NoviBoxCaseStudy() {
  return (
    <main className="relative min-h-screen bg-bg text-white">
      {/* Grain texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.08]"
        style={{ backgroundImage: "url(/images/grain-texture.png)" }}
      />

      <CaseStudyNav />

      {/* --- Hero Header --- */}
      <header className="relative overflow-hidden border-b border-white/[0.06] px-8 lg:px-16">
        {/* Hero glow orbs */}
        <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-accent/[0.08] blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-[300px] w-[300px] rounded-full bg-accent-secondary/[0.06] blur-[100px]" />

        <div className="mx-auto max-w-[1200px] pb-16 pt-20 lg:pt-28">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-mono text-sm uppercase tracking-[0.15em] text-accent"
          >
            BonCamel &middot; E-Commerce Startup
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-4 max-w-[800px] font-serif text-[48px] font-normal leading-[1.15] tracking-[-1.5px] text-white lg:text-[72px]"
          >
            Chat-based AI Shopping Agent
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-6 max-w-[640px] font-sans text-lg leading-[1.7] text-white/50 lg:text-xl"
          >
            Designing an end-to-end AI shopping flow &mdash; from intent capture
            to personalized recommendations to seamless checkout &mdash; for an
            online gift platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6"
          >
            {meta.map((m) => (
              <div key={m.label}>
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-white/25">
                  {m.label}
                </p>
                <p className="mt-1 font-sans text-sm text-white/50">
                  {m.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* --- Impact Metrics --- */}
      <section className="border-b border-white/[0.06] px-8 lg:px-16">
        <div className="mx-auto max-w-[1200px] py-16">
          <motion.div
            {...fadeUp}
            className="grid grid-cols-2 gap-4 lg:grid-cols-4"
          >
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm lg:p-8"
              >
                <p className="font-serif text-[36px] leading-none tracking-[-1px] text-accent lg:text-[48px]">
                  {m.stat}
                </p>
                <p className="mt-3 font-sans text-sm leading-snug text-white/50">
                  {m.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- Numbered Sections --- */}
      {sections.map((s, i) => (
        <section
          key={s.num}
          className="border-b border-white/[0.06] px-8 lg:px-16"
        >
          <div className="mx-auto max-w-[1200px] py-16 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease }}
            >
              <div className="flex items-start gap-6 lg:gap-12">
                {/* Section number */}
                <span className="hidden shrink-0 font-mono text-[80px] leading-none text-white/[0.06] lg:block lg:text-[120px]">
                  {s.num}
                </span>

                <div className="flex-1">
                  <h2 className="font-serif text-[32px] font-normal leading-[1.2] tracking-[-0.5px] text-white lg:text-[42px]">
                    {s.title}
                  </h2>

                  <div className="mt-6 space-y-4">
                    {s.body.split("\n\n").map((paragraph, pi) => (
                      <p
                        key={pi}
                        className="max-w-[680px] font-sans text-[17px] leading-[1.8] text-white/50 lg:text-[18px]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* --- Design Principles --- */}
      <section className="border-b border-white/[0.06] px-8 lg:px-16">
        <div className="mx-auto max-w-[1200px] py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.15em] text-accent-secondary">
              Guiding Principles
            </p>
            <h2 className="mt-4 font-serif text-[32px] font-normal leading-[1.2] tracking-[-0.5px] text-white lg:text-[42px]">
              Design Philosophy
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm lg:p-10"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 bg-accent/10">
                  <span className="font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-serif text-xl leading-snug text-white">
                  {p.title}
                </h3>
                <p className="mt-3 font-sans text-[15px] leading-[1.7] text-white/50">
                  {p.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Key Insight Callout --- */}
      <section className="px-8 lg:px-16">
        <div className="mx-auto max-w-[1200px] py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-accent/[0.06] via-white/[0.02] to-accent-secondary/[0.04] p-10 backdrop-blur-sm lg:p-16"
          >
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/[0.12] blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent-secondary/[0.08] blur-[100px]" />

            <p className="relative font-mono text-sm uppercase tracking-[0.15em] text-accent">
              Key Insight
            </p>
            <p className="relative mt-6 max-w-[720px] font-serif text-[24px] leading-[1.5] tracking-[-0.5px] text-white lg:text-[32px]">
              &ldquo;69% of testers preferred Version A, which reduced misclick
              rates by 24%. Meanwhile, an 82.5% checkout drop-off exposed that
              missing direct purchase buttons was the single largest conversion
              blocker.&rdquo;
            </p>
            <p className="relative mt-4 font-sans text-sm text-white/40">
              &mdash; A/B Testing Results, NoviBox AI Assistant
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Takeaways --- */}
      <section className="border-t border-white/[0.06] px-8 lg:px-16">
        <div className="mx-auto max-w-[1200px] py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.15em] text-accent-secondary">
              Reflections
            </p>
            <h2 className="mt-4 font-serif text-[32px] font-normal leading-[1.2] tracking-[-0.5px] text-white lg:text-[42px]">
              Takeaways
            </h2>
          </motion.div>

          <div className="mt-12 space-y-8">
            {takeaways.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="flex gap-6 border-l-2 border-accent/30 py-2 pl-8 lg:gap-12"
              >
                <span className="hidden shrink-0 font-mono text-[48px] leading-none text-white/[0.06] lg:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-xl leading-snug text-white lg:text-2xl">
                    {t.title}
                  </h3>
                  <p className="mt-3 max-w-[600px] font-sans text-[16px] leading-[1.7] text-white/50">
                    {t.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CaseStudyFooter />
    </main>
  );
}
