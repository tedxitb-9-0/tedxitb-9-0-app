import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Magazine",
  description: "Explore TEDxITB Magazine - your source for inspiring stories, speaker insights, and exclusive content celebrating ideas worth spreading. Browse our latest editions and discover the Happiness Through Colors journey.",
  openGraph: {
    title: "Magazine | TEDxITB 9.0",
    description: "Explore TEDxITB Magazine - your source for inspiring stories, speaker insights, and exclusive content celebrating ideas worth spreading.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Magazine | TEDxITB 9.0",
    description: "Explore TEDxITB Magazine - your source for inspiring stories and speaker insights.",
  },
};

export default function MagazineLayout({
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
