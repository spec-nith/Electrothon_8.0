"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Press_Start_2P } from "next/font/google";
import { Orbitron } from "next/font/google";

import { tabData } from "./data";

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
      setIsMediumScreen(w > 640 && w <= 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const expandedWidth = "46%";
  const collapsedWidth = "9%";
  const idleWidth = "14%";

  const anyActive = lockedIndex !== null || activeIndex !== null;
  const mobileCardHeight = "260px";

  return (
    <section
      id="themes"
      className="relative py-28 w-screen min-h-[1000px] pt-[18vh] text-white bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: 'url("/backgrounds/bg2.png")',
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/10 z-0" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        {/* Heading */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className={`${pressStart.className} text-[40px] sm:text-[56px] md:text-[64px] text-center font-bold`}
          style={{ textTransform: "uppercase", letterSpacing: "2px" }}
        >
          Themes
        </motion.div>

        {/* Cards */}
        <motion.div
          initial={{ opacity: 0, translateY: 30 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 w-full"
        >
          <div className="relative w-full">
            {/* Responsive layout switching */}
            <div
              className={
                isMediumScreen
                  ? "grid grid-cols-2 gap-6 place-items-center"
                  : isSmallScreen
                  ? "flex flex-col gap-6"
                  : "flex gap-4 items-stretch justify-center"
              }
            >
              {tabData.map((theme, idx) => {
                let isActive = lockedIndex === idx || activeIndex === idx;

                if (isSmallScreen || isMediumScreen) {
                  isActive = false;
                }

                const targetWidth = isSmallScreen
                  ? "100%"
                  : isMediumScreen
                  ? "100%"
                  : anyActive
                  ? isActive
                    ? expandedWidth
                    : collapsedWidth
                  : idleWidth;

                const forcedStyle = isSmallScreen
                  ? { width: "100%", minWidth: "100%", height: mobileCardHeight }
                  : isMediumScreen
                  ? { width: "100%", minWidth: "100%" }
                  : {};

                return (
                  <motion.div
                    key={theme.id ?? idx}
                    initial={false}
                    animate={{ width: targetWidth }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    onMouseEnter={() => {
                      if (!isSmallScreen && !isMediumScreen && lockedIndex === null)
                        setActiveIndex(idx);
                    }}
                    onMouseLeave={() => {
                      if (!isSmallScreen && !isMediumScreen && lockedIndex === null)
                        setActiveIndex(null);
                    }}
                    onClick={() => {
                      if (!isSmallScreen && !isMediumScreen)
                        setLockedIndex((prev) => (prev === idx ? null : idx));
                    }}
                    className="relative h-[460px] min-w-[80px] flex-shrink-0 rounded-3xl overflow-hidden border border-white/10 bg-black cursor-pointer"
                    style={forcedStyle}
                  >
                    {/* Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={theme.img1}
                        alt={theme.heading}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Gradient overlay for collapsed cards */}
                    <AnimatePresence>
                      {!isActive && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"
                        />
                      )}
                    </AnimatePresence>

                    {/* Text container */}
                    <div
                      className={`absolute inset-0 flex flex-col justify-end p-6 z-10 ${
                        isActive ? "pointer-events-auto" : "pointer-events-none"
                      }`}
                    >
                      {/* COLLAPSED TITLE (always centered even on small screens) */}
                      {!isActive ? (
                        <div className="w-full flex justify-center items-center">
                          <h3
                            className={`${orbitron.className} text-base md:text-lg font-semibold text-white/95 text-center w-full`}
                          >
                            {theme.heading}
                          </h3>
                        </div>
                      ) : (
                        <>
                          {/* EXPANDED CONTENT (bottom gradient + blur) */}
                          <div className="expanded-card-wrapper w-full pointer-events-auto">
                            <motion.div
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 12 }}
                              transition={{ duration: 0.28 }}
                              className="
                                absolute inset-x-0 bottom-0 p-5 backdrop-blur-xl
                                bg-gradient-to-t from-black/75 via-black/40 to-transparent
                                rounded-b-3xl
                              "
                              style={{
                                maxHeight: "55%",
                                overflow: "auto",
                                maskImage:
                                  "linear-gradient(to top, black 60%, rgba(0,0,0,0.7) 80%, transparent 100%)",
                                WebkitMaskImage:
                                  "linear-gradient(to top, black 60%, rgba(0,0,0,0.7) 80%, transparent 100%)",
                              }}
                            >
                              <h3
                                className={`${orbitron.className} text-2xl font-bold text-center mb-2`}
                              >
                                {theme.heading}
                              </h3>

                              <p className="text-sm text-white/90 leading-relaxed">
                                {theme.content}
                              </p>

                              {theme.prize_amt && (
                                <p className="mt-3 text-sm text-white/80">
                                  Prize: {theme.prize_amt}
                                </p>
                              )}
                            </motion.div>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}