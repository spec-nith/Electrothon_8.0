"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import data from '@/components/gallery/data';

const images = data;

const Skiper30 = () => {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ 
    width: typeof window !== "undefined" ? window.innerWidth : 0, 
    height: typeof window !== "undefined" ? window.innerHeight : 0 
  });
  const [visibleColumns, setVisibleColumns] = useState(4);

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });


  const { height } = dimension;

  // Parallax transforms - optimized multipliers
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      lerp: 0.1, // Added for extra smoothness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 0.5,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const rafId = requestAnimationFrame(raf);

    const resize = () => {
      const w = window.innerWidth;
      setDimension({ width: w, height: window.innerHeight });

      if (w < 640) setVisibleColumns(2);
      else if (w < 1024) setVisibleColumns(3);
      else setVisibleColumns(4);
    };

    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="w-full bg-black text-white">
      <div
        ref={gallery}
        className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden p-[2vw]"
        style={{
          backgroundColor: "#2e1065", // Consistent dark background
          contain: "paint", // Prevents layout shifts during parallax
          contentVisibility: "visible", 
           containIntrinsicSize: "0 175vh",
        }}
      >
        {/* Shadow Overlay */}
        <div className="pointer-events-none absolute inset-0 z-10"
             style={{
               background: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.9) 100%)"
             }}/>

        <Column images={[images[0], images[1], images[2], images[12], images[16]]} y={y} top="-45%" />
        <Column images={[images[3], images[4], images[5], images[13], images[17]]} y={y2} top="-95%" />
        
        {visibleColumns >= 3 && (
          <Column images={[images[6], images[7], images[8], images[14], images[18]]} y={y3} top="-45%" />
        )}

        {visibleColumns >= 4 && (
          <Column images={[images[9], images[10], images[11], images[15], images[19]]} y={y4} top="-75%" />
        )}
      </div>
    </main>
  );
};

const Column = ({ images, y, top }) => {
  return (
    <motion.div
      className="relative flex h-full flex-1 min-w-0 flex-col gap-[2vw] transform-gpu"
      style={{ 
        y, 
        top,
        willChange: "transform", // Prepares GPU for movement
        transform: "translateZ(0)",
      }}
    >
      {images.map((src, i) => (
        <div key={i}
          className="group relative h-full w-full overflow-hidden rounded-xl bg-black/20 
                     border-[2px] border-[rgba(226,188,255,0.8)]
                     /* STATIC GLOW: Stays the same all the time for better performance */
                     shadow-[0_0_20px_rgba(190,140,255,0.7)]
                     transform-gpu"
        >
          <img 
            src={`${src}`} 
            alt="electrothon-gallery"
            decoding="sync"
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover 
             /* PERFORMANCE HACKS FOR SMOOTH SCALING */
             will-change-transform 
             transform-gpu 
             translate-z-0 
             backface-visibility-hidden
             cursor-target
             

             group-hover:scale-105"
             style={{
                  transform: "translateZ(0)", // FORCES GPU layer
                }}
          />
        </div>
      ))}
    </motion.div>
  );
};

export { Skiper30 };