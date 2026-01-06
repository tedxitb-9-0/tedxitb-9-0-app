import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsorship",
  description: "Partner with TEDxITB 9.0 - Happiness Through Colors. Explore sponsorship opportunities and join us in spreading ideas worth spreading at one of Indonesia's premier innovation events.",
  openGraph: {
    title: "Sponsorship | TEDxITB 9.0",
    description: "Partner with TEDxITB 9.0 - Happiness Through Colors. Explore sponsorship opportunities and join us in spreading ideas worth spreading.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sponsorship | TEDxITB 9.0",
    description: "Partner with TEDxITB 9.0 and explore sponsorship opportunities.",
  },
};

export default function SponsorshipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <>
    {children}
   </>     
  );
}
