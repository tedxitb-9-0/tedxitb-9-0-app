import { type Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://tedxitb.id";

export const metadata: Metadata = {
  title: "Sponsorship",
  description:
    "Partner with TEDxITB 9.0 - Happiness Through Colors. Explore sponsorship opportunities and join us in spreading ideas worth spreading at one of Indonesia's premier innovation events.",
  alternates: {
    canonical: `${baseUrl}/sponsorship`,
  },
  openGraph: {
    title: "Sponsorship | TEDxITB 9.0",
    description:
      "Partner with TEDxITB 9.0 - Happiness Through Colors. Explore sponsorship opportunities and join us in spreading ideas worth spreading.",
    url: `${baseUrl}/sponsorship`,
    images: [
      {
        url: "/htc.png",
        width: 1200,
        height: 630,
        alt: "Sponsor TEDxITB 9.0 - Happiness Through Colors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sponsorship | TEDxITB 9.0",
    description:
      "Partner with TEDxITB 9.0 and explore sponsorship opportunities.",
    images: ["/htc.png"],
  },
};

export default function SponsorshipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
