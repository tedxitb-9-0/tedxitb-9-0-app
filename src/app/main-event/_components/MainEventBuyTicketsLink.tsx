import Link from "next/link";

export default function MainEventBuyTicketsLink() {
  return (
    <Link
      href="/main-event/buy"
      className="text-red inline-block rounded-full border-b-4 border-gray-300 bg-white px-10 py-5 text-xl font-bold shadow-lg transition-transform hover:scale-105 hover:bg-neutral-100 active:mt-1 active:scale-95 active:border-b-0"
    >
      Buy Tickets Now
    </Link>
  );
}
