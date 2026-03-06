// Contentful Client
export { default as contentfulClient } from "./contentful";

// Types
export type {
  IMerchandise,
  IMerchandiseBundle,
  IMerchandiseType,
  ICartItem,
  IMagazine,
  ISponsor,
  ISponsorSize,
  ISponsorType,
} from "./types";

export { FAKULTAS_OPTIONS, KEYCHAIN_OPTIONS } from "./types";

// Merchandise service functions
export {
  getAllMerchandises,
  getMerchandiseBySlug,
  getAllBundles,
  getBundleBySlug,
} from "./merchandise";

// Magazine service functions
export { getAllMagazines, getLatestMagazine } from "./magazine";

// Sponsorship service functions
export { getSponsorships } from "./sponsorship";
