import styles from "../../styles/mission.module.css";

export default function AboutUsSection() {
  return (
    <section
      id="about-us"
      className="relative w-full min-h-screen bg-cover bg-top bg-no-repeat"
      style={{
        backgroundImage: 'url("/sections/mission-briefing-bg.png")',
      }}
    >
      <div className="w-full min-h-screen flex flex-col items-center px-6 sm:px-10 lg:px-20 py-24">
        
        {/* TITLE */}
        <h2
          className={`${styles.missionTitle} text-center 
          text-[16px] sm:text-[18px] md:text-[28px] lg:text-[37px]`}
        >
          MISSION BRIEFING
        </h2>

        <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-16 mt-14">
          
          {/* LEFT : TEXT */}
          <div className="w-full lg:w-[60%]">
            <h3
              className={`${styles.subheading} 
              text-[16px] sm:text-[20px] md:text-[22px] lg:text-[25px]`}
            >
              ABOUT US
            </h3>

            <div className={`${styles.aboutText} mt-6`}>
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
                More players, more action, more legendary builds.
              </p>
            </div>
          </div>

          {/* RIGHT : EMPTY SPACE (arcade comes later) */}
          <div className="w-full lg:w-[40%] relative">
            <div className="h-[420px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
