"use client";

import { motion } from "motion/react";
import { signOut } from "~/server/better-auth/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DashboardClientProps {
  userName: string;
  userEmail: string;
  isAdmin: boolean;
  children: React.ReactNode;
}

export default function DashboardClient({
  userName,
  userEmail,
  isAdmin,
  children,
}: DashboardClientProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 rounded-xl bg-white p-6 shadow-lg"
      >
        <div className="flex flex-col items-center justify-between gap-2 text-center text-base md:flex-row md:text-left">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-navy md:text-3xl">
                Welcome back, {userName}!
              </h2>
              <p className="text-lg text-navy/70">{userEmail}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            {isAdmin && (
              <Link
                href="/admin"
                className="rounded-lg bg-blue px-3 py-2 text-center text-white transition-colors hover:bg-blue/90 md:px-6"
              >
                Go to Admin Panel
              </Link>
            )}
            <button
              onClick={handleSignOut}
              className="rounded-lg bg-red px-3 py-2 text-white transition-colors hover:cursor-pointer hover:bg-red/90 md:px-6 md:py-2"
            >
              Sign Out
            </button>
          </div>
        </div>
      </motion.div>

      {/* Orders Section */}
      {children}
    </>
  );
}
