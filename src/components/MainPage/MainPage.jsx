"use client";

import Image from "next/image";
import PillNav from "@/components/MainPage/Navbar";
import TargetCursor from "@/components/TargetCursor";
import specLogo from "@/assets/images/spec-logo.png";
import Devfolio_Button from "./DevfolioButton";
import Countdown from "@/components/MainPage/Countdown";


export default function MainPage() {
  return (
    <>
      <TargetCursor targetSelector=".cursor-target" />

      <div className="relative w-full min-h-[100svh] flex flex-col items-center overflow-x-hidden font-['Press_Start_2P']">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/videos/bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/5 z-10" />

        {/* Logo */}
        <div className="absolute z-30 top-[calc(env(safe-area-inset-top,0px)+12px)] left-4 sm:left-6 lg:left-[45px]">
          <Image
            src={specLogo}
            alt="SPEC Logo"
            className="w-[90px] sm:w-[110px] lg:w-[150px] drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          />
        </div>

        <PillNav />

        {/* Center Text */}
        <div className="relative z-30 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-full">
          {/* Title */}
          <div className="cursor-target">
          <h1
            className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]
                       flex flex-col sm:flex-row flex-wrap
                       justify-center items-center gap-x-6
                       text-[30px] sm:text-[36px] md:text-[50px] lg:text-[64px] xl:text-[70px]
                       leading-tight mt-0 " 
          >
            {/* ELECTROTHON */}
        
            <span className="px-[2pt] cursor-targetwhitespace-nowrap">ELECTROTHON</span>

            <span className="block sm:inline"></span>
            <span className="block sm:inline"></span>

            {/* 8.0 */}
            <span className="block sm:inline">8.0</span>
          </h1>
          </div>
          {/* Subtitle */}
          <h2
            className="font-['Orbitron'] font-extrabold text-[rgb(243,232,255)]
                       drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]
                       mt-4 tracking-wide
                       text-[18px] sm:text-[16px] md:text-[24px] lg:text-[32px] xl:text-[40px] cursor-target"
          >
            LABYRINTH OF ETERNUM
          </h2>

          <Devfolio_Button />
        </div>

        {/* Countdown HUD */}
        <Countdown targetDate="2026-01-31T23:59:59+05:30" />
      </div>
    </>
  );
}