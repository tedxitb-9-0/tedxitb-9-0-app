import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://tedxitb.id";

export const metadata: Metadata = {
  title: "Main Event",
  description:
    "Join us at the TEDxITB 9.0 Main Event - Happiness Through Colors. Experience inspiring talks, innovative ideas, and a celebration of creativity at the Bandung Institute of Technology.",
  alternates: {
    canonical: `${baseUrl}/main-event`,
  },
  openGraph: {
    title: "Main Event | TEDxITB 9.0",
    description:
      "Join us at the TEDxITB 9.0 Main Event - Happiness Through Colors. Experience inspiring talks and innovative ideas.",
    url: `${baseUrl}/main-event`,
    images: [
      {
        url: "/htc.png",
        width: 1200,
        height: 630,
        alt: "TEDxITB 9.0 Main Event - Happiness Through Colors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Main Event | TEDxITB 9.0",
    description:
      "Join us at the TEDxITB 9.0 Main Event - Happiness Through Colors.",
    images: ["/htc.png"],
  },
};

export default function MainEventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
