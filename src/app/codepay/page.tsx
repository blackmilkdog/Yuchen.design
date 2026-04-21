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
      <p className="mt-1 font-sans text-[15px] leading-[1.6] text-gray-700">
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
      className="rounded-2xl border border-gray-200 bg-gray-50 p-6 backdrop-blur-sm"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-gray-400">
        {label}
      </p>
      <p className="mt-2 font-serif text-[32px] leading-[1.1] tracking-[-0.5px] text-accent">
        {value}
      </p>
      <p className="mt-2 font-sans text-[14px] leading-[1.6] text-gray-400">
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
      className="rounded-2xl border border-gray-200 bg-gray-50/80 p-6 backdrop-blur-sm"
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
        <span className="font-mono text-[72px] font-bold leading-none text-gray-100">
          {number}
        </span>
        <h3 className="mt-4 font-serif text-[36px] leading-[1.2] tracking-[-0.5px] text-gray-900 lg:text-[42px]">
          {title}
        </h3>
        <p className="mt-4 max-w-[900px] font-sans text-[17px] italic leading-[1.7] text-gray-400">
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
  return (
    <div className="relative">
      <div className="border-t border-gray-100" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function CodePayPage() {
  return (
    <main className="relative min-h-screen bg-white text-gray-900">
      {/* Grain */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03]"
        style={{ backgroundImage: "url(/images/grain-texture.png)" }}
      />

      <CaseStudyNav />

      {/* ═══ HERO ═══ */}
      <header className="relative overflow-hidden border-b border-gray-200 px-8 lg:px-16">
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

        {/* Hero glow orbs */}
        <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-accent/[0.05] blur-[150px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-[300px] w-[300px] rounded-full bg-accent-secondary/[0.04] blur-[120px]" />
      </header>

      {/* Hero product overview */}
      <section className="px-8 lg:px-16 py-8">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn>
            <div className="overflow-hidden rounded-2xl border border-gray-200">
              <img src="/images/codepay/overview-ecosystem.png" alt="CodePay product ecosystem — Partner Ops, Payment, Merchant Ops" className="w-full" />
            </div>
          </FadeIn>
        </div>
      </section>

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
            <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6 backdrop-blur-sm">
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
                <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-6 h-full backdrop-blur-sm">
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
                body: "Risk-ranked fixes from real feedback. Guardrails and validation that solve what's urgent today.",
              },
              {
                label: "Platform Track",
                body: "Rebuild the system in parallel with staged rollout. Feature flags, gradual migration, one source of truth.",
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
                  className="rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-4 text-center backdrop-blur-sm"
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
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50/80 p-5 backdrop-blur-sm">
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

          {/* Principle 1 image */}
          <FadeIn>
            <div className="mb-10 overflow-hidden rounded-2xl border border-gray-200">
              <img src="/images/codepay/patch-refund-before-after.png" alt="Refund UI before and after" className="w-full" />
            </div>
          </FadeIn>

          {/* Principle 2 */}
          <SubBlock title="Principle 2: Prevent errors before they happen" delay={0.05}>
            <Body>
              The best error message is the one that never appears. The earlier
              you catch a mistake — through structure, constraints, and real-time
              feedback — the less damage it can do.
            </Body>
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50/80 p-5 backdrop-blur-sm">
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

          {/* Principle 2 image */}
          <FadeIn>
            <div className="mb-10 overflow-hidden rounded-2xl border border-gray-200">
              <img src="/images/codepay/patch-card-input-flow.png" alt="Card input step-by-step progression" className="w-full" />
            </div>
          </FadeIn>

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
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50/80 p-5 backdrop-blur-sm">
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

          {/* Principle 3 image */}
          <FadeIn>
            <div className="mb-10 overflow-hidden rounded-2xl border border-gray-200">
              <img src="/images/codepay/patch-template-config.png" alt="Template config vs management separation" className="w-full" />
            </div>
          </FadeIn>

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
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50/80 p-5 backdrop-blur-sm">
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

          {/* Principle 4 image */}
          <FadeIn>
            <div className="mb-10 overflow-hidden rounded-2xl border border-gray-200">
              <img src="/images/codepay/patch-partial-approve.png" alt="Partial approve before and after" className="w-full" />
            </div>
          </FadeIn>

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
              Built a cross-product foundation on top of an open-source library,
              reskinned with brand tokens: colors, type scale, spacing. One
              source of truth for everything across all products.
            </Body>
          </SubBlock>

          <FadeIn>
            <div className="mb-10 overflow-hidden rounded-2xl border border-gray-200">
              <img src="/images/codepay/platform-design-system.png" alt="Design system — colors, typography, tokens" className="w-full" />
            </div>
          </FadeIn>

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
                  className="rounded-xl border border-gray-200 bg-gray-50/80 p-5 backdrop-blur-sm"
                >
                  <span className="font-mono text-[12px] text-accent/60">
                    {item.num}
                  </span>
                  <h5 className="mt-2 font-sans text-[15px] font-medium leading-[1.4] text-gray-700">
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

          {/* Onboarding flow images */}
          <FadeIn>
            <div className="mb-6 overflow-hidden rounded-2xl border border-gray-200">
              <img src="/images/codepay/platform-onboarding-annotated.png" alt="Onboarding stepper with annotations" className="w-full" />
            </div>
          </FadeIn>

          <FadeIn>
            <div className="mb-10 overflow-hidden rounded-2xl border border-gray-200">
              <img src="/images/codepay/platform-sub-stepper.png" alt="Sub-stepper with sidebar navigation" className="w-full" />
            </div>
          </FadeIn>

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

          {/* Completion states */}
          <FadeIn>
            <div className="mb-10 overflow-hidden rounded-2xl border border-gray-200">
              <img src="/images/codepay/platform-completion-states.png" alt="Onboarding success and incomplete states" className="w-full" />
            </div>
          </FadeIn>

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
            <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-5 backdrop-blur-sm">
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
            <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-5 backdrop-blur-sm">
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

          {/* Register component library + before/after */}
          <FadeIn>
            <div className="mb-6 overflow-hidden rounded-2xl border border-gray-200">
              <img src="/images/codepay/register-component-library.png" alt="Register component library" className="w-full" />
            </div>
          </FadeIn>

          <FadeIn>
            <div className="mb-10 grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-2xl border border-gray-200">
                <img src="/images/codepay/register-old-ui.png" alt="Register v2 — old UI" className="w-full" />
              </div>
              <div className="overflow-hidden rounded-2xl border border-accent/20">
                <img src="/images/codepay/register-new-ui.png" alt="Register v3 — new UI" className="w-full" />
              </div>
            </div>
          </FadeIn>

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
                      <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-gray-400" />
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
                      <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-gray-400" />
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

          {/* Transaction detail before/after */}
          <FadeIn>
            <div className="mb-10 overflow-hidden rounded-2xl border border-gray-200">
              <img src="/images/codepay/register-txn-before-after.png" alt="Transaction detail old vs new" className="w-full" />
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

      {/* ═══ 03 — CODEPAY GO: 0→1 ═══ */}
      <section className="px-8 lg:px-16 py-20">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number="03"
            title="CodePay Go: 0-to-1 (PM Role)"
            quote="A restaurant owner closing at 10pm couldn't answer: how much did I make today? They'd call support. Or just guess."
          />

          {/* ── Impact First ── */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-14">
            <MetricCard
              label="User Growth"
              value="3x"
              detail="In 2 months post-launch (B2B2B POC)"
              delay={0}
            />
            <MetricCard
              label="Engagement"
              value="~85%"
              detail="Engaged session rate. Merchants using it, not just downloading."
              delay={0.08}
            />
            <MetricCard
              label="Support"
              value="~20%"
              detail="Drop in partner support inquiries. The app answered the questions."
              delay={0.16}
            />
            <MetricCard
              label="My Scope"
              value="End-to-End"
              detail="Research, PRD, UI/UX, QA, App Store launch, GTM, analytics, roadmap"
              delay={0.24}
            />
          </div>

          {/* ── The Setup ── */}
          <SubBlock>
            <Body>
              CodePay processed payments on <BodyStrong>7,000+ terminals</BodyStrong> —
              but merchants had zero visibility into their own business. All
              transaction data sat in the backend: raw, unstructured,
              inaccessible. I joined as founding designer and became the de
              facto product manager — defining the problem, writing PRDs,
              designing every screen, coordinating engineering, running QA, and
              presenting to partners.
            </Body>
          </SubBlock>

          {/* ═══ SUB-SECTION 1: Foundation Thesis + 4 Gaps ═══ */}
          <FadeIn>
            <h3 className="mt-16 mb-4 font-serif text-[36px] leading-[1.15] tracking-[-1px] text-gray-900 lg:text-[42px]">
              The Product Wasn&rsquo;t Missing Features.<br />It Was Missing A Foundation.
            </h3>
            <p className="max-w-[720px] font-sans text-[15px] italic leading-[1.7] text-gray-400">
              Four structural gaps — the decision chain below walks the ones I anchored on most.
            </p>
          </FadeIn>

          <div className="mt-8 mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { num: "01", label: "Data Integrity", problem: "Same fields, different meanings. Merchants couldn't reconcile the app with their bank.", action: "Audited and aligned data definitions across product, eng, and ops." },
              { num: "02", label: "Invisible Usage", problem: "No tracking existed. Every prioritization call was a guess.", action: "Designed event taxonomy from scratch. First product in the company with structured analytics." },
              { num: "03", label: "Scattered Demand", problem: "Everything felt equally urgent, so nothing got prioritized well.", action: "Built a prioritization framework balancing merchant needs against dev capacity." },
              { num: "04", label: "Indirect Feedback", problem: "B2B2B meant the merchant was two hops away. Feedback arrived late.", action: "Routed discovery through partner leads who aggregate and filter signal." },
            ].map((gap, i) => (
              <FadeIn key={gap.num} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-gray-200 bg-gray-50/80 p-5 backdrop-blur-sm">
                  <span className="font-mono text-[12px] text-accent/60">{gap.num}</span>
                  <h4 className="mt-1.5 font-serif text-[16px] leading-[1.3] text-gray-900">{gap.label}</h4>
                  <p className="mt-2 font-sans text-[13px] leading-[1.6] text-gray-400">{gap.problem}</p>
                  <p className="mt-2 font-sans text-[13px] leading-[1.6] text-gray-500">{gap.action}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* ═══ SUB-SECTION 2: Positioning Shift ═══ */}
          <FadeIn>
            <div className="mb-4 mt-14 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1">
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-accent">
                Turning Ambiguity Into Clarity — How I Position And Anchor
              </span>
            </div>
          </FadeIn>

          <FadeIn>
            <h4 className="mb-3 font-serif text-[22px] leading-[1.3] tracking-[-0.3px] text-gray-900">
              We almost built the wrong product.
            </h4>
            <Body>
              We shipped v1.0.0 as a &ldquo;business growth dashboard.&rdquo;
              Then, through interviews and workshops with our partners, we
              learned that what we&rsquo;d built wasn&rsquo;t what merchants
              cared about most.
            </Body>
          </FadeIn>

          {/* Hero positioning shift — side by side */}
          <FadeIn>
            <div className="my-8 flex items-center gap-3">
              <div className="flex-1 rounded-2xl border border-gray-200 bg-gray-50/80 px-5 py-5 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gray-300 mb-2">Original Positioning</p>
                <p className="font-serif text-[18px] leading-[1.3] text-gray-400 line-through decoration-gray-300 sm:text-[20px]">
                  &ldquo;See Your Business Grow&rdquo;
                </p>
              </div>
              <span className="shrink-0 font-serif text-[20px] text-gray-300">&rarr;</span>
              <div className="flex-1 rounded-2xl border-2 border-accent/30 bg-accent/[0.04] px-5 py-5 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent/60 mb-2">New Positioning</p>
                <p className="font-serif text-[20px] leading-[1.2] text-gray-900 sm:text-[24px]">
                  &ldquo;Where Does My Money Come From?&rdquo;
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Three-layer reasoning — anchor */}
          <FadeIn>
            <h4 className="mb-2 mt-10 font-serif text-[22px] leading-[1.3] tracking-[-0.3px] text-gray-900">
              What&rsquo;s behind the feature requests:
            </h4>
            <Body>
              Anxiety speaks louder than requirements.
            </Body>
          </FadeIn>

          <FadeIn>
            <div className="mt-6 mb-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-5">
                <span className="font-mono text-[11px] text-gray-300">01 — Surface</span>
                <p className="mt-2 font-sans text-[15px] font-medium leading-[1.4] text-gray-700">
                  Dozens of fragmented requests
                </p>
                <p className="mt-2 font-sans text-[13px] leading-[1.6] text-gray-400">
                  &ldquo;Show tips by employee&rdquo; &ldquo;Add fee
                  breakdown&rdquo; &ldquo;Let me refund from the
                  app&rdquo; &ldquo;Batch close on mobile&rdquo;
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-5">
                <span className="font-mono text-[11px] text-gray-300">02 — Underlying need</span>
                <p className="mt-2 font-sans text-[15px] font-medium leading-[1.4] text-gray-700">
                  Reconciliation, transparency, payment actions
                </p>
                <p className="mt-2 font-sans text-[13px] leading-[1.6] text-gray-400">
                  Every request pointed to the same gap: merchants had no way
                  to verify, act on, or trust their own transaction data.
                </p>
              </div>
              <div className="rounded-xl border border-accent/20 bg-accent/[0.04] p-5">
                <span className="font-mono text-[11px] text-accent/60">03 — Root anxiety</span>
                <p className="mt-2 font-serif text-[18px] font-medium leading-[1.4] text-gray-900">
                  Money out of control
                </p>
                <p className="mt-2 font-sans text-[13px] leading-[1.6] text-gray-500">
                  A restaurant owner at 10pm doesn&rsquo;t want analytics —
                  they want to know the numbers match and nothing fell through
                  the cracks. This reframed positioning, IA, and priority order.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="mb-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-5 backdrop-blur-sm">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-gray-300 mb-3">What we assumed they wanted</p>
                <ul className="space-y-1.5">
                  {["Business growth dashboards", "Customer return rate analytics", "Revenue trend charts", "\"See your business grow\""].map((item) => (
                    <li key={item} className="flex items-start gap-2 font-sans text-[13px] leading-[1.6] text-gray-400">
                      <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-gray-300" />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-accent/20 bg-accent/[0.04] p-5 backdrop-blur-sm">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent/60 mb-3">What they actually needed</p>
                <ul className="space-y-1.5">
                  {["Tip breakdowns by employee", "Fee transparency & reconciliation", "Payment actions (refund, void, batch close)", "\"Where does my money come from?\""].map((item) => (
                    <li key={item} className="flex items-start gap-2 font-sans text-[13px] leading-[1.6] text-gray-500">
                      <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-accent/60" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          {/* ═══ SUB-SECTION 3: Data Accuracy ═══ */}
          <FadeIn>
            <div className="mb-4 mt-14 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1">
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-accent">
                Building Trust Through Data Accuracy
              </span>
            </div>
          </FadeIn>

          {/* Pullquote hero */}
          <FadeIn>
            <p className="my-6 max-w-[720px] font-serif text-[28px] leading-[1.3] tracking-[-0.5px] text-gray-900 lg:text-[32px]">
              &ldquo;Data definitions are truth definitions.&rdquo;
            </p>
          </FadeIn>

          <FadeIn>
            <Body>
              I designated Sprint 1 as the foundation sprint that blocks
              everything else. No payment actions, no new features. Just data
              truth. I defined how time windows, comparison logic, timezone
              rules, and refresh states should work across the dashboard.
            </Body>
          </FadeIn>

          {/* Data trust cards */}
          <FadeIn>
            <div className="mt-8 mb-6 grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "The 23:59 Bug",
                  problem: "Same-day query returned empty. End time defaulted to 00:00, making end < start.",
                  fix: "Default same-day to 00:00–23:59. Redesigned date picker with explicit start/end.",
                },
                {
                  label: "Time Semantics",
                  problem: "Day/Week/Month had no locked definitions. Growth rates used inconsistent baselines.",
                  fix: "Locked every window (Week = Sunday 00:00 → Now). Store timezone as source of truth.",
                },
                {
                  label: "Refresh & Failure",
                  problem: "Data didn't refresh on app resume. Network failures showed blank screens.",
                  fix: "Auto-refresh on foreground. On failure: keep last data + \"Last updated\" timestamp.",
                },
              ].map((item, i) => (
                <FadeIn key={item.label} delay={i * 0.06}>
                  <div className="h-full rounded-2xl border border-gray-200 bg-gray-50/80 p-5 backdrop-blur-sm">
                    <h4 className="font-serif text-[16px] leading-[1.3] text-gray-900">{item.label}</h4>
                    <div className="mt-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gray-300 mb-1">Problem</p>
                      <p className="font-sans text-[13px] leading-[1.6] text-gray-400">{item.problem}</p>
                    </div>
                    <div className="mt-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent/50 mb-1">Decision</p>
                      <p className="font-sans text-[13px] leading-[1.6] text-gray-500">{item.fix}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          {/* 5 alternatives — proof depth */}
          <FadeIn>
            <div className="mb-8 rounded-2xl border border-gray-200 bg-gray-50/80 p-5 backdrop-blur-sm">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-gray-300 mb-4">
                23:59 Bug — 5 alternatives evaluated
              </p>
              <div className="space-y-2.5">
                {[
                  { alt: "end = start", reason: "returns empty data", status: "rejected" },
                  { alt: "end = start + 1h", reason: "arbitrary boundary", status: "rejected" },
                  { alt: "force different days", reason: "breaks single-day queries", status: "rejected" },
                  { alt: "cross-day rollover", reason: "midnight boundary risk", status: "rejected" },
                  { alt: "00:00 → 23:59", reason: "matches merchant mental model", status: "chosen" },
                ].map((row) => (
                  <div key={row.alt} className="flex items-center gap-3 font-sans text-[13px] leading-[1.5]">
                    <code className="shrink-0 rounded bg-gray-100 px-2 py-1 font-mono text-[11px] text-gray-500">{row.alt}</code>
                    <span className="text-gray-400">{row.reason}</span>
                    <span className={`ml-auto shrink-0 rounded px-2 py-0.5 font-mono text-[10px] uppercase ${row.status === "chosen" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 font-sans text-[13px] italic leading-[1.6] text-gray-400">
                Trade-off documented: a &ldquo;day&rdquo; is 23h59m, not 24h. Simple outcome, complex reasoning.
              </p>
            </div>
          </FadeIn>

          {/* Sprint 1 — Time Picker Before/After — compact single row */}
          <FadeIn>
            <p className="mt-8 mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-gray-300">
              Sprint 1 — Time Picker UI Redesign
            </p>
            <div className="mb-6 grid grid-cols-2 items-stretch gap-4">
              {/* Left: Header before/after — stacked vertically */}
              <div className="flex flex-col justify-between gap-2">
                <div className="flex-1">
                  <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-gray-300 mb-1">Before</p>
                  <div className="flex h-[calc(100%-16px)] items-center overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <img src="/images/codepay/time-header-before.png" alt="Header before" className="w-full" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent/50 mb-1">After</p>
                  <div className="flex h-[calc(100%-16px)] items-center overflow-hidden rounded-lg border border-accent/20 bg-white">
                    <img src="/images/codepay/time-header-after.png" alt="Header after" className="w-full" />
                  </div>
                </div>
              </div>
              {/* Right: Calendar before/after — side by side */}
              <div className="grid grid-cols-2 items-stretch gap-2">
                <div className="flex flex-col">
                  <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-gray-300 mb-1">Before</p>
                  <div className="flex flex-1 items-center overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <img src="/images/codepay/calendar-before.png" alt="Calendar before" className="w-full" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent/50 mb-1">After</p>
                  <div className="flex flex-1 items-center overflow-hidden rounded-lg border border-accent/20 bg-white">
                    <img src="/images/codepay/calendar-after.png" alt="Calendar after" className="w-full" />
                  </div>
                </div>
              </div>
            </div>
            <p className="mb-8 font-sans text-[13px] italic leading-[1.6] text-gray-400">
              Redesigned to show explicit time boundaries. &ldquo;Last
              updated&rdquo; separated from time range label. Custom Range
              hides growth rate entirely — no misleading N/A.
            </p>
          </FadeIn>

          {/* ═══ SUB-SECTION 4: Trust Before Scale ═══ */}
          <FadeIn>
            <div className="mb-4 mt-14 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1">
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-accent">
                Trust Before Scale
              </span>
            </div>
          </FadeIn>

          {/* Pullquote */}
          <FadeIn>
            <p className="my-6 max-w-[720px] font-serif text-[28px] leading-[1.3] tracking-[-0.5px] text-gray-900 lg:text-[32px]">
              &ldquo;Pause. Fix. Then scale.&rdquo;
            </p>
          </FadeIn>

          <FadeIn>
            <Body>
              Partners told us directly: they wouldn&rsquo;t recommend CodePay
              Go in its current state. I went to the CEO and made the case to
              stop pushing for downloads and fix the product first.
            </Body>
          </FadeIn>

          {/* Comparison — right card visually dominant */}
          <FadeIn>
            <div className="my-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-gray-300 mb-3">The original plan</p>
                <p className="font-serif text-[22px] leading-[1.2] text-gray-400">200 merchant downloads</p>
                <p className="mt-2 font-sans text-[13px] leading-[1.6] text-gray-400">by end of December</p>
              </div>
              <div className="rounded-xl border-2 border-accent/30 bg-accent/[0.05] p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent/60 mb-3">My recommendation</p>
                <p className="font-serif text-[24px] leading-[1.2] text-gray-900">Pause. Fix. Then scale.</p>
                <p className="mt-2 font-sans text-[13px] leading-[1.6] text-gray-500">Ship v1.0.1 for trust, not numbers</p>
              </div>
            </div>
          </FadeIn>

          {/* Key quote */}
          <FadeIn>
            <p className="mb-6 max-w-[640px] font-sans text-[15px] italic leading-[1.7] text-gray-400">
              &ldquo;One bad merchant experience damages the partner&rsquo;s
              trust in the entire platform.&rdquo;
            </p>
          </FadeIn>

          {/* How I pitched it */}
          <FadeIn>
            <div className="mb-8 rounded-2xl border border-gray-200 bg-gray-50/80 p-6 backdrop-blur-sm">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-gray-300 mb-4">How the pitch worked</p>
              <div className="space-y-3 font-sans text-[15px] leading-[1.7]">
                <p className="text-gray-400 line-through">&ldquo;I don&rsquo;t think we should do this.&rdquo;</p>
                <p className="text-gray-600">&ldquo;Here&rsquo;s what&rsquo;s breaking, here&rsquo;s the fix, here&rsquo;s the timeline, here&rsquo;s why this gets you the same business outcome on a different curve.&rdquo;</p>
              </div>
            </div>
          </FadeIn>

          {/* GTM Funnel — merged into Trust Before Scale */}
          <FadeIn>
            <h4 className="mb-3 mt-12 font-serif text-[22px] leading-[1.3] tracking-[-0.3px] text-gray-900">
              GTM Strategy: Structured Funnel
            </h4>
            <Body>
              As POC owner, I designed the GTM strategy as a structured funnel —
              each stage with clear success criteria, not just &ldquo;more
              downloads.&rdquo;
            </Body>
          </FadeIn>

          <FadeIn>
            <div className="mt-6 mb-6 grid grid-cols-3 gap-3">
              {[
                { stage: "Awareness", detail: "Merchant knows the app exists" },
                { stage: "Activation", detail: "Downloads and successfully logs in" },
                { stage: "Value Realization", detail: "Sees one screen of meaningful data" },
              ].map((item, i) => (
                <div key={item.stage} className="rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-4 text-center backdrop-blur-sm">
                  <span className="block font-mono text-[10px] text-accent/50 mb-1.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-sans text-[14px] font-medium leading-[1.4] text-gray-700">
                    {item.stage}
                  </p>
                  <p className="mt-1 font-sans text-[12px] leading-[1.5] text-gray-400">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn>
            <Body>
              Built reusable GTM assets: different pitches for ISO/ISV
              partners vs. merchants, sales pitch frameworks for the BD team,
              merchant outreach materials (email templates, flyers, tutorial
              guides). Standardized messaging and{" "}
              <BodyStrong>
                reduced the cost of every sales conversation
              </BodyStrong>
              .
            </Body>
          </FadeIn>

          {/* ═══ SUB-SECTION 5: Sprints + Prioritization ═══ */}
          <FadeIn>
            <h3 className="mt-14 mb-2 font-serif text-[28px] leading-[1.2] tracking-[-0.5px] text-gray-900 lg:text-[32px]">
              Four sprints. Four dimensions of prioritization.
            </h3>
            <Body>
              Sprint 1 was the &ldquo;foundation sprint that blocks everything
              else.&rdquo; No features, just data trust. The CEO agreed to the
              PRD I wrote from scratch, synthesizing field interviews, POC
              feedback, and live blocking issues.
            </Body>
          </FadeIn>

          {/* Sprint matrix — dense reference, not hero cards */}
          <FadeIn>
            <div className="mt-8 mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { sprint: "Sprint 1", title: "Data Trust", color: "border-amber-500/20 bg-amber-500/[0.04]", tagColor: "text-amber-600", items: ["Time semantics + timezone lock", "Auto-refresh + failure states", "CSV export for reconciliation", "In-app support entry"] },
                { sprint: "Sprint 2", title: "Payment Actions", color: "border-rose-500/20 bg-rose-500/[0.04]", tagColor: "text-rose-600", items: ["Refund (Draft→Review→Confirm)", "Void + release hold warning", "Tip adjustment + batch close", "Step-up security (10min)"] },
                { sprint: "Sprint 3", title: "Homepage Narrative", color: "border-blue-500/20 bg-blue-500/[0.04]", tagColor: "text-blue-600", items: ["KPI layers (Sales/Tips/Tax/Fees)", "Store + terminal filter", "Home→Transaction drill-down", "Anomaly alert cards"] },
                { sprint: "Sprint 4", title: "Polish & Loops", color: "border-violet-500/20 bg-violet-500/[0.04]", tagColor: "text-violet-600", items: ["Notification→transaction link", "Advanced filter drawer", "Dark mode", "Multi-language (EN/ZH)"] },
              ].map((s, i) => (
                <FadeIn key={s.sprint} delay={i * 0.06}>
                  <div className={`h-full rounded-xl border px-4 py-3.5 ${s.color}`}>
                    <span className={`font-mono text-[10px] uppercase tracking-[0.1em] ${s.tagColor}`}>{s.sprint}</span>
                    <h4 className="mt-1 font-sans text-[14px] font-semibold leading-[1.3] text-gray-900">{s.title}</h4>
                    <ul className="mt-2 space-y-1">
                      {s.items.map((item) => (
                        <li key={item} className="font-sans text-[11px] leading-[1.4] text-gray-500">{item}</li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>


          {/* Compact 4-dimension prioritization — grid, not hero cards */}
          <FadeIn>
            <h4 className="mb-3 mt-8 font-serif text-[22px] leading-[1.3] tracking-[-0.3px] text-gray-900">
              How I Prioritize
            </h4>
          </FadeIn>

          <FadeIn>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: "01", label: "User Need Urgency", detail: "Trust-breaking or nice-to-have? How many merchants are blocked?" },
                { icon: "02", label: "Dev Effort & Risk", detail: "1 sprint or 3? Payment logic (high-risk) or just UI?" },
                { icon: "03", label: "Foundation vs. Add-on", detail: "Unblocks 5 future features, or standalone improvement?" },
                { icon: "04", label: "Revenue Impact", detail: "Partner expansion, churn reduction, or new segment?" },
              ].map((item, i) => (
                <FadeIn key={item.label} delay={i * 0.06}>
                  <div className="rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3.5 backdrop-blur-sm">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-[10px] text-accent/50">{item.icon}</span>
                      <h4 className="font-sans text-[13px] font-semibold leading-[1.3] text-gray-900">{item.label}</h4>
                    </div>
                    <p className="mt-1.5 font-sans text-[12px] leading-[1.5] text-gray-400">{item.detail}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          {/* ═══ SUB-SECTION 6: AI Trust Architecture ═══ */}
          <FadeIn>
            <div className="mb-4 mt-24 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1">
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-accent">
                Designing AI Into a High-Stakes Workflow
              </span>
            </div>
          </FadeIn>

          {/* Hero anchor */}
          <FadeIn>
            <p className="mt-2 mb-4 max-w-[800px] font-serif text-[28px] leading-[1.25] tracking-[-0.5px] text-gray-900 lg:text-[36px]">
              What does clarity mean when the system itself can move money?
            </p>
            <p className="max-w-[640px] font-sans text-[16px] leading-[1.8] text-gray-500 lg:text-[17px]">
              The harder design question isn&rsquo;t &ldquo;what can AI
              do?&rdquo; It&rsquo;s{" "}
              <span className="text-gray-800 font-medium">
                what authority does AI have, what state is it aware of, and how
                does trust survive when actions are irreversible?
              </span>
            </p>
          </FadeIn>

          {/* ── Module 1: Two Modes ── */}
          <FadeIn>
            <h4 className="mb-6 mt-16 font-serif text-[22px] leading-[1.3] tracking-[-0.3px] text-gray-900">
              Two Modes of AI Value
            </h4>
          </FadeIn>

          <FadeIn>
            <div className="mb-4 grid gap-5 sm:grid-cols-2">
              {[
                {
                  mode: "Mode A",
                  title: "Discover",
                  intent: "Merchant opens the app just to check.",
                  body: "AI flags outliers at two layers — single-transaction (missing tip, unusual amount, repeat refund) and time-window (sudden drop in sales often means a terminal went down). Anomaly points on the chart are tappable — jump straight to the transactions that caused them.",
                  flow: "Home AI Summary → chart anomaly → filtered transactions → detail → action",
                },
                {
                  mode: "Mode B",
                  title: "Resolve",
                  intent: "A customer is on the phone. Three minutes.",
                  body: "Customer says \"that $48 transaction around 3:40.\" AI parses intent + constraints, returns multi-match results, merchant picks the right one, AI drafts the refund. AI never auto-selects — because the action is irreversible.",
                  flow: "NL query → multi-match → user selection → AI draft → confirm → receipt + audit",
                },
              ].map((card) => (
                <FadeIn key={card.mode}>
                  <div className="h-full rounded-2xl border border-gray-200 bg-gray-50/80 p-7 backdrop-blur-sm">
                    <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent/60">{card.mode}</span>
                    <h4 className="mt-3 font-serif text-[22px] leading-[1.2] text-gray-900">{card.title}</h4>
                    <p className="mt-2 font-sans text-[15px] italic leading-[1.6] text-gray-400">
                      &ldquo;{card.intent}&rdquo;
                    </p>
                    <p className="mt-4 font-sans text-[14px] leading-[1.8] text-gray-500">
                      {card.body}
                    </p>
                    <div className="mt-5 border-t border-gray-100 pt-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-gray-300 mb-1">Flow</p>
                      <p className="font-mono text-[11px] leading-[1.6] text-gray-400">{card.flow}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          <FadeIn>
            <p className="mb-6 font-sans text-[14px] italic leading-[1.7] text-gray-400">
              Different intents require different UX surfaces — one for
              discovery without a task, one for precision under time pressure.
              Both feed into the same trust-preserving action flow.
            </p>
          </FadeIn>


          {/* ── Module 2: Onion Drill-Down ── */}
          <FadeIn>
            <h4 className="mb-3 mt-14 font-serif text-[22px] leading-[1.3] tracking-[-0.3px] text-gray-900">
              The Onion Drill-Down
            </h4>
            <p className="max-w-[640px] font-sans text-[16px] leading-[1.8] text-gray-500 lg:text-[17px]">
              Every summary is one tap from the transactions behind it. Every
              transaction is one tap from an action.
            </p>
          </FadeIn>

          <FadeIn>
            <div className="mt-8 mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Home Summary", sub: "What changed, and do I care?" },
                { label: "Breakdown Charts", sub: "Show me the pattern." },
                { label: "Transactions", sub: "Show me the records." },
                { label: "Action", sub: "Let me fix it." },
              ].map((step, i) => (
                <div key={step.label} className="relative rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-4 text-center backdrop-blur-sm">
                  <span className="block font-mono text-[10px] text-accent/50 mb-1.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-sans text-[14px] font-medium leading-[1.3] text-gray-900">{step.label}</p>
                  <p className="mt-1.5 font-sans text-[12px] leading-[1.4] text-gray-400">{step.sub}</p>
                </div>
              ))}
            </div>
            <p className="mb-10 font-sans text-[14px] italic leading-[1.7] text-gray-400">
              AI is the spotlight that picks the right thread; the drill-down
              is what lets you pull it.
            </p>
          </FadeIn>

          {/* ── Module 3: Three Guardrails ── */}
          <FadeIn>
            <h4 className="mb-8 mt-14 font-serif text-[22px] leading-[1.3] tracking-[-0.3px] text-gray-900">
              Three Guardrails
            </h4>
          </FadeIn>

          <FadeIn>
            <div className="mb-6 grid gap-5 sm:grid-cols-3">
              {[
                {
                  num: "01",
                  title: "No Silent Execution",
                  statement: "AI drafts. Humans confirm. Always.",
                  body: "Every action follows Draft → Review → Confirm → Receipt + Audit Trail. AI never moves money on its own. The friction is intentional.",
                },
                {
                  num: "02",
                  title: "Status-Aware Eligibility",
                  statement: "Action lists change by transaction state.",
                  body: "Void only for authorized-not-settled. Refund only for captured + refundable. Invalid actions aren't disabled — they're never presented.",
                },
                {
                  num: "03",
                  title: "Audit Trail on Completion",
                  statement: "Every confirmed action writes an event.",
                  body: "AI and human actions write to the same log, tagged by actor. Audit makes AI actions reversible in memory even when irreversible in state.",
                },
              ].map((g) => (
                <FadeIn key={g.num} delay={Number(g.num) * 0.08}>
                  <div className="h-full rounded-2xl border border-gray-200 bg-gray-50/80 p-6 backdrop-blur-sm">
                    <span className="font-mono text-[12px] text-accent/60">{g.num}</span>
                    <h4 className="mt-2 font-serif text-[18px] leading-[1.3] text-gray-900">{g.title}</h4>
                    <p className="mt-3 font-sans text-[15px] italic leading-[1.6] text-gray-500">{g.statement}</p>
                    <p className="mt-3 font-sans text-[14px] leading-[1.7] text-gray-400">{g.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          {/* ── Module 4: Trust Flow ── */}
          <FadeIn>
            <h4 className="mb-6 mt-14 font-serif text-[22px] leading-[1.3] tracking-[-0.3px] text-gray-900">
              The Trust Flow
            </h4>
          </FadeIn>

          <FadeIn>
            <div className="mb-4 grid grid-cols-5 gap-2">
              {[
                { step: "AI Suggests", sub: "or user asks" },
                { step: "Draft", sub: "AI-generated payload" },
                { step: "Review", sub: "human-readable summary" },
                { step: "Confirm", sub: "explicit human action" },
                { step: "Receipt + Audit", sub: "immutable record" },
              ].map((item) => (
                <div key={item.step} className="rounded-xl border border-gray-200 bg-gray-50/80 px-3 py-3.5 text-center backdrop-blur-sm">
                  <p className="font-sans text-[13px] font-medium leading-[1.3] text-gray-900">{item.step}</p>
                  <p className="mt-1 font-sans text-[11px] leading-[1.3] text-gray-400">{item.sub}</p>
                </div>
              ))}
            </div>
            <p className="mb-10 font-sans text-[14px] italic leading-[1.7] text-gray-400">
              At every step, the user can stop, edit, or ask AI to clarify.
              AI is never the final decision-maker on anything that moves money.
            </p>
          </FadeIn>

          {/* ── Module 5: See It In Action ── */}
          <FadeIn>
            <h4 className="mb-6 mt-14 font-serif text-[22px] leading-[1.3] tracking-[-0.3px] text-gray-900">
              See It In Action
            </h4>
          </FadeIn>

          <FadeIn>
            <div className="mb-10 grid gap-4 sm:grid-cols-2">
              <a
                href="https://codepay-zenith.lovable.app/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-gray-50/80 p-6 backdrop-blur-sm transition-colors duration-200 hover:border-accent/30"
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent/60 mb-2">Interactive Prototype</p>
                  <h4 className="font-serif text-[18px] leading-[1.3] text-gray-900">
                    CodePay Go AI Demo
                  </h4>
                  <p className="mt-2 font-sans text-[14px] leading-[1.7] text-gray-400">
                    Click through both modes — anomaly drill-down and
                    natural-language refund flow.
                  </p>
                </div>
                <p className="mt-4 font-sans text-[13px] font-medium text-accent group-hover:underline">
                  Open prototype &rarr;
                </p>
              </a>
              <a
                href="https://canva.link/hiwh3y4cq2ejcld"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-gray-50/80 p-6 backdrop-blur-sm transition-colors duration-200 hover:border-accent/30"
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent/60 mb-2">Demo Video</p>
                  <h4 className="font-serif text-[18px] leading-[1.3] text-gray-900">
                    90-Second Walkthrough
                  </h4>
                  <p className="mt-2 font-sans text-[14px] leading-[1.7] text-gray-400">
                    Both modes in action — discovery anomaly flow and
                    resolve refund flow.
                  </p>
                </div>
                <p className="mt-4 font-sans text-[13px] font-medium text-accent group-hover:underline">
                  Watch video &rarr;
                </p>
              </a>
            </div>
          </FadeIn>

          {/* Closing */}
          <FadeIn>
            <div className="rounded-2xl border border-accent/20 bg-accent/[0.04] p-6">
              <p className="font-sans text-[16px] leading-[1.8] text-gray-500 lg:text-[17px]">
                <span className="text-gray-800 font-medium">None of this is payment-specific.</span>{" "}
                Swap transaction for approval, quote, contract, trade — the same
                three guardrails and the same Draft &rarr; Review &rarr; Confirm
                &rarr; Audit flow carry over. The design problem in high-stakes
                AI workflows is always the same:{" "}
                <span className="text-gray-800 font-medium">
                  how authority, state, and memory get distributed between the
                  human and the agent.
                </span>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ═══ 04 — AI VISION ═══ */}
      <section className="px-8 lg:px-16 py-20">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number="04"
            title="AI Vision"
            quote="I asked: where in the payment workflow do humans spend the most cognitive effort on repetitive-but-critical judgment?"
          />

          <SubBlock title="Defining Where AI Matters in Payments">
            <Body>
              While managing CodePay Go, I also led the company&rsquo;s AI
              product exploration. The question wasn&rsquo;t &ldquo;where can
              we add AI?&rdquo; — it was{" "}
              <BodyStrong>
                &ldquo;where in the payment workflow do humans spend the most
                cognitive effort on repetitive-but-critical judgment?&rdquo;
              </BodyStrong>
            </Body>
          </SubBlock>

          <FadeIn>
            <div className="mb-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  area: "Merchant Onboarding",
                  detail:
                    "KYC/risk pre-check, auto-fill forms, compliance guidance — reducing days of manual review to minutes.",
                },
                {
                  area: "Transaction Processing",
                  detail:
                    "Error diagnosis, failure explanation, integration validation — turning cryptic error codes into actionable next steps.",
                },
                {
                  area: "Merchant Operations",
                  detail:
                    "Transaction failure diagnosis, auto-generated support tickets, suggested next actions — support cost reduction.",
                },
              ].map((item, i) => (
                <FadeIn key={item.area} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-accent/20 bg-accent/[0.04] p-6">
                    <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-accent">
                      {item.area}
                    </p>
                    <p className="mt-3 font-sans text-[14px] leading-[1.7] text-gray-500">
                      {item.detail}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          <SubBlock title="From Concept to Interactive Demo">
            <Body>
              I independently built three interactive web prototypes with
              animations simulating how AI would embed into existing workflows —
              not as feature specs, but as{" "}
              <BodyStrong>alignment tools for the CEO and investors</BodyStrong>
              .
            </Body>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                "Show AI reasoning process (risk assessment steps, diagnostic flow) — not just final results",
                "Blur/abstract sensitive data — prototypes must not be mistaken for live features",
                "Design for \"what happens when AI is wrong\" — every AI action involving money requires human confirmation",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50/50 px-4 py-3"
                >
                  <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                  <p className="font-sans text-[13px] leading-[1.6] text-gray-500">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </SubBlock>

          <FadeIn>
            <div className="rounded-2xl border border-accent/20 bg-accent/[0.04] p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent/70 mb-2">
                Impact
              </p>
              <Body>
                These prototypes aligned the CEO, engineering, and investors in{" "}
                <BodyStrong>one session</BodyStrong> — collapsing weeks of
                abstract &ldquo;AI strategy&rdquo; discussions into a concrete,
                testable experience. The Figma refinements became the core
                reference for the AI promo video and CodePay AI website launch.
              </Body>
            </div>
          </FadeIn>
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
                <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-6 h-full backdrop-blur-sm">
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
