"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// Critical components - load immediately
import MainPage from "../components/MainPage/MainPage";

// Lazy load below-fold components with loading skeletons
const MissionBriefing = dynamic(() => import("@/components/MissionBriefing"), {
  loading: () => <div className="min-h-screen" />,
});

const AboutUsAchievementWith3D = dynamic(
  () => import("@/components/MissionBriefing/AboutUsAchievementWith3D"),
  { loading: () => <div className="min-h-screen" /> }
);

const Prizes = dynamic(() => import("@/components/prizes/prizes"), {
  loading: () => <div className="min-h-screen" />,
});

const Assortedprizes = dynamic(() => import("@/components/assortedprizes/assorted"), {
  loading: () => <div className="min-h-screen" />,
});

const GalleryPage = dynamic(() => import("@/components/gallery/gallery"), {
  loading: () => <div className="min-h-screen" />,
});

const Themes = dynamic(() => import("@/components/ThemesSection/ThemesSection"), {
  loading: () => <div className="min-h-screen" />,
});

const Winners = dynamic(() => import("@/components/Winners/Winners"), {
  loading: () => <div className="min-h-screen" />,
});

const ComingSoon = dynamic(() => import("@/components/ComingSoon"), {
  loading: () => <div className="min-h-screen" />,
});

const Sponsors = dynamic(() => import("@/components/Sponsors"), {
  loading: () => <div className="min-h-screen" />,
});

const CommunitySponsors = dynamic(() => import("@/components/community_list"), {
  loading: () => <div className="min-h-screen" />,
});

const Timeline = dynamic(() => import("@/components/Timeline/timeline"), {
  loading: () => <div className="min-h-screen" />,
});

const Testimonials = dynamic(() => import("@/components/Testimonials/Testimonials"), {
  loading: () => <div className="min-h-screen" />,
});

const Organizers = dynamic(() => import("@/components/Organizers/Organizers"), {
  loading: () => <div className="min-h-screen" />,
});

const FAQList = dynamic(() => import("@/components/FAQList"), {
  loading: () => <div className="min-h-screen" />,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="min-h-screen" />,
});
const Runshow = dynamic(() => import("@/components/Runshow/Runshow"), {
  loading: () => <div className="min-h-screen" />,
});
const JudgesSection = dynamic(() => import("@/components/Judges/JudgesSection"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
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
            loading="lazy"
          />
          <AboutUsAchievementWith3D />
        </div>
      )}

      <Prizes />
      <GalleryPage />
      {/* Judges + Themes share a single background */}
      <div className="relative w-full">
        <Image
          src="/backgrounds/themes.webp"
          alt="Judges and Themes Background"
          fill
          priority
          className="object-cover object-top z-0"
        />
        {/* Gradient overlays */}
        <div
          aria-hidden
          className="absolute top-0 left-0 w-full h-[22vh] z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(180,80,255,0.45), rgba(120,40,200,0.18), rgba(0,0,0,0))",
          }}
        />
        <div
          aria-hidden
          className="absolute bottom-0 left-0 w-full h-[22vh] z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0))",
          }}
        />
        <div className="absolute inset-0 z-[0] bg-black/10" />

        {/* Content */}
        <div className="relative z-10">
          <JudgesSection />
          <Themes />
        </div>
      </div>
      <Winners />
      <ComingSoon />
      <Assortedprizes />
      <Sponsors />
      <CommunitySponsors />
      <Timeline />
      <Runshow />
      <Testimonials />
      <Organizers />
      <FAQList />
      <Footer />

    </>
  );
}