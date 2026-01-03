import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full h-16 flex justify-between bg-gray-100 items-center px-12">
      <div className="">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        </Link>
      </div>

      <div className="flex gap-8">
          <Link href="/about">About</Link>
          <Link href="/pre-event">Pre-Event</Link>
          <Link href="/main-event">Main Event</Link>
          <Link href="/merchandise">Merchandise</Link>
          <Link href="/magazine">Magazine</Link>
          <Link href="/sponsorship">Sponsorship</Link>
      </div>
    </nav>
  )
}

