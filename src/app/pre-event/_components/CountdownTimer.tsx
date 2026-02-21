"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

const FlipClockCountdown = dynamic(
  () => import("@leenguyen/react-flip-clock-countdown"),
  { ssr: false },
);

export default function CountdownTimer() {
  return (
    <FlipClockCountdown
      to={new Date("2026-02-22T12:00:00+07:00").getTime()}
      className="pre-event-flip-clock justify-center"
      labels={["DAYS", "HOURS", "MINUTES", "SECONDS"]}
    >
      <Link
        href="/pre-event/buy"
        className="text-red inline-block rounded-full border-b-4 border-gray-300 bg-white px-10 py-5 text-xl font-bold shadow-lg transition-transform hover:scale-105 hover:bg-neutral-100 active:mt-1 active:scale-95 active:border-b-0"
      >
        Buy Tickets Now
      </Link>
    </FlipClockCountdown>
  );
}
