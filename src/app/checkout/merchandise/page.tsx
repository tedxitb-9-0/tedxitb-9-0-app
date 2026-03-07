"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "~/server/better-auth/client";
import ColorfulBackground from "~/_components/ColorfulBackground";
import MerchandiseCheckoutForm from "./_components/MerchandiseCheckoutForm";
import { toast } from "sonner";
import { useCartStore } from "~/stores/cartStore";

export default function MerchandiseCheckoutPage() {
  const router = useRouter();
  const { data: session, isPending: sessionPending } = useSession();
  const { items } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Protect the route - redirect if not authenticated
  useEffect(() => {
    if (!sessionPending && !session) {
      toast.error("Please sign in to checkout.");
      router.push("/signin");
    } else if (mounted && items.length === 0) {
      toast.error("Your cart is empty!");
      router.push("/merchandise");
    }
  }, [session, sessionPending, router, items.length, mounted]);

  // Loading state
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

  // Not authenticated or empty cart
  if (!session || items.length === 0) {
    return null;
  }

  return (
    <ColorfulBackground showSmiles={false}>
      <div className="relative z-30 container mx-auto flex min-h-screen items-center justify-center px-4 py-24">
        <h1 className="sr-only">TEDxITB 9.0 Merchandise Checkout</h1>
        <MerchandiseCheckoutForm userEmail={session.user.email} />
      </div>
    </ColorfulBackground>
  );
}
