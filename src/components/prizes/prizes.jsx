"use client";

import React, { useRef, useState, useEffect, memo } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useVelocity,
  useMotionValueEvent
} from "framer-motion";

import marioRunGif from "./mario.gif"; 

// --- CONFIG ---
const JUMP_DURATION_PCT = 0.18; 

// --- 1. SCREEN SIZE HOOK ---
const useScreenSize = () => {
  const [size, setSize] = useState({ isMobile: false, width: 1200 });

  useEffect(() => {
    const handleResize = () => {
      setSize(prev => {
        if (prev.width === window.innerWidth) return prev;
        return {
          isMobile: window.innerWidth < 768,
          width: window.innerWidth
        };
      });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

// --- ICONS (Memoized) ---
const IconMushroom = memo(() => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-14 md:h-14 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
    <path fill="#ef4444" d="M4 8h16v8h-16z M6 4h12v4h-12z M8 2h8v2h-8z" /><path fill="#ffffff" d="M6 8h4v4h-4z M14 8h4v4h-4z" /><path fill="#fcd34d" d="M6 16h12v6h-12z" /><path fill="#000" d="M8 18h2v2h-2z M14 18h2v2h-2z" />
  </svg>
));
const IconFireFlower = memo(() => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-14 md:h-14 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]">
    <path fill="#22c55e" d="M10 16h4v8h-4z M6 18h4v2h-4z M14 18h4v2h-4z" /><path fill="#f97316" d="M4 6h16v8h-16z M6 4h12v2h-12z M8 2h8v2h-8z" /><path fill="#fcd34d" d="M8 8h8v4h-8z" /><path fill="#000" d="M10 9h1v2h-1z M13 9h1v2h-1z" />
  </svg>
));
const IconStar = memo(() => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-14 md:h-14 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]">
    <path fill="#fbbf24" d="M10 0h4v4h4v4h6v4h-6v4h-4v8h-4v-8h-4v-4h-6v-4h6v-4h4z" /><path fill="#000" d="M10 8h1v3h-1z M13 8h1v3h-1z" />
  </svg>
));

const PRIZE_ICONS = {
  bronze: <IconMushroom />,
  silver: <IconFireFlower />,
  gold: <IconStar />,
};

// --- OPTIMIZED NUMBER COUNTER ---
const AnimatedNumber = ({ value, active }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (active) {
      let start = 0;
      const end = value;
      const duration = 1000;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        setDisplayValue(Math.floor(ease * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    } else {
      setDisplayValue(0);
    }
  }, [active, value]);

  return <span>${displayValue}</span>;
};

const PrizeBar = memo(({ leftVW, scrollProgress, triggerPoint, prize, baseBottomPx, maxBarHeightPx, isMobile }) => {
  const [active, setActive] = useState(false);
  
  useMotionValueEvent(scrollProgress, "change", (latest) => {
      const threshold = isMobile ? triggerPoint - 0.1 : triggerPoint;
      const isActive = latest >= threshold;
      if (active !== isActive) setActive(isActive);
  });

  const heightPx = (prize.value / prize.maxValue) * maxBarHeightPx;
  
  const colors = {
    bronze: { bar: "from-orange-900/90 via-amber-800/85 to-orange-700/90", glow: "0 0 25px rgba(180, 83, 9, 0.4)" },
    gold: { bar: "from-yellow-400/90 via-amber-300/90 to-orange-200/95", glow: "0 0 32px rgba(251,191,36,0.55)" },
    silver: { bar: "from-slate-200/90 via-slate-300/85 to-slate-100/95", glow: "0 0 28px rgba(226,232,240,0.45)" },
  };

  const barClass = isMobile 
    ? `w-14 rounded-t-lg rounded-b-md border border-white/15 bg-gradient-to-t ${colors[prize.tier].bar} relative overflow-hidden`
    : `w-24 rounded-t-2xl rounded-b-xl border border-white/15 bg-gradient-to-t ${colors[prize.tier].bar} backdrop-blur-md relative overflow-hidden`;

  const glowStyle = isMobile 
    ? (active ? "0 0 10px rgba(255,255,255,0.2)" : "none") 
    : (active ? colors[prize.tier].glow : "0 0 0 rgba(0,0,0,0)");

  return (
    <div style={{ position: "absolute", left: leftVW, bottom: `${baseBottomPx}px`, transform: "translateX(-50%)", zIndex: 12 }}>
      <div className="flex flex-col-reverse items-center gap-2">
        <div className="h-20 md:h-28 flex flex-col justify-end items-center pointer-events-none pb-2">
            <div className="text-center text-white/90 font-bold font-mono text-xs md:text-base uppercase tracking-widest leading-tight md:leading-normal whitespace-nowrap drop-shadow-md mb-1">
              {prize.label}
            </div>
            <motion.div 
              animate={{ y: active ? 0 : 8, opacity: active ? 1 : 0.4 }} 
              transition={{ duration: 0.3 }} 
              className="text-white font-black text-2xl md:text-5xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center leading-none"
            >
              <AnimatedNumber value={prize.value} active={active} />
            </motion.div>
        </div>
        <motion.div
          animate={{ height: active ? heightPx : 10, boxShadow: glowStyle, filter: active ? "saturate(1)" : "grayscale(0.8)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={barClass}
        >
          {!isMobile && (
             <motion.div animate={{ opacity: active ? [0.15, 0.75, 0.15] : 0 }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }} className="absolute inset-x-0 top-0 h-5 md:h-7 bg-white/15" />
          )}
          <motion.div animate={{ opacity: active ? 0.2 : 0, y: active ? 0 : 10 }} transition={{ duration: 0.4 }} className="absolute inset-x-0 bottom-0 h-full bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.3),transparent_55%)]" />
        </motion.div>
        <motion.div
          animate={{ y: active ? [-6, 0] : 0, opacity: active ? 1 : 0.4, scale: active ? 1.15 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut", y: { duration: 1, repeat: active ? Infinity : 0, repeatType: "reverse", ease: "easeInOut" } }}
          className="pb-1"
        >
          <div className="w-10 h-10 md:w-16 md:h-16 grid place-items-center">{PRIZE_ICONS[prize.tier]}</div>
        </motion.div>
      </div>
    </div>
  );
});

// --- DECORATION COMPONENTS ---
const Bubble = memo(({ style, size = 8, delay = 0 }) => (
  <motion.div
    style={{ ...style, position: "absolute", width: `${size}px`, height: `${size}px`, borderRadius: "50%", background: "rgba(255, 255, 255, 0.25)", border: "2px solid rgba(180, 200, 255, 0.6)", boxShadow: "inset -2px -2px 4px rgba(255, 255, 255, 0.5)", willChange: "transform" }}
    animate={{ y: ["0vh", "-20vh", "-40vh", "-65vh"], x: [0, 6, -6, 0], opacity: [0, 0.5, 0.6, 0], scale: [1, 1.05, 1.1, 1] }}
    transition={{ duration: 5 + size / 3, repeat: Infinity, ease: "linear", delay, times: [0, 0.3, 0.6, 1] }}
  />
));

const Seaweed = memo(({ style, height = 60, color = "#2a5a4a" }) => (
  <div style={{ ...style, position: "absolute", display: "flex", flexDirection: "column", alignItems: "center" }}>
    {Array.from({ length: Math.min(4, Math.floor(height / 10)) }).map((_, i) => (
      <motion.div key={i} style={{ width: i % 2 === 0 ? "8px" : "12px", height: "12px", background: color, marginBottom: "0px" }} animate={{ x: [0, 2, -2, 0] }} transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }} />
    ))}
  </div>
));

const CoralPlant = memo(({ style, segments = 3, baseColor = "#6b46c1", customHeights = [] }) => (
  <div style={{ ...style, position: "absolute", display: "flex", gap: "4px", alignItems: "flex-end" }}>
    {Array.from({ length: segments }).map((_, i) => (
      <motion.div key={i} style={{ width: "6px", height: `${customHeights[i] || 25}px`, background: `linear-gradient(to top, ${baseColor}, ${baseColor}dd)`, borderRadius: "3px 3px 0 0" }} animate={{ scaleY: [1, 1.08, 1] }} transition={{ duration: 2 + (i * 0.5), repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }} />
    ))}
  </div>
));

const PixelSeaweed = memo(({ style }) => (
  <motion.div style={{ ...style, position: "absolute", width: "40px", height: "50px" }} animate={{ scaleX: [1, 1.05, 0.95, 1], skewX: [0, 2, -2, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
    <svg viewBox="0 0 32 40" width="40" height="50"><rect x="10" y="0" width="4" height="4" fill="#5a7a5a" /><rect x="8" y="4" width="6" height="4" fill="#6a8a6a" /><rect x="10" y="8" width="4" height="4" fill="#5a7a5a" /><rect x="6" y="12" width="8" height="4" fill="#6a8a6a" /><rect x="8" y="16" width="6" height="4" fill="#5a7a5a" /><rect x="6" y="20" width="8" height="4" fill="#6a8a6a" /><rect x="8" y="24" width="6" height="4" fill="#5a7a5a" /><rect x="10" y="28" width="4" height="4" fill="#6a8a6a" /><rect x="8" y="32" width="6" height="4" fill="#5a7a5a" /><rect x="10" y="36" width="4" height="4" fill="#4a6a4a" /><rect x="18" y="4" width="4" height="4" fill="#5a7a5a" /><rect x="16" y="8" width="6" height="4" fill="#6a8a6a" /><rect x="18" y="12" width="4" height="4" fill="#5a7a5a" /><rect x="20" y="16" width="4" height="4" fill="#6a8a6a" /><rect x="18" y="20" width="6" height="4" fill="#5a7a5a" /></svg>
  </motion.div>
));

const PixelCactus = memo(({ style }) => (
  <motion.div style={{ ...style, position: "absolute", width: "35px", height: "40px" }} animate={{ scaleY: [1, 1.05, 1], rotate: [0, 1, -1, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
    <svg viewBox="0 0 28 32" width="35" height="40"><rect x="10" y="8" width="8" height="24" fill="#4ade80" /><rect x="12" y="4" width="4" height="4" fill="#4ade80" /><rect x="4" y="12" width="6" height="12" fill="#4ade80" /><rect x="18" y="12" width="6" height="12" fill="#4ade80" /><rect x="12" y="10" width="4" height="2" fill="#22c55e" /><rect x="12" y="16" width="4" height="2" fill="#22c55e" /><rect x="12" y="22" width="4" height="2" fill="#22c55e" /><rect x="6" y="14" width="2" height="2" fill="#22c55e" /><rect x="20" y="14" width="2" height="2" fill="#22c55e" /></svg>
  </motion.div>
));

const PixelFish = memo(({ style }) => (
  <motion.div style={{ ...style, position: "absolute", width: "45px", height: "30px", willChange: "transform" }} animate={{ x: [0, 20, 40, 20, 0], y: [0, -5, 0, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
    <svg viewBox="0 0 32 24" width="45" height="30"><rect x="4" y="10" width="4" height="4" fill="#ec4899" /><rect x="8" y="8" width="4" height="8" fill="#f472b6" /><rect x="12" y="6" width="8" height="12" fill="#f9a8d4" /><rect x="20" y="8" width="4" height="8" fill="#f472b6" /><rect x="24" y="10" width="4" height="4" fill="#ec4899" /><rect x="14" y="8" width="4" height="4" fill="#fff" /><rect x="16" y="10" width="2" height="2" fill="#000" /><rect x="10" y="4" width="4" height="4" fill="#db2777" /><rect x="10" y="16" width="4" height="4" fill="#db2777" /></svg>
  </motion.div>
));

const Shell = memo(({ style }) => (
  <div style={{ ...style, position: "absolute", width: "30px", height: "30px" }}><svg viewBox="0 0 16 16" width="30" height="30"><rect x="4" y="2" width="8" height="2" fill="#5b7bb5" /><rect x="3" y="4" width="10" height="2" fill="#6b8bc5" /><rect x="2" y="6" width="12" height="2" fill="#7b9bd5" /><rect x="3" y="8" width="10" height="2" fill="#8babde" /><rect x="4" y="10" width="8" height="2" fill="#9bbbee" /><rect x="5" y="12" width="6" height="2" fill="#abcbff" /><rect x="6" y="6" width="4" height="2" fill="#c5dfff" /><rect x="7" y="8" width="2" height="2" fill="#d5efff" /></svg></div>
));

const Kelp = memo(({ style }) => (
  <div style={{ ...style, position: "absolute", width: "20px", height: "35px" }}><svg viewBox="0 0 12 20" width="20" height="35"><rect x="5" y="0" width="2" height="2" fill="#0d9488" /><rect x="4" y="2" width="3" height="2" fill="#14b8a6" /><rect x="5" y="4" width="2" height="2" fill="#0d9488" /><rect x="4" y="6" width="3" height="2" fill="#14b8a6" /><rect x="3" y="8" width="4" height="2" fill="#0d9488" /><rect x="4" y="10" width="3" height="2" fill="#14b8a6" /><rect x="5" y="12" width="2" height="2" fill="#0d9488" /><rect x="4" y="14" width="3" height="2" fill="#14b8a6" /><rect x="5" y="16" width="2" height="2" fill="#0d9488" /><rect x="5" y="18" width="2" height="2" fill="#0f766e" /></svg></div>
));

const OrangeFish = memo(({ style }) => (
  <motion.div style={{ ...style, position: "absolute", width: "28px", height: "20px", willChange: "transform" }} animate={{ x: [0, 12, 0, -12, 0], y: [0, -4, -8, -4, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
    <svg viewBox="0 0 16 12" width="28" height="20"><rect x="2" y="5" width="2" height="2" fill="#ea580c" /><rect x="4" y="4" width="2" height="4" fill="#fb923c" /><rect x="6" y="3" width="4" height="6" fill="#f97316" /><rect x="10" y="4" width="2" height="4" fill="#fb923c" /><rect x="12" y="5" width="2" height="2" fill="#ea580c" /><rect x="7" y="4" width="2" height="2" fill="#fff" /><rect x="8" y="5" width="1" height="1" fill="#000" /><rect x="5" y="2" width="2" height="2" fill="#dc2626" /><rect x="5" y="8" width="2" height="2" fill="#dc2626" /></svg>
  </motion.div>
));

const TealShell = memo(({ style }) => (
  <div style={{ ...style, position: "absolute", width: "28px", height: "28px" }}><svg viewBox="0 0 16 16" width="28" height="28"><rect x="6" y="2" width="4" height="2" fill="#0d9488" /><rect x="5" y="4" width="6" height="2" fill="#14b8a6" /><rect x="4" y="6" width="8" height="2" fill="#2dd4bf" /><rect x="5" y="8" width="6" height="2" fill="#5eead4" /><rect x="6" y="10" width="4" height="2" fill="#99f6e4" /><rect x="7" y="6" width="2" height="2" fill="#fbbf24" /><rect x="6" y="8" width="4" height="2" fill="#fcd34d" /></svg></div>
));

const Pufferfish = memo(({ style }) => (
  <motion.div style={{ ...style, position: "absolute", width: "30px", height: "25px", willChange: "transform" }} animate={{ x: [0, -18, -35, -18, 0], y: [0, 2.5, 0, -2.5, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}>
    <svg viewBox="0 0 16 14" width="30" height="25"><rect x="4" y="5" width="8" height="4" fill="#d2a679" /><rect x="3" y="6" width="10" height="2" fill="#e8c4a0" /><rect x="2" y="4" width="1" height="2" fill="#8b7355" /><rect x="2" y="8" width="1" height="2" fill="#8b7355" /><rect x="13" y="4" width="1" height="2" fill="#8b7355" /><rect x="13" y="8" width="1" height="2" fill="#8b7355" /><rect x="5" y="3" width="1" height="2" fill="#8b7355" /><rect x="10" y="3" width="1" height="2" fill="#8b7355" /><rect x="5" y="9" width="1" height="2" fill="#8b7355" /><rect x="10" y="9" width="1" height="2" fill="#8b7355" /><rect x="5" y="6" width="2" height="2" fill="#000" /><rect x="9" y="6" width="2" height="2" fill="#000" /></svg>
  </motion.div>
));

const BlueShell = memo(({ style }) => (
  <div style={{ ...style, position: "absolute", width: "28px", height: "28px" }}><svg viewBox="0 0 16 16" width="28" height="28"><rect x="6" y="3" width="4" height="2" fill="#1e40af" /><rect x="5" y="5" width="6" height="2" fill="#3b82f6" /><rect x="4" y="7" width="8" height="2" fill="#60a5fa" /><rect x="5" y="9" width="6" height="2" fill="#93c5fd" /><rect x="6" y="11" width="4" height="2" fill="#bfdbfe" /><rect x="7" y="7" width="2" height="2" fill="#dbeafe" /></svg></div>
));

const PixelCrab = memo(({ style }) => (
  <motion.div style={{ ...style, position: "absolute", width: "32px", height: "20px" }} animate={{ x: [0, 5, 0, -5, 0], y: [0, -2, 0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
    <svg viewBox="0 0 16 10" width="32" height="20"><rect x="4" y="4" width="8" height="4" fill="#ef4444" /><rect x="2" y="5" width="2" height="2" fill="#b91c1c" /><rect x="12" y="5" width="2" height="2" fill="#b91c1c" /><rect x="3" y="3" width="2" height="2" fill="#ef4444" /><rect x="11" y="3" width="2" height="2" fill="#ef4444" /><rect x="1" y="2" width="2" height="2" fill="#dc2626" /><rect x="13" y="2" width="2" height="2" fill="#dc2626" /><rect x="3" y="8" width="1" height="2" fill="#b91c1c" /><rect x="12" y="8" width="1" height="2" fill="#b91c1c" /><rect x="5" y="5" width="2" height="2" fill="#fff" /><rect x="9" y="5" width="2" height="2" fill="#fff" /><rect x="6" y="6" width="1" height="1" fill="#000" /><rect x="10" y="6" width="1" height="1" fill="#000" /></svg>
  </motion.div>
));

// --- PROFESSIONAL HUD OVERLAY ---
const PrizeStatsOverlay = () => (
  <div className="absolute top-[85px] md:top-[120px] left-0 right-0 z-40 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-32 px-4 pointer-events-none">
     
     <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-[2.2rem] blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
        <div className="relative flex flex-col justify-center items-center px-6 py-2.5 md:px-10 md:py-4 rounded-[2rem] bg-gradient-to-b from-slate-700 to-slate-800 border border-white/20 shadow-xl min-w-[160px] md:min-w-[220px]">
            <span className="text-slate-300 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-0.5">Cash Prizes</span>
            <span className="text-2xl md:text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 drop-shadow-sm">
                $5,000
            </span>
        </div>
     </div>

     <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[2.2rem] blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
        <div className="relative flex flex-col justify-center items-center px-6 py-2.5 md:px-10 md:py-4 rounded-[2rem] bg-gradient-to-b from-slate-700 to-slate-800 border border-white/20 shadow-xl min-w-[160px] md:min-w-[220px]">
            <span className="text-slate-300 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-0.5">Total Pool</span>
            <span className="text-2xl md:text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-500 drop-shadow-sm">
                $60,000
            </span>
        </div>
     </div>

  </div>
);

const AchievementsLevel = () => {
  const targetRef = useRef(null);
  const { isMobile } = useScreenSize();
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });
  
  const VISUAL_POSITIONS = isMobile ? [18, 50, 82] : [25, 50, 75]; 
  const MAX_DISTANCE_VW = 105;
  const DYNAMIC_TRIGGERS = VISUAL_POSITIONS.map(pos => pos / MAX_DISTANCE_VW);

  const smoothScroll = useSpring(scrollYProgress, { 
    stiffness: 120,  
    damping: 25,     
    mass: isMobile ? 0.2 : 0.2,       
    restDelta: 0.001 
  });

  const freezeThreshold = isMobile ? 0.85 : 1;
  const effectiveScroll = useTransform(smoothScroll, [0, freezeThreshold, 1], [0, 1, 1]);

  const xMove = useTransform(effectiveScroll, (value) => `${value * MAX_DISTANCE_VW}vw`);
  
  const scrollVelocity = useVelocity(smoothScroll);
  const scaleX = useTransform(scrollVelocity, (latestVelocity) => {
    if (latestVelocity < -0.02) return -1;
    if (latestVelocity > 0.02) return 1;
    return 1;
  });

  const plantBottomPx = isMobile ? 70 : 100;
  const marioBottomPx = isMobile ? 65 : 90;
  const barBaseBottomPx = isMobile ? 85 : 110; 
  const groundHeightPx = isMobile ? 75 : 100;
  const sandTopHeightPx = 15;
  const floorDecorBottomPx = 10;
  const maxBarHeightPx = isMobile ? 140 : 240; 
  const marioWidthPx = isMobile ? 45 : 60;     

  const prizeData = [
    { label: "1st Runner-Up", value: 330, tier: "silver" }, 
    { label: "Winner", value: 445, tier: "gold" },          
    { label: "2nd Runner-Up", value: 220, tier: "bronze" }, 
  ];
  
  const maxPrizeValue = Math.max(...prizeData.map((p) => p.value));

  const yMove = useTransform(effectiveScroll, (latest) => {
    if (isMobile) return 0;

    for (let i = 0; i < DYNAMIC_TRIGGERS.length; i++) {
      const trigger = DYNAMIC_TRIGGERS[i];
      const half = JUMP_DURATION_PCT / 2;
      const dist = latest - trigger;
      
      if (Math.abs(dist) <= half) {
        const prize = prizeData[i];
        const barHeight = (prize.value / maxPrizeValue) * maxBarHeightPx;
        const textContainerHeight = 112; 
        const buffer = 40; 
        const jumpTargetPx = (barBaseBottomPx + textContainerHeight + barHeight + buffer) - marioBottomPx;

        const rawProgress = (dist + half) / (half * 2);
        const progress = Math.max(0, Math.min(1, rawProgress));
        
        return -Math.sin(progress * Math.PI) * jumpTargetPx;
      }
    }
    return 0;
  });

  const bgPlantsX = useTransform(effectiveScroll, [0, 1], ["0%", "-50%"]);
  const bgForegroundX = useTransform(effectiveScroll, [0, 1], ["0%", "-66.66%"]);

  const [bubbles, setBubbles] = useState([]);
  const [swimmingCreatures, setSwimmingCreatures] = useState([]);
  const [floorCreatures, setFloorCreatures] = useState([]);
  const [coralHeights, setCoralHeights] = useState([]);
  
  const [plants, setPlants] = useState({
    coral: [], seaweed: [], kelp: [], pixelSeaweed: [], pixelCactus: [], fgCoral: []
  });

  useEffect(() => {
    const mobileMode = window.innerWidth < 768;

    const bubbleCount = mobileMode ? 6 : 15; 
    const bubbleArray = [];
    for (let i = 0; i < bubbleCount; i++) { 
      const loops = mobileMode ? 2 : 4; 
      for (let j = 0; j < loops; j++) {
        bubbleArray.push({
          left: `${i * 10 + Math.random() * 8}%`,
          bottom: `${j * 25 + Math.random() * 10}%`,
          size: 2 + Math.random() * 5,
          delay: Math.random() * 5,
        });
      }
    }
    setBubbles(bubbleArray);

    const weightedTypes = [
      OrangeFish, OrangeFish, OrangeFish, OrangeFish, 
      PixelFish, Pufferfish, Pufferfish, BlueShell, BlueShell
    ];
    const fishItems = [];
    let lastComponent = null;
    const rows = mobileMode ? 3 : 6; 
    const cols = mobileMode ? 3 : 6;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let selectedType;
        do { selectedType = weightedTypes[Math.floor(Math.random() * weightedTypes.length)]; } 
        while (selectedType === lastComponent && fishItems.length > 0);
        lastComponent = selectedType;

        const baseLeft = (col / cols) * 100;
        const baseTop = (row / rows) * 85; 
        fishItems.push({
          Component: selectedType,
          top: `${Math.max(1, Math.min(88, baseTop + Math.random() * 10))}%`,
          left: `${Math.max(0.5, Math.min(98, baseLeft + Math.random() * 10))}%`,
          scale: 0.4 + (Math.random() * 0.6),
          opacity: 0.4 + (Math.random() * 0.6),
          zIndex: Math.random() < 0.5 ? 2 : 7,
          delay: Math.random() * 5
        });
      }
    }
    setSwimmingCreatures(fishItems);

    const floorTypes = [
      Shell, TealShell, BlueShell, PixelCrab, Kelp, Seaweed
    ];
    
    const floorItems = [];
    const decorCount = mobileMode ? 20 : 60; 
    for (let i = 0; i < decorCount; i++) { 
        const Type = floorTypes[Math.floor(Math.random() * floorTypes.length)];
        const positionBase = (i / decorCount) * 300; 
        const jitter = (Math.random() * 15) - 7.5;
        
        floorItems.push({ 
          Component: Type, 
          left: `${positionBase + jitter}%`,
          scale: 0.6 + Math.random() * 0.4,
          bottomOffset: Math.random() * 15
        });
    }
    setFloorCreatures(floorItems);

    const generatePlantPos = (count, width) => 
      Array.from({ length: count }, () => Math.random() * width).sort((a, b) => a - b);

    const plantMultiplier = mobileMode ? 0.5 : 1; 
    setPlants({
      coral: generatePlantPos(25 * plantMultiplier, 300),
      seaweed: generatePlantPos(35 * plantMultiplier, 300), 
      kelp: generatePlantPos(30 * plantMultiplier, 300),
      pixelSeaweed: generatePlantPos(20 * plantMultiplier, 300),
      pixelCactus: generatePlantPos(15 * plantMultiplier, 300),
      fgCoral: generatePlantPos(20 * plantMultiplier, 300),
    });

    const heights = Array.from({ length: 50 }, () => 15 + Math.random() * 25);
    setCoralHeights(heights);

  }, []);

  return (
    <div style={{ backgroundColor: "#000000", position: "relative", isolation: "isolate", overscrollBehaviorY: "none" }}>
      
      <div ref={targetRef} className="h-[220vh] md:h-[400vh]" style={{ position: "relative" }}>
        
        <div style={{ position: "sticky", top: 0, height: "100svh", width: "100%", overflow: "hidden", background: "linear-gradient(to bottom, #000000 0%, #0a0514 15%, #1a0f2e 35%, #2d1b4e 55%, #3d2570 75%, #4a2d7c 100%)", boxShadow: "inset 0 0 120px rgba(0,0,0,0.45)" }}>
          
          <PrizeStatsOverlay />

          <div style={{ position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none" }}>
            {bubbles.map((bubble, i) => (
              <Bubble key={i} style={{ left: bubble.left, bottom: bubble.bottom }} size={bubble.size} delay={bubble.delay} />
            ))}
          </div>

          {swimmingCreatures.map((fish, i) => (
            <div 
              key={`fish-${i}`}
              style={{ position: "absolute", top: fish.top, left: fish.left, zIndex: fish.zIndex }} 
            >
              <fish.Component style={{ transform: `scale(${fish.scale})`, opacity: fish.opacity }} />
            </div>
          ))}

          <motion.div style={{ position: "absolute", bottom: `${plantBottomPx}px`, width: "300%", height: "150px", zIndex: 6, x: bgPlantsX, willChange: "transform" }}>
            {plants.coral.map((leftPos, i) => (
              <CoralPlant key={`coral-${i}`} style={{ left: `${leftPos}%`, bottom: 0 }} segments={3} baseColor={i % 2 === 0 ? "#6b46c1" : "#ec4899"} customHeights={coralHeights} />
            ))}
            {plants.seaweed.map((leftPos, i) => (
              <Seaweed key={`seaweed-${i}`} style={{ left: `${leftPos}%`, bottom: 0 }} height={50 + Math.random() * 20} color={i % 2 === 0 ? "#2a5a4a" : "#3d7a5e"} />
            ))}
            {plants.kelp.map((leftPos, i) => (
              <Kelp key={`kelp-${i}`} style={{ left: `${leftPos}%`, bottom: 0 }} />
            ))}
            {plants.pixelSeaweed.map((leftPos, i) => (
              <PixelSeaweed key={`pixel-seaweed-${i}`} style={{ left: `${leftPos}%`, bottom: 0 }} />
            ))}
            {plants.pixelCactus.map((leftPos, i) => (
              <PixelCactus key={`pixel-cactus-${i}`} style={{ left: `${leftPos}%`, bottom: 0 }} />
            ))}
          </motion.div>

          {/* PRIZES */}
          {DYNAMIC_TRIGGERS.map((triggerPoint, index) => {
            const prize = prizeData[index];
            const visualPosition = VISUAL_POSITIONS[index];
            return (
              <PrizeBar
                key={prize.tier} 
                leftVW={`${visualPosition}vw`}
                scrollProgress={effectiveScroll} 
                triggerPoint={triggerPoint}
                prize={{ ...prize, maxValue: maxPrizeValue }}
                baseBottomPx={barBaseBottomPx}
                maxBarHeightPx={maxBarHeightPx}
                isMobile={isMobile}
              />
            );
          })}

          <motion.img
            src={typeof marioRunGif === "string" ? marioRunGif : marioRunGif.src}
            alt="Mario"
            decoding="async"
            style={{
              position: "absolute",
              bottom: `${marioBottomPx}px`,
              left: 0,
              width: `${marioWidthPx}px`,
              x: xMove,  
              y: yMove,
              scaleX: scaleX, 
              zIndex: 20, 
              willChange: "transform", 
              filter: "drop-shadow(0 0 12px rgba(255,255,255,0.15))",
            }}
          />

          {/* GROUND LAYER */}
          <motion.div 
            style={{ 
              position: "absolute", 
              bottom: 0, 
              width: "300%", 
              height: `${groundHeightPx}px`, 
              zIndex: 15, 
              x: bgForegroundX,
              willChange: "transform"
            }}
          >
            <div style={{ width: "100%", height: `${sandTopHeightPx}px`, background: "#4a3d5e", borderTop: "2px solid #5a4d6e", position: "relative" }}>
              <div style={{ 
                width: "100%", 
                height: "100%", 
                opacity: 0.6,
                background: "repeating-linear-gradient(90deg, transparent, transparent 28px, #8b7bb0 28px, #8b7bb0 30px)"
              }} />
            </div>

            <div 
              style={{ 
                width: "100%", 
                height: `${groundHeightPx - sandTopHeightPx}px`, 
                backgroundColor: "#2d2447",
                backgroundImage: `
                  linear-gradient(45deg, #3d3457 25%, transparent 25%, transparent 75%, #3d3457 75%),
                  linear-gradient(45deg, #3d3457 25%, transparent 25%, transparent 75%, #3d3457 75%)
                `,
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 10px 10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative"
              }} 
            >
                {/* BOTTOM TEXT: Fixed width to w-1/3 so it sits in the final screen segment */}
                <div className="absolute right-0 top-0 h-full w-1/3 flex items-center justify-center pointer-events-none">
                    <p className="text-white/90 font-mono font-black text-sm md:text-4xl tracking-widest uppercase drop-shadow-lg text-center px-1 md:px-4 whitespace-nowrap">
                        Many more prizes to come...
                    </p>
                </div>
            </div>
          </motion.div>

          <motion.div style={{ position: "absolute", bottom: `${floorDecorBottomPx}px`, width: "300%", height: "50px", zIndex: 16, x: bgForegroundX, willChange: "transform" }}>
            {floorCreatures.map((item, i) => (
                <div 
                  key={i} 
                  style={{ position: "absolute", left: item.left, bottom: `${item.bottomOffset}px`, transform: `scale(${item.scale})` }}
                >
                  <item.Component style={{}} />
                </div>
            ))}
          </motion.div>

          <motion.div style={{ position: "absolute", bottom: 0, width: "300%", height: "120px", zIndex: 17, x: bgForegroundX, willChange: "transform" }}>
            {plants.fgCoral.map((leftPos, i) => (
              <CoralPlant
                key={`fg-coral-${i}`}
                style={{ left: `${leftPos}%`, bottom: "15px" }}
                segments={4}
                baseColor={i % 2 === 0 ? "#ec4899" : "#8b5cf6"}
                customHeights={[...coralHeights].reverse()} 
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsLevel;