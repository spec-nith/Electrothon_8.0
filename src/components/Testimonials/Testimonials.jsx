"use client";

import Cards from "./Cards";
import Data from "@/components/Testimonials/testimonials_data";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Testimonials() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const headingY = useTransform(scrollYProgress, [0, 0.08], ["0vh", "4vh"]);

  const headingOpacity = useTransform(scrollYProgress, [0.6, 1], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="
        relative w-full 
        min-h-[260vh] sm:min-h-[280vh] md:min-h-[300vh]
        pt-[14vh] sm:pt-[16vh] md:pt-[18vh]
      "
    >
      <Image
        src="/backgrounds/bg3.webp"
        alt="Testimonials Background"
        fill
        className="object-cover object-top z-0"
        priority={false}
      />
      <div
        className="
      pointer-events-none
      absolute -top-[1px] left-0 w-full
      h-[12vh] sm:h-[14vh] md:h-[16vh]
      z-[1]
    "
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0))",
        }}
      />

      {/*  BOTTOM BLEND OVERLAY */}
      <div
        className="
      pointer-events-none
      absolute -bottom-[1px] left-0 w-full
      h-[14vh] sm:h-[16vh] md:h-[18vh]
      z-[1]
    "
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0))",
        }}
      />
      {/* HEADING */}
      <motion.h1
        style={{
          y: headingY,
          opacity: headingOpacity,
          position: "sticky",
          zIndex: 5,
          fontFamily: '"Press Start 2P", cursive',
        }}
        className="
        top-[8vh] sm:top-[9vh] md:top-[10vh]
          text-white
          text-[clamp(1.6rem,5vw,3.75rem)]
          font-extrabold tracking-wider
          text-center break-words
          mb-[20vh] sm:mb-[22vh] md:mb-[24vh]
          max-w-[100vw] overflow-hidden text-ellipsis whitespace-nowrap
        "
      >
        TESTIMONIALS
      </motion.h1>

      {/* CARDS */}
      <div className="relative flex flex-col items-center gap-[6vh]">
        {Data.map((item, index) => (
          <Cards key={item.id} data={item} index={index} />
        ))}
      </div>

      {/* BOTTOM BREATHING SPACE */}
      <div className="h-[35vh] sm:h-[40vh] md:h-[45vh]" />
    </section>
  );
}
