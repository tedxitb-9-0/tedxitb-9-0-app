import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merchandise",
  description: "Get your official TEDxITB 9.0 merchandise! Shop exclusive items celebrating the Happiness Through Colors theme. Show your support and take home a piece of the experience.",
  openGraph: {
    title: "Merchandise | TEDxITB 9.0",
    description: "Get your official TEDxITB 9.0 merchandise! Shop exclusive items celebrating the Happiness Through Colors theme.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merchandise | TEDxITB 9.0",
    description: "Get your official TEDxITB 9.0 merchandise!",
  },
};

export default function MerchandiseLayout({
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
