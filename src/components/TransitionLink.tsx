"use client";

import React, { useCallback } from "react";
import { useSpotlight } from "./SpotlightTransition";

interface TransitionLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function TransitionLink({
  href,
  children,
  className,
  onClick,
  ...rest
}: TransitionLinkProps) {
  const { start, isTransitioning } = useSpotlight();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (isTransitioning) return;
      onClick?.(e);
      start(href, e.clientX, e.clientY);
    },
    [href, start, isTransitioning, onClick]
  );

  return (
    <a href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
}
