"use client";

import React, { useEffect, useState, useRef } from "react";
import "./timeline.css";

/* --- ASSETS --- */

const GhostIcon = ({ color, isEaten }) => {
  if (isEaten) return null;
  return (
    <div className="entity-wrapper ghost-hover">
      <svg viewBox="0 0 100 100" className="smooth-svg" style={{ fill: color }}>
        <path d="M50,6 C25,6 6,28 6,56 L6,94 C6,98 10,98 12,96 L25,84 L38,96 C40,98 44,98 46,96 L50,92 L54,96 C56,98 60,98 62,96 L75,84 L88,96 C90,98 94,98 94,94 L94,56 C94,28 75,6 50,6 Z" />
        <ellipse cx="35" cy="45" rx="14" ry="18" fill="white" />
        <ellipse cx="65" cy="45" rx="14" ry="18" fill="white" />
        <circle cx="42" cy="45" r="7" fill="#0b0b1e" />
        <circle cx="72" cy="45" r="7" fill="#0b0b1e" />
      </svg>
    </div>
  );
};

const PacmanIcon = () => (
  <div className="entity-wrapper">
    <div className="pacman-body"></div>
  </div>
);

/* --- DATA --- */
const events = [
  { id: 1, title: "REGISTRATION", subtitle: "Portal Opens", date: "", ghost: "#ff0055" }, 
  { id: 2, title: "SHORTLIST", subtitle: "Teams Selected", date: "", ghost: "#bd00ff" }, 
  { id: 3, title: "HACKATHON", subtitle: "48H Coding", date: "", ghost: "#00f3ff" }, 
  { id: 4, title: "FINALE", subtitle: "Prize Ceremony", date: "", ghost: "#ff9100" }, 
];

const PacmanTimeline = () => {
  const [scrollDistance, setScrollDistance] = useState(0);
  const containerRef = useRef(null);

  // --- LAYOUT CONFIGURATION ---
  const HEADER_HEIGHT = 180; 
  const BLOCK_SPACING = 220; 
  const TOP_OFFSET = 80;    
  
  const totalHeight = HEADER_HEIGHT + (events.length * BLOCK_SPACING) + 150;
  
  const lastBlockY = ((events.length - 1) * BLOCK_SPACING) + TOP_OFFSET;
  const trackHeight = lastBlockY + 60; 

  const pelletCount = Math.floor(trackHeight / 40);
  const pellets = Array.from({ length: pelletCount }, (_, i) => (i * 40) + 20);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const eaterPositionOnScreen = windowHeight * 0.4;
      const scrolled = (rect.top * -1) + eaterPositionOnScreen;
      
      setScrollDistance(Math.max(0, scrolled));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const clampedPacmanTop = Math.max(0, Math.min(scrollDistance - HEADER_HEIGHT, trackHeight - 35));

  return (
    <div 
      className="timeline-container" 
      ref={containerRef} 
      style={{ height: `${totalHeight}px` }}
    >
      
      {/* HEADER */}
      <div className="header-section" style={{ height: `${HEADER_HEIGHT}px` }}>
        <h1 className="modern-title">TIMELINE</h1>
      </div>

      <div className="game-layout">
        
        {/* --- TRACK LANE --- */}
        <div 
            className="track-lane" 
            style={{ 
                top: `${HEADER_HEIGHT}px`,
                height: `${trackHeight}px`
            }}
        >
          <div className="track-guideline"></div>

          {/* Pellets */}
          {pellets.map((relativePos) => {
             const absolutePos = relativePos + HEADER_HEIGHT;
             return (
              <div 
                key={relativePos} 
                className="pellet" 
                style={{ 
                  top: `${relativePos}px`, 
                  opacity: absolutePos < scrollDistance ? 0 : 1
                }}
              ></div>
            );
          })}

          {/* Ghosts */}
          {events.map((ev, index) => {
            const relativeY = (index * BLOCK_SPACING) + TOP_OFFSET;
            const absoluteY = relativeY + HEADER_HEIGHT;
            return (
              <div 
                key={`g-${ev.id}`} 
                className="entity-anchor" 
                style={{ top: `${relativeY}px` }}
              >
                <GhostIcon color={ev.ghost} isEaten={scrollDistance > absoluteY} />
              </div>
            );
          })}

          {/* Pac-Man (Yellow Eater) */}
          <div 
            className="entity-anchor pacman-mover" 
            style={{ top: `${clampedPacmanTop}px` }} 
          >
            <PacmanIcon />
          </div>
        </div>

        {/* --- BLOCKS LANE --- */}
        <div className="blocks-lane" style={{ top: `${HEADER_HEIGHT}px` }}>
          {events.map((ev, index) => {
            const relativeY = (index * BLOCK_SPACING) + TOP_OFFSET;
            const isActive = scrollDistance >= (relativeY + HEADER_HEIGHT - 50);

            return (
              <div 
                key={ev.id} 
                className={`block-row ${isActive ? "active-row" : ""}`} 
                style={{ top: `${relativeY}px` }}
              >
                <div className="connector-arm">
                    <div className="connector-dot"></div>
                </div>
                
                <div className="holo-card">
                  <div className="card-content">
                    <h3 className="card-title">{ev.title}</h3>
                    <div className="card-divider"></div>
                    <h4 className="card-subtitle">{ev.subtitle}</h4>
                    <p className="card-date">{ev.date}</p>
                  </div>
                  <div className="accent-corner tl"></div>
                  <div className="accent-corner br"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PacmanTimeline;