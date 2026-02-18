"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import specLogo from '@/assets/images/spec-logo.png'; 
import TargetCursor from "@/components/TargetCursor";
import { Press_Start_2P } from 'next/font/google';
// 1. IMPORT THE GRID IMAGE FROM ASSETS
import gridBg from '@/assets/images/gridbg.webp';

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function VenueGuide() {
  return (
    <>
      <TargetCursor targetSelector=".cursor-target" />
      <div 
        className={`relative min-h-screen w-full overflow-x-hidden bg-[#0f0720] text-gray-200 ${pressStart2P.className}`}
      >
        
        {/* ================= BACKGROUND ================= */}
        <div className="fixed inset-0 z-0">
          <Image
            src={gridBg}
            alt="Purple Grid Background"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-[#0f0720]/70 to-[#0f0720]" />
        </div>
        {/* ============================================== */}

        {/* Top Left Logo */}
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

        {/* Main Content Container */}
        <div className="relative z-10 container mx-auto px-6 py-24 max-w-5xl">
          
          {/* Page Title */}
          <h1 
            className="text-center mb-16 text-2xl md:text-4xl lg:text-5xl text-white drop-shadow-[0_4px_0_rgba(0,0,0,1)] leading-normal"
          >
            Venue Guide to<br />
            <span className="text-white drop-shadow-[0_0_10px_rgba(192,132,252,0.8)]">ELECTROTHON 8.0</span>
          </h1>

          {/* Content Card */}
          <div className="space-y-12 bg-[#1a0b2e]/60 p-6 md:p-12 rounded-3xl border border-purple-500/20 backdrop-blur-sm shadow-2xl shadow-purple-900/20">
            
            {/* Intro Section */}
            <section className="space-y-6 text-center">
              <p className="leading-loose text-xs md:text-sm text-gray-300">
                Amidst your planning of what to pack to the hackathon, another task of researching about how to reach the venue seems tiresome. 
              </p>
              <p className="leading-loose text-xs md:text-sm text-gray-300">
                Well, we have prepared this guide to help you reach the venue. We are excited to host you at <strong className="text-white">NIT, Hamirpur</strong> from <span className="text-purple-300">13th to 15th March, 2026</span>.
              </p>
            </section>

            {/* LIVE MAP SECTION */}
            <section>
               <h2 className="text-base md:text-xl text-[#fbbf24] mb-8 text-center md:text-left">
                🗺️ Google Map for the venue:
              </h2>
              
              <div className="flex flex-col items-center">
                {/* Live Iframe Container */}
                <div className="w-full h-[300px] md:h-[450px] rounded-xl overflow-hidden border-2 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)] bg-gray-900 relative z-0">
                  <iframe 
                    src="https://maps.google.com/maps?q=National+Institute+of+Technology,+Hamirpur&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="NIT Hamirpur Map"
                    className="filter grayscale-[20%] contrast-125 hover:grayscale-0 transition-all duration-500"
                  ></iframe>
                </div>

                <div className="mt-4 flex gap-2 justify-center md:justify-start w-full">
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=National+Institute+of+Technology+Hamirpur&query_place_id=ChIJocQSfkjVBDkR0KcCotOSXzk"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-purple-400 hover:text-purple-300 underline"
                  >
                    View larger map on Google Maps app ↗
                  </a>
                </div>
              </div>
            </section>

            {/* Transport Options Section */}
            <section className="border-t border-purple-500/20 pt-10">
              <h2 className="text-base md:text-xl text-green-400 mb-8 text-center md:text-left">
                👣 How to reach the venue?
              </h2>
              <p className="text-xs md:text-sm text-gray-300 mb-8 text-center md:text-left">
                There are multiple options that you can have in mind for reaching the venue, some of them are listed below:
              </p>
              
              <div className="grid gap-6">
                
                <TransportItem icon="✈" title="By Air">
                  <span className="text-purple-300">Nearest Airport:</span> Dharamshala (Gaggal Airport) around <strong>80 Km</strong> and Chandigarh International Airport around <strong>200Km</strong>.
                </TransportItem>

                <TransportItem icon="🚂" title="By Train">
                  Una Himachal, around <strong>80 Km</strong> and Chandigarh Railway Station around <strong>200 km</strong>.
                </TransportItem>

                <TransportItem icon="🚌" title="By Bus">
                  <ul className="list-disc ml-4 space-y-4">
                    <li>
                      Buses of <span className="text-purple-300">Himachal Road Transportation Corporation (HRTC)</span> Volvo, Deluxe and Ordinary (Delhi - Hamirpur) buses run from ISBT Kashmiri Gate and takes around <strong>10 hours</strong> of journey.
                    </li>
                    <li>
                      Buses from <span className="text-purple-300">Chandigarh ISBT Sec 43</span> (Chandigarh-Hamirpur) Deluxe and Ordinary takes around <strong>4 to 5 hours</strong>.
                    </li>
                  </ul>
                </TransportItem>

              </div>
            </section>

             {/* Footer Note */}
            <div className="mt-8 p-6 bg-white/5 rounded-lg border border-purple-500/20 text-center">
               <p className="text-xs md:text-sm text-gray-300 mb-2">Need more help?</p>
               <Link href="/hackersguide" className="text-[#fbbf24] hover:text-yellow-300 text-xs md:text-sm underline decoration-dashed underline-offset-4">
                 Back to Hacker's Guide
               </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

// --- Helper Components (No Types) ---

const TransportItem = ({ icon, title, children }) => (
  <div className="bg-black p-6 rounded-xl border border-purple-500/30 shadow-lg hover:border-purple-400 transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]">
    <div className="flex items-center gap-4 mb-4 border-b border-gray-800 pb-3">
      <span className="text-2xl md:text-3xl">{icon}</span>
      <h3 className="text-sm md:text-base text-purple-400 uppercase tracking-widest drop-shadow-[0_2px_0_rgba(0,0,0,1)]">{title}</h3>
    </div>
    <div className="text-xs md:text-sm text-gray-300 leading-loose">
      {children}
    </div>
  </div>
);