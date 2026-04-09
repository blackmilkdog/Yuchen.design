"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { PointerProvider } from "./PointerContext";

interface SpotlightContextValue {
  /** Trigger the spotlight transition from (x, y) to the given href */
  start: (href: string, x: number, y: number, color?: string) => void;
  /** Whether a transition is currently in progress */
  isTransitioning: boolean;
}

const SpotlightContext = createContext<SpotlightContextValue | null>(null);

export function useSpotlight(): SpotlightContextValue {
  const ctx = useContext(SpotlightContext);
  if (!ctx) {
    throw new Error("useSpotlight must be used within <SpotlightTransition>");
  }
  return ctx;
}

export default function SpotlightTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Keep a ref to prevent double-fires
  const lockRef = useRef(false);

  const start = useCallback(
    (href: string, x: number, y: number, color?: string) => {
      // Don't transition to the same page, and don't double-fire
      if (lockRef.current || href === pathname) return;
      lockRef.current = true;
      setIsTransitioning(true);

      const overlay = overlayRef.current;
      if (!overlay) {
        lockRef.current = false;
        setIsTransitioning(false);
        return;
      }

      // Set initial overlay color (orange like cursor, lerps to white)
      const startColor = color || "#ff9955";
      overlay.style.backgroundColor = startColor;

      // Reset overlay state
      overlay.style.opacity = "1";
      overlay.style.pointerEvents = "auto";
      overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
      // Force reflow so the browser registers the starting value
      overlay.getBoundingClientRect();

      // Expand the circle and lerp color to white
      overlay.style.transition =
        "clip-path 1000ms cubic-bezier(0.16, 1, 0.3, 1), background-color 1000ms cubic-bezier(0.16, 1, 0.3, 1)";
      overlay.style.clipPath = `circle(150vmax at ${x}px ${y}px)`;
      overlay.style.backgroundColor = "#ffffff";

      // At the midpoint, navigate and scroll to top
      const navTimer = setTimeout(() => {
        window.scrollTo(0, 0);
        router.push(href);
      }, 500);

      // After the circle is fully expanded, fade out the overlay
      const fadeTimer = setTimeout(() => {
        overlay.style.transition = "opacity 400ms ease";
        overlay.style.opacity = "0";
      }, 1050);

      // Clean up after everything completes
      const cleanupTimer = setTimeout(() => {
        overlay.style.transition = "none";
        overlay.style.clipPath = "circle(0px at 0px 0px)";
        overlay.style.pointerEvents = "none";
        lockRef.current = false;
        setIsTransitioning(false);
      }, 1500);

      // Store timers for potential cleanup
      return () => {
        clearTimeout(navTimer);
        clearTimeout(fadeTimer);
        clearTimeout(cleanupTimer);
      };
    },
    [pathname, router]
  );

  return (
    <PointerProvider>
    <SpotlightContext.Provider value={{ start, isTransitioning }}>
      {children}
      {/* Overlay */}
      <div
        ref={overlayRef}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          backgroundColor: "#fff",
          clipPath: "circle(0px at 0px 0px)",
          opacity: 0,
          pointerEvents: "none",
          willChange: "clip-path, opacity",
        }}
      />
    </SpotlightContext.Provider>
    </PointerProvider>
  );
}
