import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Pre Event",
  description: "Get ready for TEDxITB 9.0! Join our Pre Event activities leading up to the main event. Engage with speakers, participate in workshops, and be part of the Happiness Through Colors journey.",
  openGraph: {
    title: "Pre Event | TEDxITB 9.0",
    description: "Get ready for TEDxITB 9.0! Join our Pre Event activities leading up to the main event.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pre Event | TEDxITB 9.0",
    description: "Get ready for TEDxITB 9.0! Join our Pre Event activities.",  },
};

export default function PreEventLayout({
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
