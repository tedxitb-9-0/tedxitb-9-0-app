"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "~/server/better-auth/client";
import { toast } from "sonner";
import MerchandiseGrid from "./_components/MerchandiseGrid";

const MerchandisePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please sign in to access the merchandise store.");
      router.push("/signin");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="border-navy/20 border-t-blue mb-4 h-12 w-12 animate-spin rounded-full border-4" />
          <p className="text-navy">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }
  return (
    <main>
      <h1 className="sr-only">TEDxITB 9.0 Merchandise</h1>
      <MerchandiseGrid />
    </main>
  );
};

export default MerchandisePage;

