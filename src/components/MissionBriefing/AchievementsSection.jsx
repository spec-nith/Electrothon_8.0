import styles from "../../styles/mission.module.css";

const achievements = [
  { number: "85+", labelTop: "TEAMS" },
  { number: "2500+", labelTop: "REGISTRATIONS" },
  { number: "60+", labelTop: "SOFTWARE", labelBottom: "PROJECTS" },
  { number: "25+", labelTop: "HARDWARE", labelBottom: "PROJECTS" },
];

export default function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="relative w-full min-h-screen bg-cover bg-top bg-no-repeat"
      style={{
        backgroundImage: 'url("/sections/mission-briefing-bg.png")',
      }}
    >
      <div className="w-full min-h-screen flex flex-col items-center px-6 sm:px-10 lg:px-20 pt-24 pb-16">

        <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-16">
          
          {/* LEFT : EMPTY SPACE (arcade comes here) */}
          <div className="w-full lg:w-[40%] relative">
            <div className="h-[420px]"></div>
          </div>

          {/* RIGHT : ACHIEVEMENTS */}
          <div className="w-full lg:w-[60%]">
            <h3
              className={`${styles.subheading2} 
              text-[16px] sm:text-[20px] md:text-[22px] lg:text-[25px]`}
            >
              OUR ACHIEVEMENTS
            </h3>

            <div className={`${styles.achievementsGrid} mt-10`}>
              {achievements.map((item) => (
                <div
                  key={item.number}
                  className={`${styles.achievementCard}`}
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

        </div>
      </div>
    </section>
  );
}
