"use client";

import Image from "next/image";
import "./Timeline/timeline.css";
import styles from "./Sponsors.module.css";
import TargetCursor from "./TargetCursor";

// ─── LOGOS ───────────────────────────────────────────
import devfolioLogo from "@/assets/images/Devfolio_Logo-White.png";
import ethLogo from "@/assets/images/ethindia-light.png";
import balsamiqLogo from "@/assets/images/balsamiq.png";
import insforgeLogo from "@/assets/images/insforge.svg";
import interviewcakeLogo from "@/assets/images/interviewcake.png";
import xyzLogo from "@/assets/images/xyz-logo-white.png";
import codeCraftersLogo from "@/assets/images/CodeCraftersLogo.png";
import nullshot_logo from "@/assets/images/nullshot_logo.png";
import neosapien_logo from "@/assets/images/neosapien_logo.png";
import mastra_logo from "@/assets/images/mastra_logo.png";
import iqai_logo from "@/assets/images/iqai_logo.png";
import eventopia_logo from "@/assets/images/eventopia_logo.png";
import n8n_logo from "@/assets/images/n8n_logo.svg";
import Stockedge_logo from "@/assets/images/Stockedge.webp";

// ─── TIERS (LOCKED) ──────────────────────────────────

// 🥇 ARCANCELLAR
const GOLD = [
  {
    name: "IQAI",
    logo: iqai_logo,
    url: "https://iqai.com/",
    alt: "IQAI Logo",
    scale: 1.6,
  },
];

// 🥈 COINSEER
const SILVER = [
  {
    name: "Devfolio",
    logo: devfolioLogo,
    url: "https://devfolio.co",
    alt: "Devfolio Logo",
    scale: 1.2,
  },
  {
    name: "ETH India",
    logo: ethLogo,
    url: "https://ethindia.co",
    alt: "ETH India Logo",
    scale: 1.2,
  },
];

// 🥉 WARDENIX
const BRONZE = [
  {
    name: "InsForge",
    logo: insforgeLogo,
    url: "https://insforge.dev",
    alt: "InsForge Logo",
    scale: 1.05,
  },
  {
    name: "Nullshot",
    logo: nullshot_logo,
    url: "https://nullshot.ai",
    alt: "Nullshot Logo",
    scale: 1.05,
  },
];

// 🧰 IN-KIND (Tier 4)
const INKIND = [
  {
    name: "Balsamiq",
    logo: balsamiqLogo,
    url: "https://balsamiq.com",
    alt: "Balsamiq Logo",
    scale: 1.1,
    invert: true,
  },
  {
    name: "Interview Cake",
    logo: interviewcakeLogo,
    url: "https://interviewcake.com",
    alt: "Interview Cake Logo",
    scale: 1.2,
  },
  {
    name: ".XYZ",
    logo: xyzLogo,
    url: "https://gen.xyz/",
    alt: ".xyz Logo",
    scale: 1.2,
  },
  {
    name: "Codecrafters",
    logo: codeCraftersLogo,
    url: "https://codecrafters.io/",
    alt: "Codecrafters Logo",
    scale: 1.2,
  },
  {
    name: "NeoSapien",
    logo: neosapien_logo,
    url: "https://neosapien.xyz/",
    alt: "NeoSapien Logo",
    scale: 1.6,
  },
  {
    name: "Mastra",
    logo: mastra_logo,
    url: "https://mastra.ai/",
    alt: "Mastra Logo",
    scale: 3.5,
  },
  {
    name: "n8n",
    logo: n8n_logo,
    url: "https://n8n.io/",
    alt: "n8n Logo",
    scale: 1.2,
  },
  {
    name: "StockEdge",
    logo: Stockedge_logo,
    url: "https://stockedge.com/",
    alt: "Stockedge Logo",
    scale: 1.5,
  },
];

// 📢 MEDIA PARTNERS
const MEDIA = [
  {
    name: "Eventopia",
    logo: eventopia_logo,
    url: "https://eventopia.in/",
    alt: "Eventopia Logo",
    scale: 1.2,
  },
];

// ─── GRID COMPONENT ──────────────────────────────────
function SponsorGrid({ list }) {
  return (
    <div className={styles.sponsorGrid}>
      {list.map((s, i) => (
        <a
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`cursor-target holo-card ${styles.tile}`}
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className={styles.tileLogo}>
            <Image
              src={s.logo}
              alt={s.alt}
              width={300}
              height={150}
              className={styles.tileImage}
              style={{
                transform: `scale(${s.scale || 1})`,
                filter: s.invert ? "brightness(0) invert(1)" : "none",
              }}
            />
          </div>
        </a>
      ))}
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────
export default function Sponsors() {
  return (
    <div id="sponsors" className="timeline-container">
      <TargetCursor targetSelector=".cursor-target" />

      {/* HEADER */}
      <div
        className="header-section flex flex-col items-center justify-center"
        style={{ position: "relative", paddingTop: 90 }}
      >
        <h1 className="modern-title text-center">OUR SPONSORS</h1>
      </div>

      <div className="game-layout" style={{ padding: "3rem 1rem 4rem" }}>
        {/* ARCANCELLAR */}
        <div className={styles.tierLabel}>ARCANCELLAR SPONSORS</div>
        <SponsorGrid list={GOLD} />

        {/* COINSEER */}
        <div className={styles.tierLabel}>COINSEER SPONSORS</div>
        <SponsorGrid list={SILVER} />

        {/* WARDENIX */}
        <div className={styles.tierLabel}>WARDENIX SPONSORS</div>
        <SponsorGrid list={BRONZE} />

        {/* IN-KIND */}
        <div className={`${styles.tierLabel}`}>
          IN-KIND SPONSORS
        </div>
        <SponsorGrid list={INKIND} />

        {/* MEDIA PARTNERS */}
        <div className={styles.tierLabel}>MEDIA PARTNERS</div>

        <div className={styles.mediaGrid}>
          {MEDIA.map((s, i) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`cursor-target holo-card ${styles.tile} ${styles.mediaTile}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={styles.tileLogo}>
                <Image
                  src={s.logo}
                  alt={s.alt}
                  width={300}
                  height={150}
                  className={styles.tileImage}
                  style={{ transform: `scale(${s.scale || 1})` }}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
