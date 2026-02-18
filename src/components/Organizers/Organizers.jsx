"use client";
import styles from "./Organizers.module.css";
import { useState } from "react";
import Card from "./Card";

export default function Organizers() {
  const [hoveredSlider, setHoveredSlider] = useState(null);
  const [slider2Active, setSlider2Active] = useState(null);
  const [slider1Active, setSlider1Active] = useState(null);

  // Explicit source arrays for each logical slider (no overlap)
  // Sorted alphabetically by name (case-insensitive)
  const sliderAImages = [
    "organizer3.webp","organizer4.webp","organizer6.webp",
    "organizer5.webp","organizer7.webp","organizer8.webp",
    "organizer9.webp","organizer10.webp","organizer11.webp",
    "organizer12.webp","organizer13.webp","organizer14.webp",
    "organizer2.webp","organizer15.webp","organizer16.webp",
    "organizer17.webp","organizer18.webp","organizer19.webp",
    "organizer21.webp","organizer23.webp","organizer24.webp",
  ];

  const sliderANames = [
    "Aman Mishra",
    "Arpit Singh",
    "Ashish Rajpal",
    "Ashish Singh",
    "Avinash",
    "Devesh Jangid",
    "Hardik Manchandha",
    "Harsh Aryan",
    "Ishita Khanduja",
    "Jashnika Sankhua",
    "Kanika Thakur",
    "Prajualit Tickoo",
    "Prince",
    "Raghav Jatic",
    "Riya Singh",
    "Shanpreet Singh",
    "Shivansh Bhatnagar",
    "Shreshth Sharma",
    "Sona",
    "Vaibhav Sharma",
    "Vyom Sharma"
  ];

  const sliderA = sliderAImages.map((img, idx) => ({
    image: `/assets/images/organizers/${img}`,
    name: sliderANames[idx]
  }));

  // Slider 2: exactly 27 organizers (25..51), all present, sorted alphabetically by name, correct extensions
  const sliderBData = [
    { name: "Abhinav Mishra", image: "organizer37.webp" },
    { name: "Adarsh Singh", image: "organizer25.webp" },
    { name: "Aditya Kumar", image: "organizer36.webp" },
    { name: "Archita Agarwal", image: "organizer26.webp" },
    { name: "Arpit Tyagi", image: "organizer27.webp" },
    { name: "Arya Thakur", image: "organizer28.webp" },
    { name: "Avaneesh", image: "organizer29.webp" },
    { name: "Gauri Sharma", image: "organizer30.webp" },
    { name: "Harsh Verma", image: "organizer31.webp" },
    { name: "Kaustav Rana", image: "organizer32.webp" },
    { name: "Manan Gupta", image: "organizer38.webp" },
    { name: "Mayank Koundal", image: "organizer33.webp" },
    { name: "Medha Sharma", image: "organizer34.webp" },
    { name: "Nishita", image: "organizer35.webp" },
    { name: "Peeyush Gautam", image: "organizer39.webp" },
    { name: "Prakul Chandra", image: "organizer40.webp" },
    { name: "Pratham Lodha", image: "organizer41.webp" },
    { name: "Rijul Rangta", image: "organizer42.webp" },
    { name: "Ronak Dotasara", image: "organizer43.webp" },
    { name: "Shreya Dhawan", image: "organizer44.webp" },
    { name: "Vaishali Bhatt", image: "organizer45.webp" },
    { name: "Vaishnavi Sharma", image: "organizer46.webp" },
    { name: "Vanni Chauhan", image: "organizer47.webp" },
    { name: "Vanya Sharma", image: "organizer48.webp" },
    { name: "Vidhi", image: "organizer49.webp" },
    { name: "Vyom Pant", image: "organizer50.webp" },
    { name: "Yash Verma", image: "organizer51.webp" }
  ];
  const sliderB = sliderBData.map(d => ({
    name: d.name,
    image: `/assets/images/organizers/${d.image}`
  }));
  // Duplicate for seamless looping (like Slider 1)
  const dupB = [...sliderB, ...sliderB];

  // Duplicate arrays to enable seamless CSS looping while keeping logical data sets distinct
  const dupA = [...sliderA, ...sliderA];

  // Lead organizers data (replace with real names/images as needed)
  const leadOrganizers = [
    {
      name: "Kritika Singh",
      role: "Lead Organizer",
      image: "assets/images/organizers/organizer1.webp"
    },
    {
      name: "Soham Juneja",
      role: "Lead Organizer",
      image: "/assets/images/organizers/organizer20.webp"
    },
    {
      name: "Tejasv Singh Hada",
      role: "Lead Organizer",
      image: "/assets/images/organizers/organizer22.webp"
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Lead Organizers Section */}
        <h1 className="text-white text-center mb-8 mt-2 text-4xl" style={{ fontFamily: '"Press Start 2P", cursive', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          LEAD ORGANIZERS
        </h1>
        <div className={styles.leadGrid}>
          {leadOrganizers.map((org, i) => (
            <div className={styles.leadCard} key={i}>
              <Card name={org.name} role={org.role} image={org.image} leadCard />
            </div>
          ))}
        </div>
        <div className={styles.leadSpacer} />

        {/* Main Organizers Section */}
        <h1 className="text-white text-center mb-10 text-4xl" style={{ fontFamily: '"Press Start 2P", cursive' }}>
          ORGANIZERS
        </h1>

        {/* SLIDER 1 */}
        <div className={styles.slider} onMouseEnter={() => setHoveredSlider("a")} onMouseLeave={() => setHoveredSlider(null)}>
          <div className={`${styles.track} ${styles.animateLeft} ${slider1Active !== null ? styles.trackActive : ''}`} style={{ animationPlayState: hoveredSlider === "a" ? "paused" : "running" }}>
            {dupA.map((card, i) => {
              const idx = i % sliderA.length;
              const isActive = slider1Active === idx;
              return (
                <div
                  key={`a-${i}`}
                  className={`${styles.slide} cursor-target ${isActive ? styles.activeSlide : ''}`}
                  onMouseEnter={() => setSlider1Active(idx)}
                  onMouseLeave={() => setSlider1Active(null)}
                >
                  <Card hoverEffect name={card.name} role="Organizer" image={card.image} />
                </div>
              );
            })}
          </div>
        </div>

        {/* SLIDER 2 (now matches slider 1 for hover/active logic) */}
        <div className={styles.slider} onMouseEnter={() => setHoveredSlider("b")} onMouseLeave={() => setHoveredSlider(null)}>
          <div className={`${styles.track} ${styles.animateRight} ${slider2Active !== null ? styles.trackActive : ''}`} style={{ animationPlayState: hoveredSlider === "b" ? "paused" : "running" }}>
            {dupB.map((card, i) => {
              const idx = i % sliderB.length;
              const isActive = slider2Active === idx;
              return (
                <div
                  key={`b-${i}`}
                  className={`${styles.slide} cursor-target ${isActive ? styles.activeSlide : ''}`}
                  onMouseEnter={() => setSlider2Active(idx)}
                  onMouseLeave={() => setSlider2Active(null)}
                >
                  <Card hoverEffect name={card.name} role="Organizer" image={card.image} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}