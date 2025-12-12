'use client';

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

export const FloatingDock = ({ items, desktopClassName, mobileClassName }) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

/* ---------------- mobile version ---------------- */

const FloatingDockMobile = ({ items, className }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                {/* mobile: the whole circular anchor stays the cursor target for mobile buttons */}
                <a
                  href={item.href}
                  className="cursor-target inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900"
                  aria-label={item.title}
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800"
        aria-label="Open navigation"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

/* ---------------- desktop ---------------- */

const FloatingDockDesktop = ({ items, className }) => {
  let mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-full w-[92%] items-center justify-between bg-transparent px-4 pb-0 md:flex",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

/* ---------------- zoom animation ---------------- */

function IconContainer({ mouseX, title, icon, href }) {
  let ref = useRef(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // outer pill width animation 
  let widthTransform = useTransform(distance, [-150, 0, 150], [100, 130, 90]);
  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  // Inner text scale 
  let scaleTransform = useTransform(distance, [-150, 0, 150], [1, 1.15, 1]);
  let scale = useSpring(scaleTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <a href={href} className="inline-block" aria-label={title}>
      {/* Outer motion.div still controls width and is measured by the ref */}
      <motion.div
        ref={ref}
        style={{ width }}
        className="group relative flex items-center justify-center rounded-full transition-all duration-200"
      >
        {/* Inner visual pill gets the cursor-target class so the cursor snaps to the visible pill
            without interfering with the outer width animation. */}
        <motion.div
          style={{ scale }}
          className="cursor-target flex px-5 py-2.5 rounded-full bg-[rgba(78,11,149,0.46)] border border-white/30 backdrop-blur-md text-white text-sm font-semibold"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}