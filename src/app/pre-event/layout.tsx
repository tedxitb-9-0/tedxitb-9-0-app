import { type Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://tedxitb.id";

export const metadata: Metadata = {
  title: "Pre Event",
  description:
    "Get ready for TEDxITB 9.0! Join our Pre Event activities leading up to the main event. Engage with speakers, participate in workshops, and be part of the Happiness Through Colors journey.",
  alternates: {
    canonical: `${baseUrl}/pre-event`,
  },
  openGraph: {
    title: "Pre Event | TEDxITB 9.0",
    description:
      "Get ready for TEDxITB 9.0! Join our Pre Event activities leading up to the main event.",
    url: `${baseUrl}/pre-event`,
    images: [
      {
        url: "/htc.png",
        width: 1200,
        height: 630,
        alt: "TEDxITB 9.0 Pre Event - Happiness Through Colors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pre Event | TEDxITB 9.0",
    description: "Get ready for TEDxITB 9.0! Join our Pre Event activities.",
    images: ["/htc.png"],
  },
};

export default function PreEventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
