  "use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../../styles/mission.module.css";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  { number: "140+", labelTop: "TEAMS" },
  { number: "2500+", labelTop: "REGISTRATIONS" },
  { number: "100+", labelTop: "SOFTWARE", labelBottom: "PROJECTS" },
  { number: "40+", labelTop: "HARDWARE", labelBottom: "PROJECTS" },
];

export default function AboutUsAchievementWith3D() {
  const mountRef = useRef(null);
  const contentRef = useRef(null);
  const modelRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const contentInnerRef = useRef(null);


  useEffect(() => {
    /* =======================
       THREE SETUP
    ======================= */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.3, 8.2);
    camera.lookAt(0, 1.1, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    /* =======================
       LIGHTING
    ======================= */
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const dir = new THREE.DirectionalLight(0xffffff, 2);
    dir.position.set(4, 6, 6);
    scene.add(dir);

    /* =======================
       LOAD MODEL
    ======================= */
    const loader = new GLTFLoader();
    loader.load("/models/arcade-machine.glb", (gltf) => {
      const model = gltf.scene;
      modelRef.current = model;
      const FACE_LEFT = -Math.PI / 2 +  0.8;    // about us
      const FACE_RIGHT = -Math.PI / 2  + 1.6; // achievements

      model.scale.set(0.07, 0.07, 0.07);

    //   // ✅ LOCK BASE ROTATION (180° ONLY)
    //   model.rotation.set(0, -Math.PI/24, 0);
      model.rotation.set(0, FACE_LEFT, 0);

      // vertical centering
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const BASE_Y = -size.y / 2 + 0.2;
      const START_Y = BASE_Y + 0.6; // thoda upar
      const END_Y   = BASE_Y + 0.05; // thoda neeche

      // initial position
      model.position.set(3.2, BASE_Y + 0.5, 0);
      scene.add(model);
      //zoom out a bit
      let screenMesh = null;

model.traverse((child) => {
  if (child.isMesh) {
    console.log(child.name); // 🔍 temporary (see console once)
    if (child.name.toLowerCase().includes("screen")) {
      screenMesh = child;
    }
  }
});
const screenTexture = new THREE.TextureLoader().load(
  "/screens/welcome.png"
);

screenTexture.flipY = false;

const screenMaterial = new THREE.MeshBasicMaterial({
  map: screenTexture,
  toneMapped: false, // IMPORTANT for brightness
});
if (screenMesh) {
  screenMesh.material = new THREE.MeshBasicMaterial({
    color: 0x000000,
  });
}




      /* =======================
         SCROLL TIMELINE
      ======================= */
    //   gsap.timeline({
    //     scrollTrigger: {
    //       trigger: "#mission-scroll",
    //       start: "top+=80 top",
    //       end: "+=200%",
    //       scrub: true,
    //       pin: true,
    //       anticipatePin: 1,
    //     },
    //   })
    //   .fromTo(
    //     model.position,
    //     {
    //       x: 3.2,
    //       y: START_Y,
    //     },
    //     {
    //       x: 0,
    //       y: END_Y,
    //       ease: "none",
    //       duration: 1,
    //     }
    //   )
    //   // /* ABOUT – idle, facing LEFT */
    //   // .to(model.position, {
    //   //   x: 3.2,
    //   //   y: BASE_Y + 0.5,
    //   //   ease: "none",
    //   //   duration: 0.2,
    //   // })
      
    //   // /* TRANSITION: move + rotate together */
    //   // .to(model.position, {
    //   //   x: 0,
    //   //   y: BASE_Y + 0.5,
    //   //   ease: "none",
    //   //   duration: 0.6,
    //   // }, ">")

    //   .to(model.rotation, {
    //     y: FACE_RIGHT,
    //     ease: "none",
    //     duration: 0.6,
    //   }, "<")
    //   .to(camera.position, {
    //     z: 0.7,
    //     y: 1.0,
    //     ease: "none",
    //     duration: 0.6,
    //   }, "<")
    //   .to({}, {
    //     duration: 0.1,
    //     onStart: () => {
    //       if (screenMesh) {
    //         screenMesh.material = screenMaterial;
    //       }
    //     },
    //   }, "<+=0.02")
            
    //   /* CONTENT MOVE */
    //   .to(
    //     contentRef.current,
    //     {
    //       yPercent: -100,
    //       ease: "none",
    //       duration: 0.6,
    //     },
    //     "<"
    //   );
      
    // });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#mission-scroll",
        start: "top+=80 top",
        end: "+=150%",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    })
    
    /* PHASE 1 — ONLY Y (top → mid) */
tl.to(model.position, {
  y: END_Y,          
  ease: "none",
  duration: 0.4,     
})

/* PHASE 2 — X + ZOOM (mid → end) */
tl.to(model.position, {
  x: 0,              
  ease: "none",
  duration: 0.6,     
})

tl.to(model.rotation, {
  y: FACE_RIGHT,
  ease: "none",
  duration: 0.6,
}, "<")

tl.to(camera.position, {
  z: 0.6,
  y: 1.45,
  ease: "none",
  duration: 0.6,
}, "<")

tl.to(camera, {
  fov: 26,
  onUpdate: () => camera.updateProjectionMatrix(),
  duration: 0.6,
}, "<")
    /* CONTENT SCROLL */
    .to(contentRef.current, {
      yPercent: -100,
      ease: "none",
      duration: 0.6,
    }, "<")
    });
    /* =======================
       CURSOR PARALLAX
    ======================= */
    const onMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    /* =======================
       RENDER LOOP
    ======================= */
    const animate = () => {
      requestAnimationFrame(animate);

      const model = modelRef.current;
      if (model) {
        const baseY = model.rotation.y;
const targetRotY = baseY + mouseRef.current.x * 0.25;

        const targetRotX = mouseRef.current.y * 0.15;

        model.rotation.x += (targetRotX - model.rotation.x) * 0.06;
      }

      renderer.render(scene, camera);
    };
    animate();

    /* =======================
       RESIZE
    ======================= */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    /* =======================
       CLEANUP
    ======================= */
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      renderer.dispose();
      scene.clear();
      if (mountRef.current) {
        mountRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <section
      id="mission-scroll"
      style={{
        position: "relative",
        height: "100vh", // important
    overflow: "visible",
        // background:
        //   "url('/sections/mission-briefing-bg.png') center / cover no-repeat",
      }}
    >
      
      {/* FIXED 3D */}
      <div
        ref={mountRef}
        style={{
          position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 0,
        }}
      />

      {/* SCROLLING CONTENT */}
      <div ref={contentRef} style={{ position: "relative", zIndex: 2 }}>
        {/* ABOUT */}
        
        <section className="min-h-screen flex items-start px-24">
            
        <div className={styles.aboutBlock}>
        
          
           
          <h3
                className={`${styles.subheading} cursor-target
                text-[16px] sm:text-[25px] md:text-[27px] lg:text-[45px]`}
              >
                ABOUT US
              </h3>
            <div className={`${styles.aboutText} cursor-target `}>
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
            <div className={styles.achievementInline}>
      <h3 className={`${styles.subheading2} cursor-target
                text-[16px] sm:text-[22px] md:text-[25px] lg:text-[42px]`}>OUR ACHIEVEMENTS</h3>

      <div className={`${styles.achievementsGrid} mt-8`}>
        {achievements.map(item => (
          <div key={item.number} className={`${styles.achievementCard} cursor-target`}>
            <div className={styles.achievementNumber}>{item.number}</div>
            <div className={styles.achievementLabel}>
              {item.labelTop}
              {item.labelBottom && <br />}
              {item.labelBottom}
            </div>
          </div>
        ))}
      </div>
    </div>
          </div>
        </section>


        {/* ACHIEVEMENTS */}
      

        {/* <section className={styles.achievementSection}>
  <div className={styles.achievementBlock}>
    <h3 className={styles.subheading2}>
      OUR ACHIEVEMENTS
    </h3>

    <div className={styles.achievementsGrid}>
      {achievements.map((item) => (
        <div
          key={item.number}
          className={`${styles.achievementCard} cursor-target`}
        >
          <div className={styles.achievementNumber}>
            {item.number}
          </div>
          <div className={styles.achievementLabel}>
            {item.labelTop}
            {item.labelBottom && <br />}
            {item.labelBottom}
          </div>
        </div>
      ))}
    </div>
  </div>
</section> */}
</div>
       
        </section>
  );
}
