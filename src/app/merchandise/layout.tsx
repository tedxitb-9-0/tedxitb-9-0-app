import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://tedxitb.id";

export const metadata: Metadata = {
  title: "Merchandise",
  description:
    "Get your official TEDxITB 9.0 merchandise! Shop exclusive items celebrating the Happiness Through Colors theme. Show your support and take home a piece of the experience.",
  alternates: {
    canonical: `${baseUrl}/merchandise`,
  },
  openGraph: {
    title: "Merchandise | TEDxITB 9.0",
    description:
      "Get your official TEDxITB 9.0 merchandise! Shop exclusive items celebrating the Happiness Through Colors theme.",
    url: `${baseUrl}/merchandise`,
    images: [
      {
        url: "/htc.png",
        width: 1200,
        height: 630,
        alt: "TEDxITB 9.0 Official Merchandise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Merchandise | TEDxITB 9.0",
    description: "Get your official TEDxITB 9.0 merchandise!",
    images: ["/htc.png"],
  },
};

export default function MerchandiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
