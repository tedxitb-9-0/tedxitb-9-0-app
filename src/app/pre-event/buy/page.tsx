"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "~/server/better-auth/client";
import ColorfulBackground from "~/_components/ColorfulBackground";
import TicketPurchaseForm from "./_components/TicketPurchaseForm";

export default function BuyTicketPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  // Protect the route - redirect if not authenticated
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signin");
    }
  }, [session, isPending, router]);

  // Loading state
  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-navy/20 border-t-blue" />
          <p className="text-navy">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!session) {
    return null;
  }

  return (
    <ColorfulBackground showSmiles={false}>
      <div className="container relative z-30 mx-auto flex min-h-screen items-center justify-center px-4 py-24">
        <h1 className="sr-only">TEDxITB 9.0 Pre-Event Ticket Purchase</h1>
        <TicketPurchaseForm userEmail={session.user.email} />
      </div>
    </ColorfulBackground>
  );
}
