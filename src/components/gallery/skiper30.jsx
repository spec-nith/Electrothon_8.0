"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
// Ensure this path matches your file structure
import data from '@/components/gallery/data';

const images = data;

const Skiper30 = () => {
  const gallery = useRef(null);
  
  // STATE MANAGEMENT
  // Initialize width/height to 0, but if window exists (client-side), grab dimensions immediately.
  // This prevents the "stuck" look where images don't move until the first scroll/resize.
  const [dimension, setDimension] = useState({ 
    width: typeof window !== "undefined" ? window.innerWidth : 0, 
    height: typeof window !== "undefined" ? window.innerHeight : 0 
  });
  
  // Track how many columns to show based on screen width
  const [visibleColumns, setVisibleColumns] = useState(4);

  const { scrollYProgress } = useScroll({
    target: gallery,
    // "start end": Animation starts when TOP of gallery hits BOTTOM of viewport
    // "end start": Animation ends when BOTTOM of gallery hits TOP of viewport
    offset: ["start end", "end start"],
  });

  const { height } = dimension;

  // PARALLAX CONFIGURATION
  // The second value in the array [0, height * X] determines the speed.
  // Higher multiplier = Faster scroll speed (images move further).
  // Lower multiplier = Slower scroll speed.
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]); // Fastest column
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]); // Slowest column
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    // 1. SMOOTH SCROLL SETUP (Lenis)
    // We configure Lenis for a smooth, app-like feel.
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for smoothness
      smoothTouch: true, // key for mobile experience
      touchMultiplier: 2,
    });

    // Animation Loop
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const rafId = requestAnimationFrame(raf);

    // 2. RESPONSIVE LOGIC
    const resize = () => {
      const w = window.innerWidth;
      
      // Update dimensions state only if strictly necessary to avoid re-renders
      setDimension(prev => {
        if (prev.width === w && prev.height === window.innerHeight) return prev;
        return { width: w, height: window.innerHeight };
      });

      // COLUMN VISIBILITY LOGIC
      // Instead of reshuffling images (which breaks the design), we simply hide 
      // the outer columns on smaller screens.
      if (w < 640) {
        setVisibleColumns(2); // Mobile: Show Col 1 & 2
      } else if (w < 1024) {
        setVisibleColumns(3); // Tablet: Show Col 1, 2 & 3
      } else {
        setVisibleColumns(4); // Desktop: Show all
      }
    };

    // Run resize logic immediately on mount
    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="w-full bg-[#eee] text-black">
      <div
        ref={gallery}
        // CONTAINER STYLES
        // h-[175vh]: Defines the scrollable height. The parallax math relies on this.
        // overflow-hidden: Essential. Hides the "top" offset parts of images.
        className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden bg-purple p-[2vw]"
        style={{
          // backgroundImage: "url('/backgrounds/gallerybgmain.png')",
          backgroundColor: "#2e1065",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "scroll" // Fixes jitter on some mobile browsers
        }}
      >
        <div className="pointer-events-none absolute inset-0 z-10"
         style={{
    background: "linear-gradient(to bottom, rgba(46,16,101,0.8) 0%, transparent 10%, transparent 90%, rgba(46,16,101,0.8) 100%)"
  }}/>
        {/* COLUMN 1: Always Visible */}
        {/* top="-45%" pulls the column UP so it starts mid-scroll */}
        <Column 
          images={[images[0], images[1], images[2], images[12], images[16]]} 
          y={y} 
          top="-45%" 
        />

        {/* COLUMN 2: Always Visible */}
        {/* top="-95%" is the most aggressive offset, creating the "deep" look */}
        <Column 
          images={[images[3], images[4], images[5], images[13], images[17]]} 
          y={y2} 
          top="-95%" 
        />

        {/* COLUMN 3: Hidden on Mobile (< 640px) */}
        {visibleColumns >= 3 && (
          <Column 
            images={[images[6], images[7], images[8], images[14], images[18]]} 
            y={y3} 
            top="-45%" 
          />
        )}

        {/* COLUMN 4: Hidden on Tablet & Mobile (< 1024px) */}
        {visibleColumns >= 4 && (
          <Column 
            images={[images[9], images[10], images[11], images[15], images[19]]} 
            y={y4} 
            top="-75%" 
          />
        )}
      </div>
    </main>
  );
};

const Column = ({ images, y, top }) => {
  return (
    <motion.div
      // LAYOUT & PERFORMANCE CLASSES
      // flex-1: Crucial. Allows columns to fill width equally (whether 2, 3, or 4 cols).
      // min-w-0: Prevents flex items from overflowing horizontally.
      // will-change-transform: Promotes this element to a GPU layer (fixes lag).
      // transform-gpu: Enforces hardware acceleration.
      className="relative flex h-full flex-1 min-w-0 flex-col gap-[2vw] will-change-transform transform-gpu"
      style={{ 
        y, 
        top 
      }}
    >
      {images.map((src, i) => (
        <div key={i}
         className="group relative h-full w-full overflow-hidden rounded-xl bg-black/20 
      border-[2px] border-[rgba(226,188,255,0.8)]
      /* Initial glow */
      shadow-[0_0_20px_rgba(190,140,255,0.7)]
      /*Make it glow slightly more on hover */
      transition-all duration-500
      group-hover:shadow-[0_0_30px_rgba(190,140,255,0.9)]
    ">
          <img 
            src={`${src}`} 
            alt="gallery-image"
            // IMAGE OPTIMIZATION
            // decoding="async": Unblocks main thread during image decoding.
            // loading="lazy": Improves initial page load performance.
            decoding="async"
            loading="lazy"
            className="h-full w-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:brightness-110" 
          />
        </div>
      ))}
    </motion.div>
  );
};

export { Skiper30 };