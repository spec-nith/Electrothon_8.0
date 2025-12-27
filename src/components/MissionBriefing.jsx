// src/components/MissionBriefing.jsx

import Image from "next/image";
import ArcadeModel from "@/components/ArcadeModel";
import styles from "../styles/mission.module.css";

const achievements = [
  { number: "85+", labelTop: "TEAMS", labelBottom: "" },
  { number: "3500+", labelTop: "REGISTRATIONS", labelBottom: "" },
  { number: "60+", labelTop: "SOFTWARE", labelBottom: "PROJECTS" },
  { number: "25+", labelTop: "HARDWARE", labelBottom: "PROJECTS" },
];

export default function MissionBriefing() {
  return (
    <section
      id="mission-briefing"
      className="relative w-full min-h-screen bg-cover bg-top bg-no-repeat"
      style={{
        backgroundImage: 'url("/sections/mission-briefing-bg.png")',
      }}
    >
      <div className="w-full flex flex-col items-center px-6 sm:px-10 lg:px-20 py-10">
        {/* MAIN TITLE */}
        <h2
          className={`${styles.missionTitle} cursor-target text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold`}
        >
          MISSION BRIEFING
        </h2>

        {/* CONTENT */}
        <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20 mt-10">
          {/* LEFT COLUMN */}
          <div className="flex flex-col items-center lg:items-start w-full lg:w-[60%] gap-6">
            {/* ABOUT US */}
            <div className="w-full flex flex-col items-center">
              <h3
                className={`${styles.subheading} cursor-target
  text-[16px] sm:text-[22px] md:text-[24px] lg:text-[29px]`}
              >
                ABOUT US
              </h3>

              <div className={`${styles.aboutText} cursor-target text-center lg:text-left`}>
                <p>
                  In the neon glow of Eternum’s endless corridors, a new era of
                  Electrothon powers up. The screens flicker, the circuits hum,
                  and the pixelated gates of the Labyrinth swing open for those
                  daring enough to enter. Here, every coder is a player, every
                  idea a power-up, and every challenge a boss fight waiting to
                  be conquered.
                </p>
                <p>
                  Within the Hall of Circuits, echoes of past champions still
                  pulse like 8-bit heartbeats. They navigated every twist,
                  cracked every code, and pushed the machine to its very limit.
                  This spring, join North India's biggest hackathon as the
                  Labyrinth of Eternum is set to be bigger, brighter, and far
                  more unpredictable. Once again, we call upon the next
                  generation of builders, breakers, dreamers, and doers.
                </p>
              </div>
            </div>

            {/* OUR ACHIEVEMENTS */}
            <div className="w-full flex flex-col items-center">
              <h3
                className={`${styles.subheading2} cursor-target
  text-[16px] sm:text-[22px] md:text-[24px] lg:text-[29px]`}
              >
                OUR ACHIEVEMENTS
              </h3>
            </div>

            {/* Cards */}
            <div className={styles.achievementsRow}>
  {achievements.map((item) => (
    <div
      key={item.number}
      className={`${styles.achievementCard} cursor-target`}
    >
      <div className="flex flex-col items-center text-center">
        <div className={styles.achievementNumber}>{item.number}</div>
        <div className={styles.achievementLabel}>
          {item.labelTop}
          {item.labelBottom && <br />}
          {item.labelBottom}
        </div>
      </div>
    </div>
  ))}
</div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="flex justify-center lg:justify-end w-full lg:w-auto ">
            {/* <Image
              src="/sections/arcade-machine.png"
              alt="Arcade machine"
              width={420}
              height={800}
              className={`${styles.arcadeImage} 
    w-56 sm:w-72 md:w-80 lg:w-[420px]
    mx-auto
    lg:ml-auto
    `}
              unoptimized
              priority
            /> */}
            <div
    className={`${styles.arcadeImage} 
      w-56 sm:w-72 md:w-80 lg:w-[420px]
      h-[800px]
      mx-auto
      lg:ml-auto
      translate-x-0
      -translate-y-8
    `}
  >
    <ArcadeModel />
  </div>
          </div>
        </div>
      </div>
    </section>
  );
}
