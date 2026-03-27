"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ColorfulBackground from "~/_components/ColorfulBackground";

export default function BuyTicketPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/pre-event");
    }, [router]);

    return (
        <ColorfulBackground showSmiles={false}>
            <div className="relative z-30 container mx-auto flex min-h-screen items-center justify-center px-4">
                <div className="bg-white/90 p-8 rounded-2xl shadow-xl text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Tickets Sold Out
                    </h1>
                    <p className="text-gray-600">Redirecting to pre-event page...</p>
                </div>
            </div>
        </ColorfulBackground>
    );
}
