"use client";

import { motion } from "framer-motion";
import CaseStudyNav from "@/components/CaseStudyNav";
import CaseStudyFooter from "@/components/CaseStudyFooter";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Metadata grid item ─── */
function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-gray-400">
        {label}
      </p>
      <p className="mt-1 font-sans text-[15px] leading-[1.6] text-gray-800">
        {value}
      </p>
    </div>
  );
}

/* ─── Impact metric card ─── */
function MetricCard({
  label,
  value,
  detail,
  delay = 0,
}: {
  label: string;
  value: string;
  detail: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease }}
      className="rounded-2xl border border-gray-200 bg-gray-50 p-6 backdrop-blur-md"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-gray-400">
        {label}
      </p>
      <p className="mt-2 font-serif text-[32px] leading-[1.1] tracking-[-0.5px] text-accent">
        {value}
      </p>
      <p className="mt-2 font-sans text-[14px] leading-[1.6] text-gray-500">
        {detail}
      </p>
    </motion.div>
  );
}

/* ─── Design principle card ─── */
function PrincipleCard({
  number,
  title,
  body,
  delay = 0,
}: {
  number: string;
  title: string;
  body: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease }}
      className="rounded-2xl border border-gray-200 bg-gray-50/80 p-6"
    >
      <span className="font-mono text-[12px] text-accent/70">{number}</span>
      <h4 className="mt-2 font-serif text-[18px] leading-[1.3] text-gray-900">
        {title}
      </h4>
      <p className="mt-3 font-sans text-[14px] leading-[1.7] text-gray-500">
        {body}
      </p>
    </motion.div>
  );
}

/* ─── Section header with number ─── */
function SectionHeader({
  number,
  title,
  quote,
}: {
  number: string;
  title: string;
  quote: string;
}) {
  return (
    <FadeIn>
      <div className="mb-12">
        <span className="font-mono text-[72px] font-bold leading-none text-gray-200">
          {number}
        </span>
        <h3 className="mt-4 font-serif text-[36px] leading-[1.2] tracking-[-0.5px] text-gray-900 lg:text-[42px]">
          {title}
        </h3>
        <p className="mt-4 max-w-[720px] font-sans text-[17px] italic leading-[1.7] text-gray-400">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
    </FadeIn>
  );
}

/* ─── Subsection block ─── */
function SubBlock({
  title,
  children,
  delay = 0,
}: {
  title?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <FadeIn delay={delay} className="mb-10">
      {title && (
        <h4 className="mb-3 font-serif text-[22px] leading-[1.3] tracking-[-0.3px] text-gray-900">
          {title}
        </h4>
      )}
      {children}
    </FadeIn>
  );
}

/* ─── Body text helper ─── */
function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[16px] leading-[1.8] text-gray-500 lg:text-[17px]">
      {children}
    </p>
  );
}

function BodyStrong({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-gray-800 font-medium">{children}</span>
  );
}

/* ─── Divider ─── */
function Divider() {
  return <div className="border-t border-gray-200" />;
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function CodePayPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <CaseStudyNav />

      {/* ═══ HERO ═══ */}
      <header className="border-b border-gray-200 px-8 lg:px-16">
        <div className="mx-auto max-w-[1200px] pb-16 pt-20 lg:pt-28">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-mono text-sm uppercase tracking-[0.15em] text-[#fa5c40]"
          >
            CodePay &middot; Fintech Startup
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-4 max-w-[800px] font-serif text-[48px] font-normal leading-[1.15] tracking-[-1.5px] text-gray-900 lg:text-[72px]"
          >
            B2B Payment System
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-6 max-w-[640px] font-sans text-lg leading-[1.7] text-gray-500 lg:text-xl"
          >
            Designing Decision Infrastructure in High-Risk Payments &mdash;
            building a cross-product design system, refactoring high-trust
            workflows, and prototyping AI-first experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-5"
          >
            <MetaItem label="Industry" value="Fintech" />
            <MetaItem label="Timeline" value="2025.07 - Now" />
            <MetaItem label="Role" value="Founding Designer + PM" />
            <MetaItem label="Tools" value="Figma, Prototyping, AI-assisted workflow" />
            <MetaItem label="My Scope" value="Design System, Risk-aware UX, End-to-End Ownership" />
          </motion.div>
        </div>
      </header>

      {/* ═══ IMPACT METRICS ═══ */}
      <section className="px-8 lg:px-16 py-16">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="mb-10 font-serif text-[28px] leading-[1.2] tracking-[-0.5px] text-gray-900 lg:text-[32px]">
              Impact
            </h2>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              label="Scale"
              value="7,000+"
              detail="Active terminals processing ~400K weekly transactions"
              delay={0}
            />
            <MetricCard
              label="Onboarding"
              value="~30%"
              detail="Reduction in setup complexity through guided stepper redesign"
              delay={0.08}
            />
            <MetricCard
              label="User Growth"
              value="3x"
              detail="User growth in 2 months (B2B2B POC), ~85% engaged session rate"
              delay={0.16}
            />
            <MetricCard
              label="Support"
              value="~20%"
              detail="Drop in partner support inquiries from operational feedback improvements"
              delay={0.24}
            />
          </div>

          <FadeIn delay={0.1}>
            <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6 backdrop-blur-md">
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-gray-400">
                GTM
              </p>
              <p className="mt-2 font-sans text-[15px] leading-[1.7] text-gray-500">
                Interactive <BodyStrong>AI-driven prototypes</BodyStrong> via
                vibe coding to help stakeholders align on value, risk controls,
                and roadmap priorities for external pitching. Official website +
                pitch assets that standardized messaging &amp; reduced sales
                &ldquo;explain cost.&rdquo;
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ═══ WHY IT'S HARD ═══ */}
      <section className="px-8 lg:px-16 py-16">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="mb-8 font-serif text-[28px] leading-[1.2] tracking-[-0.5px] text-gray-900 lg:text-[32px]">
              Why It&rsquo;s Hard
            </h2>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "High-risk payments",
                body: "Mistakes cost money and trust. Every interaction with the payment flow carries real financial consequence.",
              },
              {
                title: "Multi-product scaling",
                body: "Inconsistent states, definitions, and patterns across products made coherent experience impossible.",
              },
              {
                title: "Limited resources",
                body: "Must patch what's broken today while rebuilding the entire system for tomorrow.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-6 h-full">
                  <h4 className="font-serif text-[18px] leading-[1.3] text-gray-900">
                    {item.title}
                  </h4>
                  <p className="mt-3 font-sans text-[14px] leading-[1.7] text-gray-500">
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ STRATEGY: DUAL-TRACK ═══ */}
      <section className="px-8 lg:px-16 py-16">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="mb-8 font-serif text-[28px] leading-[1.2] tracking-[-0.5px] text-gray-900 lg:text-[32px]">
              Strategy: Dual-Track Delivery
            </h2>
          </FadeIn>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                label: "Patch Track",
                body: "Risk-ranked fixes from real feedback — guardrails and validation that solve what's urgent today.",
              },
              {
                label: "Platform Track",
                body: "Rebuild the system in parallel with staged rollout — feature flags, gradual migration, one source of truth.",
              },
              {
                label: "Prototype & AI Workflow",
                body: "Rapid demos + AI-assisted iteration to run tight build-measure-learn loops: align, test, ship.",
              },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.08}>
                <div className="rounded-2xl border border-accent/20 bg-accent/[0.04] p-6">
                  <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-accent">
                    {item.label}
                  </p>
                  <p className="mt-3 font-sans text-[15px] leading-[1.7] text-gray-500">
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ 01 — PATCH TRACK ═══ */}
      <section className="px-8 lg:px-16 py-20">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number="01"
            title="Patch Track"
            quote="I turned noisy requests into high-leverage fixes with guardrails and consistent state patterns."
          />

          {/* Process overview */}
          <FadeIn>
            <div className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                "Lots of needs from customers",
                "Organize & prioritize in our requirement pool",
                "From noisy requests to high-leverage fixes",
                "Small iterations, fast launch, aligned with expectations",
              ].map((step, i) => (
                <div
                  key={step}
                  className="rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-4 text-center"
                >
                  <span className="block font-mono text-[11px] text-accent/60 mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-sans text-[13px] leading-[1.5] text-gray-500">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* ── Four Design Principles ── */}
          <FadeIn>
            <h3 className="mb-8 font-serif text-[26px] leading-[1.2] tracking-[-0.3px] text-gray-900">
              Four Design Principles
            </h3>
          </FadeIn>

          {/* Principle 1 */}
          <SubBlock title="Principle 1: Make system state always visible">
            <Body>
              When people are moving fast, they fill in the gaps. An ambiguous
              system doesn&rsquo;t pause anyone — it just gets interpreted,
              often wrong. Showing the right state at the right moment is the
              cheapest form of error prevention.
            </Body>
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50/80 p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-gray-300 mb-2">
                Problem
              </p>
              <Body>
                System previously only supported full refunds. Adding partial
                refund meant staff had to make decisions with no feedback on
                selections or remaining amount.
              </Body>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-gray-300 mt-4 mb-2">
                Decision
              </p>
              <Body>
                The refund screen updates in real time as selections change:
                remaining refundable amount, per-item breakdowns, and the
                running total all reflect the current state instantly.{" "}
                <span className="text-gray-400 font-mono text-[12px]">
                  Ops Platform v2.5.0
                </span>
              </Body>
            </div>
          </SubBlock>

          {/* Principle 2 */}
          <SubBlock title="Principle 2: Prevent errors before they happen" delay={0.05}>
            <Body>
              The best error message is the one that never appears. The earlier
              you catch a mistake — through structure, constraints, and real-time
              feedback — the less damage it can do.
            </Body>
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50/80 p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-gray-300 mb-2">
                Problem
              </p>
              <Body>
                Manual card entry had no field-by-field guidance. Staff could
                move between fields without completing them correctly.
              </Body>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-gray-300 mt-4 mb-2">
                Decision
              </p>
              <Body>
                Redesigned with auto-focus jump logic, input highlighting, and
                confirm disabled until all fields pass validation.{" "}
                <span className="text-gray-400 font-mono text-[12px]">
                  Payment App v2.1.7
                </span>
              </Body>
            </div>
          </SubBlock>

          {/* Principle 3 */}
          <SubBlock
            title="Principle 3: Reduce cognitive load at the moment of action"
            delay={0.05}
          >
            <Body>
              Attention is finite. Every extra element competing for focus at a
              critical moment is a cost paid in mistakes and slowness. Good
              design doesn&rsquo;t ask people to ignore what&rsquo;s irrelevant
              — it just doesn&rsquo;t show it.
            </Body>
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50/80 p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-gray-300 mb-2">
                Problem
              </p>
              <Body>
                Configuration template options could be edited in place, creating
                ambiguity about whether changes affected current setup or saved
                template.
              </Body>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-gray-300 mt-4 mb-2">
                Decision
              </p>
              <Body>
                Split into two distinct contexts: the template panel during
                configuration only allows applying a template, not modifying it.
                Any edits to saved templates happen on a separate management page
                with a different layout. Same content, different intent,
                different surface.{" "}
                <span className="text-gray-400 font-mono text-[12px]">
                  Ops Platform v2.5.1
                </span>
              </Body>
            </div>
          </SubBlock>

          {/* Principle 4 */}
          <SubBlock
            title="Principle 4: Keep dangerous actions reversible and distinct"
            delay={0.05}
          >
            <Body>
              Not all actions are equal, but they can easily look that way. When
              something can&rsquo;t be undone, or carries consequences beyond the
              current screen, the interface should make that difference felt — not
              just stated.
            </Body>
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50/80 p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-gray-300 mb-2">
                Problem
              </p>
              <Body>
                Partially approved transactions used the same visual language as
                completed ones — a checkmark, confirmation color. Merchants
                often didn&rsquo;t register remaining balance to collect.
              </Body>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-gray-300 mt-4 mb-2">
                Decision
              </p>
              <Body>
                Redesigned to surface the remaining amount and available next
                steps immediately, without an extra tap. Skip is still
                accessible, but it&rsquo;s no longer the path of least
                resistance.{" "}
                <span className="text-gray-400 font-mono text-[12px]">
                  Payment App v2.1.8
                </span>
              </Body>
            </div>
          </SubBlock>

          {/* Patch track conclusion */}
          <FadeIn>
            <div className="mt-8 rounded-2xl border border-accent/20 bg-accent/[0.04] p-6">
              <Body>
                Patches solved what was urgent — but revealed harder problems.
                The design files had no shared system: every fix siloed, no
                source of truth, nothing cleanly handed off. And structurally,
                the information architecture had problems that incremental
                changes couldn&rsquo;t reach.{" "}
                <BodyStrong>The only path forward was a rebuild.</BodyStrong>
              </Body>
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ═══ 02 — PLATFORM TRACK ═══ */}
      <section className="px-8 lg:px-16 py-20">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number="02"
            title="Platform Track"
            quote="I reduced design debt and improved consistency via componentized IA and a governance-ready system."
          />

          {/* Foundation */}
          <SubBlock title="Foundation">
            <Body>
              Built a cross-product foundation — an open-source library
              reskinned with brand tokens: colors, type scale, spacing. One
              source of truth for everything across all products.
            </Body>
          </SubBlock>

          {/* ── PayPilot ── */}
          <FadeIn>
            <div className="mb-4 mt-12 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1">
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-accent">
                PayPilot — Partner Ops Platform
              </span>
            </div>
          </FadeIn>

          <SubBlock title="Onboarding Restructure">
            <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.1em] text-gray-400">
              Role: UX Design &amp; Information Architecture
            </p>
            <Body>
              Led rapid prototyping using AI-assisted tooling (Figma Make) to
              accelerate alignment across PM and engineering.
            </Body>
          </SubBlock>

          <SubBlock title="The Core Problem: Nobody could learn it without training">
            <div className="grid gap-4 sm:grid-cols-3 mt-4">
              {[
                {
                  num: "01",
                  label: "False completion signal",
                  detail:
                    "Users are told they've 'completed' onboarding, but still need to perform critical setup steps — creating confusion and mistrust in system feedback.",
                },
                {
                  num: "02",
                  label: "Onboarding embedded in management",
                  detail:
                    "Setup tasks are scattered across management pages with unrelated tabs, forcing users to navigate back and forth without a clear path.",
                },
                {
                  num: "03",
                  label: "No guided flow or progress tracking",
                  detail:
                    "There is no structured onboarding journey, checklist, or progress indicator — users cannot tell what's done, what's missing, or when they are truly finished.",
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="rounded-xl border border-gray-200 bg-gray-50/80 p-5"
                >
                  <span className="font-mono text-[12px] text-accent/60">
                    {item.num}
                  </span>
                  <h5 className="mt-2 font-sans text-[15px] font-medium leading-[1.4] text-gray-800">
                    {item.label}
                  </h5>
                  <p className="mt-2 font-sans text-[13px] leading-[1.7] text-gray-400">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </SubBlock>

          <SubBlock title="The Solution">
            <Body>
              The fix was structural: collapse everything into a{" "}
              <BodyStrong>three-step guided stepper</BodyStrong>, strip
              management actions out of the onboarding context entirely, and make
              completion criteria explicit at every step.
            </Body>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Stepper + footer provide clear progress and system status",
                "Validation gates progression — CTA only activates when all required inputs complete",
                "Explicit status feedback builds confidence and reduces ambiguity",
                "Inline recovery actions enable quick resolution without restarting flow",
                "Decoupling management from onboarding prevents context switching",
                "Clear separation ensures onboarding remains focused, linear, completion-driven",
              ].map((feat) => (
                <div
                  key={feat}
                  className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50/50 px-4 py-3"
                >
                  <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                  <p className="font-sans text-[13px] leading-[1.6] text-gray-500">
                    {feat}
                  </p>
                </div>
              ))}
            </div>
          </SubBlock>

          <SubBlock title="Navigation Design">
            <Body>
              Linked sidebar navigation reduces friction in long, scroll-heavy
              forms. Sub-stepper introduces granularity, making complex setup
              easier to track and complete.
            </Body>
          </SubBlock>

          <SubBlock title="Engineering Constraint Adaptation">
            <Body>
              When engineering scope changed, the design had to adapt. The
              original plan unified all onboarding steps in one platform.
              Engineering confirmed it wasn&rsquo;t feasible for this release — a
              key step had to live in a separate system. The revised approach:
              instead of asking users to find it themselves, that step became a{" "}
              <BodyStrong>
                direct deep-link into the exact right place
              </BodyStrong>{" "}
              in the other platform. One click, no navigation overhead. The
              constraint stayed invisible to the user.
            </Body>
          </SubBlock>

          <SubBlock title="On Using AI to Move Faster">
            <Body>
              This project was IA-heavy and multi-page, with a PM who needed to
              review and iterate quickly. The traditional approach — design in
              Figma, export, review, revise — was too slow for the pace we
              needed. I chose Figma Make specifically because it outputs
              something interactive: PM could click through flows directly,
              engineering could flag feasibility issues early, and I could react
              to real feedback instead of guesses.
            </Body>
            <div className="mt-4">
              <Body>
                Within{" "}
                <BodyStrong>2 days of a PRD brief</BodyStrong>, there was a
                working prototype in front of the team. I iterated on{" "}
                <BodyStrong>100+ versions</BodyStrong> before it went to the
                export step.
              </Body>
            </div>
          </SubBlock>

          {/* AI workflow steps */}
          <FadeIn>
            <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                "Define structure & constraints",
                "Build mid-fi flows fast",
                "Iterate with interactive prototypes",
                "Refine & finalize in Figma",
              ].map((step, i) => (
                <div
                  key={step}
                  className="rounded-xl border border-accent/15 bg-accent/[0.03] px-4 py-4 text-center"
                >
                  <span className="block font-mono text-[11px] text-accent/50 mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-sans text-[13px] leading-[1.5] text-gray-500">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          <SubBlock title="AI Tradeoff Reflection">
            <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-5">
              <Body>
                <BodyStrong>
                  The tradeoff I didn&rsquo;t fully anticipate:
                </BodyStrong>{" "}
                Figma Make builds its own token structure. Visually close to the
                design system, architecturally separate. Some issues —
                misaligned states, broken component logic — were faster to
                rebuild from scratch than to fix inside the AI output.
              </Body>
              <div className="mt-4">
                <Body>
                  AI accelerated the decisions, not the craft. The hard parts —
                  flow logic, edge states, what to show and what to hide — still
                  required human judgment at every step. What changed was how
                  quickly we could get those decisions in front of the right
                  people.
                </Body>
              </div>
            </div>
          </SubBlock>

          <FadeIn>
            <div className="mb-14 rounded-2xl border border-accent/20 bg-accent/[0.04] p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent/70 mb-2">
                Result
              </p>
              <Body>
                Internal test: cutting estimated setup effort by{" "}
                <BodyStrong>30%</BodyStrong>.
              </Body>
            </div>
          </FadeIn>

          {/* ── Register ── */}
          <FadeIn>
            <div className="mb-4 mt-8 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1">
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-accent">
                Register — Payment App
              </span>
            </div>
          </FadeIn>

          <SubBlock title="UI/UX Rebuild">
            <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.1em] text-gray-400">
              Role: UX/UI Design Lead
            </p>
            <Body>
              Collaborated with PM on product direction; worked within
              engineering constraints on transaction logic that couldn&rsquo;t
              change.
            </Body>
          </SubBlock>

          <SubBlock title="Market Context">
            <Body>
              Most POS apps for small businesses are overdue for a rethink.
              Cluttered interfaces, unclear system states, high support ticket
              volume from merchants who couldn&rsquo;t figure out what went
              wrong — these were industry-wide symptoms. For a product running on{" "}
              <BodyStrong>7,000+ active terminals</BodyStrong> processing{" "}
              <BodyStrong>400K+ weekly transactions</BodyStrong>, the cost of
              friction isn&rsquo;t abstract. Every extra tap, every misread
              state, every confused staff member is a real operational problem
              for a real business.
            </Body>
          </SubBlock>

          <SubBlock>
            <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-5">
              <Body>
                <BodyStrong>v3.0 had one goal:</BodyStrong> rebuild it so
                it&rsquo;s fast enough for a rushed cashier, clear enough to
                learn without training, and consistent enough to scale.
              </Body>
              <div className="mt-3">
                <Body>
                  Transaction and payment logic was off-limits — those layers
                  couldn&rsquo;t change. This rebuild was mainly UI, interaction
                  design, and information architecture. The tools available were{" "}
                  <BodyStrong>clarity, hierarchy, and sequence</BodyStrong>.
                </Body>
              </div>
            </div>
          </SubBlock>

          <SubBlock title="Foundation">
            <Body>
              Built a component library on top of an open-source foundation —
              navigation bars, custom keyboards, buttons in every state, list
              rows, status chips, data display modules — then locked the tokens:
              colors, type scale, spacing rhythm. Every screen that came after
              was built from these pieces.
            </Body>
          </SubBlock>

          {/* Decision 01 */}
          <FadeIn>
            <div className="mt-10 mb-6">
              <span className="font-mono text-[12px] text-accent/60">
                Decision 01
              </span>
              <h4 className="mt-1 font-serif text-[22px] leading-[1.3] tracking-[-0.3px] text-gray-900">
                Split one screen into two
              </h4>
              <p className="mt-2 font-sans text-[15px] italic leading-[1.6] text-gray-400">
                The solution wasn&rsquo;t simplification — it was separation of
                concerns.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="grid gap-4 sm:grid-cols-2 mb-10">
              <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-gray-300 mb-3">
                  Before
                </p>
                <ul className="space-y-2">
                  {[
                    "One screen serves two audiences (staff + customer)",
                    "Cost breakdown and tip input mixed",
                    "Blurred responsibility leads to confusion and errors",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 font-sans text-[14px] leading-[1.6] text-gray-400"
                    >
                      <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-white/30" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-accent/20 bg-accent/[0.04] p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent/60 mb-3">
                  After
                </p>
                <ul className="space-y-2">
                  {[
                    "Split flow by role: staff vs customer",
                    "Staff confirms payment; customer selects tip",
                    "Clear handoff reduces errors and aligns with real-world interaction",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 font-sans text-[14px] leading-[1.6] text-gray-500"
                    >
                      <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          {/* Decision 02 */}
          <FadeIn>
            <div className="mt-10 mb-6">
              <span className="font-mono text-[12px] text-accent/60">
                Decision 02
              </span>
              <h4 className="mt-1 font-serif text-[22px] leading-[1.3] tracking-[-0.3px] text-gray-900">
                Let state drive the interface
              </h4>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="grid gap-4 sm:grid-cols-2 mb-10">
              <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-gray-300 mb-3">
                  Before
                </p>
                <ul className="space-y-2">
                  {[
                    "Key status and transaction type buried in dense fields",
                    "Requires full reading to understand context",
                    "High cognitive load before taking action",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 font-sans text-[14px] leading-[1.6] text-gray-400"
                    >
                      <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-white/30" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-accent/20 bg-accent/[0.04] p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent/60 mb-3">
                  After
                </p>
                <ul className="space-y-2">
                  {[
                    "Status surfaced first with clear, combined indicators",
                    "Type and result visually encoded for quick recognition",
                    "Scannable layout enables instant understanding without deep reading",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 font-sans text-[14px] leading-[1.6] text-gray-500"
                    >
                      <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          <SubBlock title="Edge Cases & Real-World Variability">
            <Body>
              Handles large amounts, long fields, and overflow gracefully.
              Maintains clarity across extreme states (failed, voided, partial
              flows). Designed for real-world variability, not just ideal paths.
            </Body>
          </SubBlock>

          <FadeIn>
            <div className="rounded-2xl border border-accent/20 bg-accent/[0.04] p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent/70 mb-2">
                Post-Launch
              </p>
              <Body>
                Streamlining staff workflows and reducing operational errors
                based on post-launch user feedback. Across{" "}
                <BodyStrong>6,000+ terminals</BodyStrong>.
              </Body>
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ═══ 03 — 0→1 PRODUCT ═══ */}
      <section className="px-8 lg:px-16 py-20">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number="03"
            title="0-to-1 Product (PM Role)"
            quote="I turned ambiguity into a product with a clear position, trackable behavior, and a roadmap merchants could trust."
          />

          <SubBlock>
            <Body>
              The hardest part: the product wasn&rsquo;t missing features. It was
              missing a foundation. No shared data definitions. No usage
              tracking. Noisy demand with no long-term anchor. And a B2B2B
              structure where the end user is two hops away. My job was to close
              all four gaps while shipping.
            </Body>
          </SubBlock>

          {/* Four gaps */}
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                num: "01",
                label: "Data Integrity",
                problem:
                  "Same fields, different meanings. Merchants couldn't reconcile the app with their bank.",
                action:
                  "Audited and aligned data definitions across product, eng, and ops — before writing a single new spec.",
              },
              {
                num: "02",
                label: "Invisible Usage",
                problem:
                  "No tracking existed. Every prioritization call was a guess dressed up as a decision.",
                action:
                  "Designed event taxonomy from scratch — the first product in the company with structured analytics.",
              },
              {
                num: "03",
                label: "Scattered Demand",
                problem:
                  "Real requests, no long-term anchor. Everything felt equally urgent — so nothing got prioritized well.",
                action:
                  "Made the case to the CEO to prioritize product depth over POC growth. Built a prioritization framework that balanced merchant needs against dev capacity.",
              },
              {
                num: "04",
                label: "Indirect Feedback Loop",
                problem:
                  "B2B2B meant the merchant was two hops away. Feedback arrived late and filtered.",
                action:
                  "Routed discovery through partner leads who aggregate across many merchants, filter signal from noise, and speak the product language. Turned the structural distance into a better research layer.",
              },
            ].map((gap, i) => (
              <FadeIn key={gap.num} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-gray-200 bg-gray-50/80 p-6">
                  <span className="font-mono text-[12px] text-accent/60">
                    {gap.num}
                  </span>
                  <h4 className="mt-2 font-serif text-[18px] leading-[1.3] text-gray-900">
                    {gap.label}
                  </h4>
                  <div className="mt-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gray-300 mb-1">
                      Problem
                    </p>
                    <p className="font-sans text-[13px] leading-[1.6] text-gray-400">
                      {gap.problem}
                    </p>
                  </div>
                  <div className="mt-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent/50 mb-1">
                      Action
                    </p>
                    <p className="font-sans text-[13px] leading-[1.6] text-gray-500">
                      {gap.action}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ 04 — GTM NARRATIVE ═══ */}
      <section className="px-8 lg:px-16 py-20">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number="04"
            title="GTM Narrative"
            quote="I standardized messaging through website + pitch assets to reduce sales 'explain cost.'"
          />

          <SubBlock>
            <Body>
              Built reusable GTM assets in collaborative platforms — interactive
              AI-driven prototypes via vibe coding to help stakeholders align on
              value, risk controls, and roadmap priorities for external pitching.
              Official website and pitch assets that standardized messaging and
              reduced the cost of every sales conversation.
            </Body>
          </SubBlock>
        </div>
      </section>

      <Divider />

      {/* ═══ DESIGN PRINCIPLES CALLOUT ═══ */}
      <section className="px-8 lg:px-16 py-20">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="mb-10 font-serif text-[28px] leading-[1.2] tracking-[-0.5px] text-gray-900 lg:text-[32px]">
              Design Principles
            </h2>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <PrincipleCard
              number="01"
              title="State Visibility"
              body="Show the right state at the right moment. Ambiguity doesn't pause anyone — it just gets interpreted, often wrong."
              delay={0}
            />
            <PrincipleCard
              number="02"
              title="Error Prevention"
              body="The best error message is the one that never appears. Catch mistakes early through structure, constraints, and real-time feedback."
              delay={0.08}
            />
            <PrincipleCard
              number="03"
              title="Cognitive Load Reduction"
              body="Attention is finite. Good design doesn't ask people to ignore what's irrelevant — it just doesn't show it."
              delay={0.16}
            />
            <PrincipleCard
              number="04"
              title="Reversibility"
              body="Not all actions are equal. When something can't be undone, the interface should make that difference felt — not just stated."
              delay={0.24}
            />
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ TAKEAWAYS ═══ */}
      <section className="px-8 lg:px-16 py-20">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="mb-10 font-serif text-[28px] leading-[1.2] tracking-[-0.5px] text-gray-900 lg:text-[32px]">
              Takeaways
            </h2>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Payments UX = trust & risk management",
                body: "Status visibility, error prevention, and reversibility matter more than visual polish. In high-risk payments, trust is the product.",
              },
              {
                title: "Data truth is a product surface",
                body: "Semantic rigor — time ranges, definitions, consistent terminology — is what makes dashboards believable and decisions possible.",
              },
              {
                title:
                  "Dual-track delivery is a founding designer's real job",
                body: "Patch keeps trust today; platform rebuild enables scale tomorrow. The skill is knowing which to prioritize at every moment.",
              },
              {
                title:
                  "AI should be an acceleration layer for decision loops",
                body: "But only with guardrails, confirmation, and traceability. AI accelerated the decisions, not the craft.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-6 h-full">
                  <h4 className="font-serif text-[18px] leading-[1.3] text-gray-900">
                    {item.title}
                  </h4>
                  <p className="mt-3 font-sans text-[15px] leading-[1.7] text-gray-500">
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CaseStudyFooter />
    </main>
  );
}
