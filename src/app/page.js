"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

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
const Organizers = dynamic(() => import("@/components/Organizers/Organizers"));
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
        <div className="relative w-full min-h-screen">
          <Image
            src="/sections/mission-briefing-bg.webp"
            alt="Mission Briefing Background"
            fill
            className="object-cover object-center -z-10"
            priority
          />
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
      <Organizers />
      <FAQList />
      <Footer />
    </>
  );
}