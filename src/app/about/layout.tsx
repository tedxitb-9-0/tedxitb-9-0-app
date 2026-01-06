import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "About TEDxITB",
  description:
    "Learn more about TEDxITB, an independent, locally licensed TED event held at the Bandung Institute of Technology. Discover our mission, vision, and the theme: Happiness Through Colors.",
  openGraph: {
    title: "About TEDxITB | TEDxITB 9.0",
    description:
      "Learn more about TEDxITB, an independent, locally licensed TED event held at the Bandung Institute of Technology.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About TEDxITB | TEDxITB 9.0",
    description:
      "Learn more about TEDxITB, an independent, locally licensed TED event held at the Bandung Institute of Technology.",
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

