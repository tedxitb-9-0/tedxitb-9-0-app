import "~/styles/globals.css";

import { type Metadata } from "next";
import { Roboto_Slab, Titan_One } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://tedxitb.id';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "TEDxITB 9.0 - Happiness Through Colors",
    template: "%s | TEDxITB 9.0",
  },
  description: "TEDxITB is an independent, locally licensed TED event held at the Bandung Institute of Technology. Join us for TEDxITB 9.0: Happiness Through Colors - exploring ideas worth spreading.",
  keywords: ["TEDx", "TEDxITB", "TED", "ITB", "Bandung Institute of Technology", "Innovation", "Ideas Worth Spreading", "Happiness Through Colors", "TEDxITB 9.0"],
  authors: [{ name: "TEDxITB Team" }],
  creator: "TEDxITB",
  publisher: "TEDxITB",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "TEDxITB 9.0 - Happiness Through Colors",
    description: "TEDxITB is an independent, locally licensed TED event held at the Bandung Institute of Technology. Join us for TEDxITB 9.0: Happiness Through Colors.",
    siteName: "TEDxITB",
  },
  twitter: {
    card: "summary_large_image",
    title: "TEDxITB 9.0 - Happiness Through Colors",
    description: "TEDxITB is an independent, locally licensed TED event held at the Bandung Institute of Technology.",
    creator: "@tedxitb",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
  manifest: "/site.webmanifest",
};

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
});

const titanOne = Titan_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-titan-one",
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${robotoSlab.variable} ${titanOne.variable} `}>
      <body>
        <NextTopLoader color="red" showSpinner={false} />
        <TRPCReactProvider>
          <Navbar />
          {children}
          <Footer />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
