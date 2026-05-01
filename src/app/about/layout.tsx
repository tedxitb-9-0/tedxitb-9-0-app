import { type Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://tedxitb.id";

export const metadata: Metadata = {
  title: "About TEDxITB",
  description:
    "Learn more about TEDxITB, an independent, locally licensed TED event held at the Bandung Institute of Technology. Discover our mission, vision, and the theme: Happiness Through Colors.",
  alternates: {
    canonical: `${baseUrl}/about`,
  },
  openGraph: {
    title: "About TEDxITB | TEDxITB 9.0",
    description:
      "Learn more about TEDxITB, an independent, locally licensed TED event held at the Bandung Institute of Technology.",
    url: `${baseUrl}/about`,
    images: [
      {
        url: "/htc.png",
        width: 1200,
        height: 630,
        alt: "About TEDxITB - Happiness Through Colors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About TEDxITB | TEDxITB 9.0",
    description:
      "Learn more about TEDxITB, an independent, locally licensed TED event held at the Bandung Institute of Technology.",
    images: ["/htc.png"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center justify-center">
      {children}
    </main>
  );
}
