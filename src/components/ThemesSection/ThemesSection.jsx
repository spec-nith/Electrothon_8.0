"use client";

import React, { useState } from "react";
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
  // Start with nothing active so nothing is zoomed initially
  const [activeIndex, setActiveIndex] = useState(null);
  const [lockedIndex, setLockedIndex] = useState(null);

  // width settings (tweak numbers if you want different proportions)
  const expandedWidth = "46%";
  const collapsedWidth = "9%";
  const idleWidth = "14%"; // used when nothing is active

  const anyActive = lockedIndex !== null || activeIndex !== null;

  return (
    <section
      id="themes"
      className="relative py-28 w-screen min-h-[1000px] h-svh pt-[18vh] text-white bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: 'url("/backgrounds/bg2.png")',
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
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

        <motion.div
          initial={{ opacity: 0, translateY: 30 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 w-full"
        >
          <div className="relative w-full overflow-x-hidden">
            {/* CENTER the whole row */}
            <div className="flex gap-4 items-stretch justify-center">
              {tabData.map((theme, idx) => {
                const isActive = lockedIndex === idx || activeIndex === idx;

                // choose width: if no active -> idleWidth for all,
                // else active gets expandedWidth and others collapsedWidth
                const targetWidth = anyActive
                  ? isActive
                    ? expandedWidth
                    : collapsedWidth
                  : idleWidth;

                return (
                  <motion.div
                    key={theme.id ?? idx}
                    initial={false}
                    animate={{ width: targetWidth }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    onMouseEnter={() => {
                      if (lockedIndex === null) setActiveIndex(idx);
                    }}
                    onMouseLeave={() => {
                      if (lockedIndex === null) setActiveIndex(null);
                    }}
                    onClick={() =>
                      setLockedIndex((prev) => (prev === idx ? null : idx))
                    }
                    className="relative h-[460px] min-w-[80px] flex-shrink-0 rounded-3xl overflow-hidden border border-white/10 bg-black cursor-pointer"
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={theme.img1}
                        alt={theme.heading}
                        fill
                        className=" object-cover"
                        sizes="(max-width: 640px) 80vw, (max-width: 1200px) 45vw, 30vw"
                      />
                    </div>

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

                    {/* Title / content container */}
                    <div
                      className={`absolute inset-0 flex flex-col justify-end p-6 z-10 ${
                        isActive ? "pointer-events-auto" : "pointer-events-none"
                      }`}
                    >
                      {/* Collapsed: bottom-aligned but center the text horizontally */}
                      {!isActive ? (
                        <div className="w-full flex justify-center">
                          <h3
                            className={`${orbitron.className} text-base md:text-lg font-semibold text-white/95 text-center`}
                          >
                            {theme.heading}
                          </h3>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          className="bg-black/30 backdrop-blur-sm border border-white/5 p-3 rounded-lg max-h-[45%] overflow-auto shadow-[0_8px_24px_rgba(0,0,0,0.45)] w-full"
                          style={{ transition: "background-color 240ms ease, transform 260ms ease" }}
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
                            <p className="mt-3 text-sm text-white/80">Prize: {theme.prize_amt}</p>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <style jsx>{`
            @media (max-width: 640px) {
              .flex > div {
                min-width: 56vw !important;
                width: 56vw !important;
              }
            }
            @media (min-width: 641px) and (max-width: 1024px) {
              .flex > div {
                min-width: 36vw !important;
                width: 36vw !important;
              }
            }
            @media (min-width: 1200px) {
              .flex > div {
                min-width: 80px;
              }
            }
          `}</style>
        </motion.div>
      </div>
    </section>
  );
}
