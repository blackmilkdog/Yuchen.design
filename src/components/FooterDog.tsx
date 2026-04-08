"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

function GooglyEye({
  pupilX,
  pupilY,
  cx,
  cy,
  r,
  scale,
  fancy,
}: {
  pupilX: ReturnType<typeof useSpring>;
  pupilY: ReturnType<typeof useSpring>;
  cx: number;
  cy: number;
  r: number;
  scale: number;
  fancy: boolean;
}) {
  return (
    <motion.g
      animate={{ scale }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <circle cx={cx} cy={cy} r={r * 1.3} fill="white" opacity="0.15" />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="white"
        stroke="rgba(0,0,0,0.2)"
        strokeWidth="2"
      />
      {/* Main pupil - always black */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={r * 0.55}
        fill="#111"
        style={{ x: pupilX, y: pupilY }}
      />
      {/* Fancy details - fade in on hover */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={r * 0.45}
        fill="#3b2f1a"
        animate={{ opacity: fancy ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ x: pupilX, y: pupilY }}
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r={r * 0.25}
        fill="#000"
        animate={{ opacity: fancy ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ x: pupilX, y: pupilY }}
      />
      <motion.circle
        cx={cx + r * 0.15}
        cy={cy - r * 0.15}
        r={r * 0.18}
        fill="white"
        animate={{ opacity: fancy ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ x: pupilX, y: pupilY }}
      />
      <motion.circle
        cx={cx - r * 0.2}
        cy={cy + r * 0.15}
        r={r * 0.08}
        fill="white"
        animate={{ opacity: fancy ? 0.6 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ x: pupilX, y: pupilY }}
      />
    </motion.g>
  );
}

type Particle = {
  id: number;
  emoji: string;
  x: number;
  y: number;
  angle: number;
  distance: number;
  delay: number;
  size: number;
};

let particleId = 0;

export default function FooterDog() {
  const [eyeScale, setEyeScale] = useState(1);
  const [particles, setParticles] = useState<Particle[]>([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const pupilRawX = useMotionValue(0);
  const pupilRawY = useMotionValue(0);
  const pupilX = useSpring(pupilRawX, { stiffness: 150, damping: 15 });
  const pupilY = useSpring(pupilRawY, { stiffness: 150, damping: 15 });

  const spawnParticles = useCallback(() => {
    const emojis = ["✨", "💖", "💕", "⭐", "🩷", "✨", "💗", "⭐"];
    const newParticles: Particle[] = [];
    for (let i = 0; i < 16; i++) {
      newParticles.push({
        id: particleId++,
        emoji: emojis[i % emojis.length],
        x: 50 + (Math.random() - 0.5) * 40,
        y: 50 + (Math.random() - 0.5) * 40,
        angle: (Math.PI * 2 * i) / 16 + (Math.random() - 0.5) * 0.5,
        distance: 60 + Math.random() * 80,
        delay: Math.random() * 0.3,
        size: 14 + Math.random() * 14,
      });
    }
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 2000);
  }, []);

  useEffect(() => {
    const handleEyeScale = (e: Event) => {
      setEyeScale((e as CustomEvent).detail ? 1.5 : 1);
    };
    const handleBoneDrop = () => {
      spawnParticles();
      // Also make eyes go big briefly
      setEyeScale(1.8);
      setTimeout(() => setEyeScale(1), 1500);
    };
    window.addEventListener("dog-eyes-scale", handleEyeScale);
    window.addEventListener("dog-bone-drop", handleBoneDrop);
    return () => {
      window.removeEventListener("dog-eyes-scale", handleEyeScale);
      window.removeEventListener("dog-bone-drop", handleBoneDrop);
    };
  }, [spawnParticles]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize relative to dog position (bottom-right corner)
      const nx = e.clientX / window.innerWidth - 0.9;
      const ny = e.clientY / window.innerHeight - 0.9;
      mouseX.set(nx * 6);
      mouseY.set(ny * 4);
      // Very sensitive pupil movement
      const px = nx * 50;
      const py = ny * 40;
      const dist = Math.sqrt(px * px + py * py);
      const maxDist = 25;
      const scale = dist > maxDist ? maxDist / dist : 1;
      pupilRawX.set(px * scale);
      pupilRawY.set(py * scale);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, pupilRawX, pupilRawY]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.3, ease }}
      style={{ x: springX, y: springY }}
      data-cursor="bone"
      className="absolute right-[-60px] bottom-[-20px] z-[2] hidden w-[260px] -rotate-[25deg] overflow-hidden lg:block"
    >
      <img
        src="/images/dog.png"
        alt="Dog"
        className="h-full w-full object-cover"
        draggable={false}
      />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <GooglyEye pupilX={pupilX} pupilY={pupilY} cx={325} cy={285} r={85} scale={eyeScale} fancy={eyeScale > 1} />
        <GooglyEye pupilX={pupilX} pupilY={pupilY} cx={560} cy={345} r={85} scale={eyeScale} fancy={eyeScale > 1} />
      </svg>

      {/* Sparkle / heart particles on bone drop */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{
              opacity: 1,
              scale: 0,
              left: `${p.x}%`,
              top: `${p.y}%`,
              x: 0,
              y: 0,
            }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0, 1.2, 0.8],
              x: Math.cos(p.angle) * p.distance,
              y: Math.sin(p.angle) * p.distance,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.2,
              delay: p.delay,
              ease: "easeOut",
            }}
            className="pointer-events-none absolute z-30"
            style={{ fontSize: p.size }}
          >
            {p.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
