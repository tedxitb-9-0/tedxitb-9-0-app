import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Main Event",
  description: "Join us at the TEDxITB 9.0 Main Event - Happiness Through Colors. Experience inspiring talks, innovative ideas, and a celebration of creativity at the Bandung Institute of Technology.",
  openGraph: {
    title: "Main Event | TEDxITB 9.0",
    description: "Join us at the TEDxITB 9.0 Main Event - Happiness Through Colors. Experience inspiring talks and innovative ideas.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Main Event | TEDxITB 9.0",
    description: "Join us at the TEDxITB 9.0 Main Event - Happiness Through Colors.",
  },
};

export default function MainEventLayout({
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
