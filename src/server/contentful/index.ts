// Contentful Client
export { default as contentfulClient } from "./contentful";

// Types
export type {
  IMerchandise,
  IMerchandiseBundle,
  IMerchandiseType,
  IDesignOption,
  ICartItem,
  IMagazine,
} from "./types";

export { FAKULTAS_OPTIONS, KEYCHAIN_OPTIONS } from "./types";

// Merchandise service functions
export {
  getAllMerchandises,
  getMerchandiseBySlug,
  getAllBundles,
  getBundleBySlug,
  getMerchandiseOptions,
  requiresDesignSelection,
} from "./merchandise";

// Magazine service functions
export { getAllMagazines, getLatestMagazine } from "./magazine";
