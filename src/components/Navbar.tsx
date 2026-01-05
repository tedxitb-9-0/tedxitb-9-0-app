"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "motion/react"
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/pre-event", label: "Pre-Event" },
  { href: "/main-event", label: "Main Event" },
  { href: "/merchandise", label: "Merchandise" },
  { href: "/magazine", label: "Magazine" },
  { href: "/sponsorship", label: "Sponsorship" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 w-full h-16 select-none flex justify-between items-center px-6 md:px-12 bg-white backdrop-blur-sm"
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div 
          className="hidden lg:flex gap-8 items-center text-foreground"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {navLinks.map((link) => (
            <motion.div
              key={link.href}
              variants={itemVariants}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
            >
              <Link href={link.href}>{link.label}</Link>
            </motion.div>
          ))}

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
            whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
          >
            <Link href="/login" className="px-4 py-1.5 bg-red text-white rounded-md shadow-xl">
              Sign in
            </Link>
          </motion.div>
        </motion.div>

        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile View */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col h-full pt-20 px-6">
                <button
                  className="absolute top-4 right-4 p-2 text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>

                <motion.nav 
                  className="flex flex-col gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.href}
                      variants={itemVariants}
                    >
                      <Link
                        href={link.href}
                        className="block py-2 text-lg text-foreground hover:text-red transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div variants={itemVariants}>
                    <Link
                      href="/login"
                      className="block w-full text-center px-4 py-2 bg-red text-white rounded-md shadow-xl"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                  </motion.div>
                </motion.nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}


export default Navbar;
