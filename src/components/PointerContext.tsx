"use client";

import { createContext, useContext, useEffect, useRef, useCallback } from "react";

type PointerListener = (x: number, y: number) => void;

interface PointerContextValue {
  subscribe: (fn: PointerListener) => () => void;
  getPosition: () => { x: number; y: number };
}

const Ctx = createContext<PointerContextValue | null>(null);

export function PointerProvider({ children }: { children: React.ReactNode }) {
  const listenersRef = useRef<Set<PointerListener>>(new Set());
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      for (const fn of listenersRef.current) fn(e.clientX, e.clientY);
    };
    window.addEventListener("pointermove", handler, { passive: true });
    return () => window.removeEventListener("pointermove", handler);
  }, []);

  const subscribe = useCallback((fn: PointerListener) => {
    listenersRef.current.add(fn);
    return () => { listenersRef.current.delete(fn); };
  }, []);

  const getPosition = useCallback(() => posRef.current, []);

  return <Ctx.Provider value={{ subscribe, getPosition }}>{children}</Ctx.Provider>;
}

export function usePointer(fn: PointerListener) {
  const ctx = useContext(Ctx);
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => {
    if (!ctx) return;
    return ctx.subscribe((x, y) => fnRef.current(x, y));
  }, [ctx]);
}

export function usePointerPosition() {
  const ctx = useContext(Ctx);
  return ctx?.getPosition ?? (() => ({ x: 0, y: 0 }));
}
