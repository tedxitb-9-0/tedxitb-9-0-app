"use client";

import Image from "next/image";
import Link from "next/link";
import { delay, motion, useMotionValueEvent, useScroll } from "motion/react"
import { useState } from "react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/pre-event", label: "Pre-Event" },
  { href: "/main-event", label: "Main Event" },
  { href: "/merchandise", label: "Merchandise" },
  { href: "/magazine", label: "Magazine" },
  { href: "/sponsorship", label: "Sponsorship" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 w-full h-16 flex justify-between items-center px-12 bg-white backdrop-blur-sm"
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.div
        variants={{
          visible: { x: 0, opacity: 1 },
          hidden: { x: -50, opacity: 0 },
        }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
      >
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        </Link>
      </motion.div>

      <div className="flex gap-8 items-center text-foreground">
          {navLinks.map((link) => (
            <motion.div
              key={link.href}
              whileHover={{ x: 0, y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link href={link.href}>{link.label}</Link>
            </motion.div>
          ))}

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link href="/login" className="px-4 py-1.5 bg-red text-white rounded-md shadow-xl">
              Sign in
            </Link>
          </motion.div>
      </div>
    </motion.nav>
  )
}

