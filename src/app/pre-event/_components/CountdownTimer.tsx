"use client";

import dynamic from "next/dynamic";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

const FlipClockCountdown = dynamic(
  () => import("@leenguyen/react-flip-clock-countdown"),
  { ssr: false },
);

export default function CountdownTimer() {
  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <FlipClockCountdown
        to={new Date("2026-02-22T12:00:00+07:00").getTime()}
        className="pre-event-flip-clock justify-center"
        hideOnComplete={false}
        labels={["DAYS", "HOURS", "MINUTES", "SECONDS"]}
      />
      <div className="mx-auto my-4 w-fit max-w-full overflow-x-auto overflow-y-hidden rounded-2xl border border-red-100 bg-white/95 px-8 py-5 text-center shadow-2xl backdrop-blur">
        <h2 className="mb-2 text-3xl font-black tracking-tight text-[#E62B1E] md:text-4xl">
          SOLD OUT
        </h2>
        <p className="text-base font-bold text-gray-800 md:text-lg">
          All pre-event tickets have been fully claimed.
        </p>
      </div>
    </div>
  );
}
