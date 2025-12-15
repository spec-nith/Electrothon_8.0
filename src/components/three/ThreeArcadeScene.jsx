"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ThreeArcadeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mount = mountRef.current;
    if (!mount) return;

    /* =======================
       SCENE
    ======================= */
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      40,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.8, 7);
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    /* =======================
       LIGHTS
    ======================= */
    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const dir = new THREE.DirectionalLight(0xffffff, 2);
    dir.position.set(5, 5, 5);
    scene.add(dir);

    let model = null;
    let targetRotX = 0;
    let targetRotY = 0;

    /* =======================
       LOAD MODEL
    ======================= */
    const loader = new GLTFLoader();
    loader.load("/models/arcade-machine.glb", (gltf) => {
      model = gltf.scene;
      model.scale.set(0.05, 0.05, 0.05);
      model.rotation.set(0, Math.PI, 0);
      model.visible = false;

      // Center vertically
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const baseY = -size.y / 2;
      model.position.y = baseY;

      scene.add(model);

      /* ===== FIGMA POSITIONS ===== */
      const ABOUT_POS = { x: 3.2, y: baseY, z: 0 };
      const ACHIEVE_POS = { x: -3.2, y: baseY - 0.6, z: 0 };

      const FIXED_Y = model.position.y;

// Figma positions
const ABOUT_X = 3.2;     // right
const ACHIEVE_X = -3.2;  // left

model.position.set(ABOUT_X, FIXED_Y, 0);
model.visible = false;

ScrollTrigger.create({
  trigger: "#three-arcade-wrapper",
  start: "top top",
  end: "bottom bottom",
  scrub: true,
  pin: true, // 🔒 ABSOLUTELY REQUIRED

  onUpdate: (self) => {
    if (!model) return;

    const p = self.progress; // 0 → 1 ONLY between About & Achievements

    model.visible = true;

    // ONLY X MOVES — Y IS LOCKED
    model.position.x = ABOUT_X + (ACHIEVE_X - ABOUT_X) * p;
    model.position.y = FIXED_Y;
  },

  onLeave: () => {
    // HARD LOCK at achievements
    model.position.set(ACHIEVE_X, FIXED_Y, 0);
  },

  onLeaveBack: () => {
    model.visible = false;
    model.position.set(ABOUT_X, FIXED_Y, 0);
  },
});

    });

    /* =======================
       MOUSE ROTATION
    ======================= */
    const onMouseMove = (e) => {
      const mx = (e.clientX / window.innerWidth) * 2 - 1;
      const my = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = mx * 0.15;
      targetRotX = my * 0.1;
    };
    window.addEventListener("mousemove", onMouseMove);

    /* =======================
       LOOP
    ======================= */
    const animate = () => {
      requestAnimationFrame(animate);
      if (model) {
        model.rotation.y += (targetRotY - model.rotation.y) * 0.05;
        model.rotation.x += (targetRotX - model.rotation.x) * 0.05;
      }
      renderer.render(scene, camera);
    };
    animate();

    /* =======================
       RESIZE
    ======================= */
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
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
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 20,
      }}
    />
  );
}
