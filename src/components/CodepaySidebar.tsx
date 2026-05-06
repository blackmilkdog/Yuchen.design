"use client";

import { useEffect, useState } from "react";

type NavItem = {
  id: string;
  label: string;
};

type NavSection = {
  num: string;
  id: string;
  label: string;
  items: NavItem[];
};

const sections: NavSection[] = [
  {
    num: "01",
    id: "patch-track",
    label: "Patch Track",
    items: [
      { id: "listen-organize", label: "Customer-First Discovery" },
      { id: "pipeline", label: "Risk-Ranked Triage" },
      { id: "four-principles", label: "Design Principles" },
    ],
  },
  {
    num: "02",
    id: "platform-track",
    label: "Platform Track",
    items: [
      { id: "paypilot", label: "PayPilot · Onboarding IA" },
      { id: "register", label: "Register · Component System" },
    ],
  },
  {
    num: "03",
    id: "takeaways",
    label: "Takeaways",
    items: [],
  },
];

export default function CodepaySidebar() {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Build the full list of ids we want to observe
    const watchIds = sections.flatMap((s) => [s.id, ...s.items.map((it) => it.id)]);
    const elements = watchIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry that's most prominently visible (closest to top of viewport)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // trigger when section reaches roughly the upper third of the viewport
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update hash without triggering a jump
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${id}`);
      }
    }
  };

  return (
    <nav
      aria-label="Case study sections"
      className="pointer-events-none fixed left-6 top-32 z-30 hidden w-[230px] xl:block"
    >
      <ul className="pointer-events-auto space-y-5 rounded-xl border border-gray-200/30 bg-white/70 px-5 py-6 shadow-[0_2px_16px_-12px_rgba(0,0,0,0.06)] backdrop-blur-sm">
        {sections.map((section) => {
          const sectionActive = activeId === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(e) => handleClick(e, section.id)}
                className={`group flex items-baseline gap-2 transition-colors ${
                  sectionActive ? "text-accent" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                  {section.num}
                </span>
                <span className="font-serif text-[13px] tracking-[-0.2px]">
                  {section.label}
                </span>
              </a>
              {section.items.length > 0 && (
                <ul className="mt-2 space-y-1.5 border-l border-gray-200 pl-3">
                  {section.items.map((item) => {
                    const itemActive = activeId === item.id;
                    return (
                      <li key={item.id} className="relative">
                        {itemActive && (
                          <span
                            aria-hidden
                            className="absolute -left-[13px] top-1/2 h-3 w-[2px] -translate-y-1/2 bg-accent"
                          />
                        )}
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => handleClick(e, item.id)}
                          className={`block font-sans text-[12px] leading-[1.4] transition-colors ${
                            itemActive
                              ? "text-accent"
                              : "text-gray-400 hover:text-gray-700"
                          }`}
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
