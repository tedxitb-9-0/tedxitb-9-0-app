"use client";

import dynamic from "next/dynamic";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

import MainEventBuyTicketsLink from "./MainEventBuyTicketsLink";

const FlipClockCountdown = dynamic(
  () => import("@leenguyen/react-flip-clock-countdown"),
  { ssr: false },
);

function toTimestamp(to: Date | number): number {
  return typeof to === "number" ? to : to.getTime();
}

export interface CountdownTimerProps {
  /** Countdown target (defaults to 24 May 2026 00:00 WIB). */
  to?: Date | number;
  /** When true, shows the main-event buy CTA under the clock. */
  showBuyButton?: boolean;
}

export default function CountdownTimer({
  to = new Date("2026-05-24T00:00:00+07:00"),
  showBuyButton = false,
}: CountdownTimerProps) {
  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <FlipClockCountdown
        to={toTimestamp(to)}
        className="pre-event-flip-clock justify-center"
        hideOnComplete={false}
        labels={["DAYS", "HOURS", "MINUTES", "SECONDS"]}
      />
      {showBuyButton ? <MainEventBuyTicketsLink /> : null}
    </div>
  );
}
