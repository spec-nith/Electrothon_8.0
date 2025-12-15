
"use client";
import dynamic from "next/dynamic";


const ThreeArcadeScene = dynamic(() => import("./ThreeArcadeScene"), { ssr: false });

export default function ThreeArcadeSceneClient(props) {
  return <ThreeArcadeScene {...props} />;
}