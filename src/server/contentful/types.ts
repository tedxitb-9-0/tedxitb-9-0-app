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
 * Design options for items that require selection
 */
export interface IDesignOption {
  id: string;
  name: string;
}

/**
 * Faculty options for Enamel Pin Fakultas
 */
export const FAKULTAS_OPTIONS: IDesignOption[] = [
  { id: "fmipa", name: "FMIPA" },
  { id: "fti", name: "FTI" },
  { id: "ftsl", name: "FTSL" },
  { id: "fttm", name: "FTTM" },
  { id: "fsrd", name: "FSRD" },
  { id: "sappk", name: "SAPPK" },
  { id: "stei", name: "STEI" },
  { id: "sbm", name: "SBM" },
  { id: "sith", name: "SITH" },
  { id: "sf", name: "SF" },
  { id: "fitb", name: "FITB" },
  { id: "ftmd", name: "FTMD" },
];

/**
 * Keychain design options
 */
export const KEYCHAIN_OPTIONS: IDesignOption[] = [
  { id: "design-1", name: "Design 1" },
  { id: "design-2", name: "Design 2" },
  { id: "design-3", name: "Design 3" },
  { id: "design-4", name: "Design 4" },
  { id: "design-5", name: "Design 5" },
];

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
  selectedVariant?: string; // For items with design selection
}
