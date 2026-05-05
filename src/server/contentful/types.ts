/**
 * Merchandise Types available in the store
 */
export type IMerchandiseType =
  | "Enamel Pin TEDxITB 9.0"
  | "Enamel Pin Fakultas"
  | "Sticker TEDxITB 9.0"
  | "Sticker Sheet TEDxITB 9.0"
  | "Keychain TEDxITB 9.0"
  | "Totebag"
  | "Tas Belanja Lipat"
  | "E-money";

/**
 * Merchandise item from Contentful
 */
export interface IMerchandise {
  id: string;
  name: string;
  slug: string;
  image: string;
  images: string[];
  price: number;
  description: string;
  merchandiseType: IMerchandiseType;
}

/**
 * Merchandise Bundle from Contentful
 */
export interface IMerchandiseBundle {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  merchandises: IMerchandise[];
  description: string;
}

/**
 * Magazine from Contentful
 */
export interface IMagazine {
  id: string;
  title: string;
  description: string; // Rich text as HTML string
  date: Date;
  flipbookUrl: string;
  coverImage: string;
}

/**
 * Cart item with optional variant selection
 */
export interface ICartItem {
  merchandise: IMerchandise;
  quantity: number;
}

/**
 * Sponsor size tiers (S = smallest, XXL = largest)
 */
export type ISponsorSize = "S" | "M" | "L" | "XL" | "XXL";

/**
 * Sponsor relationship type
 */
export type ISponsorType = "Sponsorship" | "Partnership" | "Media Partner";

/**
 * Sponsor from Contentful
 */
export interface ISponsor {
  id: string;
  companyName: string;
  companyWebsiteLink?: string;
  logo: string;
  size: ISponsorSize;
  type: ISponsorType;
}
