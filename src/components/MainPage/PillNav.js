"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const PillNav = ({
    logo,
    logoAlt = "Logo",
    items,
    activeHref,
    className = "",
    ease = "power3.easeOut",
    baseColor = "#fff",
    pillColor = "#060010",
    hoveredPillTextColor = "#060010",
    pillTextColor,
    onMobileMenuClick,
    initialLoadAnimation = true,
}) => {
    const resolvedPillTextColor = pillTextColor ?? baseColor;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const circleRefs = useRef([]);
    const tlRefs = useRef([]);
    const activeTweenRefs = useRef([]);
    const logoImgRef = useRef(null);
    const logoTweenRef = useRef(null);
    const hamburgerRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const navItemsRef = useRef(null);
    const logoRef = useRef(null);

    useEffect(() => {
        const layout = () => {
            circleRefs.current.forEach((circle) => {
                if (!circle?.parentElement) return;

                const pill = circle.parentElement;
                const rect = pill.getBoundingClientRect();
                const { width: w, height: h } = rect;
                const R = ((w * w) / 4 + h * h) / (2 * h);
                const D = Math.ceil(2 * R) + 2;
                const delta =
                    Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
                const originY = D - delta;

                circle.style.width = `${D}px`;
                circle.style.height = `${D}px`;
                circle.style.bottom = `-${delta}px`;

                gsap.set(circle, {
                    xPercent: -50,
                    scale: 0,
                    transformOrigin: `50% ${originY}px`,
                });

                const label = pill.querySelector(".pill-label");
                const white = pill.querySelector(".pill-label-hover");

                if (label) gsap.set(label, { y: 0 });
                if (white) gsap.set(white, { y: h + 12, opacity: 0 });

                const index = circleRefs.current.indexOf(circle);
                if (index === -1) return;

                tlRefs.current[index]?.kill();
                const tl = gsap.timeline({ paused: true });

                tl.to(
                    circle,
                    { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" },
                    0
                );

                if (label) {
                    tl.to(
                        label,
                        { y: -(h + 8), duration: 2, ease, overwrite: "auto" },
                        0
                    );
                }

                if (white) {
                    gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
                    tl.to(
                        white,
                        { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" },
                        0
                    );
                }

                tlRefs.current[index] = tl;
            });
        };

        layout();

        const onResize = () => layout();
        window.addEventListener("resize", onResize);

        if (document.fonts?.ready) {
            document.fonts.ready.then(layout).catch(() => { });
        }

        const menu = mobileMenuRef.current;
        if (menu) {
            gsap.set(menu, { visibility: "hidden", opacity: 0, scaleY: 1, y: 0 });
        }

        if (initialLoadAnimation) {
            const logo = logoRef.current;
            const navItems = navItemsRef.current;

            if (logo) {
                gsap.set(logo, { scale: 0 });
                gsap.to(logo, { scale: 1, duration: 0.6, ease });
            }

            if (navItems) {
                gsap.set(navItems, { width: 0, overflow: "hidden" });
                gsap.to(navItems, { width: "auto", duration: 0.6, ease });
            }
        }

        return () => window.removeEventListener("resize", onResize);
    }, [items, ease, initialLoadAnimation]);

    const handleEnter = (i) => {
        const tl = tlRefs.current[i];
        if (!tl) return;
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
            duration: 0.3,
            ease,
            overwrite: "auto",
        });
    };

    const handleLeave = (i) => {
        const tl = tlRefs.current[i];
        if (!tl) return;
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(0, {
            duration: 0.2,
            ease,
            overwrite: "auto",
        });
    };

    const handleLogoEnter = () => {
        const img = logoImgRef.current;
        if (!img) return;
        logoTweenRef.current?.kill();
        gsap.set(img, { rotate: 0 });
        logoTweenRef.current = gsap.to(img, {
            rotate: 360,
            duration: 0.2,
            ease,
            overwrite: "auto",
        });
    };

    const toggleMobileMenu = () => {
        const newState = !isMobileMenuOpen;
        setIsMobileMenuOpen(newState);

        const hamburger = hamburgerRef.current;
        const menu = mobileMenuRef.current;

        if (hamburger) {
            const lines = hamburger.querySelectorAll(".hamburger-line");
            if (newState) {
                gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
                gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
            } else {
                gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
                gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
            }
        }

        if (menu) {
            if (newState) {
                gsap.set(menu, { visibility: "visible" });
                gsap.fromTo(
                    menu,
                    { opacity: 0, y: 10, scaleY: 1 },
                    {
                        opacity: 1,
                        y: 0,
                        scaleY: 1,
                        duration: 0.3,
                        ease,
                        transformOrigin: "top center",
                    }
                );
            } else {
                gsap.to(menu, {
                    opacity: 0,
                    y: 10,
                    scaleY: 1,
                    duration: 0.2,
                    ease,
                    transformOrigin: "top center",
                    onComplete: () => {
                        gsap.set(menu, { visibility: "hidden" });
                    },
                });
            }
        }

        onMobileMenuClick?.();
    };

    const isExternalLink = (href) =>
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("//") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#");

    const isRouterLink = (href) => href && !isExternalLink(href);

    const cssVars = {
        "--base": baseColor,
        "--pill-bg": pillColor,
        "--hover-text": hoveredPillTextColor,
        "--pill-text": resolvedPillTextColor,

        /* 👇 smaller on mobile, same on desktop */
        "--nav-h": "34px",
        "--logo": "36px",
        "--pill-pad-x": "18px",
        "--pill-gap": "3px",
    };

    return (
        <div
            className="
fixed top-[12px] sm:top-[16px] md:top-[24px] lg:top-[34px]
left-1/2 -translate-x-1/2 z-[1000] w-full max-w-[calc(100vw-24px)] md:w-auto
        [--nav-h:32px] sm:[--nav-h:36px] md:[--nav-h:42px]
        [--pill-pad-x:10px] sm:[--pill-pad-x:12px] md:[--pill-pad-x:14px] lg:[--pill-pad-x:18px]
      "
        >
            <nav
                className={`w-full md:w-max flex items-center justify-between md:justify-start box-border px-3 sm:px-4 md:px-0 ${className}`}
                aria-label="Primary"
                style={cssVars}
            >
                {isRouterLink(items?.[0]?.href) ? (
                    <Link
                        href={items[0].href}
                        aria-label="Home"
                        onMouseEnter={handleLogoEnter}
                        role="menuitem"
                        ref={logoRef}
                        className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden"
                        style={{
                            width: "var(--nav-h)",
                            height: "var(--nav-h)",
                            background: "var(--base, #000)",
                            visibility: "hidden",
                            pointerEvents: "none",
                        }}
                    >
                        <img
                            src={logo}
                            alt={logoAlt}
                            ref={logoImgRef}
                            className="w-full h-full object-cover block"
                        />
                    </Link>
                ) : (
                    <a
                        href={items?.[0]?.href || "#"}
                        aria-label="Home"
                        onMouseEnter={handleLogoEnter}
                        ref={logoRef}
                        className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden"
                        style={{
                            width: "var(--nav-h)",
                            height: "var(--nav-h)",
                            background: "var(--base, #000)",
                            visibility: "hidden",
                            pointerEvents: "none",
                        }}
                    >
                        <img
                            src={logo}
                            alt={logoAlt}
                            ref={logoImgRef}
                            className="w-full h-full object-cover block"
                        />
                    </a>
                )}

                <div
                    ref={navItemsRef}
                    className="relative items-center rounded-full hidden md:flex ml-2 backdrop-blur-md"
                    style={{
                        height: "var(--nav-h)",
                        background: "rgba(153, 92, 250, 0.25)", // translucent
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.15)",
                    }}
                >
                    <ul
                        role="menubar"
                        className="list-none flex items-stretch m-0 p-[3px] h-full"
                        style={{ gap: "var(--pill-gap)" }}
                    >
                        {items.map((item, i) => {
                            const isActive = activeHref === item.href;

                            const pillStyle = {
                                background: "var(--pill-bg)",
                                color: "var(--pill-text, var(--base, #000))",
                                paddingLeft: "var(--pill-pad-x)",
                                paddingRight: "var(--pill-pad-x)",
                                backdropFilter: "blur(5px)",
                                WebkitBackdropFilter: "blur(5px)",
                            };

                            const PillContent = (
                                <>
                                    <span
                                        className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                                        style={{
                                            background: "var(--base, #000)",
                                            willChange: "transform",
                                        }}
                                        aria-hidden="true"
                                        ref={(el) => {
                                            circleRefs.current[i] = el;
                                        }}
                                    />
                                    <span className="label-stack relative inline-block leading-[1] z-[2]">
                                        <span className="pill-label relative z-[2] inline-block leading-[1]">
                                            {item.label}
                                        </span>
                                        <span
                                            className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                                            style={{ color: "var(--hover-text, #fff)" }}
                                            aria-hidden="true"
                                        >
                                            {item.label}
                                        </span>
                                    </span>
                                    {/* {isActive && (
                                        <span
                                            className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full z-[4]"
                                            style={{ background: "var(--base, #000)" }}
                                            aria-hidden="true"
                                        />
                                    )} */}
                                </>
                            );

                            const basePillClasses =
                                "relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[12px] md:text-[13px] lg:text-[14px] leading-[0] uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer px-0";

                            return (
                                <li key={item.href} role="none" className="cursor-target flex h-full">
                                    {isRouterLink(item.href) ? (
                                        <Link
                                            role="menuitem"
                                            href={item.href}
                                            className={basePillClasses}
                                            style={pillStyle}
                                            aria-label={item.ariaLabel || item.label}
                                            onMouseEnter={() => handleEnter(i)}
                                            onMouseLeave={() => handleLeave(i)}
                                        >
                                            {PillContent}
                                        </Link>
                                    ) : (
                                        <a
                                            role="menuitem"
                                            href={item.href}
                                            className={basePillClasses}
                                            style={pillStyle}
                                            aria-label={item.ariaLabel || item.label}
                                            onMouseEnter={() => handleEnter(i)}
                                            onMouseLeave={() => handleLeave(i)}
                                        >
                                            {PillContent}
                                        </a>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <button
                    ref={hamburgerRef}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                    aria-expanded={isMobileMenuOpen}
                    className="
md:hidden rounded-full border-0
flex flex-col items-center justify-center gap-0.5
cursor-pointer p-0 relative
backdrop-blur-md transition-all duration-200
  "
                    style={{
                        width: "var(--nav-h)",
                        height: "var(--nav-h)",
                        background: "rgba(153, 92, 250, 0.35)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                >
                    <span
                        className="hamburger-line w-3.5 h-0.5 rounded transition-all duration-300"
                        style={{ background: "#ffffff" }}
                    />
                    <span
                        className="hamburger-line w-3.5 h-0.5 rounded transition-all duration-300"
                        style={{ background: "#ffffff" }}
                    />
                </button>
            </nav>

            <div
                ref={mobileMenuRef}
                className="md:hidden absolute top-[calc(var(--nav-h)+8px)] left-3 right-3 sm:left-4 sm:right-4 rounded-2xl shadow-lg z-[998] origin-top backdrop-blur-md"
                style={{
                    ...cssVars,
                    background: "rgba(153, 92, 250, 0.35)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                }}
            >
                <ul className="list-none m-0 p-2 flex flex-col gap-1">
                    {items.map((item) => {
                        const defaultStyle = {
                            background: "rgba(75, 29, 125, 0.8)",
                            color: "#ffffff",
                            transition: "all 0.2s ease",
                        };

                        return (
                            <li key={item.href}>
                                {isRouterLink(item.href) ? (
                                    <Link
                                        href={item.href}
                                        className="block py-2.5 px-4 text-xs sm:text-sm font-medium rounded-xl hover:bg-opacity-100 transition-all duration-200"
                                        style={defaultStyle}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <a
                                        href={item.href}
                                        className="block py-2.5 px-4 text-xs sm:text-sm font-medium rounded-xl hover:bg-opacity-100 transition-all duration-200"
                                        style={defaultStyle}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </a>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default PillNav;