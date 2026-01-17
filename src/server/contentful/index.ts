// Contentful Client
export { default as contentfulClient } from "./contentful";

// Types
export type {
  IMerchandise,
  IMerchandiseBundle,
  IMerchandiseType,
  IDesignOption,
  ICartItem,
} from "./types";

export { FAKULTAS_OPTIONS, KEYCHAIN_OPTIONS } from "./types";

// Service functions
export {
  getAllMerchandises,
  getMerchandiseBySlug,
  getAllBundles,
  getBundleBySlug,
  getMerchandiseOptions,
  requiresDesignSelection,
} from "./merchandise";
