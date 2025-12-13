"use client";

import React, { useMemo } from "react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";

const World = dynamic(() => import("./globe").then((m) => m.World), {
  ssr: false,
});

export function GlobeDemo({ embedded = false }) {
  const globeConfig = useMemo(() => ({
    pointSize: 4,
    // violet-ish theme color
    globeColor: "#7c3aed",
    // Use a bright daytime earth texture by default and a subtle bump map
    globeImageUrl: 'https://unpkg.com/three-globe/example/img/earth-day.jpg',
    bumpImageUrl: 'https://unpkg.com/three-globe/example/img/earth-topology.png',
    showAtmosphere: false,
    emissive: "#e60a64",
    emissiveIntensity: 0.8,
    // Tint the texture to match the violet theme
    tintColor: '#7c3aed',
    tintIntensity: 0.7,
    shininess: 0.9,
    specular: "#ffffff",
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    ambientIntensity: 0.15,
    directionalLeftLight: "#ffffff",
    directionalIntensityLeft: 0.15,
    directionalTopLight: "#ffffff",
    directionalIntensityTop: 0.1,
    pointLight: "#e60a64",
    pointLightIntensity: 0.2,
    // Boost emissive intensity so the violet accent glow is visible
    emissiveIntensity: 0.35,
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
    // Make sphere smaller and disable zoom
    globeScale: 0.75,
    disableZoom: true,
    cameraDistance: 300,
  }), []);

  const colors = ["#a855f7", "#9333ea", "#c084fc"];
  
  const sampleArcs = useMemo(() => [
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -1.303396,
      endLng: 36.852443,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: -15.785493,
      startLng: -47.909029,
      endLat: 36.162809,
      endLng: -115.119411,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: 21.3099,
      startLng: -157.8581,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: -34.6037,
      startLng: -58.3816,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 14.5995,
      startLng: 120.9842,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -33.8688,
      endLng: 151.2093,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: -15.432563,
      startLng: 28.315853,
      endLat: 1.094136,
      endLng: -63.34546,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
  ], [colors]);

  const arcs = sampleArcs;

  if (embedded) {
    // When embedded (e.g. inside ContactUs card) just fill the parent
    return (
      <div className="w-full h-full">
        <World data={sampleArcs} globeConfig={globeConfig} style={{ width: '100%', height: '100%' }} />
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center justify-center py-20 h-screen md:h-auto bg-transparent relative w-full overflow-hidden">
      <div className="w-full relative h-full md:h-screen">
        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40" />
        <div className="absolute right-8 top-24 w-[420px] h-[420px] md:right-16 md:top-32 md:w-[520px] md:h-[520px] z-10 overflow-visible">
          <World data={sampleArcs} globeConfig={globeConfig} style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </div>
  );
}

export default React.memo(GlobeDemo);
