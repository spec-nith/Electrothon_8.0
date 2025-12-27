"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import specLogo from '@/assets/images/spec-logo.png'; 
import { Press_Start_2P } from 'next/font/google';
// 1. IMPORT THE GRID IMAGE FROM ASSETS
import gridBg from '@/assets/images/gridbg.webp';

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function HackerGuide() {
  return (
    <div 
      // Changed base color to a very dark purple/blue for better blending
      className={`relative min-h-screen w-full overflow-x-hidden bg-[#0f0720] text-gray-200 ${pressStart2P.className}`}
    >
      
      {/* ================= BACKGROUND IMAGE FIX ================= */}
      <div className="fixed inset-0 z-0">
        <Image
          // 2. USE THE IMPORTED GRID IMAGE
          src={gridBg}
          alt="Purple Grid Background"
          fill
          // 3. Increased opacity for higher visibility of the grid
          className="object-cover opacity-70"
          priority
        />
        {/* 4. Purple Gradient Overlay to enhance the neon effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-[#0f0720]/70 to-[#0f0720]" />
      </div>
      {/* ======================================================== */}

      {/* 2. Top Left Logo */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/">
          <div className="relativew-24 h-24 md:w-32 md:h-32 cursor-pointer hover:scale-105 transition-transform">
            <Image
              src={specLogo}
              alt="SPEC Logo"
              fill
              className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            />
          </div>
        </Link>
      </div>

      {/* 3. Main Content Container */}
      <div className="relative z-10 container mx-auto px-6 py-24 max-w-5xl">
        
        {/* Page Title */}
        <h1 
          className="text-center mb-16 text-2xl md:text-4xl lg:text-5xl text-white drop-shadow-[0_4px_0_rgba(0,0,0,1)] leading-normal"
        >
          Hacker's Guide to<br />
          {/* Changed highlight color to purple/pink to match bg */}
          <span className="text-white drop-shadow-[0_0_10px_rgba(192,132,252,0.8)]">ELECTROTHON 8.0</span>
        </h1>

        {/* Updated container bg color to match purple theme */}
        <div className="space-y-12 bg-[#1a0b2e]/60 p-6 md:p-12 rounded-3xl border border-purple-500/20 backdrop-blur-sm shadow-2xl shadow-purple-900/20">
          
          {/* Intro Section */}
          <section className="space-y-6 text-center">
            <p className="leading-loose text-xs md:text-sm text-gray-300">
              Thank you for landing here! You being here implies you are in a confusing situation. Looking for help? No worries, welcome to the official guide to <strong className="text-white">ELECTROTHON 8.0</strong>.
            </p>
            <p className="leading-loose text-xs md:text-sm text-gray-400">
              Think of an issue and we provide a solution to you here. Just keep looking and dive right into the plethora of QnA! 📍
            </p>
          </section>

          {/* Overview Grid */}
          <section>
             <h2 className="text-base md:text-xl text-[#fbbf24] mb-8 text-center md:text-left">
              🔎 Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard icon="⚙️" title="How will it work?" />
              <InfoCard icon="📩" title="Submission" />
              <InfoCard icon="👩🏻‍⚖️" title="Judging" />
            </div>
          </section>

          {/* Event Checklist Section */}
          <section className="border-t border-purple-500/20 pt-10">
            <h2 className="text-base md:text-xl text-green-400 mb-8 text-center md:text-left">
              ✅ Event Checklist
            </h2>
            
            <div className="space-y-8">
              
              <ChecklistItem number="1️⃣">
                Book your travel and accommodation well in advance. Check out the <strong>Venue Guide</strong> prepared for your reference to help set up your travel plans and stay near the venue.
              </ChecklistItem>

              <ChecklistItem number="2️⃣">
                Essentials that you need to carry to the venue:
                <ul className="mt-4 space-y-3 ml-2 md:ml-4">
                  <li className="flex items-start gap-3 text-gray-400 text-[10px] md:text-xs">
                    <span className="text-purple-400">➤</span> Government Id Proof [Aadhar/Pan/Voter Id]
                  </li>
                  <li className="flex items-start gap-3 text-gray-400 text-[10px] md:text-xs">
                    <span className="text-purple-400">➤</span> College Identity Card
                  </li>
                  
                </ul>
              </ChecklistItem>

              <ChecklistItem number="3️⃣">
                Join the <a href="#" className="text-purple-400 hover:text-purple-300 underline">Discord Server</a> for all updates and communications in the future.
              </ChecklistItem>

              <ChecklistItem number="4️⃣">
                Show your excitement on social media by tagging <span className="text-purple-400">SPEC_NITH</span> on Twitter and Instagram using <span className="text-purple-400">#Electrothon 8.0</span>.
              </ChecklistItem>

              <ChecklistItem number="5️⃣">
                Read and abide by the <Link  href="/code-of-conduct" className="text-purple-400 hover:text-purple-300 underline">Code of Conduct</Link>.
              </ChecklistItem>

            </div>
          </section>

          {/* Footer Note */}
          <div className="mt-8 p-6 bg-white/5 rounded-lg border border-purple-500/20 text-center">
             <p className="text-xs md:text-sm text-gray-300 mb-2">In case you missed it:</p>
             <Link href="#" className="text-[#fbbf24] hover:text-yellow-300 text-xs md:text-sm underline decoration-dashed underline-offset-4">
                Venue Guide to Electrothon 8.0
             </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- Helper Components (Updated with purple accents) ---

const InfoCard = ({ icon, title }) => (
  <div className="bg-white/5 p-6 rounded-xl border border-purple-500/10 flex flex-col items-center justify-center text-center hover:bg-purple-500/10 hover:border-purple-500/30 transition-all cursor-default group">
    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform group-hover:drop-shadow-[0_0_10px_rgba(192,132,252,0.5)]">{icon}</div>
    <h3 className="text-xs md:text-sm text-gray-200">{title}</h3>
  </div>
);
const ChecklistItem = ({ number, children }) => (
  <div 
    // CHANGED: bg-black
    // Added purple border, shadow, and hover glow to match the theme
    className="flex gap-4 md:gap-6 items-start bg-black p-4 md:p-6 rounded-xl border border-purple-500/30 shadow-lg hover:border-purple-400 transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
  >
    <span className="text-2xl md:text-3xl shrink-0 select-none drop-shadow-[0_2px_0_rgba(0,0,0,1)]">
      {number}
    </span>
    <div className="text-xs md:text-sm text-gray-300 leading-loose pt-1">
      {children}
    </div>
  </div>
);