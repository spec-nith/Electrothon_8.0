
import Image from "next/image";
import styles from "../styles/hero.module.css";
import FloatingNav from "@/components/FloatingNav";
import FAQList from "@/components/FAQList";
import Footer from "@/components/Footer";
import specLogo from "@/assets/images/spec-logo.png";
import TargetCursor from '@/components/TargetCursor';
import MainPage from "@/components/MainPage";
import Gallery from "@/components/Gallery";
import MissionBriefing from "@/components/MissionBriefing";
//import MissionBriefing from "@/components/MissionBriefing";

import Themes from "@/components/ThemesSection/ThemesSection";
import Testimonials from "@/components/Testimonials/Testimonials";
import Timeline from "@/components/Timeline/timeline";
import GalleryPage from "@/components/gallery/gallery";
import AboutUsSection from "@/components/MissionBriefing/AboutUsSection";
import AchievementsSection from "@/components/MissionBriefing/AchievementsSection";
import ThreeArcadeSceneClient from "@/components/three/ThreeArcadeSceneClient";
export default function Page() {
  return (
    <>

      <div className={styles.heroWrapper}>

      <video
  className={styles.backgroundVideo}
  src="/videos/bg.mp4"
  autoPlay
  loop
  muted
  playsInline
/>

<div className={styles.overlay}></div>


      <div className={styles.logoWrapper}>
        <Image src={specLogo} alt="SPEC Logo" width={150} height={150} />
      </div>

      <nav className={styles.navbar}>
  {/* <div className={styles.centerNav}> */}
    <FloatingNav />
  {/* </div> */}
</nav>


      <div className={styles.centerText}>
        <h1 className={styles.title}>ELECTROTHON 8.0</h1>
        <h2 className={styles.subtitle}>LABYRINTH OF ETERNUM</h2>

        <button className={styles.ctaButton}>
          Register Here
        </button>
      </div>

    </div>
  
      <TargetCursor />
      <MainPage />
      <MissionBriefing />
      {/* <MissionBriefing /> */}
      <ThreeArcadeSceneClient /> 
      <section id="three-arcade-wrapper">
        <AboutUsSection />
        <AchievementsSection />
      </section>
      <GalleryPage />
      <Themes />
      <Timeline /> 
      <GalleryPage />       
      <Testimonials />
      <FAQList />
      <Footer />
    
    </>
  );
}


