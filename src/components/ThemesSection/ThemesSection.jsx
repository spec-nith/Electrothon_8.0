"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Press_Start_2P } from "next/font/google";
import { Orbitron } from "next/font/google";

import { tabData } from "./data";
import TargetCursor from "../TargetCursor";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 1 } },
};

export default function ThemeSection() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [lockedIndex, setLockedIndex] = useState(null);

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsSmallScreen(w <= 640);
      setIsMediumScreen(w > 640 && w <= 1100);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isDesktop = !isSmallScreen && !isMediumScreen;

  const expandedWidth = "38%";
  const collapsedWidth = "10%";
  const idleWidth = "14%";

  const anyActive = lockedIndex !== null || activeIndex !== null;
  const mobileCardHeight = "320px";

  const desktopGap = anyActive ? "gap-2" : "gap-3";
  const gridGap = anyActive ? "gap-3" : "gap-4";
  const mobileGap = anyActive ? "gap-3" : "gap-4";

  return (
    <section
      id="themes"
      className="relative py-28 w-screen min-h-screen lg:min-h-[1000px] pt-[18vh] text-white overflow-hidden bg-cover bg-top"
      style={{
        backgroundImage: 'url("/backgrounds/themes.png")',
      }}
    >
      <TargetCursor targetSelector=".cursor-target" />

      {/* ========= GRADIENTS & OVERLAYS ========= */}
      {isSmallScreen && (
        <div
          aria-hidden
          className="absolute inset-0 z-[0]"
          style={{
            background: `
              radial-gradient(circle at 20% 15%, rgba(180,0,255,0.28), transparent 42%),
              radial-gradient(circle at 80% 25%, rgba(0,255,255,0.2), transparent 48%),
              linear-gradient(to bottom, #2a0045 0%, #1a0030 35%, #0b0018 65%, #020004 100%)
            `,
          }}
        />
      )}
      <div
        aria-hidden
        className="absolute top-0 left-0 w-full h-[22vh] z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(180,80,255,0.45), rgba(120,40,200,0.18), rgba(0,0,0,0))",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-full h-[22vh] z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0))",
        }}
      />
      <div
        className={`absolute inset-0 z-[0] ${
          isSmallScreen ? "bg-black/5" : "bg-black/10"
        }`}
      />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        
        {/* HEADING */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="w-full flex justify-center"
        >
          <span
            className={`${pressStart.className} cursor-target text-[clamp(1.8rem,5vw,4.4rem)] text-center font-bold`}
            style={{ letterSpacing: "2px" }}
          >
            THEMES
          </span>
        </motion.div>

        {/* CARDS CONTAINER */}
        <motion.div
          initial={{ opacity: 0, translateY: 30 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 w-full"
        >
          <div
            className={
              isSmallScreen
                ? `flex flex-col ${mobileGap}`
                : isMediumScreen
                ? `grid grid-cols-3 ${gridGap} place-items-center`
                : `flex ${desktopGap} items-stretch justify-center`
            }
          >
            {tabData.map((theme, idx) => {
              const isActive = lockedIndex === idx || activeIndex === idx;

              const targetWidth = isDesktop
                ? anyActive
                  ? isActive
                    ? expandedWidth
                    : collapsedWidth
                  : idleWidth
                : "100%";

              const forcedStyle = !isDesktop
                ? {
                    width: "100%",
                    minWidth: "100%",
                    height: isSmallScreen ? mobileCardHeight : "460px",
                  }
                : {};

              return (
                <motion.div
                  key={theme.id}
                  layout
                  animate={{ width: targetWidth }}
                  transition={{ duration: 0.5, ease: "easeInOut" }} 
                  onMouseEnter={() =>
                    isDesktop && lockedIndex === null && setActiveIndex(idx)
                  }
                  onMouseLeave={() =>
                    isDesktop && lockedIndex === null && setActiveIndex(null)
                  }
                  onClick={() =>
                    setLockedIndex((prev) => (prev === idx ? null : idx))
                  }
                  className={`cursor-target group relative h-[460px] rounded-3xl overflow-hidden cursor-pointer border transition-all duration-500 ${
                    isActive ? "border-white/60 shadow-2xl shadow-purple-900/20" : "border-white/10"
                  }`}
                  style={forcedStyle}
                >
                  {/* 1. BACKGROUND IMAGE */}
                  <Image
                    src={theme.img1}
                    alt={theme.heading}
                    fill
                    className={`object-cover transition-transform duration-700 ${
                      isActive ? "scale-110" : "scale-100"
                    }`}
                  />

                  {/* 2. GRADIENT OVERLAY */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-t transition-colors duration-500 ${
                        isActive 
                        ? "from-black/95 via-black/60 to-transparent" 
                        : "from-black/80 via-black/20 to-transparent"
                    }`} 
                  />

                  {/* 3. CONTENT AREA */}
                  <div className="absolute inset-x-0 bottom-0 h-full p-6 pointer-events-none">
                    
                    {/* TITLE */}
                    <div 
                        className="absolute left-6 right-6 transition-all duration-500 ease-in-out"
                        style={{
                            // Moves title up when active
                            bottom: isActive ? "140px" : "30px" 
                        }}
                    >
                         {/* FIX: break-words ensures long titles wrap instead of disappearing.
                             leading-tight keeps wrapped lines close together. */}
                         <h3 className={`${orbitron.className} text-lg md:text-xl font-bold text-white drop-shadow-md break-words leading-tight`}>
                            {theme.heading}
                         </h3>
                    </div>

                    {/* DESCRIPTION */}
                    <div 
                        className={`absolute left-6 right-6 bottom-6 transition-all duration-500 ease-in-out ${
                           isActive ? "delay-300" : "delay-0"
                        }`}
                        style={{
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? "translateY(0)" : "translateY(20px)", 
                        }}
                    >
                         {/* FIX: min-w-[200px] ensures text layout is stable */}
                         <p className="text-sm text-gray-200 leading-relaxed font-sans line-clamp-5 min-w-[200px]">
                            {theme.content}
                         </p>
                    </div>
                    
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}