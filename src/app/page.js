import Image from "next/image";
import styles from "../styles/hero.module.css";
import FloatingNav from "@/components/FloatingNav";
import FAQList from "@/components/FAQList";
import Footer from "@/components/Footer";
import specLogo from "@/assets/images/spec-logo.png";
<<<<<<< HEAD
import MainPage from "@/components/MainPage";
=======
import Gallery from "@/components/Gallery";
>>>>>>> FAQs+Footer
import MissionBriefing from "@/components/MissionBriefing";
import Themes from "@/components/ThemesSection/ThemesSection";
import Testimonials from "@/components/Testimonials/Testimonials";
import Timeline from "@/components/Timeline/timeline";
import GalleryPage from "@/components/gallery/gallery";

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
<<<<<<< HEAD

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
   
    
      <MainPage />

      <MissionBriefing />
      <Themes />
      <Timeline /> 
      <GalleryPage />       
=======
      <MissionBriefing />
      <Themes />
>>>>>>> FAQs+Footer
      <Testimonials />
      <Timeline />        
      <Gallery />
      <FAQList />
    <Footer />
    
    </>
  );
}


