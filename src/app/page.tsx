"use client";

import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import Playground from "@/components/Playground";
import Story from "@/components/Story";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <main className="relative w-full">
      <SmoothScroll />
      <Header />
      <Hero />
      <Works />
      <Playground />
      <Story />
      <Footer />
    </main>
  );
}
