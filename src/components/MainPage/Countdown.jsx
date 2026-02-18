"use client";

import { useEffect, useState } from "react";
import { Press_Start_2P } from "next/font/google";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function Countdown({ targetDate = "2026-02-15T23:59:59" }) {
  const [timeLeft, setTimeLeft] = useState({
    d: "00",
    h: "00",
    m: "00",
    s: "00",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(targetDate) - new Date();

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        d: String(days).padStart(2, "0"),
        h: String(hours).padStart(2, "0"),
        m: String(minutes).padStart(2, "0"),
        s: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    
    <div
      className="
    absolute bottom-[6vh] left-1/2
    -translate-x-1/2
    z-20
    origin-bottom
    scale-[clamp(0.75,1vw,1)]
    sm:scale-[clamp(0.85,1vw,1)]
    md:scale-100
    flex flex-col items-center
    px-6 py-4
    rounded-2xl
    bg-white/7
    backdrop-blur-md
    border border-white/20
    shadow-[0_0_50px_rgba(200,140,255,0.22)]
  "
    >
      {/* TOP LABEL */}
      <div
        className={`
          ${pressStart.className}
          text-[10px] sm:text-[11px]
          tracking-[0.3em]
          text-purple-200/80
          mb-2
        `}
      >
        TIME LEFT TO REGISTER
      </div>

      {/* NUMBERS */}
      <div className="flex items-end gap-3">
        <TimeBlock value={timeLeft.d} label="DAYS" />
        <Colon />
        <TimeBlock value={timeLeft.h} label="HRS" />
        <Colon />
        <TimeBlock value={timeLeft.m} label="MIN" />
        <Colon pulse />
        <TimeBlock value={timeLeft.s} label="SEC" />
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function TimeBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="
          font-['Press_Start_2P']
          text-[clamp(1.2rem,3vw,1.7rem)]
          text-white
          tracking-widest
        "
        style={{
          textShadow: "0 0 14px rgba(180,120,255,0.6)",
        }}
      >
        {value}
      </span>

      <span
        className="
          mt-1
          text-[9px]
          tracking-wider
          text-cyan-200/70
        "
      >
        {label}
      </span>
    </div>
  );
}

function Colon({ pulse = false }) {
  return (
    <span
      className={`
        text-white/60
        text-[clamp(1.1rem,3vw,1.6rem)]
        ${pulse ? "animate-pulse" : ""}
      `}
    >
      :
    </span>
  );
}
