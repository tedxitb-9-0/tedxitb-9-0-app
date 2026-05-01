import type { Metadata } from "next";
import { magazines } from "../data";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://tedxitb.id";

interface MagazineDetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const magazine = magazines.find((m) => m.id === id);

  if (!magazine) {
    return {
      title: "Magazine Not Found",
      description: "The requested TEDxITB Magazine edition could not be found.",
    };
  }

  return {
    title: magazine.title,
    description: magazine.description,
    alternates: {
      canonical: `${baseUrl}/magazine/${magazine.id}`,
    },
    openGraph: {
      title: `${magazine.title} | TEDxITB 9.0`,
      description: magazine.description,
      url: `${baseUrl}/magazine/${magazine.id}`,
      images: [
        {
          url: magazine.coverImage,
          width: 1200,
          height: 630,
          alt: magazine.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${magazine.title} | TEDxITB 9.0`,
      description: magazine.description,
      images: [magazine.coverImage],
    },
  };
}

export default function MagazineDetailLayout({
  children,
}: MagazineDetailLayoutProps) {
  return <>{children}</>;
}