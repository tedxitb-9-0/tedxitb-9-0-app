"use client";

import { useSession, signOut } from "~/server/better-auth/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "motion/react";
import { api } from "~/trpc/react";
import PlainBackground from "~/_components/PlainBackground";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  // Fetch user data with tRPC
  const { data: profile } = api.user.getProfileById.useQuery(undefined, {
    enabled: !!session,
  });

  // Protect the route - redirect if not authenticated
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signin");
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  // Loading state
  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-red-600"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - will redirect via useEffect
  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen">
      <PlainBackground color="blue">
        <div className="z-40 container mx-auto h-screen max-w-7xl px-4 py-8 py-24">
          <h1 className="sr-only">TEDxITB 9.0 Dashboard</h1>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 rounded-xl bg-white p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Welcome back, {session.user.name}!
                  </h2>
                  <p className="text-gray-600">{session.user.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="rounded-lg bg-red-600 px-6 py-2 text-white transition-colors hover:cursor-pointer hover:bg-red-700"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 rounded-xl bg-white p-6 shadow-lg"
          >
            <h3 className="mb-4 text-2xl font-bold text-gray-800">
              Account Details
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-600">
                  User ID
                </label>
                <p className="rounded-lg bg-gray-50 p-3 font-mono text-sm text-gray-800">
                  {session.user.id}
                </p>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-600">
                  Email
                </label>
                <p className="rounded-lg bg-gray-50 p-3 text-sm text-gray-800">
                  {session.user.email}
                </p>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-600">
                  Account Created
                </label>
                <p className="rounded-lg bg-gray-50 p-3 text-sm text-gray-800">
                  {profile?.createdAt
                    ? new Date(profile.createdAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-600">
                  Last Updated
                </label>
                <p className="rounded-lg bg-gray-50 p-3 text-sm text-gray-800">
                  {profile?.updatedAt
                    ? new Date(profile.updatedAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </PlainBackground>
    </main>
  );
}
