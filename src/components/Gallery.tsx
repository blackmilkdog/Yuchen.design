"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    alt: "Abstract architecture",
    aspect: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    alt: "Code on screen",
    aspect: "aspect-[4/5]",
  },
  {
    src: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=800&q=80",
    alt: "Minimal workspace",
    aspect: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    alt: "Creative tools",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80",
    alt: "Technology abstract",
    aspect: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    alt: "Abstract gradient",
    aspect: "aspect-[4/5]",
  },
];

function GalleryImage({
  src,
  alt,
  aspect,
  index,
}: {
  src: string;
  alt: string;
  aspect: string;
  index: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.2,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once: true, margin: "-100px" }}
      className={`image-reveal masonry-item ${aspect}`}
    >
      <motion.div className="w-full h-full overflow-hidden" style={{ y }}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{ filter: "grayscale(100%) contrast(1.1)" }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="py-32 md:py-48 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span
            className="text-xs tracking-[0.5em] uppercase text-muted"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            002 — Visual Journal
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-5xl md:text-8xl font-light mb-20 max-w-4xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Moments of
          <br />
          <span className="italic text-stroke">visual tension</span>
        </motion.h2>

        {/* Masonry-like grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {images.map((img, i) => (
            <GalleryImage key={i} {...img} index={i} />
          ))}
        </div>

        {/* Full-width image */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mt-16 image-reveal aspect-[21/9] overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
            alt="Panoramic"
            className="w-full h-full object-cover"
            style={{ filter: "grayscale(100%) contrast(1.15)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
