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

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-gray-400">{label}</p>
      <p className="mt-1 font-sans text-[15px] leading-[1.6] text-gray-700">{value}</p>
    </div>
  );
}

function MetricCard({ label, value, detail, delay = 0 }: { label: string; value: string; detail: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease }}
      className="rounded-2xl border border-gray-200 bg-gray-50 p-6 backdrop-blur-sm"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-gray-400">{label}</p>
      <p className="mt-2 font-serif text-[32px] leading-[1.1] tracking-[-0.5px] text-accent">{value}</p>
      <p className="mt-2 font-sans text-[14px] leading-[1.6] text-gray-400">{detail}</p>
    </motion.div>
  );
}

function SectionHeader({ number, title, quote }: { number: string; title: string; quote: string }) {
  return (
    <FadeIn>
      <div className="mb-12">
        <span className="font-mono text-[72px] font-bold leading-none text-gray-100">{number}</span>
        <h3 className="mt-4 font-serif text-[36px] leading-[1.2] tracking-[-0.5px] text-gray-900 lg:text-[42px]">{title}</h3>
        <p className="mt-4 max-w-[900px] font-sans text-[17px] italic leading-[1.7] text-gray-400">&ldquo;{quote}&rdquo;</p>
      </div>
    </FadeIn>
  );
}

function SubBlock({ title, children, delay = 0 }: { title?: string; children: React.ReactNode; delay?: number }) {
  return (
    <FadeIn delay={delay} className="mb-10">
      {title && <h4 className="mb-3 font-serif text-[22px] leading-[1.3] tracking-[-0.3px] text-gray-900">{title}</h4>}
      {children}
    </FadeIn>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="font-sans text-[16px] leading-[1.8] text-gray-500 lg:text-[17px]">{children}</p>;
}

function BodyStrong({ children }: { children: React.ReactNode }) {
  return <span className="text-gray-800 font-medium">{children}</span>;
}

function Divider() {
  return (
    <div className="relative">
      <div className="border-t border-gray-100" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
    </div>
  );
}

export default function CodePayGoPage() {
  return (
    <main className="relative min-h-screen bg-white text-gray-900">
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
            className="font-mono text-sm uppercase tracking-[0.15em] text-accent"
          >
            CodePay Go &middot; Fintech Startup
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-4 max-w-[900px] font-serif text-[48px] font-normal leading-[1.15] tracking-[-1.5px] text-gray-900 lg:text-[72px]"
          >
            0-to-1 Mobile Product + AI Vision
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-6 max-w-[720px] font-sans text-lg leading-[1.7] text-gray-500 lg:text-xl"
          >
            From positioning the wrong product to building merchant trust through data accuracy &mdash; then designing AI as a trust-preserving layer in high-stakes payment workflows.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-5"
          >
            <MetaItem label="Industry" value="Fintech" />
            <MetaItem label="Timeline" value="2025.07 - Now" />
            <MetaItem label="Role" value="PM + Founding Designer" />
            <MetaItem label="Tools" value="Figma, Lovable, Vibe Coding" />
            <MetaItem label="My Scope" value="Research, PRD, UI/UX, GTM, AI Direction" />
          </motion.div>
        </div>

        <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-accent/[0.05] blur-[150px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-[300px] w-[300px] rounded-full bg-accent-secondary/[0.04] blur-[120px]" />
      </header>

      {/* ═══ IMPACT METRICS ═══ */}
      <section className="px-8 lg:px-16 py-16">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="mb-10 font-serif text-[28px] leading-[1.2] tracking-[-0.5px] text-gray-900 lg:text-[32px]">Impact</h2>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard label="User Growth" value="3x" detail="In 2 months post-launch (B2B2B POC)" delay={0} />
            <MetricCard label="Engagement" value="~85%" detail="Engaged session rate. Merchants using it, not just downloading." delay={0.08} />
            <MetricCard label="Support" value="~20%" detail="Drop in partner support inquiries. The app answered the questions." delay={0.16} />
            <MetricCard label="My Scope" value="End-to-End" detail="Research, PRD, UI/UX, QA, App Store launch, GTM, analytics, roadmap, AI direction" delay={0.24} />
          </div>
        </div>
      </section>

      <Divider />

      {/* Section nav */}
      <section className="px-8 lg:px-16 pb-16 pt-12">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { num: "01", label: "0 → 1 Product (PM Role)", anchor: "#zero-one-product" },
                { num: "02", label: "AI Vision & Trust Architecture", anchor: "#ai-vision" },
              ].map((item, i) => (
                <FadeIn key={item.num} delay={i * 0.08}>
                  <a
                    href={item.anchor}
                    className="group flex items-center gap-6 rounded-2xl border border-gray-200 bg-gray-50/80 px-8 py-7 backdrop-blur-sm transition-all duration-200 hover:border-accent/30 hover:bg-accent/[0.03]"
                  >
                    <span className="font-mono text-[28px] font-semibold leading-none text-accent/40 group-hover:text-accent/70 transition-colors">
                      {item.num}
                    </span>
                    <span className="font-serif text-[24px] leading-[1.2] tracking-[-0.3px] text-gray-900">{item.label}</span>
                  </a>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ═══ 01 — 0→1 PRODUCT ═══ */}
      <section id="zero-one-product" className="scroll-mt-20 px-8 lg:px-16 py-20">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number="01"
            title="CodePay Go: 0-to-1 (PM Role)"
            quote="A restaurant owner closing at 10pm couldn't answer: how much did I make today? They'd call support. Or just guess."
          />

          <SubBlock>
            <Body>
              CodePay processed payments on <BodyStrong>7,000+ terminals</BodyStrong> &mdash;
              but merchants had zero visibility into their own business. All
              transaction data sat in the backend: raw, unstructured,
              inaccessible. I joined as founding designer and became the de
              facto product manager &mdash; defining the problem, writing PRDs,
              designing every screen, coordinating engineering, running QA, and
              presenting to partners.
            </Body>
          </SubBlock>

          {/* Foundation Thesis + 4 Gaps */}
          <FadeIn>
            <h3 className="mt-16 mb-4 font-serif text-[36px] leading-[1.15] tracking-[-1px] text-gray-900 lg:text-[42px]">
              The Product Wasn&rsquo;t Missing Features.<br />It Was Missing A Foundation.
            </h3>
            <p className="max-w-[720px] font-sans text-[15px] italic leading-[1.7] text-gray-400">
              Four structural gaps &mdash; the decision chain below walks the ones I anchored on most.
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

          {/* Positioning Shift */}
          <FadeIn>
            <div className="mb-4 mt-14 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1">
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-accent">
                Turning Ambiguity Into Clarity &mdash; How I Position And Anchor
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

          {/* Three-layer reasoning */}
          <FadeIn>
            <h4 className="mb-2 mt-10 font-serif text-[22px] leading-[1.3] tracking-[-0.3px] text-gray-900">
              What&rsquo;s behind the feature requests:
            </h4>
            <Body>Anxiety speaks louder than requirements.</Body>
          </FadeIn>

          <FadeIn>
            <div className="mt-6 mb-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-5">
                <span className="font-mono text-[11px] text-gray-300">01 &mdash; Surface</span>
                <p className="mt-2 font-sans text-[15px] font-medium leading-[1.4] text-gray-700">Dozens of fragmented requests</p>
                <p className="mt-2 font-sans text-[13px] leading-[1.6] text-gray-400">
                  &ldquo;Show tips by employee&rdquo; &ldquo;Add fee
                  breakdown&rdquo; &ldquo;Let me refund from the
                  app&rdquo; &ldquo;Batch close on mobile&rdquo;
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-5">
                <span className="font-mono text-[11px] text-gray-300">02 &mdash; Underlying need</span>
                <p className="mt-2 font-sans text-[15px] font-medium leading-[1.4] text-gray-700">
                  Reconciliation, transparency, payment actions
                </p>
                <p className="mt-2 font-sans text-[13px] leading-[1.6] text-gray-400">
                  Every request pointed to the same gap: merchants had no way
                  to verify, act on, or trust their own transaction data.
                </p>
              </div>
              <div className="rounded-xl border border-accent/20 bg-accent/[0.04] p-5">
                <span className="font-mono text-[11px] text-accent/60">03 &mdash; Root anxiety</span>
                <p className="mt-2 font-serif text-[18px] font-medium leading-[1.4] text-gray-900">Money out of control</p>
                <p className="mt-2 font-sans text-[13px] leading-[1.6] text-gray-500">
                  A restaurant owner at 10pm doesn&rsquo;t want analytics &mdash;
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

          {/* Data Accuracy */}
          <FadeIn>
            <div className="mb-4 mt-14 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1">
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-accent">
                Building Trust Through Data Accuracy
              </span>
            </div>
          </FadeIn>

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

          <FadeIn>
            <div className="mt-8 mb-6 grid gap-4 sm:grid-cols-3">
              {[
                { label: "The 23:59 Bug", problem: "Same-day query returned empty. End time defaulted to 00:00, making end < start.", fix: "Default same-day to 00:00–23:59. Redesigned date picker with explicit start/end." },
                { label: "Time Semantics", problem: "Day/Week/Month had no locked definitions. Growth rates used inconsistent baselines.", fix: "Locked every window (Week = Sunday 00:00 → Now). Store timezone as source of truth." },
                { label: "Refresh & Failure", problem: "Data didn't refresh on app resume. Network failures showed blank screens.", fix: "Auto-refresh on foreground. On failure: keep last data + \"Last updated\" timestamp." },
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

          {/* 5 alternatives */}
          <FadeIn>
            <div className="mb-8 rounded-2xl border border-gray-200 bg-gray-50/80 p-5 backdrop-blur-sm">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-gray-300 mb-4">
                23:59 Bug &mdash; 5 alternatives evaluated
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

          {/* Sprint 1 Time Picker Before/After */}
          <FadeIn>
            <p className="mt-8 mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-gray-300">
              Sprint 1 &mdash; Time Picker UI Redesign
            </p>
            <div className="mb-6 grid grid-cols-2 items-stretch gap-4">
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
              hides growth rate entirely &mdash; no misleading N/A.
            </p>
          </FadeIn>

          {/* Trust Before Scale */}
          <FadeIn>
            <div className="mb-4 mt-14 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1">
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-accent">Trust Before Scale</span>
            </div>
          </FadeIn>

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

          <FadeIn>
            <p className="mb-6 max-w-[640px] font-sans text-[15px] italic leading-[1.7] text-gray-400">
              &ldquo;One bad merchant experience damages the partner&rsquo;s
              trust in the entire platform.&rdquo;
            </p>
          </FadeIn>

          <FadeIn>
            <div className="mb-8 rounded-2xl border border-gray-200 bg-gray-50/80 p-6 backdrop-blur-sm">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-gray-300 mb-4">How the pitch worked</p>
              <div className="space-y-3 font-sans text-[15px] leading-[1.7]">
                <p className="text-gray-400 line-through">&ldquo;I don&rsquo;t think we should do this.&rdquo;</p>
                <p className="text-gray-600">&ldquo;Here&rsquo;s what&rsquo;s breaking, here&rsquo;s the fix, here&rsquo;s the timeline, here&rsquo;s why this gets you the same business outcome on a different curve.&rdquo;</p>
              </div>
            </div>
          </FadeIn>

          {/* GTM Funnel */}
          <FadeIn>
            <h4 className="mb-3 mt-12 font-serif text-[22px] leading-[1.3] tracking-[-0.3px] text-gray-900">
              GTM Strategy: Structured Funnel
            </h4>
            <Body>
              As POC owner, I designed the GTM strategy as a structured funnel &mdash;
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
                  <span className="block font-mono text-[10px] text-accent/50 mb-1.5">{String(i + 1).padStart(2, "0")}</span>
                  <p className="font-sans text-[14px] font-medium leading-[1.4] text-gray-700">{item.stage}</p>
                  <p className="mt-1 font-sans text-[12px] leading-[1.5] text-gray-400">{item.detail}</p>
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
              <BodyStrong>reduced the cost of every sales conversation</BodyStrong>.
            </Body>
          </FadeIn>

          <FadeIn>
            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200">
              <img src="/images/codepay/gtm-assets-grid.png" alt="Reusable GTM assets" className="w-full" />
            </div>
          </FadeIn>

          {/* Sprints + Prioritization */}
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

          <FadeIn>
            <h4 className="mb-3 mt-8 font-serif text-[22px] leading-[1.3] tracking-[-0.3px] text-gray-900">How I Prioritize</h4>
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
        </div>
      </section>

      <Divider />

      {/* ═══ 02 — AI VISION ═══ */}
      <section id="ai-vision" className="scroll-mt-20 px-8 lg:px-16 py-20">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            number="02"
            title="AI Vision &amp; Trust Architecture"
            quote="Where in the payment workflow do humans spend the most cognitive effort on repetitive-but-critical judgment?"
          />

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

          {/* Three areas where AI matters */}
          <FadeIn>
            <h4 className="mb-6 mt-16 font-serif text-[22px] leading-[1.3] tracking-[-0.3px] text-gray-900">
              Defining Where AI Matters in Payments
            </h4>
            <Body>
              While managing CodePay Go, I also led the company&rsquo;s AI
              product exploration. The question wasn&rsquo;t &ldquo;where can
              we add AI?&rdquo; It was{" "}
              <BodyStrong>
                &ldquo;where in the payment workflow do humans spend the most
                cognitive effort on repetitive-but-critical judgment?&rdquo;
              </BodyStrong>
            </Body>
          </FadeIn>

          <FadeIn>
            <div className="mt-6 mb-10 grid gap-4 sm:grid-cols-3">
              {[
                { area: "Merchant Onboarding", detail: "KYC/risk pre-check, auto-fill forms, compliance guidance. Reducing days of manual review to minutes." },
                { area: "Transaction Processing", detail: "Error diagnosis, failure explanation, integration validation. Turning cryptic error codes into actionable next steps." },
                { area: "Merchant Operations", detail: "Transaction failure diagnosis, auto-generated support tickets, suggested next actions. Support cost reduction." },
              ].map((item, i) => (
                <FadeIn key={item.area} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-accent/20 bg-accent/[0.04] p-6">
                    <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-accent">{item.area}</p>
                    <p className="mt-3 font-sans text-[14px] leading-[1.7] text-gray-500">{item.detail}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          {/* Two Modes */}
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
                  body: "AI flags outliers at two layers: single-transaction (missing tip, unusual amount, repeat refund) and time-window (sudden drop in sales often means a terminal went down). Anomaly points on the chart are tappable — jump straight to the transactions that caused them.",
                  flow: "Home AI Summary → chart anomaly → filtered transactions → detail → action",
                },
                {
                  mode: "Mode B",
                  title: "Resolve",
                  intent: "A customer is on the phone. Three minutes.",
                  body: "Customer says \"that $48 transaction around 3:40.\" AI parses intent + constraints, returns multi-match results, merchant picks the right one, AI drafts the refund. AI never auto-selects, because the action is irreversible.",
                  flow: "NL query → multi-match → user selection → AI draft → confirm → receipt + audit",
                },
              ].map((card) => (
                <FadeIn key={card.mode}>
                  <div className="h-full rounded-2xl border border-gray-200 bg-gray-50/80 p-7 backdrop-blur-sm">
                    <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent/60">{card.mode}</span>
                    <h4 className="mt-3 font-serif text-[22px] leading-[1.2] text-gray-900">{card.title}</h4>
                    <p className="mt-2 font-sans text-[15px] italic leading-[1.6] text-gray-400">&ldquo;{card.intent}&rdquo;</p>
                    <p className="mt-4 font-sans text-[14px] leading-[1.8] text-gray-500">{card.body}</p>
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
              Different intents require different UX surfaces. One for
              discovery without a task, one for precision under time pressure.
              Both feed into the same trust-preserving action flow.
            </p>
          </FadeIn>

          {/* Onion Drill-Down */}
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
                  <span className="block font-mono text-[10px] text-accent/50 mb-1.5">{String(i + 1).padStart(2, "0")}</span>
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

          {/* Three Guardrails */}
          <FadeIn>
            <h4 className="mb-8 mt-14 font-serif text-[22px] leading-[1.3] tracking-[-0.3px] text-gray-900">
              Three Guardrails
            </h4>
          </FadeIn>

          <FadeIn>
            <div className="mb-6 grid gap-5 sm:grid-cols-3">
              {[
                { num: "01", title: "No Silent Execution", statement: "AI drafts. Humans confirm. Always.", body: "Every action follows Draft → Review → Confirm → Receipt + Audit Trail. AI never moves money on its own. The friction is intentional." },
                { num: "02", title: "Status-Aware Eligibility", statement: "Action lists change by transaction state.", body: "Void only for authorized-not-settled. Refund only for captured + refundable. Invalid actions aren't disabled, they're never presented." },
                { num: "03", title: "Audit Trail on Completion", statement: "Every confirmed action writes an event.", body: "AI and human actions write to the same log, tagged by actor. Audit makes AI actions reversible in memory even when irreversible in state." },
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

          {/* Trust Flow */}
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

          {/* See It In Action */}
          <FadeIn>
            <h4 className="mb-6 mt-14 font-serif text-[22px] leading-[1.3] tracking-[-0.3px] text-gray-900">See It In Action</h4>
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
                  <h4 className="font-serif text-[18px] leading-[1.3] text-gray-900">CodePay Go AI Demo</h4>
                  <p className="mt-2 font-sans text-[14px] leading-[1.7] text-gray-400">
                    Click through both modes &mdash; anomaly drill-down and natural-language refund flow.
                  </p>
                </div>
                <p className="mt-4 font-sans text-[13px] font-medium text-accent group-hover:underline">Open prototype &rarr;</p>
              </a>
              <a
                href="https://canva.link/hiwh3y4cq2ejcld"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-gray-50/80 p-6 backdrop-blur-sm transition-colors duration-200 hover:border-accent/30"
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent/60 mb-2">Demo Video</p>
                  <h4 className="font-serif text-[18px] leading-[1.3] text-gray-900">90-Second Walkthrough</h4>
                  <p className="mt-2 font-sans text-[14px] leading-[1.7] text-gray-400">
                    Both modes in action &mdash; discovery anomaly flow and resolve refund flow.
                  </p>
                </div>
                <p className="mt-4 font-sans text-[13px] font-medium text-accent group-hover:underline">Watch video &rarr;</p>
              </a>
            </div>
          </FadeIn>

          {/* Closing */}
          <FadeIn>
            <div className="rounded-2xl border border-accent/20 bg-accent/[0.04] p-6">
              <p className="font-sans text-[16px] leading-[1.8] text-gray-500 lg:text-[17px]">
                <span className="text-gray-800 font-medium">None of this is payment-specific.</span>{" "}
                Swap transaction for approval, quote, contract, trade. The same
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

          {/* Impact callout */}
          <FadeIn>
            <div className="mt-8 rounded-2xl border border-accent/20 bg-accent/[0.04] p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent/70 mb-2">Impact</p>
              <Body>
                These prototypes aligned the CEO, engineering, and investors in{" "}
                <BodyStrong>one session</BodyStrong>. They collapsed weeks of
                abstract &ldquo;AI strategy&rdquo; discussions into a concrete,
                testable experience. The Figma refinements became the core
                reference for the AI promo video and CodePay AI website launch.
              </Body>
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ═══ TAKEAWAYS ═══ */}
      <section className="px-8 lg:px-16 py-20">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="mb-10 font-serif text-[28px] leading-[1.2] tracking-[-0.5px] text-gray-900 lg:text-[32px]">Takeaways</h2>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { title: "0-to-1 PM is about closing structural gaps, not just shipping features", body: "The product wasn't missing features. It was missing a foundation: data definitions, usage tracking, prioritization, feedback loops. My job was closing those while shipping." },
              { title: "Positioning comes from anxiety, not requirements", body: "Behind dozens of feature requests was one fear: money out of control. Designing to the surface ships the wrong product. Designing to the anxiety reframes everything." },
              { title: "Trust before scale", body: "Stopping GTM to fix the product was unpopular but right. One bad merchant experience damages partner trust in the entire platform." },
              { title: "AI in high-stakes workflows = authority + state + memory", body: "What does AI know, what can it do, and how does memory survive irreversible actions? The three guardrails (no silent execution, status-aware eligibility, audit on completion) carry over to any high-stakes AI workflow." },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-6 h-full backdrop-blur-sm">
                  <h4 className="font-serif text-[18px] leading-[1.3] text-gray-900">{item.title}</h4>
                  <p className="mt-3 font-sans text-[15px] leading-[1.7] text-gray-500">{item.body}</p>
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
