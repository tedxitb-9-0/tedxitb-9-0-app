"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "~/server/better-auth/client";
import ColorfulBackground from "~/_components/ColorfulBackground";
import TicketPurchaseForm from "~/app/pre-event/buy/_components/TicketPurchaseForm";
import { toast } from "sonner";

export default function MainEventBuyPage() {
  const router = useRouter();
  const { data: session, isPending: sessionPending } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!sessionPending && !session) {
      toast.error("Please sign in to purchase tickets.");
      router.push("/signin");
    }
  }, [session, sessionPending, router]);

  if (sessionPending || !mounted) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="border-navy/20 border-t-pink-600 mb-4 h-12 w-12 animate-spin rounded-full border-4" />
          <p className="text-navy">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <ColorfulBackground showSmiles={false}>
      <div className="relative z-30 container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24">
        <h1 className="sr-only">TEDxITB 9.0 Main event ticket purchase</h1>
        <TicketPurchaseForm
          variant="main-event"
          userEmail={session.user.email}
        />
      </div>
    </ColorfulBackground>
  );
}
