"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── coordinate space ─── */
const VIEW_W = 380;
const VIEW_H = 620;

/* Sun moved LEFT to balance the right-anchored willow */
const SUN_X = 110;
const SUN_Y = 95;
const SUN_R = 36;

/* Side-view weeping willow — trunk anchored TOP-RIGHT, branches sweep DOWN-LEFT */
const TRUNK_X = 322;
const TRUNK_Y = 48;

type BranchSpec = {
  peakX: number;
  peakY: number;
  endX: number;
  endY: number;
  segments: number;
  hue: string;
  waveAmp: number;
  waveFreq: number;
  wavePhase: number;
};

/* All branches: start at trunk, share the SAME initial direction (up-and-slightly-left)
   so they cluster tightly together at the top — then drape down-LEFT with WIDE spread at the tips.
   Peak controls almost identical → orderly bundle at top.
   Endpoints fan widely across the lower-LEFT zone for natural willow drape variety. */
const branchSpecs: BranchSpec[] = [
  // Longest, sweeps farthest down-left, deepest drop
  { peakX: -26, peakY: -58, endX: -340, endY: 560, segments: 22, hue: "#8FA67C", waveAmp: 24, waveFreq: 2.0, wavePhase: 0.0 },
  { peakX: -25, peakY: -56, endX: -300, endY: 530, segments: 21, hue: "#7E977C", waveAmp: 22, waveFreq: 2.2, wavePhase: 1.2 },
  { peakX: -25, peakY: -54, endX: -260, endY: 500, segments: 20, hue: "#9AAE85", waveAmp: 20, waveFreq: 2.4, wavePhase: 2.4 },
  { peakX: -24, peakY: -52, endX: -220, endY: 470, segments: 19, hue: "#8FA67C", waveAmp: 22, waveFreq: 1.8, wavePhase: 0.7 },
  { peakX: -23, peakY: -50, endX: -180, endY: 430, segments: 18, hue: "#7E977C", waveAmp: 18, waveFreq: 2.3, wavePhase: 1.6 },
  // Shortest, closest to trunk, shallowest drop
  { peakX: -22, peakY: -48, endX: -150, endY: 390, segments: 16, hue: "#8FA67C", waveAmp: 16, waveFreq: 2.5, wavePhase: 0.4 },
];

/* Personal values — stacked on the right where the willow has cleared away */
const values = [
  {
    mark: "▲",
    label: "Impact",
    caption: "make work travel farther",
    style: { right: "14px", top: "190px" } as const,
    align: "right" as const,
  },
  {
    mark: "✦",
    label: "Exploration",
    caption: "learn by building",
    style: { right: "30px", top: "330px" } as const,
    align: "right" as const,
  },
  {
    mark: "◇",
    label: "Growth",
    caption: "compound skills, not titles",
    style: { right: "14px", top: "500px" } as const,
    align: "right" as const,
  },
];

/* Free-flying paper swallows scattered around the scene */
const decorBirds = [
  // Perched directly ABOVE the sun — small, like a passing bird above the sunrise
  { id: "b1", x: SUN_X - 8, y: SUN_Y - SUN_R - 18, scale: 0.7, color: "#2A2620", driftX: 4, driftY: 3, duration: 5.0, delay: 1.5 },
  // Top-left, slightly above the sun
  { id: "b2", x: 38,  y: 36,  scale: 0.85, color: "#2A2620", driftX: 4, driftY: 3, duration: 5.6, delay: 1.7 },
  // Mid-left, among branch sweep
  { id: "b3", x: 78,  y: 285, scale: 0.75, color: "#2A2620", driftX: 5, driftY: 2, duration: 6.0, delay: 2.0 },
  // Bottom-far-left (free-spread tips area)
  { id: "b4", x: 22,  y: 540, scale: 1.0,  color: "#2A2620", driftX: 4, driftY: 3, duration: 5.6, delay: 2.2 },
  // Bottom-mid
  { id: "b5", x: 180, y: 575, scale: 0.55, color: "#3B4F7A", driftX: 3, driftY: 3, duration: 4.8, delay: 2.4 },
];

/* ─── chain-physics types ─── */
type ChainPoint = {
  x: number; y: number;
  px: number; py: number;
  rx: number; ry: number;
  pinned: boolean;
};

type Branch = {
  points: ChainPoint[];
  segLens: number[];
  hue: string;
};

function createBranches(): Branch[] {
  return branchSpecs.map((spec) => {
    const N = spec.segments;
    const P0 = { x: TRUNK_X, y: TRUNK_Y };
    const P1 = { x: TRUNK_X + spec.peakX, y: TRUNK_Y + spec.peakY };
    const P2 = { x: TRUNK_X + spec.endX, y: TRUNK_Y + spec.endY };

    const points: ChainPoint[] = [];
    for (let i = 0; i < N; i++) {
      const t = i / (N - 1);
      const u = 1 - t;
      // Quadratic Bezier base curve (trunk → peak → end)
      let x = u * u * P0.x + 2 * u * t * P1.x + t * t * P2.x;
      const y = u * u * P0.y + 2 * u * t * P1.y + t * t * P2.y;

      // Add organic sinusoidal wiggle along the branch (grows toward the tip)
      if (i > 0) {
        const wave =
          Math.sin(t * Math.PI * 2 * spec.waveFreq + spec.wavePhase) *
          spec.waveAmp *
          t;
        x += wave;
      }

      points.push({ x, y, px: x, py: y, rx: x, ry: y, pinned: i === 0 });
    }

    const segLens: number[] = [];
    for (let i = 0; i < N - 1; i++) {
      const dx = points[i + 1].x - points[i].x;
      const dy = points[i + 1].y - points[i].y;
      segLens.push(Math.sqrt(dx * dx + dy * dy));
    }

    return { points, segLens, hue: spec.hue };
  });
}

function smoothPath(points: ChainPoint[]): string {
  if (points.length < 2) return "";
  const fmt = (n: number) => n.toFixed(1);
  let d = `M ${fmt(points[0].x)} ${fmt(points[0].y)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || points[i + 1];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${fmt(c1x)} ${fmt(c1y)} ${fmt(c2x)} ${fmt(c2y)} ${fmt(p2.x)} ${fmt(p2.y)}`;
  }
  return d;
}

const leafEvery = 2;

/* ─── small paper-cut swallow used for decorative birds ─── */
function PaperSwallow({ color = "#2A2620", scale = 1 }: { color?: string; scale?: number }) {
  const w = 34 * scale;
  const h = 22 * scale;
  return (
    <svg width={w} height={h} viewBox="0 0 34 22" fill="none">
      <path
        d="M2 11 C 7 9, 11 6, 16 2 C 14 7, 13 10, 11 12 C 16 11, 21 10, 26 8 C 24 12, 22 14, 19 15 C 24 15, 28 16, 32 18 C 26 19, 21 19, 16 18 C 12 17, 7 15, 2 11 Z"
        fill={color}
      />
    </svg>
  );
}

/* ─── bird with mouse-driven parallax (outer) + ambient float (inner) ─── */
function DecorBird({
  b,
  smoothX,
  smoothY,
}: {
  b: (typeof decorBirds)[number];
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}) {
  // Bigger/closer birds parallax more; smaller/farther birds parallax less.
  const depth = b.scale * 22;
  const px = useTransform(smoothX, (v) => v * depth);
  const py = useTransform(smoothY, (v) => v * depth * 0.7);
  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${b.x}px`,
        top: `${b.y}px`,
        x: px,
        y: py,
      }}
      className="pointer-events-none"
    >
      <motion.div
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={{
          opacity: 1,
          x: [0, b.driftX, 0, -b.driftX, 0],
          y: [0, -b.driftY, 0, b.driftY, 0],
        }}
        transition={{
          opacity: { duration: 0.7, delay: b.delay, ease },
          x: {
            duration: b.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: b.delay,
          },
          y: {
            duration: b.duration * 1.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: b.delay,
          },
        }}
      >
        <PaperSwallow color={b.color} scale={b.scale} />
      </motion.div>
    </motion.div>
  );
}

export default function HeroDecoration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef({ x: -9999, y: -9999, active: false });
  const branchesRef = useRef<Branch[]>(createBranches());
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const leafRefs = useRef<(SVGGElement | null)[][]>([]);

  // Normalized cursor position relative to viewport center, range ~[-1, 1].
  // Smoothed via spring so birds glide rather than snap.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 18, mass: 0.6 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      const branches = branchesRef.current;
      const cursor = cursorRef.current;

      /* Verlet integration */
      // Time-based ambient breeze: gentle constant sway even when no cursor
      const time = performance.now() * 0.001; // seconds

      for (const branch of branches) {
        for (const p of branch.points) {
          if (p.pinned) {
            p.x = p.rx;
            p.y = p.ry;
            p.px = p.x;
            p.py = p.y;
            continue;
          }
          const vx = (p.x - p.px) * 0.92;
          const vy = (p.y - p.py) * 0.92;
          let ax = 0;
          let ay = 0.18;
          ax += (p.rx - p.x) * 0.020;
          ay += (p.ry - p.y) * 0.020;

          // Ambient breeze — two slow waves, varying with point position so the
          // whole branch undulates rather than rigidly translating
          const breeze =
            Math.sin(time * 0.6 + p.ry * 0.012) * 0.07 +
            Math.sin(time * 0.32 + p.ry * 0.006 + p.rx * 0.005) * 0.05;
          // Amplitude grows with how far the point is from the trunk (tips sway more)
          const tipFactor = Math.min(1, Math.max(0, (p.ry - TRUNK_Y) / 320));
          ax += breeze * tipFactor;

          if (cursor.active) {
            const dx = p.x - cursor.x;
            const dy = p.y - cursor.y;
            const d2 = dx * dx + dy * dy;
            const r = 95;
            if (d2 < r * r && d2 > 1) {
              const dist = Math.sqrt(d2);
              const f = (1 - dist / r) * 2.4;
              ax += (dx / dist) * f;
              ay += (dy / dist) * f * 0.35;
            }
          }
          p.px = p.x;
          p.py = p.y;
          p.x = p.x + vx + ax;
          p.y = p.y + vy + ay;
        }
      }

      /* Distance constraints (per-segment rest length) */
      const ITER = 4;
      for (let it = 0; it < ITER; it++) {
        for (const branch of branches) {
          const pts = branch.points;
          for (let i = 0; i < pts.length - 1; i++) {
            const p1 = pts[i];
            const p2 = pts[i + 1];
            const restDist = branch.segLens[i];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
            const diff = (restDist - dist) / dist;
            const ox = dx * 0.5 * diff;
            const oy = dy * 0.5 * diff;
            if (!p1.pinned) {
              p1.x -= ox;
              p1.y -= oy;
            }
            if (!p2.pinned) {
              p2.x += ox;
              p2.y += oy;
            }
          }
        }
      }

      /* Render */
      branches.forEach((branch, bi) => {
        const path = pathRefs.current[bi];
        if (path) path.setAttribute("d", smoothPath(branch.points));
        const leaves = leafRefs.current[bi];
        if (leaves) {
          for (let li = 0; li < leaves.length; li++) {
            const el = leaves[li];
            if (!el) continue;
            const ptIdx = parseInt(el.dataset.idx || "0", 10);
            const p = branch.points[ptIdx];
            if (p) {
              el.setAttribute(
                "transform",
                `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`
              );
            }
          }
        }
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const handleMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      cursorRef.current.x = ((e.clientX - rect.left) / rect.width) * VIEW_W;
      cursorRef.current.y = ((e.clientY - rect.top) / rect.height) * VIEW_H;
      cursorRef.current.active = true;
    };
    const handleLeave = () => {
      cursorRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute right-0 top-0 z-[6] hidden h-[620px] w-[380px] lg:block"
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        fill="none"
      >
        <defs>
          {/* Rough paper edge — for sun's torn-paper look */}
          <filter
            id="rough-paper-edge"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              baseFrequency="0.55"
              numOctaves="2"
              seed="4"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" />
          </filter>
        </defs>

        {/* === Layer 1: branches and leaves (behind sun) === */}
        {branchesRef.current.map((branch, i) => (
          <path
            key={`stem-${i}`}
            ref={(el) => {
              pathRefs.current[i] = el;
            }}
            stroke={branch.hue}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.78"
          />
        ))}
        {branchesRef.current.map((branch, bi) => {
          if (!leafRefs.current[bi]) leafRefs.current[bi] = [];
          return (
            <g key={`leaves-${bi}`}>
              {branch.points.map((_, pi) => {
                if (pi < 2 || pi % leafEvery !== 0) return null;
                return (
                  <g
                    key={`leaf-${bi}-${pi}`}
                    ref={(el) => {
                      if (leafRefs.current[bi]) {
                        leafRefs.current[bi][pi] = el;
                      }
                    }}
                    data-idx={pi}
                  >
                    <ellipse
                      cx="-2"
                      cy="3"
                      rx="1.2"
                      ry="4"
                      fill={branch.hue}
                      opacity="0.7"
                      transform="rotate(-22)"
                    />
                    <ellipse
                      cx="2"
                      cy="4"
                      rx="1.2"
                      ry="4"
                      fill={branch.hue}
                      opacity="0.7"
                      transform="rotate(22)"
                    />
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* === Layer 2: sun (left side, balances the willow on the right) === */}
        {/* Flat, single-color paper-cut sun. No glow, no highlight, no volume. */}
        <g filter="url(#rough-paper-edge)">
          <circle cx={SUN_X} cy={SUN_Y} r={SUN_R} fill="#F89657" />
        </g>
      </svg>

      {/* === Layer 3: decorative free-flying birds (HTML overlay, float + mouse parallax) === */}
      {decorBirds.map((b) => (
        <DecorBird key={b.id} b={b} smoothX={smoothX} smoothY={smoothY} />
      ))}

      {/* === Layer 4: value labels (animated entry + hover) === */}
      {values.map((v, i) => (
        <motion.div
          key={v.label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5 + i * 0.18, ease }}
          whileHover={{ scale: 1.04, transition: { duration: 0.3, ease } }}
          className={`group pointer-events-auto absolute cursor-default whitespace-nowrap select-none ${
            v.align === "right" ? "text-right" : "text-left"
          }`}
          style={v.style}
        >
          {/* Mono terra-cotta label */}
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C25430] transition-colors duration-300 group-hover:text-[#A03E1F]">
            <motion.span
              className="mr-1 inline-block"
              animate={{ rotate: [0, -6, 0, 6, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            >
              {v.mark}
            </motion.span>
            {v.label}
          </p>
          {/* Italic serif caption — slides in slightly on hover */}
          <p className="mt-1 font-serif text-[12px] italic leading-[1.3] text-[#6B6358] transition-all duration-300 group-hover:text-[#2A2620] group-hover:translate-x-0.5">
            {v.caption}
          </p>
          {/* Subtle underline that grows on hover */}
          <span
            className={`mt-1.5 block h-px origin-left bg-[#C25430]/40 transition-all duration-500 ease-out ${
              v.align === "right" ? "ml-auto" : ""
            } w-0 group-hover:w-12`}
          />
        </motion.div>
      ))}
    </div>
  );
}
