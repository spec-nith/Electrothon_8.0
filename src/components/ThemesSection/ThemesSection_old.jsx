"use client";

import React from "react";
import { motion } from "framer-motion";

import Image from "next/image";
import { Press_Start_2P } from "next/font/google";

import { tabData } from "./data";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectFlip,
  EffectCoverflow,
  Navigation,
  Mousewheel,
  Pagination,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

// new
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { cn } from "@/lib/utils";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 1 } },
};

export default function ThemeSection() {
  const [flippedId, setFlippedId] = React.useState(null);
  const [focusedId, setFocusedId] = React.useState(null);
  const swiperRef = React.useRef(null);

  return (
    <section
      id="themes"
      className="relative py-28 w-screen min-h-[1000px] h-svh pt-[18vh] text-white bg-cover bg-center"

      style={{
        backgroundImage: 'url("/backgrounds/bg2.png")',
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Heading with animation */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className={`${pressStart.className} text-[40px] sm:text-[56px] md:text-[64px] text-center font-bold`}
          style={{
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          Themes
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, translateY: 30 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 w-full"
        >
          <Swiper
            spaceBetween={30}
            slidesPerView={"auto"}
            centeredSlides={true}
            grabCursor={true}
            loop={true}
            observer={true}
            observeParents={true}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1.2, // strength of the effect
              slideShadows: false,
            }}
            mousewheel={{
              forceToAxis: true,
              releaseOnEdges: false,
            }}
            modules={[EffectCoverflow, Navigation, Mousewheel]}
            className="w-full max-w-[1200px] mx-auto"
            onSlideChange={(swiper) =>
              setFocusedId(tabData[swiper.realIndex]?.id)
            }
          >
            {tabData.map((theme) => (
              <SwiperSlide
                key={theme.id}
                className="w-[320px] sm:w-[360px] md:w-[420px] lg:w-[480px] max-w-[390px]"
              >
                <div
                  className="relative h-[460px] w-full rounded-3xl overflow-hidden border border-white/10 bg-black cursor-pointer"
                  onMouseEnter={() =>
                    focusedId === theme.id && setFlippedId(theme.id)
                  }
                  onMouseLeave={() => setFlippedId(null)}
                >
                  <div
                    className="flip-card h-full w-full"
                    data-flipped={flippedId === theme.id}
                  >
                    <div
                      className={`flip-inner ${
                        flippedId === theme.id ? "is-flipped" : ""
                      }`}
                    >
                      {/* FRONT */}
                      <div className="flip-front">
                        <Image
                          src={theme.img1}
                          alt={theme.heading}
                          fill
                          className="object-cover opacity-70"
                        />
                      </div>

                      {/* BACK */}
                      <div className="flip-back flex items-center justify-center p-6 text-center bg-black text-white">
                        <p className="text-sm leading-relaxed">
                          {theme.content}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Only on front */}
                  {flippedId !== theme.id && (
                    <>
                      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                      <div className="absolute inset-0 flex flex-col justify-end p-5 pointer-events-none">
                        <h3 className="text-xl font-semibold">
                          {theme.heading}
                        </h3>
                      </div>
                    </>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}