"use client";

import Image from "next/image";
import bg_img from "@/assets/images/bg_img.webp";
import styles from "@/styles/comingsoon.module.css";
import heroStyles from "@/styles/hero.module.css";

export default function ComingSoon() {
  return (
    <section className={styles.comingSoon} id="coming-soon">
      <Image
        src={bg_img}
        alt="Coming Soon Background"
        fill
        className="object-cover object-center z-0"
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className={`${styles.container} relative z-20`}>


        <h2 className={`${styles.title} ${heroStyles.title}`}>
          PRIZES AND CHALLENGES
        </h2>

        {/* Coming Soon Subtitle */}
        <span className={styles.comingSoonSubtitle}>
          COMING SOON
        </span>

        <p className={styles.description}>
          We're making this iteration much better and bigger than last year — new
          challenges, bigger prizes, and more surprises are on the way. Stay tuned
          with us for updates, dates, and registration details. Follow our social
          channels or check back here soon so you don't miss the launch!
        </p>

        {/* CTA removed per request */}
      </div>
    </section>
  );
}
