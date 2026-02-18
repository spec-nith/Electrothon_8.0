"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import specLogo from '@/assets/images/spec-logo.png'; 
import TargetCursor from "@/components/TargetCursor";
import { Press_Start_2P } from 'next/font/google';
// 1. IMPORT THE GRID IMAGE (Same as Hacker Guide)
import gridBg from '@/assets/images/gridbg.webp';

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function CodeOfConduct() {
  return (
    <>
     <TargetCursor targetSelector=".cursor-target" />
    <div 
      // 2. Updated base color to Dark Purple
      className={`relative min-h-screen w-full overflow-x-hidden bg-[#0f0720] text-gray-200 ${pressStart2P.className}`}
    >
      
      {/* 3. Background Image & Overlay */}
      <div className="fixed inset-0 z-0">
        <Image
          src={gridBg} 
          alt="Purple Grid Background"
          fill
          className="object-cover opacity-70" // High visibility for the grid
          priority
        />
        {/* Purple/Neon Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-[#0f0720]/70 to-[#0f0720]" />
      </div>

      {/* 4. Top Left Logo */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/">
          <div className="relative w-24 h-24 md:w-32 md:h-32 cursor-pointer hover:scale-105 transition-transform">
            <Image
              src={specLogo}
              alt="SPEC Logo"
              fill
              className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            />
          </div>
        </Link>
      </div>

      {/* 5. Main Content Container */}
      <div className="relative z-10 container mx-auto px-6 py-24 max-w-5xl">
        
        {/* Page Title */}
        <h1 
          className="text-center mb-16 text-2xl md:text-4xl lg:text-5xl text-white drop-shadow-[0_4px_0_rgba(0,0,0,1)] leading-normal font-extrabold tracking-wider"
        >
          Code of Conduct<br />
          {/* Updated highlight color to Purple/Pink */}
          <span className="text-white drop-shadow-[0_0_10px_rgba(192,132,252,0.8)]">ELECTROTHON 8.0</span>
        </h1>

        {/* Updated Container to match Hacker Guide (Purple Tint) */}
        <div className="space-y-12 bg-[#1a0b2e]/60 p-6 md:p-12 rounded-3xl border border-purple-500/20 backdrop-blur-sm shadow-2xl shadow-purple-900/20">
          
          {/* Section: Commitment */}
          <section className="space-y-8">
            <p className="leading-loose text-xs md:text-sm text-gray-300">
              We, as members of the <strong className="text-white">Society for Promotion of Electronics Culture (SPEC) at NIT Hamirpur</strong>, solemnly affirm our commitment to fostering an environment that is respectful, inclusive, and secure. We embrace our duty to ensure that involvement in and association with our community is a harassment-free experience, grounded in dignity and mutual respect for all individuals.
            </p>
            <p className="leading-loose text-xs md:text-sm text-gray-400">
              We uphold this standard for everyone, regardless of age, expertise, educational background, colour, race, nationality, religious convictions, political views, ethnicity, visible or non-visible disabilities, gender identity and expression, or sexual orientation.
            </p>
          </section>

          {/* Section: The Covenant */}
          <section>
            <h2 className="text-lg md:text-2xl text-cyan-400 mb-8 text-center md:text-left">
              The Covenant
            </h2>
            <div className=" text-cyan 400grid gap-8  ">
              <PolicyItem title="Harassment Definition ">
                Harassment encompasses any offensive remarks or actions related to gender, identity, age, sexual orientation, disability, appearance, body size, race, ethnicity, nationality, or religious beliefs. This includes, but is not limited to, sexual imagery, threats, intimidation, stalking, photographing or recording individuals without consent, disruptive behaviour, inappropriate physical contact, and unwelcome attention.
              </PolicyItem>
              
              <PolicyItem title="Photography and Privacy">
                While photography is encouraged, participants must respect individual privacy and allow others the right to decline being photographed. It is deemed inappropriate to take photographs in areas where privacy is reasonably expected, such as bathrooms or sleeping quarters.
              </PolicyItem>

              <PolicyItem title="Compliance with Requests">
                Participants are expected to immediately cease any behaviour deemed as harassment when requested to do so. This policy is applicable to all activities, including any hacks developed during Electrothon.
              </PolicyItem>

              <PolicyItem title="Sponsor Responsibilities">
                Sponsors are required to adhere to this code of conduct, ensuring that no sexualized content is presented. Representatives of sponsors must refrain from wearing sexually suggestive attire or creating an environment that could be construed as such.
              </PolicyItem>

              <PolicyItem title="Reporting Concerns">
                In the event of harassment or any concerns, participants are urged to immediately contact Electrothon staff for assistance. The safety and well-being of all participants are our top priority.
              </PolicyItem>

              <PolicyItem title="Consequences">
                Organizers reserve the right to take corrective action against individuals found in violation of the harassment policy. This may include issuing warnings, expulsion from the event, or involving law enforcement authorities as necessary.
              </PolicyItem>
            </div>
          </section>

          {/* Section: Reporting Procedures */}
          <section className="border-t border-purple-500/20 pt-10">
            <h2 className="text-lg md:text-2xl text-red-400 mb-8 text-center md:text-left">
              Reporting Procedures
            </h2>
            <p className="mb-8 text-xs md:text-sm text-gray-300 leading-loose">
              If you witness or experience a potential violation of the code of conduct, report it immediately. All reporters have the right to remain anonymous. You can contact the following representatives:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <ContactCard name="Kritika Singh" phone="+91 78768 26882" email="23bec055@nith.ac.in" />
              <ContactCard name="Soham Juneja" phone="+91 70181 33694" email="23bcs110@nith.ac.in" />
            </div>

        <div className="mt-10 p-4 bg-white/5 rounded-lg border border-purple-500/20 text-xs md:text-sm text-center leading-loose flex flex-col md:block">
          General Email: <a href="mailto:community.spec@gmail.com" className="text-purple-400  break-all hover:text-purple-300 transition-colors ml-2">community.spec@gmail.com</a>
        </div>
          </section>

          {/* Footer Note */}
          <div className="text-[10px] md:text-xs text-center text-gray-500 pt-4 uppercase tracking-wider leading-relaxed">
            Electrothon reserves the right to revise, make exceptions to, or amend these policies.
          </div>

        </div>
      </div>
    </div>
    </>
  );
}

// --- Helper Components (Updated Colors) ---

// Helper Component for List Items
const PolicyItem = ({ title, children }) => (
  <div 
    // CHANGED: bg-white/5 -> bg-black
    // Added a purple border and shadow to make it pop against the black
    className="bg-black p-6 rounded-xl border border-purple-500/30 shadow-lg hover:border-purple-400 transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
  >
    <h3 
      // Using Cyan for the title because it looks great on Black
      className="text-cyan-400 mb-4 text-sm md:text-base leading-relaxed tracking-wide"
    >
      {title}
    </h3>
    <p className="text-xs md:text-sm text-gray-300 leading-loose opacity-90">
      {children}
    </p>
  </div>
);

const ContactCard = ({ name, phone, email }) => (
  // Updated hover effect to Purple theme
  <div className="bg-[#111] p-6 rounded-lg border border-gray-800 flex flex-col items-center text-center hover:bg-[#1a1a1a] hover:border-purple-500/30 transition-all group">
    <h4 className="text-white mb-3 text-sm md:text-base">
      {name}
    </h4>
    <p className="text-xs md:text-sm text-gray-400 mb-2 group-hover:text-white transition-colors">
      {phone}
    </p>
    {/* Updated Link color to Purple */}
    <a href={`mailto:${email}`} className="text-[10px] md:text-xs text-purple-400 hover:text-purple-300 break-all">
      {email}
    </a>
  </div>
);