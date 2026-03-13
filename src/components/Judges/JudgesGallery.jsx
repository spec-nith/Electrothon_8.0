"use client";

import React, { useRef, useState } from 'react';
import TiltedCard from './TiltedCard';
import styles from './JudgesGallery.module.css';

export default function JudgesGallery({ judges }) {
  const scrollerRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  function scrollByCard(direction = 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.querySelector('[data-judge-card]');
    const gap = 40; // match CSS gap-40px
    const cardWidth = first ? first.getBoundingClientRect().width : 300;
    const offset = (cardWidth + gap) * direction;
    el.scrollBy({ left: offset, behavior: 'smooth' });
  }

  // keyboard support
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') scrollByCard(-1);
      if (e.key === 'ArrowRight') scrollByCard(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!judges || judges.length === 0) return null;

  // duplicate for seamless CSS animation
  const items = [...judges, ...judges];

  return (
    <div className={styles.gallery}>
      {/* Prev Button */}
      <button
        aria-label="Previous judges"
        onClick={() => scrollByCard(-1)}
        className={styles.button}
        style={{
          position: "absolute",
          left: "0.5rem",
          top: "50%",
          transform: "translateY(-50%) scale(1.5)",
          zIndex: 20,
        }}
      >
        ‹
      </button>

      {/* Scroller with CSS animation */}
      <div
        ref={scrollerRef}
        className={styles.scroller}
        style={{ padding: "1rem" }}
      >
        <div className={styles.track}>
          {items.map((judge, index) => (
            <div
              key={`${judge.title}-${index}`}
              data-judge-card
              className={`${styles.slide} cursor-target`}
            >
              <TiltedCard
                imageSrc={judge.image}
                altText={judge.title}
                captionText={judge.caption || judge.title}
              />
              <div className={styles.slideName}>{judge.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        aria-label="Next judges"
        onClick={() => scrollByCard(1)}
        className={styles.button}
        style={{
          position: "absolute",
          right: "0.5rem",
          top: "50%",
          transform: "translateY(-50%) scale(1.5)",
          zIndex: 20,
        }}
      >
        ›
      </button>
    </div>
  );
}