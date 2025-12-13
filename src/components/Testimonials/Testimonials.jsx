"use client";

import Cards from "./Cards";
import Data from "@/assets/testimonials_data/testimonials_data";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Testimonials() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Move heading from top → real center
  const headingY = useTransform(
    scrollYProgress,
    [0, 0.12],
    ["0vh", "18vh"] // was 26vh → now properly centered
  );

  // Shrink only after last card
  const headingScale = useTransform(scrollYProgress, [0.55, 1], [1, 0.7]);
  const headingOpacity = useTransform(scrollYProgress, [0.55, 1], [1, 0.2]);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen min-h-[320vh] pt-[18vh]"
      style={{
        backgroundImage: "url('/backgrounds/testimonials.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
        backgroundSize: "100% 100%",
      }}
    >
      {/* SINGLE HEADING */}
      <motion.h1
        style={{
          y: headingY,
          scale: headingScale,
          opacity: headingOpacity,
          position: "sticky",
          top: "12vh", // moved higher (18vh → 12vh)
          fontFamily: '"Press Start 2P", cursive',
          fontSize: "clamp(2.8rem, 5.5vw, 4.2rem)",
        }}
        className="
          text-white text-7xl md:text-8xl font-extrabold tracking-wider
          text-center pt-[10vh] pb-[15vh]
          z-[10]
        "
      >
        TESTIMONIALS
      </motion.h1>

      {/* small space before cards */}
      <div className="h-[10vh]"></div>

      {/* CARDS STACK */}
      <div className="relative flex flex-col items-center pt-[0vh] pb-[65vh] z-[30]">
        {Data.map((item, index) => (
          <Cards key={item.id} data={item} index={index} />
        ))}
      </div>
    </section>
  );
}
