// src/components/MissionBriefing.jsx

import Image from "next/image";
import styles from "../styles/mission.module.css";

const achievements = [
  { number: "85+", labelTop: "TEAMS", labelBottom: "" },
  { number: "2500+", labelTop: "REGISTRATIONS", labelBottom: "" },
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
       
      <div className="w-full min-h-screen flex flex-col items-center px-6 sm:px-10 lg:px-20 py-24">
        {/* MAIN TITLE */}
        <h2
  className={`${styles.missionTitle} text-center 
  text-[16px] sm:text-[18px] md:text-[28px] lg:text-[37px]`}>

          MISSION BRIEFING
        </h2>

        {/* CONTENT */}
        <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20 mt-10">
          {/* LEFT COLUMN */}
          <div className="flex flex-col items-center lg:items-start w-full lg:w-[60%] gap-6">
            {/* ABOUT US */}
            <div className="w-full flex flex-col items-center">
            <h3 className={`${styles.subheading} 
  text-[16px] sm:text-[20px] md:text-[22px] lg:text-[25px]`}>
ABOUT US</h3>

              <div className={`${styles.aboutText} text-center lg:text-left`}>
                <p>
                  Step into the Arcade of Innovation as Electrothon returns for
                  another electrifying in-person edition! This year, we dive
                  into a neon-soaked retro realm where every team is a player,
                  every idea a power-up, and every project a shot at the
                  ultimate high score.
                </p>
                <p>
                  Powered by SPEC and the energy of NIT Hamirpur, Electrothon
                  continues to inspire students to build, create, and push the
                  boundaries of tech.
                </p>
                <p>
                  From past editions where ideas became game-changing projects
                  to this year’s turbocharged arena — everything is leveled up.
                  More players, more action, more legendary builds. Gear up,
                  press start, and code your way into the Arcade era of
                  Electrothon.
                </p>
              </div>
            </div>

            {/* OUR ACHIEVEMENTS */}
            <div className="w-full flex flex-col items-center">
            <h3 className={`${styles.subheading2} 
  text-[16px] sm:text-[20px] md:text-[22px] lg:text-[25px]`}>
OUR ACHIEVEMENTS</h3>
            </div>

            {/* Cards */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-5">
              {achievements.map((item) => (
                <div
                  key={item.number}
                  className={`${styles.achievementCard} cursor-pointer`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={styles.achievementNumber}>
                      {item.number}
                    </div>
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
          <div className="flex justify-center lg:justify-end w-full lg:w-auto">
            <Image
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
            />
          </div>
        </div>
      </div>
    </section>
  );
}
