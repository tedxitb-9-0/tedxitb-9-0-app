"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "~/server/better-auth/client";
import ColorfulBackground from "~/_components/ColorfulBackground";
import TicketPurchaseForm from "./_components/TicketPurchaseForm";
import { toast } from "sonner";
import { api } from "~/trpc/react";

export default function BuyTicketPage() {
    const router = useRouter();
    const { data: session, isPending: sessionPending } = useSession();

    const { data: ticketCheck, isPending: ticketPending } =
        api.order.hasPreEventTicket.useQuery(undefined, {
            enabled: !!session,
        });

    const isPending = sessionPending || (!!session && ticketPending);

    // Protect the route - redirect if not authenticated or already has a ticket
    useEffect(() => {
        if (!sessionPending && !session) {
            router.push("/signin");
        } else if (ticketCheck?.hasTicket) {
            toast.error("You already have a pre-event ticket!");
            router.push("/dashboard");
        }
    }, [session, sessionPending, ticketCheck, router]);

    // Loading state
    if (isPending) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="border-navy/20 border-t-blue mb-4 h-12 w-12 animate-spin rounded-full border-4" />
                    <p className="text-navy">Loading...</p>
                </div>
            </div>
        );
    }

    // Not authenticated or already has a ticket
    if (!session || ticketCheck?.hasTicket) {
        return null;
    }

    return (
        <ColorfulBackground showSmiles={false}>
            <div className="relative z-30 container mx-auto flex min-h-screen items-center justify-center px-4 py-24">
                <h1 className="sr-only">
                    TEDxITB 9.0 Pre-Event Ticket Purchase
                </h1>
                <TicketPurchaseForm userEmail={session.user.email} />
            </div>
        </ColorfulBackground>
    );
}
