"use client";

import { Skiper30 } from "@/components/gallery/skiper30";
import { ReactLenis } from "lenis/react";

export default function GalleryPage() {
  return (
    <ReactLenis root>
      {/* 1. Load Font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      `}</style>

      <main className="w-full min-h-screen bg-[#2e1065]">
        
        {/* SECTION 1: HEADER (Background: gallerybg.png) */}
        <div 
          className="relative h-[220px] flex items-center justify-center text-center"
          style={{
            backgroundImage: "url('/backgrounds/gallerybg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat"
          }}
        >
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