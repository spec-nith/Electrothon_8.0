import MainPage from "@/components/MainPage";
import Gallery from "@/components/Gallery";
import MissionBriefing from "@/components/MissionBriefing";
import Themes from "@/components/ThemesSection/ThemesSection";
import Testimonials from "@/components/Testimonials/Testimonials";
import Timeline from "@/components/Timeline/timeline";

export default function Page() {
  return (
    <>
      <MainPage />
      <MissionBriefing />
      <Gallery />
      <Themes />
      <Timeline />        
      <Testimonials />
    </>
  );
}


