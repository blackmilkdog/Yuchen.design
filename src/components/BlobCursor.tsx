"use client";

import { useEffect, useRef, useCallback } from "react";

interface BlobState {
  // Default dot
  mode: "dot" | "pill" | "underline" | "card";
  rect: DOMRect | null;
  borderRadius: string;
}

export default function BlobCursor() {
  const blobRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const stateRef = useRef<BlobState>({ mode: "dot", rect: null, borderRadius: "" });
  const morphRef = useRef({ x: 0, y: 0, w: 8, h: 8, r: 9999, opacity: 1 });
  const targetMorphRef = useRef({ x: 0, y: 0, w: 8, h: 8, r: 9999, opacity: 1 });
  const inPlaygroundRef = useRef(false);
  const colorRef = useRef(0); // 0 = orange, 1 = white

  const detectMode = useCallback((target: HTMLElement): BlobState => {
    // Explicit data-cursor overrides
    const explicitPill = target.closest("[data-cursor='pill']") as HTMLElement | null;
    if (explicitPill) {
      const rect = explicitPill.getBoundingClientRect();
      const style = getComputedStyle(explicitPill);
      return { mode: "pill", rect, borderRadius: style.borderRadius || "9999px" };
    }
    const explicitNone = target.closest("[data-cursor='none']") as HTMLElement | null;
    if (explicitNone && !target.closest("[data-cursor='pill']")) {
      return { mode: "dot", rect: null, borderRadius: "" };
    }
    const explicitUnderline = target.closest("[data-cursor='underline']") as HTMLElement | null;
    if (explicitUnderline) {
      const range = document.createRange();
      range.selectNodeContents(explicitUnderline);
      return { mode: "underline", rect: range.getBoundingClientRect(), borderRadius: "" };
    }

    // Only detect actually clickable elements — ignore decorative divs
    const link = target.closest("a[href]") as HTMLElement | null;
    const button = target.closest("button, [role='button'], input[type='submit']") as HTMLElement | null;
    const input = target.closest("input, textarea, select") as HTMLElement | null;

    if (!link && !button && !input) {
      return { mode: "dot", rect: null, borderRadius: "" };
    }

    const el = (link || button || input)!;

    if (link) {
      const hasImage = link.querySelector("img, picture, canvas");
      const hasOnlySvg = !link.textContent?.trim() && link.querySelector("svg");
      const hasAriaLabel = link.hasAttribute("aria-label");

      // Icon-only links (social icons etc) — use pill mode
      if (hasOnlySvg || (hasAriaLabel && !link.textContent?.trim())) {
        const rect = link.getBoundingClientRect();
        return { mode: "pill", rect, borderRadius: "9999px" };
      }

      // Text links without images — use underline mode
      if (!hasImage) {
        return { mode: "underline", rect: link.getBoundingClientRect(), borderRadius: "" };
      }

      // Card-style links — only underline if directly hovering the title
      const isOnTitle = target.closest("h3, h2");
      if (isOnTitle) {
        return { mode: "underline", rect: isOnTitle.getBoundingClientRect(), borderRadius: "" };
      }

      // Hovering elsewhere on a card link — stay as dot
      return { mode: "dot", rect: null, borderRadius: "" };
    }

    if (button) {
      const hasVisualChildren = button.querySelector("svg, img, canvas, picture, span:not(:empty)");
      const isStyled = button.classList.contains("rounded-full") || button.classList.contains("bg-accent");

      // Styled buttons with icons/visuals get pill mode
      if (hasVisualChildren || isStyled) {
        const rect = button.getBoundingClientRect();
        const style = getComputedStyle(button);
        return { mode: "pill", rect, borderRadius: style.borderRadius || "9999px" };
      }

      // Text-only buttons get underline, measured to text width
      const range = document.createRange();
      range.selectNodeContents(button);
      const textRect = range.getBoundingClientRect();
      return { mode: "underline", rect: textRect, borderRadius: "" };
    }

    // Inputs
    const rect = el.getBoundingClientRect();
    return { mode: "pill", rect, borderRadius: getComputedStyle(el).borderRadius };
  }, []);

  useEffect(() => {
    let activeEl: HTMLElement | null = null;

    const updateActiveRect = () => {
      if (activeEl && stateRef.current.mode !== "dot") {
        stateRef.current.rect = activeEl.getBoundingClientRect();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      inPlaygroundRef.current = !!(e.target as HTMLElement).closest("#playground");
      updateActiveRect();
    };

    const handleScroll = () => {
      // Re-detect what's under the cursor after scroll
      const el = document.elementFromPoint(targetRef.current.x, targetRef.current.y) as HTMLElement | null;
      if (el) {
        const state = detectMode(el);
        stateRef.current = state;
        if (state.mode === "pill") {
          activeEl = el.closest("[data-cursor='pill']") as HTMLElement | null;
        } else if (state.mode === "underline") {
          activeEl = (el.closest("[data-cursor='underline']") || el.closest("h3, h2") || el.closest("a[href], button")) as HTMLElement | null;
        } else if (state.mode !== "dot") {
          activeEl = el.closest("a[href], button, [role='button'], input, textarea, select") as HTMLElement | null;
        } else {
          activeEl = null;
        }
        inPlaygroundRef.current = !!el.closest("#playground");
      } else {
        stateRef.current = { mode: "dot", rect: null, borderRadius: "" };
        activeEl = null;
      }
      updateActiveRect();
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const state = detectMode(target);
      stateRef.current = state;
      // Track the element for rect updates — for pill mode, track the data-cursor element, not the link ancestor
      if (state.mode === "pill") {
        activeEl = target.closest("[data-cursor='pill']") as HTMLElement | null;
      } else if (state.mode === "underline") {
        // Track the actual underlined element (title, link text), not the card ancestor
        activeEl = (target.closest("[data-cursor='underline']") || target.closest("h3, h2") || target.closest("a[href], button")) as HTMLElement | null;
      } else if (state.mode !== "dot") {
        activeEl = target.closest("a[href], button, [role='button'], input, textarea, select") as HTMLElement | null;
      } else {
        activeEl = null;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related || !related.closest("a[href], button, [role='button']")) {
        stateRef.current = { mode: "dot", rect: null, borderRadius: "" };
        activeEl = null;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [detectMode]);

  useEffect(() => {
    const animate = () => {
      const lerp = 0.12;
      const morphLerp = 0.14;

      posRef.current.x += (targetRef.current.x - posRef.current.x) * lerp;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * lerp;

      const state = stateRef.current;
      const m = targetMorphRef.current;

      if (state.mode === "dot") {
        m.x = posRef.current.x;
        m.y = posRef.current.y;
        m.w = 8;
        m.h = 8;
        m.r = 9999;
        m.opacity = 1;
      } else if (state.mode === "underline" && state.rect) {
        const r = state.rect;
        m.x = r.left + r.width / 2;
        m.y = r.bottom + 2;
        m.w = r.width + 8;
        m.h = 3;
        m.r = 2;
        m.opacity = 1;
      } else if (state.mode === "pill" && state.rect) {
        const r = state.rect;
        m.x = r.left + r.width / 2;
        m.y = r.top + r.height / 2;
        m.w = r.width + 12;
        m.h = r.height + 12;
        m.r = parseFloat(state.borderRadius) || r.height / 2;
        m.opacity = 0.15;
      } else if (state.mode === "card" && state.rect) {
        const r = state.rect;
        m.x = r.left + r.width / 2;
        m.y = r.top + r.height / 2;
        m.w = r.width + 8;
        m.h = r.height + 8;
        m.r = parseFloat(state.borderRadius) || 36;
        m.opacity = 0.08;
      }

      // Lerp morph values
      const c = morphRef.current;
      c.x += (m.x - c.x) * morphLerp;
      c.y += (m.y - c.y) * morphLerp;
      c.w += (m.w - c.w) * morphLerp;
      c.h += (m.h - c.h) * morphLerp;
      c.r += (m.r - c.r) * morphLerp;
      c.opacity += (m.opacity - c.opacity) * morphLerp;

      // Lerp color between orange (0) and white (1)
      const targetColor = inPlaygroundRef.current ? 1 : 0;
      colorRef.current += (targetColor - colorRef.current) * morphLerp;
      const t = colorRef.current;
      // Orange: rgb(255,153,85) → White: rgb(255,255,255)
      const r = Math.round(255);
      const g = Math.round(153 + (255 - 153) * t);
      const b = Math.round(85 + (255 - 85) * t);
      const a = 0.6 + 0.4 * t; // outer alpha: 0.6 → 1.0

      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${c.x}px, ${c.y}px) translate(-50%, -50%)`;
        blobRef.current.style.width = `${c.w}px`;
        blobRef.current.style.height = `${c.h}px`;
        blobRef.current.style.borderRadius = `${c.r}px`;
        blobRef.current.style.opacity = String(c.opacity);
        blobRef.current.style.background = `radial-gradient(circle, rgb(${r},${g},${b}) 0%, rgb(${r},${g},${b}) 60%, rgba(${r},${g},${b},${a.toFixed(2)}) 100%)`;
        blobRef.current.style.boxShadow = `0 0 16px 4px rgba(${r},${g},${b},0.25)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      <style jsx global>{`
        *, *::before, *::after {
          cursor: none !important;
        }
      `}</style>

      <div
        ref={blobRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          willChange: "transform, width, height, border-radius, opacity",
          background: "radial-gradient(circle, #ff9955 0%, #ff8c42 60%, rgba(255,140,66,0.6) 100%)",
          boxShadow: "0 0 16px 4px rgba(255,140,66,0.25)",
        }}
      />
    </>
  );
}
