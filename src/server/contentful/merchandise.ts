import client from "./contentful";
import {
  type IMerchandise,
  type IMerchandiseBundle,
  type IMerchandiseType,
} from "./types";
import { type Entry, type EntrySkeletonType, type Asset } from "contentful";

/**
 * Maps a Contentful entry to our IMerchandise type
 */
const merchandiseMapper = (
  item: Entry<EntrySkeletonType, undefined, string>,
): IMerchandise => ({
  id: item.sys.id,
  name: item.fields.name as string,
  slug: item.fields.slug as string,
  image:
    `https:${(item.fields.image as Asset)?.fields.file?.url as string}` || "",
  images:
    (item.fields.images as Asset[])?.map(
      (el) => `https:${el.fields.file?.url as string}` || "",
    ) ?? [],
  price: item.fields.price as number,
  description: (item.fields.description as string) ?? "",
  merchandiseType: (item.fields.merchandiseType as Entry)?.fields
    .name as IMerchandiseType,
});

/**
 * Maps a Contentful entry to our IMerchandiseBundle type
 */
const bundleMapper = (
  item: Entry<EntrySkeletonType, undefined, string>,
): IMerchandiseBundle => ({
  id: item.sys.id,
  name: item.fields.name as string,
  slug: item.fields.slug as string,
  price: item.fields.price as number,
  image:
    `https:${(item.fields.image as Asset)?.fields.file?.url as string}` || "",
  merchandises:
    (
      item.fields.merchandises as Entry<EntrySkeletonType, undefined, string>[]
    )?.map(merchandiseMapper) ?? [],
  description: (item.fields.description as string) ?? "",
});

/**
 * Fetch all merchandises from Contentful
 */
export const getAllMerchandises = async (): Promise<
  | { status: "success"; merchandises: IMerchandise[] }
  | { status: "error"; merchandises: [] }
> => {
  try {
    const response = await client.getEntries({
      content_type: "merchandise",
      include: 2, // Include linked entries (merchandiseType)
    });

    const merchandises: IMerchandise[] = response.items.map(merchandiseMapper);

    return { status: "success", merchandises };
  } catch (error) {
    console.error("Error fetching merchandises:", error);
    return { status: "error", merchandises: [] };
  }
};

/**
 * Fetch a single merchandise by slug
 */
export const getMerchandiseBySlug = async (
  slug: string,
): Promise<
  | { status: "success"; merchandise: IMerchandise | null }
  | { status: "error"; merchandise: null }
> => {
  try {
    if (!slug) return { status: "error", merchandise: null };

    const response = await client.getEntries({
      content_type: "merchandise",
      "fields.slug": slug,
      include: 2,
    });

    const merchandise = response.items.map(merchandiseMapper)[0] ?? null;

    return { status: "success", merchandise };
  } catch (error) {
    console.error("Error fetching merchandise by slug:", error);
    return { status: "error", merchandise: null };
  }
};

/**
 * Fetch all bundles from Contentful
 */
export const getAllBundles = async (): Promise<
  | { status: "success"; bundles: IMerchandiseBundle[] }
  | { status: "error"; bundles: [] }
> => {
  try {
    const response = await client.getEntries({
      content_type: "merchandiseBundle",
      include: 3, // Include nested linked entries
    });

    const bundles: IMerchandiseBundle[] = response.items.map(bundleMapper);

    return { status: "success", bundles };
  } catch (error) {
    console.error("Error fetching bundles:", error);
    return { status: "error", bundles: [] };
  }
};

/**
 * Fetch a single bundle by slug
 */
export const getBundleBySlug = async (
  slug: string,
): Promise<
  | { status: "success"; bundle: IMerchandiseBundle | null }
  | { status: "error"; bundle: null }
> => {
  try {
    if (!slug) return { status: "error", bundle: null };

    const response = await client.getEntries({
      content_type: "merchandiseBundle",
      "fields.slug": slug,
      include: 3,
    });

    const bundle = response.items.map(bundleMapper)[0] ?? null;

    return { status: "success", bundle };
  } catch (error) {
    console.error("Error fetching bundle by slug:", error);
    return { status: "error", bundle: null };
  }
};
