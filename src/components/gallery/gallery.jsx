"use client";

import { Skiper30 } from "@/components/gallery/skiper30";
import { ReactLenis } from "lenis/react";

export default function GalleryPage() {
  return (
    <ReactLenis root>
      {/* 1. Load Font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        /* NEW: Event gallery header styles */
        .gallery-header { position: relative; overflow: visible; }
        .gallery-header .gallery-decor { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
        .gallery-header > h1 { position: relative; z-index: 3; }

        .gallery-decor {
          background: radial-gradient(800px 300px at 20% 25%, rgba(255,255,255,0.03) 0%, transparent 20%),
                      radial-gradient(900px 350px at 85% 65%, rgba(120, 70, 255, 0.06) 0%, transparent 20%),
                      linear-gradient(180deg, rgba(36,12,80,1), rgba(12,4,28,1));
          background-size: 180% 140%, 120% 120%, 100% 100%;
          background-position: center 20%, center 80%, center;
          transition: transform 900ms ease, opacity 800ms ease;
          transform: translateY(4px);
          animation: decor-wave 12s linear infinite alternate;
          filter: saturate(1.06) contrast(1.04);
        }

        @keyframes decor-wave {
          0% { background-position: center 10%, center 85%, center; filter: hue-rotate(0deg); }
          50% { background-position: center 30%, center 70%, center; filter: hue-rotate(6deg); }
          100% { background-position: center 15%, center 60%, center; filter: hue-rotate(-4deg); }
        }

        /* Subtle sheen floating across the header */
        .gallery-decor::before {
          content: '';
          position: absolute; left: -40%; top: 10%; width: 60%; height: 60%;
          background: linear-gradient(120deg, rgba(255,255,255,0.04), rgba(255,255,255,0) 60%);
          transform: rotate(18deg); opacity: 0.7; pointer-events: none;
          animation: sheen 6s linear infinite;
        }
        @keyframes sheen { 0% { transform: translateX(-10%) rotate(10deg); opacity: 0.5 } 50% { transform: translateX(10%) rotate(12deg); opacity: 1 } 100% { transform: translateX(-10%) rotate(10deg); opacity: 0.5 } }

        /* The key gradient blend between header and gallery */
        .header-blend {
          position: absolute; left: 0; right: 0; bottom: -1px; height: 140px; z-index: 2; pointer-events: none;
          background: linear-gradient(180deg, rgba(46,16,101,0) 0%, rgba(46,16,101,0.25) 30%, rgba(46,16,101,0.6) 60%, rgba(46,16,101,1) 100%);
          transition: opacity 480ms ease, transform 520ms ease;
          transform: translateY(0);
        }

        @media (max-width: 900px) {
          .header-blend { height: 86px; }
        }
      `}</style>

      <main className="w-full min-h-screen bg-[#2e1065]">
        
        {/* SECTION 1: HEADER (Background: gallerybg.png) */}
        <div 
          className="relative h-[220px] flex items-center justify-center text-center gallery-header"
        >
          <div className="gallery-decor" aria-hidden />
          {/* Blend: gradient to mix header with gallery section beneath */}
          <div className="header-blend" aria-hidden />
          <h1 
            className="text-3xl md:text-5xl lg:text-6xl text-white drop-shadow-[0_4px_0_rgba(0,0,0,1)]"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            EVENTS GALLERY
          </h1>
        </div>

        {/* SECTION 2: GALLERY SCROLL (Background: gallerybgmain.png) */}
        <div 
          className="w-full relative -mt-4"
          style={{
            // The image stays fixed in the window while the gallery scrolls over it
            backgroundImage: "url('/backgrounds/gallerybgmain.png')",
            backgroundAttachment: "fixed", 
            backgroundPosition: "center bottom", // Anchors crystals to bottom
            backgroundSize: "cover", // Ensures full width/height coverage
            backgroundRepeat: "no-repeat",
            minHeight: "100vh"
          }}
        >
           {/* The Gallery Component */}
           <div>
             <Skiper30 />
           </div>
        </div>

      </main>
    </ReactLenis>
  );
}