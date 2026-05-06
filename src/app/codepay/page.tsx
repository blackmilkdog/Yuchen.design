"use client";

import { motion } from "framer-motion";
import CaseStudyNav from "@/components/CaseStudyNav";
import CaseStudyFooter from "@/components/CaseStudyFooter";
import CodepaySidebar from "@/components/CodepaySidebar";

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

/* ─── Pull quote — italic serif sentence used as chapter transition ─── */
function PullQuote({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <FadeIn>
      <div
        className={`py-16 lg:py-24 ${
          align === "center" ? "mx-auto text-center" : ""
        }`}
      >
        <p
          className={`font-serif text-[26px] italic leading-[1.35] tracking-[-0.4px] text-gray-700 lg:text-[36px] ${
            align === "center" ? "mx-auto" : ""
          } max-w-[820px]`}
        >
          {children}
        </p>
      </div>
    </FadeIn>
  );
}

/* ─── Big metric — large serif numeral with mono caption ─── */
function BigMetric({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease }}
    >
      <p className="font-serif text-[56px] leading-[0.95] tracking-[-1.5px] text-accent lg:text-[80px]">
        {value}
      </p>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-gray-400">
        {label}
      </p>
    </motion.div>
  );
}

/* ─── Slim chapter mark — typographic, subordinate to SectionHeader ─── */
function ChapterMark({ number }: { number: string }) {
  return (
    <FadeIn>
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gray-400">
          Product
        </span>
        <span className="font-mono text-[28px] font-semibold leading-none tracking-[-0.5px] text-gray-300">
          {number}
        </span>
      </div>
    </FadeIn>
  );
}

/* ─── Design Philosophy badges ─── */
type PhilosophyKey = "state" | "error" | "cognitive" | "reversibility";

const philosophyMeta: Record<PhilosophyKey, { label: string; cls: string; pin: string; pinRing: string }> = {
  state: {
    label: "State Visibility",
    cls: "bg-blue-100/70 text-blue-700 border border-blue-200/60",
    pin: "bg-blue-500",
    pinRing: "ring-blue-200",
  },
  error: {
    label: "Error Prevention",
    cls: "bg-amber-100/70 text-amber-700 border border-amber-200/60",
    pin: "bg-amber-500",
    pinRing: "ring-amber-200",
  },
  cognitive: {
    label: "Cognitive Load",
    cls: "bg-purple-100/70 text-purple-700 border border-purple-200/60",
    pin: "bg-purple-500",
    pinRing: "ring-purple-200",
  },
  reversibility: {
    label: "Reversibility",
    cls: "bg-rose-100/70 text-rose-700 border border-rose-200/60",
    pin: "bg-rose-500",
    pinRing: "ring-rose-200",
  },
};

function PhilosophyBadge({ keys, size = "sm" }: { keys: PhilosophyKey[]; size?: "sm" | "md" }) {
  const sizeCls = size === "md" ? "px-2.5 py-1 text-[11px]" : "px-2 py-0.5 text-[10px]";
  return (
    <div className="flex flex-wrap gap-1.5">
      {keys.map((k) => (
        <span
          key={k}
          className={`rounded-md font-mono uppercase tracking-[0.08em] ${sizeCls} ${philosophyMeta[k].cls}`}
        >
          {philosophyMeta[k].label}
        </span>
      ))}
    </div>
  );
}

/* ─── Unified Principle Card — pinned sticky-note style ─── */
function PinnedPrincipleCard({
  id,
  number,
  philosophy,
  title,
  body,
  image,
  imageAlt,
  problem,
  decision,
  version,
  delay = 0,
}: {
  id: string;
  number: string;
  philosophy: PhilosophyKey;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  problem: string;
  decision: string;
  version: string;
  delay?: number;
}) {
  const meta = philosophyMeta[philosophy];
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease }}
      className="group relative scroll-mt-24"
    >
      {/* Pushpin */}
      <div
        aria-hidden
        className={`absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:-translate-y-[60%] group-hover:rotate-12`}
      >
        <span
          className={`block h-5 w-5 rounded-full ${meta.pin} ring-4 ${meta.pinRing} shadow-md ring-offset-2 ring-offset-white`}
        />
      </div>

      {/* Card body */}
      <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-7 pt-10 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg lg:p-8 lg:pt-12">
        <div className="flex-1">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gray-400">
              Principle {number}
            </span>
            <PhilosophyBadge keys={[philosophy]} />
          </div>
          <h4 className="mt-4 font-serif text-[22px] leading-[1.25] tracking-[-0.3px] text-gray-900 lg:text-[24px]">
            {title}
          </h4>
          <p className="mt-3 font-sans text-[15px] leading-[1.7] text-gray-500">
            {body}
          </p>

          <div className="mt-6 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-6">
            <img src={image} alt={imageAlt} className="block max-h-full max-w-full object-contain" />
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-gray-400">
                Problem
              </p>
              <p className="font-sans text-[14px] leading-[1.65] text-gray-600">
                {problem}
              </p>
            </div>
            <div>
              <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent/70">
                Decision
              </p>
              <p className="font-sans text-[14px] leading-[1.65] text-gray-700">
                {decision}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-auto pt-6 border-t border-gray-100/80 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-400">
          {version}
        </p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function CodePayPage() {
  return (
    <main
      className="relative min-h-screen bg-white text-gray-900"
      style={{
        // Override accent to CodePay brand blue, with orange kept as warm secondary
        ["--color-accent" as string]: "#0051ff",
        ["--color-accent-secondary" as string]: "#4271ff",
      }}
    >
      {/* Grain */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03]"
        style={{ backgroundImage: "url(/images/grain-texture.png)" }}
      />

      <CaseStudyNav />
      <CodepaySidebar />

      {/* ═══ HERO — full screen editorial cover ═══ */}
      <header className="relative flex min-h-screen flex-col justify-center overflow-hidden border-b border-gray-200 pb-12 pt-32 lg:pt-40">
        {/* Text content — at standard 1200px container */}
        <div className="mx-auto w-full max-w-[1200px] px-8 lg:px-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-mono text-sm uppercase tracking-[0.18em] text-accent"
          >
            CodePay &middot; Fintech Startup &middot; 2025.07 — Now
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mt-6 font-serif text-[56px] font-normal leading-[1.05] tracking-[-2px] text-gray-900 lg:text-[80px]"
          >
            Designing Decision Infrastructure
            <br />
            <span className="text-gray-400">in High-Risk Payments</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mt-8 max-w-[720px] font-sans text-[18px] leading-[1.7] text-gray-500 lg:text-[20px]"
          >
            Founding designer building a cross-product design system,
            refactoring high-trust workflows, and shipping a fast
            feedback-to-release loop across two payment products.
          </motion.p>
        </div>

        {/* Product montage — full-bleed for hero impact, light blue tint */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease }}
          className="mt-14 w-full overflow-hidden border-y border-gray-200 bg-[#eaf0ff]/50"
        >
          <img
            src="/images/codepay/overview-montage.png"
            alt="CodePay product montage — merchant portal, register, dashboard"
            className="mx-auto block w-full max-w-[1600px]"
          />
        </motion.div>

        {/* Meta row — back at standard 1200px */}
        <div className="mx-auto w-full max-w-[1200px] px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease }}
            className="mt-14 grid grid-cols-2 gap-x-10 gap-y-6 border-t border-gray-200 pt-10 sm:grid-cols-4"
          >
            <MetaItem label="Role" value="Founding Designer + PM" />
            <MetaItem label="Scope" value="Design System · Risk-aware UX · End-to-End Ownership" />
            <MetaItem label="Tools" value="Figma · Figma Make · AI-assisted workflow" />
            <MetaItem label="Industry" value="Fintech" />
          </motion.div>
        </div>

        {/* Hero glow orbs */}
        <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-accent/[0.05] blur-[150px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-[300px] w-[300px] rounded-full bg-accent-secondary/[0.04] blur-[120px]" />
      </header>

      {/* ═══ IMPACT METRICS ═══ */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <FadeIn>
            <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.18em] text-accent">Impact</p>
            <h2 className="mb-10 font-serif text-[28px] leading-[1.2] tracking-[-0.5px] text-gray-900 lg:text-[32px]">
              What shipped, what changed
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

      {/* ═══ CHALLENGE → STRATEGY (side-by-side comparison) ═══ */}
      <section className="bg-[#eaf0ff]/40 py-20">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <FadeIn>
            <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.18em] text-accent">Challenge → Strategy</p>
            <h2 className="mb-3 font-serif text-[28px] leading-[1.2] tracking-[-0.5px] text-gray-900 lg:text-[32px]">
              Why it&rsquo;s hard, and how we responded
            </h2>
            <p className="mb-12 max-w-[720px] font-sans text-[16px] leading-[1.7] text-gray-500">
              Three structural pressures shaped the work. Each one demanded a
              different response — read across the rows to see the pairing.
            </p>
          </FadeIn>

          <div className="grid gap-x-10 gap-y-4 lg:grid-cols-2">
            {/* Column headers */}
            <FadeIn>
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gray-500">The Challenge</span>
                <span className="h-px flex-1 bg-gray-300/60" />
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">Our Response</span>
                <span className="h-px flex-1 bg-accent/30" />
              </div>
            </FadeIn>

            {/* Pair 01 */}
            <FadeIn>
              <div className="h-full rounded-2xl border border-gray-200 bg-white/80 p-5 backdrop-blur-sm">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] text-gray-400">01</span>
                  <h4 className="font-serif text-[18px] leading-[1.3] text-gray-900">High-risk payments</h4>
                </div>
                <p className="mt-2 ml-7 font-sans text-[14px] leading-[1.7] text-gray-500">
                  Mistakes cost money and trust. Every interaction with the
                  payment flow carries real financial consequence.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <div className="h-full rounded-2xl border border-accent/20 bg-accent/[0.05] p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">Patch Track</p>
                <p className="mt-2 font-sans text-[14px] leading-[1.7] text-gray-600">
                  Risk-ranked fixes from real feedback. Guardrails and
                  validation that solve what&rsquo;s urgent today.
                </p>
              </div>
            </FadeIn>

            {/* Pair 02 */}
            <FadeIn>
              <div className="h-full rounded-2xl border border-gray-200 bg-white/80 p-5 backdrop-blur-sm">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] text-gray-400">02</span>
                  <h4 className="font-serif text-[18px] leading-[1.3] text-gray-900">Multi-product scaling</h4>
                </div>
                <p className="mt-2 ml-7 font-sans text-[14px] leading-[1.7] text-gray-500">
                  Inconsistent states, definitions, and patterns across
                  products made coherent experience impossible.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <div className="h-full rounded-2xl border border-accent/20 bg-accent/[0.05] p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">Platform Track</p>
                <p className="mt-2 font-sans text-[14px] leading-[1.7] text-gray-600">
                  Rebuild the system in parallel with staged rollout. Feature
                  flags, gradual migration, one source of truth.
                </p>
              </div>
            </FadeIn>

            {/* Pair 03 */}
            <FadeIn>
              <div className="h-full rounded-2xl border border-gray-200 bg-white/80 p-5 backdrop-blur-sm">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] text-gray-400">03</span>
                  <h4 className="font-serif text-[18px] leading-[1.3] text-gray-900">Limited resources</h4>
                </div>
                <p className="mt-2 ml-7 font-sans text-[14px] leading-[1.7] text-gray-500">
                  Must patch what&rsquo;s broken today while rebuilding the
                  entire system for tomorrow.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <div className="h-full rounded-2xl border border-accent/20 bg-accent/[0.05] p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">Prototype &amp; AI Workflow</p>
                <p className="mt-2 font-sans text-[14px] leading-[1.7] text-gray-600">
                  Rapid demos + AI-assisted iteration to run tight
                  build-measure-learn loops: align, test, ship.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ 01 — PATCH TRACK ═══ */}
      <section id="patch-track" className="scroll-mt-20 pt-20 pb-12">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <SectionHeader
            number="01"
            title="Patch Track"
            quote="I turned noisy requests into high-leverage fixes with guardrails and consistent state patterns."
          />

          {/* ─── chapter intro: listen → organize ─── */}
          <FadeIn>
            <div id="listen-organize" className="scroll-mt-20 mb-20 grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <h4 className="mb-5 font-serif text-[22px] leading-[1.25] tracking-[-0.3px] text-gray-900 lg:text-[26px]">
                  Lots of needs from customers
                </h4>
                <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                  <img src="/images/codepay/patch-research-quotes.png" alt="Real customer feedback grouped by theme" className="w-full" />
                </div>
              </div>
              <div className="lg:col-span-7 lg:pt-12">
                <h4 className="mb-5 font-serif text-[22px] leading-[1.25] tracking-[-0.3px] text-gray-900 lg:text-[26px]">
                  Prioritize in our requirement pool
                </h4>
                <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                  <img src="/images/codepay/patch-bug-tracker.png" alt="Issue tracker with risk-ranked patches" className="w-full" />
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ─── narrative beat: from noisy to leverage ─── */}
          <FadeIn>
            <div id="pipeline" className="scroll-mt-20 mt-24 mb-10 max-w-[760px]">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                The pipeline
              </p>
              <h4 className="mt-3 font-serif text-[22px] leading-[1.25] tracking-[-0.3px] text-gray-900 lg:text-[26px]">
                From noisy requests to high-leverage fixes
              </h4>
            </div>
            <div className="mb-24 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-0">
              {[
                {
                  label: "Lots of needs from customers",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M4 5h11a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H9l-4 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
                      <path d="M9 9h5" />
                      <path d="M9 12h3" />
                    </svg>
                  ),
                },
                {
                  label: "Organize & prioritize in our requirement pool",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M4 6h14" />
                      <path d="M4 12h9" />
                      <path d="M4 18h5" />
                      <path d="M17 14l3 3-3 3" />
                      <path d="M20 17h-7" />
                    </svg>
                  ),
                },
                {
                  label: "From noisy requests to high-leverage fixes",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M3 5h18l-7 8v6l-4-2v-4z" />
                    </svg>
                  ),
                },
                {
                  label: "Small iterations, fast launch, aligned with expectations",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M14 4c4 0 6 2 6 6 0 5-5 9-9 10l-3-3c1-4 5-9 10-9z" />
                      <path d="M9 14l-4 1-1 4 4-1" />
                      <circle cx="15" cy="9" r="1.5" />
                    </svg>
                  ),
                },
              ].map((step, i, arr) => (
                <div key={step.label} className="flex flex-1 items-stretch">
                  <div className="flex-1 px-1 py-2">
                    <span className="mb-3 block text-accent/60">
                      {step.icon}
                    </span>
                    <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-accent/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 font-sans text-[13px] leading-[1.55] text-gray-600">
                      {step.label}
                    </p>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="mx-2 hidden self-center font-mono text-[14px] text-gray-300 sm:block">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>

          {/* ─── chapter transition: pull quote ─── */}
          <PullQuote>
            Four principles became the connective tissue across the work — guiding the patches below, and recalled in every rebuild that follows.
          </PullQuote>

          {/* ─── 2x2 overview, kept as in-page nav ─── */}
          <FadeIn>
            <p id="four-principles" className="scroll-mt-20 mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              Four design principles
            </p>
            <div className="mb-24 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  key: "state" as PhilosophyKey,
                  num: "01",
                  title: "Make state always visible",
                  body: "Showing the right state at the right moment is the cheapest form of error prevention.",
                },
                {
                  key: "error" as PhilosophyKey,
                  num: "02",
                  title: "Prevent errors before they happen",
                  body: "The earlier you catch a mistake — through structure and constraints — the less damage it can do.",
                },
                {
                  key: "cognitive" as PhilosophyKey,
                  num: "03",
                  title: "Reduce cognitive load at the moment of action",
                  body: "Good design doesn't ask people to ignore what's irrelevant. It just doesn't show it.",
                },
                {
                  key: "reversibility" as PhilosophyKey,
                  num: "04",
                  title: "Keep dangerous actions reversible and distinct",
                  body: "When something can't be undone, the interface should make that difference felt — not just stated.",
                },
              ].map((p, i) => (
                <FadeIn key={p.key} delay={i * 0.06}>
                  <a
                    href={`#principle-${p.num}`}
                    className="group flex h-full min-h-[180px] flex-col border-t border-gray-200 px-1 pt-5 pb-4 transition-colors hover:border-accent/50"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gray-400">{p.num}</span>
                      <PhilosophyBadge keys={[p.key]} />
                    </div>
                    <h4 className="mt-4 font-serif text-[16px] leading-[1.3] text-gray-900 transition-colors group-hover:text-accent">{p.title}</h4>
                    <p className="mt-2 font-sans text-[13px] leading-[1.6] text-gray-500">{p.body}</p>
                  </a>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* ─── Four pinned principle cards — uniform 2x2 grid ─── */}
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <div className="mb-24 grid gap-x-6 gap-y-12 pt-8 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
            <PinnedPrincipleCard
              id="principle-01"
              number="01"
              philosophy="state"
              title="Make system state always visible"
              body="When people are moving fast, they fill in the gaps. An ambiguous system doesn&rsquo;t pause anyone — it just gets interpreted, often wrong. Showing the right state at the right moment is the cheapest form of error prevention."
              image="/images/codepay/patch-refund-before-after.png"
              imageAlt="Refund UI before and after"
              problem="System previously only supported full refunds. Adding partial refund meant staff had to make decisions with no feedback on selections or remaining amount."
              decision="Refund screen updates in real time as selections change: remaining refundable amount, per-item breakdowns, and running total all reflect the current state instantly."
              version="Ops Platform v2.5.0"
              delay={0}
            />
            <PinnedPrincipleCard
              id="principle-02"
              number="02"
              philosophy="error"
              title="Prevent errors before they happen"
              body="The best error message is the one that never appears. The earlier you catch a mistake — through structure, constraints, and real-time feedback — the less damage it can do."
              image="/images/codepay/patch-card-input-flow.png"
              imageAlt="Card input step-by-step progression"
              problem="Manual card entry had no field-by-field guidance. Staff could move between fields without completing them correctly."
              decision="Redesigned with auto-focus jump logic, input highlighting, and confirm disabled until all fields pass validation."
              version="Payment App v2.1.7"
              delay={0.08}
            />
            <PinnedPrincipleCard
              id="principle-03"
              number="03"
              philosophy="cognitive"
              title="Reduce cognitive load at the moment of action"
              body="Attention is finite. Every extra element competing for focus at a critical moment is a cost paid in mistakes and slowness. Good design doesn&rsquo;t ask people to ignore what&rsquo;s irrelevant — it just doesn&rsquo;t show it."
              image="/images/codepay/patch-template-config.png"
              imageAlt="Template config vs management separation"
              problem="Configuration template options could be edited in place, creating ambiguity about whether changes affected current setup or saved template."
              decision="Split into two distinct contexts. The template panel during configuration only allows applying a template; edits happen on a separate management page. Same content, different intent, different surface."
              version="Ops Platform v2.5.1"
              delay={0.16}
            />
            <PinnedPrincipleCard
              id="principle-04"
              number="04"
              philosophy="reversibility"
              title="Keep dangerous actions reversible and distinct"
              body="Not all actions are equal, but they can easily look that way. When something can&rsquo;t be undone — or carries consequences beyond the current screen — the interface should make that difference felt, not just stated."
              image="/images/codepay/patch-partial-approve.png"
              imageAlt="Partial approve before and after"
              problem="Partially approved transactions used the same visual language as completed ones. Merchants often didn&rsquo;t register the remaining balance to collect."
              decision="Surfaces the remaining amount and next steps immediately, without an extra tap. Skip is still accessible, but no longer the path of least resistance."
              version="Payment App v2.1.8"
              delay={0.24}
            />
          </div>

          {/* ─── Patch track conclusion — quiet, unboxed ─── */}
          <FadeIn>
            <div className="max-w-full border-t border-gray-200 pb-8 pt-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                What patches couldn&rsquo;t reach
              </p>
              <p className="mt-4 font-serif text-[22px] leading-[1.45] text-gray-700 lg:text-[26px]">
                Patches solved what was urgent — but revealed harder problems.
                The design files had no shared system: every fix siloed, no
                source of truth, nothing cleanly handed off. And structurally,
                the information architecture had problems that incremental
                changes couldn&rsquo;t reach.{" "}
                <span className="text-gray-900">The only path forward was a rebuild.</span>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ═══ 02 — PLATFORM TRACK ═══ */}
      <section id="platform-track" className="scroll-mt-20 pt-24 pb-20">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <SectionHeader
            number="02"
            title="Platform Track"
            quote="I reduced design debt and improved consistency via componentized IA and a governance-ready system."
          />

          {/* ─── Cross-Product Design System: text + image, kept tight together ─── */}
          <FadeIn>
            <div className="mt-8 mb-24 grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <h4 className="mb-5 font-serif text-[22px] leading-[1.25] tracking-[-0.3px] text-gray-900 lg:text-[26px]">
                  Cross-Product Design System
                </h4>
                <Body>
                  Before designing anything, I built the thing that makes design
                  scalable. Built a cross-product foundation on top of an
                  open-source library, reskinned with brand tokens: colors, type
                  scale, spacing. <BodyStrong>One source of truth</BodyStrong> for
                  everything across all products.
                </Body>
              </div>
              <div className="lg:col-span-5 lg:pt-3">
                <p className="border-l border-accent/30 pl-5 font-serif text-[18px] italic leading-[1.55] text-gray-500 lg:text-[20px]">
                  Build the thing that makes design scalable, before designing anything.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="mb-32 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
              <img
                src="/images/codepay/platform-design-system.png"
                alt="Design system — colors, typography, tokens"
                className="block w-full"
              />
            </div>
          </FadeIn>
          {/* ─── Product 01: PayPilot — chapter mark ─── */}
          <FadeIn>
            <div id="paypilot" className="scroll-mt-20 relative mb-10">
              <ChapterMark number="01" />
              <div className="mt-5">
                <span className="block h-px w-full bg-gradient-to-r from-gray-200 via-gray-200 to-transparent" />
                <h3 className="mt-5 font-serif text-[28px] leading-[1.15] tracking-[-0.6px] text-gray-900 lg:text-[34px]">
                  PayPilot
                </h3>
                <p className="mt-2 font-sans text-[16px] leading-[1.6] text-gray-500 lg:text-[17px]">
                  Partner Ops Platform — Onboarding Restructure
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="mb-20 max-w-[760px]">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-gray-400">
                Role · UX Design &amp; Information Architecture
              </p>
              <Body>
                Led rapid prototyping using AI-assisted tooling (Figma Make) to
                accelerate alignment across PM and engineering.
              </Body>
            </div>
          </FadeIn>

          {/* ─── Core problem — pull quote heading + airy 3-up ─── */}
          <FadeIn>
            <h4 className="mb-10 max-w-full font-serif text-[26px] leading-[1.25] tracking-[-0.4px] text-gray-900 lg:text-[30px]">
              The core problem: nobody could learn it without training.
            </h4>
          </FadeIn>

          <FadeIn>
            <div className="mb-24 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {[
                {
                  num: "01",
                  label: "False completion signal",
                  detail:
                    "Users are told they've 'completed' onboarding, but still need to perform critical setup steps — creating confusion and mistrust in system feedback.",
                },
                {
                  num: "02",
                  label: "Shared UI with management → high cognitive load",
                  detail:
                    "Onboarding reuses management screens directly, so setup users see features they don't need yet. Focus and cognitive load both suffer.",
                },
                {
                  num: "03",
                  label: "No guided flow or progress tracking",
                  detail:
                    "There is no structured onboarding journey, checklist, or progress indicator — users cannot tell what's done, what's missing, or when they are truly finished.",
                },
              ].map((item) => (
                <div key={item.num} className="border-t border-gray-200 pt-5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent/60">
                    {item.num}
                  </span>
                  <h5 className="mt-3 font-serif text-[18px] leading-[1.3] tracking-[-0.2px] text-gray-900">
                    {item.label}
                  </h5>
                  <p className="mt-3 font-sans text-[14px] leading-[1.7] text-gray-500">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* ─── The Solution — narrative intro ─── */}
          <FadeIn>
            <div className="mb-6 max-w-full">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                The solution
              </p>
              <p className="font-serif text-[22px] leading-[1.45] text-gray-700 lg:text-[26px]">
                The fix was structural: collapse everything into a{" "}
                <span className="text-gray-900">three-step guided stepper</span>,{" "}
                <span className="text-gray-900">strip management actions out of the onboarding context</span>{" "}
                entirely, and make{" "}
                <span className="text-gray-900">completion criteria explicit</span>{" "}
                at every step.
              </p>
            </div>
          </FadeIn>

          {/* TODO: user to confirm — transitional sentence to map prose -> 3 figures below */}
          <FadeIn>
            <p className="mb-12 max-w-full font-sans text-[15px] leading-[1.7] text-gray-500">
              Three structural moves, each pictured in turn.
            </p>
          </FadeIn>

          {/* ─── Solution beat 1: caption + image as one unit ─── */}
          <FadeIn>
            <figure className="mb-20 max-w-full">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-accent/60">
                01 · Guided stepper
              </p>
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
                <img src="/images/codepay/platform-onboarding-annotated.png" alt="Stepper + footer annotated" className="block w-full" />
              </div>
              <figcaption className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <p className="font-sans text-[15px] leading-[1.7] text-gray-600 sm:max-w-[620px]">
                  Stepper and footer provide clear progress and system status; validation gates progression so the CTA only activates when all required inputs are complete.
                </p>
                <PhilosophyBadge keys={["state", "error"]} />
              </figcaption>
            </figure>
          </FadeIn>

          {/* ─── Solution beat 2: caption + image as one unit (no full-bleed disconnect) ─── */}
          <FadeIn>
            <figure className="mb-20 max-w-full">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-accent/60">
                02 · Management out of onboarding
              </p>
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
                <img
                  src="/images/codepay/platform-terminal-binding.png"
                  alt="Management Page vs Onboarding Page comparison"
                  className="block w-full"
                />
              </div>
              <figcaption className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <p className="font-sans text-[15px] leading-[1.7] text-gray-600 sm:max-w-[620px]">
                  Decoupling management from onboarding prevents context switching and distraction. Clear separation ensures onboarding remains focused, linear, and completion-driven.
                </p>
                <PhilosophyBadge keys={["cognitive"]} />
              </figcaption>
            </figure>
          </FadeIn>

          {/* ─── Solution beat 3: caption + image as one unit ─── */}
          <FadeIn>
            <figure className="mb-32 max-w-full">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-accent/60">
                03 · Completion criteria, explicit
              </p>
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
                <img src="/images/codepay/platform-completion-states.png" alt="Onboarding success and incomplete states" className="block w-full" />
              </div>
              <figcaption className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <p className="font-sans text-[15px] leading-[1.7] text-gray-600 sm:max-w-[620px]">
                  Explicit status feedback builds confidence and reduces ambiguity; inline recovery actions enable quick resolution without restarting the flow.
                </p>
                <PhilosophyBadge keys={["state", "error"]} />
              </figcaption>
            </figure>
          </FadeIn>

          {/* ─── pull quote: small IA decision ─── */}
          <PullQuote>
            One IA decision that looks small but isn&rsquo;t.
          </PullQuote>

          {/* ─── Sub-stepper: caption + image as one unit ─── */}
          <FadeIn>
            <figure className="mb-32 max-w-full">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
                <img src="/images/codepay/platform-sub-stepper.png" alt="Sub-stepper with sidebar navigation" className="block w-full" />
              </div>
              <figcaption className="mt-5 font-sans text-[15px] leading-[1.7] text-gray-600">
                Linked sidebar navigation reduces friction in long, scroll-heavy
                forms. Sub-stepper introduces granularity, making complex setup
                easier to track and complete.
              </figcaption>
            </figure>
          </FadeIn>

          {/* ─── Engineering constraint — narrative + image kept tightly together ─── */}
          <FadeIn>
            <div className="mb-10">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                Adaptation
              </p>
              <h4 className="mb-6 max-w-full font-serif text-[24px] leading-[1.25] tracking-[-0.3px] text-gray-900 lg:text-[28px]">
                When engineering scope changed, the design had to adapt.
              </h4>
              <div className="max-w-full">
                <Body>
                  The original plan unified all onboarding steps in one platform.
                  Engineering confirmed it wasn&rsquo;t feasible for this release — a
                  key step had to live in a separate system. The revised approach:
                  instead of asking users to find it themselves, that step became a{" "}
                  <BodyStrong>
                    direct deep-link into the exact right place
                  </BodyStrong>{" "}
                  in the other platform. One click, no navigation overhead. The
                  constraint stayed invisible to the user.
                </Body>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <figure className="mb-20 max-w-full">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
                <img
                  src="/images/codepay/platform-app-deployment-flow.png"
                  alt="Onboarding success state deep-linking into the connected app deployment platform"
                  className="block w-full"
                />
              </div>
              <figcaption className="mt-3 font-sans text-[14px] leading-[1.6] text-gray-500">
                From &ldquo;Success&rdquo; state, one click deep-links the user into the right place in the deployment platform.
              </figcaption>
            </figure>
          </FadeIn>

          <FadeIn>
            <div className="mb-32 max-w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
              <img src="/images/codepay/platform-tms-before-after.png" alt="App management before and after — TMS integration" className="block w-full" />
            </div>
          </FadeIn>

          {/* ─── AI Workflow Narrative — editorial aside ─── */}
          <FadeIn>
            <div className="mb-16 max-w-full">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-amber-700">
                Process Deep-dive
              </p>
              <h4 className="font-serif text-[26px] leading-[1.2] tracking-[-0.4px] text-gray-900 lg:text-[30px]">
                On Using AI to Move Faster
              </h4>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="mb-10 max-w-full">
              <Body>
                This project was IA-heavy and multi-page, with a PM who needed
                to review and iterate quickly. The traditional approach (design
                in Figma, export, review, revise) was too slow for the pace
                we needed. I chose Figma Make specifically because it outputs
                something interactive: PM could click through flows directly,
                engineering could flag feasibility issues early, and I could
                react to real feedback instead of guesses.
              </Body>
            </div>
          </FadeIn>

          {/* big-metric strip: 2 days / 100+ versions */}
          <FadeIn>
            <div className="mb-14 grid gap-10 border-y border-gray-200 py-12 sm:grid-cols-2">
              <div>
                <p className="font-serif text-[56px] leading-[0.95] tracking-[-1.5px] text-accent lg:text-[72px]">
                  2 days
                </p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-gray-400">
                  From PRD to a working prototype in front of the team
                </p>
              </div>
              <div>
                <p className="font-serif text-[56px] leading-[0.95] tracking-[-1.5px] text-accent lg:text-[72px]">
                  100+
                </p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-gray-400">
                  Iterated versions before exporting to Figma
                </p>
              </div>
            </div>
          </FadeIn>

          {/* AI workflow steps — flat row, no boxes */}
          <FadeIn>
            <div className="mb-14 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-0">
              {[
                "Define structure & constraints",
                "Build mid-fi flows fast",
                "Iterate with interactive prototypes",
                "Refine & finalize in Figma",
              ].map((step, i, arr) => (
                <div key={step} className="flex flex-1 items-stretch">
                  <div className="flex-1 px-1 py-2">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-amber-700/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 font-sans text-[13px] leading-[1.55] text-gray-600">
                      {step}
                    </p>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="mx-2 hidden self-center font-mono text-[14px] text-amber-700/40 sm:block">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Tradeoff Reflection — quiet, indented */}
          <FadeIn>
            <div className="mb-12 max-w-[820px] border-l-2 border-amber-200/60 pl-6">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-amber-700/70">
                Tradeoff I didn&rsquo;t fully anticipate
              </p>
              <Body>
                Figma Make builds its own token structure. Visually close to
                the design system, architecturally separate. Some issues
                (misaligned states, broken component logic) were faster to
                rebuild from scratch than to fix inside the AI output.
              </Body>
            </div>
          </FadeIn>

          {/* Closing reflection on AI */}
          <PullQuote>
            AI accelerated the decisions, not the craft. The hard parts — flow logic, edge states, what to show and what to hide — still required human judgment at every step. What changed was how quickly we could get those decisions in front of the right people.
          </PullQuote>

          {/* Result — single big number */}
          <FadeIn>
            <div className="mb-24 flex items-baseline gap-6 border-t border-gray-200 pt-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber-700/70">
                Result
              </span>
              <p className="font-serif text-[28px] leading-[1.1] tracking-[-0.4px] text-gray-900 lg:text-[34px]">
                <span className="text-accent">30%</span>
                <span className="ml-3 font-sans text-[15px] font-normal text-gray-500 lg:text-[16px]">
                  cut in estimated setup effort, internal test
                </span>
              </p>
            </div>
          </FadeIn>
        </div>

        {/* ─── Product 02: Register — chapter mark ─── */}
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <FadeIn>
            <div id="register" className="scroll-mt-20 relative mb-10">
              <ChapterMark number="02" />
              <div className="mt-5">
                <span className="block h-px w-full bg-gradient-to-r from-gray-200 via-gray-200 to-transparent" />
                <h3 className="mt-5 font-serif text-[28px] leading-[1.15] tracking-[-0.6px] text-gray-900 lg:text-[34px]">
                  Register
                </h3>
                <p className="mt-2 font-sans text-[16px] leading-[1.6] text-gray-500 lg:text-[17px]">
                  Payment App — v3.0 UI/UX Rebuild
                </p>
                {/* TODO: optionally expand role description — collaboration scope, what was hand-off vs you, your boundaries */}
                <p className="mt-5 max-w-[760px] font-sans text-[15px] leading-[1.7] text-gray-500">
                  UX/UI Design Lead. Collaborated with PM on product direction;
                  worked within engineering constraints on transaction logic that
                  couldn&rsquo;t change.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Bold market thesis as pull quote */}
          <FadeIn>
            <h4 className="mt-12 mb-12 max-w-full font-serif text-[26px] leading-[1.25] tracking-[-0.4px] text-gray-900 lg:text-[32px]">
              The market context was simple: most POS apps for small businesses
              are overdue for a rethink.
            </h4>
          </FadeIn>

          {/* Market context — clean prose, no card */}
          <FadeIn>
            <div className="mb-14 max-w-full">
              <Body>
                Cluttered interfaces, unclear system states, high support ticket
                volume from merchants who couldn&rsquo;t figure out what went
                wrong — these were industry-wide symptoms.
              </Body>
            </div>
          </FadeIn>
          {/* TODO: optionally add a third beat — how you validated the thesis (support tickets, merchant interviews, dwell observations) */}
        </div>

        {/* ─── BIG METRIC strip: 7,000+ terminals / 400K+ transactions ─── */}
        <FadeIn>
          <div className="mb-20 border-y border-gray-200 bg-[#eaf0ff]/40 py-16 lg:py-20">
            <div className="mx-auto max-w-[1200px] px-8 lg:px-16">
              <p className="mb-10 max-w-[760px] font-sans text-[15px] leading-[1.7] text-gray-600 lg:text-[16px]">
                For a product running at this scale, the cost of friction isn&rsquo;t abstract. Every extra tap, every misread state, every confused staff member is a real operational problem for a real business.
              </p>
              <div className="grid gap-12 sm:grid-cols-2">
                <BigMetric value="7,000+" label="Active terminals" />
                <BigMetric value="400K+" label="Weekly transactions" delay={0.1} />
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          {/* v3.0 thesis */}
          <FadeIn>
            <div className="mb-20 max-w-full">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                v3.0 had one goal
              </p>
              <p className="font-serif text-[22px] leading-[1.45] text-gray-700 lg:text-[26px]">
                Rebuild it so it&rsquo;s fast enough for a rushed cashier, clear enough to learn without training, and consistent enough to scale. Transaction and payment logic was off-limits — the tools available were{" "}
                <span className="text-gray-900">clarity, hierarchy, and sequence</span>.
              </p>
            </div>
          </FadeIn>

          {/* ─── hardware photo as scene anchor — kept inside container, no full-bleed disconnect ─── */}
          <FadeIn>
            <div className="mb-32 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
              <img
                src="/images/codepay/register-tap-to-pay.png"
                alt="CodePay Register hardware in real cafe and bar settings"
                className="block w-full"
              />
            </div>
          </FadeIn>

          {/* Component library — caption + image as one unit */}
          <FadeIn>
            <figure className="mb-32 max-w-full">
              <div className="mb-6 max-w-full">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  Foundation
                </p>
                <h4 className="mb-5 font-serif text-[22px] leading-[1.25] tracking-[-0.3px] text-gray-900 lg:text-[26px]">
                  Register Component Library
                </h4>
                <Body>
                  Building on the cross-product design system, I built a Register-specific
                  component library. Navigation bars, custom keyboards, buttons in every
                  state, list rows, status chips, data display modules. Then locked the
                  tokens: colors, type scale, spacing rhythm. Every screen that came
                  after was built from these pieces.
                </Body>
              </div>
              {/* TODO: optionally add quantitative meta-strip — e.g. "Components: 60+ · Tokens: 24 · States: 8 per primitive" */}
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
                <img src="/images/codepay/register-component-library.png" alt="Register component library" className="block w-full" />
              </div>
            </figure>
          </FadeIn>

          {/* Two decisions — pull quote */}
          <PullQuote>
            Two decisions shaped the whole rebuild.
          </PullQuote>

          {/* ─── Decision 01 — narrative + paired image ─── */}
          <FadeIn>
            <div className="mb-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  Decision 01
                </p>
                <h4 className="mt-3 font-serif text-[22px] leading-[1.25] tracking-[-0.3px] text-gray-900 lg:text-[26px]">
                  Split one screen into two
                </h4>
                <p className="mt-4 font-sans text-[15px] leading-[1.7] text-gray-500">
                  The solution wasn&rsquo;t simplification, it was separation of
                  concerns.
                </p>
                <div className="mt-4">
                  <PhilosophyBadge keys={["cognitive", "error"]} />
                </div>
              </div>
              <div className="lg:col-span-7 lg:pt-2">
                <ul className="space-y-3 border-l border-gray-200 pl-5">
                  {[
                    { tag: "Before", items: [
                      "One screen serves two audiences (staff + customer)",
                      "Cost breakdown and tip input mixed",
                      "Blurred responsibility leads to confusion and errors",
                    ] },
                    { tag: "After", items: [
                      "Split flow by role: staff vs customer",
                      "Staff confirms payment; customer selects tip",
                      "Clear handoff reduces errors and aligns with real-world interaction",
                    ] },
                  ].map((group) => (
                    <li key={group.tag}>
                      <p className={`mb-2 font-mono text-[10px] uppercase tracking-[0.14em] ${group.tag === "After" ? "text-accent/70" : "text-gray-400"}`}>
                        {group.tag}
                      </p>
                      <ul className="space-y-1.5">
                        {group.items.map((it) => (
                          <li
                            key={it}
                            className={`font-sans text-[14px] leading-[1.65] ${group.tag === "After" ? "text-gray-700" : "text-gray-500"}`}
                          >
                            {it}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="mb-32 grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-2xl border border-gray-200">
                <p className="bg-gray-50 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-gray-400">
                  Before
                </p>
                <div className="bg-gray-50">
                  <img src="/images/codepay/register-old-ui.png" alt="Register v2 — old keypad UI" className="w-full" />
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-accent/20">
                <p className="bg-accent/[0.05] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent/70">
                  After
                </p>
                <div className="bg-gray-50">
                  <img src="/images/codepay/register-new-ui.png" alt="Register v3 — new keypad UI" className="w-full" />
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ─── Decision 02 — narrative + image stacked ─── */}
          <FadeIn>
            <div className="mb-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  Decision 02
                </p>
                {/* TODO: add a parallel sub-title here — Decision 01 has "The solution wasn't simplification, it was separation of concerns." Decision 02 needs a comparable one-line decision-thesis */}
                <h4 className="mt-3 font-serif text-[22px] leading-[1.25] tracking-[-0.3px] text-gray-900 lg:text-[26px]">
                  Let state drive the interface
                </h4>
                <div className="mt-4">
                  <PhilosophyBadge keys={["state", "reversibility"]} />
                </div>
              </div>
              <div className="lg:col-span-7 lg:pt-2">
                <ul className="space-y-3 border-l border-gray-200 pl-5">
                  {[
                    { tag: "Before", items: [
                      "Key status and transaction type buried in dense fields",
                      "Requires full reading to understand context",
                      "High cognitive load before taking action",
                    ] },
                    { tag: "After", items: [
                      "Status surfaced first with clear, combined indicators",
                      "Type and result visually encoded for quick recognition",
                      "Scannable layout enables instant understanding without deep reading",
                    ] },
                  ].map((group) => (
                    <li key={group.tag}>
                      <p className={`mb-2 font-mono text-[10px] uppercase tracking-[0.14em] ${group.tag === "After" ? "text-accent/70" : "text-gray-400"}`}>
                        {group.tag}
                      </p>
                      <ul className="space-y-1.5">
                        {group.items.map((it) => (
                          <li
                            key={it}
                            className={`font-sans text-[14px] leading-[1.65] ${group.tag === "After" ? "text-gray-700" : "text-gray-500"}`}
                          >
                            {it}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            {/* TODO: add a 1-line figcaption describing what visually changed (matching the figcaption pattern in PayPilot solutions) */}
            <div className="mb-24 max-w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
              <img src="/images/codepay/register-txn-before-after.png" alt="Transaction detail old vs new" className="w-full" />
            </div>
          </FadeIn>

          {/* TODO: biggest expansion opportunity — could add 2-3 specific edge-case examples in a compact grid (e.g. overflow on 6-digit amounts, voided+tipped state, partial refund, multilingual edge-cases). Tie back to Reversibility / State Visibility principles. */}
          <FadeIn>
            <div className="mb-24 max-w-full">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                Edge Cases &amp; Real-World Variability
              </p>
              <p className="mb-5 font-serif text-[20px] leading-[1.4] text-gray-700 lg:text-[22px]">
                The rest follows the same language. Edge cases considered.
              </p>
              <Body>
                Handles large amounts, long fields, and overflow gracefully.
                Maintains clarity across extreme states (failed, voided, partial
                flows). Designed for real-world variability, not just ideal paths.
              </Body>
            </div>
          </FadeIn>

          {/* ─── Post-launch — final big metric ─── */}
          <FadeIn>
            <div className="border-t border-gray-200 pt-12">
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                Post-Launch
              </p>
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <BigMetric value="6,000+" label="Terminals running v3.0" />
                </div>
                <div className="lg:col-span-7 lg:pt-3">
                  {/* TODO: optionally expand to 2-3 sentences with a concrete change (support ticket drop on transaction-type confusion?), an unexpected finding, and what would change next iteration */}
                  <Body>
                    Streamlining staff workflows and reducing operational errors
                    based on post-launch user feedback.
                  </Body>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ═══ TAKEAWAYS ═══ */}
      <section id="takeaways" className="scroll-mt-20 py-20">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
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
