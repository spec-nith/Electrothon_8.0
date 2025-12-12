import Image from "next/image";
import styles from "@/styles/hero.module.css";
import FloatingNav from "@/components/FloatingNav";
import specLogo from "@/assets/images/spec-logo.png";


export default function MainPage() {
  return (
    <div className={styles.heroWrapper}>
      <video
        className={styles.backgroundVideo}
        src="/videos/bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className={styles.overlay} />

      <div className={styles.logoWrapper}>
        <Image src={specLogo} alt="SPEC Logo" width={150} height={150} />
      </div>

      <nav className={styles.navbar}>
        <FloatingNav />
      </nav>

      <div className={styles.centerText}>
        <h1 className={styles.title}>ELECTROTHON 8.0</h1>
        <h2 className={styles.subtitle}>LABYRINTH OF ETERNUM</h2>

        <button className={`${styles.ctaButton} cursor-target`}>
          Register Here
        </button>
      </div>
    </div>
  );
}