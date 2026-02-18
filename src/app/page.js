"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import dynamic from "next/dynamic";

// Critical components - load immediately
import MainPage from "../components/MainPage/MainPage";

// Lazy load below-fold components
const MissionBriefing = dynamic(() => import("@/components/MissionBriefing"), {
  loading: () => <div className="min-h-screen" />
});
const AboutUsAchievementWith3D = dynamic(() => import("@/components/MissionBriefing/AboutUsAchievementWith3D"), {
  loading: () => <div className="min-h-screen" />
});
const Prizes = dynamic(() => import("@/components/prizes/prizes"));
const GalleryPage = dynamic(() => import("@/components/gallery/gallery"));
const Themes = dynamic(() => import("@/components/ThemesSection/ThemesSection"));
const ComingSoon = dynamic(() => import("@/components/ComingSoon"));
const Sponsors = dynamic(() => import("@/components/Sponsors"));
const Timeline = dynamic(() => import("@/components/Timeline/timeline"));
const Testimonials = dynamic(() => import("@/components/Testimonials/Testimonials"));
const FAQList = dynamic(() => import("@/components/FAQList"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <MainPage />
      {isMobile ? (
        <MissionBriefing />
      ) : (
        <div
          style={{
            minHeight: "100vh",
            background: "url('/sections/mission-briefing-bg.png') center / cover no-repeat",
          }}
        >
          <AboutUsAchievementWith3D />
        </div>
      )}
      <Prizes />
      <GalleryPage />
      <Themes />
      <ComingSoon />
      <Sponsors />
      <Timeline />
      <Testimonials />
      <FAQList />
      <Footer />
    </>
  );
}