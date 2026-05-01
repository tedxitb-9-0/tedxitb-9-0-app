import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://tedxitb.id";

export const metadata: Metadata = {
  title: "Magazine",
  description:
    "Explore TEDxITB Magazine - your source for inspiring stories, speaker insights, and exclusive content celebrating ideas worth spreading. Browse our latest editions and discover the Happiness Through Colors journey.",
  alternates: {
    canonical: `${baseUrl}/magazine`,
  },
  openGraph: {
    title: "Magazine | TEDxITB 9.0",
    description:
      "Explore TEDxITB Magazine - your source for inspiring stories, speaker insights, and exclusive content celebrating ideas worth spreading.",
    url: `${baseUrl}/magazine`,
    images: [
      {
        url: "/htc.png",
        width: 1200,
        height: 630,
        alt: "TEDxITB Magazine - Inspiring Stories & Speaker Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Magazine | TEDxITB 9.0",
    description:
      "Explore TEDxITB Magazine - your source for inspiring stories and speaker insights.",
    images: ["/htc.png"],
  },
};

export default function MagazineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
