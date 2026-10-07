"use client";

import React, { useState, useEffect, memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Press_Start_2P } from "next/font/google";
import TargetCursor from "@/components/TargetCursor";
import { podiumWinners } from "./winner_data";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// --- DYNAMIC BACKGROUND PARTICLES ---
const Bubble = memo(({ style, size = 8, delay = 0 }) => (
  <motion.div
    style={{
      ...style,
      position: "absolute",
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      background: "rgba(192, 38, 211, 0.2)",
      border: "1px solid rgba(192, 38, 211, 0.4)",
      boxShadow: "0 0 10px rgba(192, 38, 211, 0.3)",
      willChange: "transform",
    }}
    animate={{
      y: ["0vh", "-60vh"],
      x: [0, 10, -10, 0],
      opacity: [0, 0.6, 0],
    }}
    transition={{
      duration: 6 + size / 2,
      repeat: Infinity,
      ease: "linear",
      delay,
    }}
  />
));

export default function Winners() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="winners"
      className={`min-h-screen text-white overflow-hidden relative cursor-none p-4 md:p-8 ${pressStart.className}`}
    >
      <TargetCursor targetSelector=".cursor-target" />

      {/* --- DYNAMIC BACKGROUND (MATCHING ASSORTED PRIZES) --- */}
      <div className="absolute inset-0 -z-50 bg-[#090014] overflow-hidden">
        {/* Base Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020005] via-[#11001c] to-[#240046]" />

        {/* Animated Moving Grid */}
        <div
          className="absolute bottom-0 left-[-50%] right-[-50%] h-[60vh] w-[200%] opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(transparent 96%, #c026d3 96%), linear-gradient(90deg, transparent 96%, #8b5cf6 96%)`,
            backgroundSize: "40px 40px",
            transform: "perspective(500px) rotateX(60deg)",
            maskImage: "linear-gradient(to bottom, transparent 5%, black 40%)",
          }}
        />

        {/* Mouse Glow Spotlight */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(192, 38, 211, 0.25), transparent 60%)`,
          }}
        />

        {/* Side Neon Pillars */}
        <div className="absolute top-0 left-0 w-1 md:w-2 h-full bg-pink-500 blur-md opacity-30 shadow-[0_0_20px_#ec4899]" />
        <div className="absolute top-0 right-0 w-1 md:w-2 h-full bg-cyan-400 blur-md opacity-30 shadow-[0_0_20px_#22d3ee]" />

        {/* Rising Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <Bubble
              key={i}
              style={{ left: `${i * 7}%`, bottom: "0%" }}
              size={2 + Math.random() * 6}
              delay={Math.random() * 5}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .arcade-title-shadow {
          text-shadow: 4px 4px 0px #ff00ff, -2px -2px 0px #00ffff;
        }
        .panel-glow {
          box-shadow: 0 0 60px rgba(147, 51, 234, 0.25),
            inset 0 0 20px rgba(147, 51, 234, 0.1);
        }
      `}</style>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 max-w-5xl mx-auto py-12">
        {/* Main Dashboard Panel */}
        <div className="relative border-4 border-purple-600 rounded-[3rem] bg-[#12062b]/95 p-6 sm:p-10 md:p-14 panel-glow backdrop-blur-md">
          {/* Header Section */}
          <div className="text-center mb-12 relative">
            <h2
              className="text-[clamp(1.6rem,5vw,3.75rem)] text-white drop-shadow-[0_4px_0_rgba(0,0,0,1)]"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              WINNERS
            </h2>

            <p className="mt-4 text-[10px] md:text-[12px] tracking-[0.4em] uppercase font-bold text-purple-300 opacity-90">
              HALL OF FAME • ELECTROTHON 7.0
            </p>
          </div>

          {/* 3 Winner Cards Layout (All aligned at the same level) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {podiumWinners.map((winner) => (
              <div
                key={winner.id}
                className="cursor-target group relative bg-[#1c0d3a]/80 border-2 border-purple-800/60 rounded-2xl p-5 hover:border-pink-500 transition-all hover:shadow-[0_0_20px_rgba(236,72,153,0.2)] hover:-translate-y-1 backdrop-blur-sm flex flex-col justify-between"
              >
                <div>
                  {/* Photo Container */}
                  <div
                    onClick={() => setSelectedWinner(winner)}
                    className="aspect-video rounded-xl bg-black/40 border border-purple-500/20 mb-5 relative overflow-hidden flex items-center justify-center p-2 cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 to-transparent" />

                    <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-110">
                      <Image
                        src={winner.image}
                        alt={`${winner.teamName} - ${winner.position}`}
                        fill
                        className="object-cover rounded-lg filter drop-shadow-[0_0_8px_rgba(192,38,211,0.5)]"
                      />
                    </div>
                  </div>

                  {/* Prize / Amount */}
                  <h3 className="text-lg md:text-xl text-white text-center font-bold mb-2 tracking-wide uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {winner.prize}
                  </h3>

                  {/* Position Title */}
                  <p className="text-[9px] md:text-[10px] text-purple-300 text-center uppercase tracking-widest font-bold mb-3">
                    {winner.position}
                  </p>

                  {/* Team Name */}
                  <h4 className="text-[10px] md:text-[11px] text-white/90 text-center uppercase tracking-wide font-bold">
                    {winner.teamName}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
