"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  AnimatePresence,
} from "motion/react";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useAuthStore } from "~/stores";
import { useCartStore } from "~/stores/cartStore";
import { toast } from "sonner";
import { CartDrawer } from "./CartDrawer";

const truncateWithEllipsis = (text: string, maxLength = 10): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "…";
};

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
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const { items, setDrawerOpen } = useCartStore();

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
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
        className="fixed top-0 right-0 left-0 z-50 flex h-16 w-full items-center justify-between bg-white px-6 backdrop-blur-sm select-none md:px-12"
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
            <Image
              src="/tedx.png"
              alt="Logo"
              width={220}
              height={220}
              className="h-auto w-10"
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          className="text-foreground hidden items-center gap-8 lg:flex"
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

          {isAuthenticated && user?.role === "admin" && (
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
            >
              <Link href="/admin">Admin</Link>
            </motion.div>
          )}

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
            whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
          >
            {isLoading ? (
              <span className="px-4 py-1.5 text-gray-400">Loading...</span>
            ) : isAuthenticated && user ? (
              <Link
                href="/dashboard"
                className="bg-red inline-block max-w-30 truncate rounded-md px-4 py-1.5 text-white shadow-xl"
              >
                {truncateWithEllipsis(user.name.split(" ")[0] ?? "")}
              </Link>
            ) : (
              <Link
                href="/signin"
                className="bg-red rounded-md px-4 py-1.5 text-white shadow-xl"
              >
                Sign in
              </Link>
            )}
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDrawerOpen(true)}
            className="text-foreground relative p-2 hover:cursor-pointer"
            aria-label="Open cart"
          >
            <ShoppingBag size={24} className="hover:cursor-pointer" />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white">
                {cartItemsCount}
              </span>
            )}
          </motion.button>
        </motion.div>

        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={() => setDrawerOpen(true)}
            className="text-foreground relative p-2"
            aria-label="Open cart"
          >
            <ShoppingBag size={24} />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white">
                {cartItemsCount}
              </span>
            )}
          </button>

          <button
            className="text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile View */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex h-full flex-col px-6 pt-20">
                <button
                  className="text-foreground absolute top-4 right-4 p-2"
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
                    <motion.div key={link.href} variants={itemVariants}>
                      <Link
                        href={link.href}
                        className="text-foreground hover:text-red block py-2 text-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}

                  {isAuthenticated && user?.role === "admin" && (
                    <motion.div variants={itemVariants}>
                      <Link
                        href="/admin"
                        className="text-foreground hover:text-red block py-2 text-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Admin
                      </Link>
                    </motion.div>
                  )}

                  <motion.div variants={itemVariants}>
                    {isLoading ? (
                      <span className="block w-full px-4 py-2 text-center text-gray-400">
                        Loading...
                      </span>
                    ) : isAuthenticated && user ? (
                      <Link
                        href="/dashboard"
                        className="bg-red block w-full truncate rounded-md px-4 py-2 text-center text-white shadow-xl"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {truncateWithEllipsis(user.name.split(" ")[0] ?? "")}
                      </Link>
                    ) : (
                      <Link
                        href="/signin"
                        className="bg-red block w-full rounded-md px-4 py-2 text-center text-white shadow-xl"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign in
                      </Link>
                    )}
                  </motion.div>
                </motion.nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer />    </>
  );
};

export default Navbar;
