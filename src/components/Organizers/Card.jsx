"use client";
import Image from "next/image";

export default function Card({ name, role, image, isSlider2 = false, hoverEffect = false, leadCard = false }) {
  // base classes preserved; when isSlider2 or hoverEffect, add a modifier class for special hover effects
  const hasEffect = isSlider2 || hoverEffect;
  // For lead organizer cards, add a special class for hover effect
  const outerClass = `w-[200px] h-[270px] rounded-xl p-1.5 bg-linear-to-b from-[#1b163a] via-[#120f2a] to-[#0a0818] border border-[#5d56b3] shadow-[0_0_12px_rgba(110,90,255,0.25)] transition-all duration-100 flex-shrink-0 ${hasEffect ? 'interactive-card' : ''} ${leadCard ? 'lead-hover-card' : ''}`;

  return (
    <div className={outerClass} tabIndex={0} style={{ outline: 'none', cursor: 'pointer', position: 'relative' }}>
      <div className="h-full w-full rounded-xl flex flex-col bg-linear-to-b from-[#181338] to-[#0c0a1f] border border-[#4a447f] overflow-hidden relative" style={{ pointerEvents: 'none' }}>
        <div className="h-[22px] flex items-center justify-center text-[9px] tracking-[0.35em] uppercase bg-linear-to-r from-[#3d357a] to-[#2a2458] border-b border-[#5b5296] text-[#d6d3ff] shrink-0" style={{ fontFamily: 'Orbitron, sans-serif', pointerEvents: 'none' }}>
          PLAYER · READY
        </div>
        <div className="flex-1 p-1.5 relative min-h-0" style={{ pointerEvents: 'none' }}>
          <div className={`relative h-full w-full rounded-lg overflow-hidden bg-black border border-[#4a447f] shadow-[inset_0_0_18px_rgba(74,68,127,0.35)] ${hasEffect ? 'interactive-media' : ''}`} style={{ pointerEvents: 'none' }}>
            <Image src={image} alt={name} fill className="object-cover" sizes="200px" priority={false} style={{ pointerEvents: 'none' }} />
            {hasEffect && <div className="shine" aria-hidden style={{ pointerEvents: 'none' }} />}
          </div>
        </div>
        <div className="px-2 py-1.5 text-center bg-linear-to-b from-[#15102f] to-[#0a0818] border-t border-[#4a447f] shrink-0" style={{ pointerEvents: 'none' }}>
          <p className="text-[11px] uppercase tracking-widest text-[#f1eeff] truncate" style={{ fontFamily: 'Orbitron, sans-serif', pointerEvents: 'none' }}>
            {name}
          </p>
          <p className="text-[10px] mt-0.5 tracking-wide text-[#cfc7ff]" style={{ fontFamily: 'Orbitron, sans-serif', pointerEvents: 'none' }}>
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}