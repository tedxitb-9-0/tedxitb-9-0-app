import client from "./contentful";
import { type IMagazine } from "./types";
import { type Entry, type EntrySkeletonType, type Asset } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { type Document } from "@contentful/rich-text-types";

/**
 * Maps a Contentful entry to our IMagazine type
 */
const magazineMapper = (
  item: Entry<EntrySkeletonType, undefined, string>,
): IMagazine => ({
  id: item.sys.id,
  title: item.fields.title as string,
  description: item.fields.description
    ? documentToHtmlString(item.fields.description as Document)
    : "",
  date: new Date(item.fields.date as string),
  flipbookUrl: (item.fields.flipbookUrl as string) ?? "",
  coverImage:
    `https:${(item.fields.coverImage as Asset)?.fields.file?.url as string}` ||
    "",
});

/**
 * Fetch all magazines from Contentful, sorted by date descending
 */
export const getAllMagazines = async (): Promise<
  | { status: "success"; magazines: IMagazine[] }
  | { status: "error"; magazines: [] }
> => {
  try {
    const response = await client.getEntries({
      content_type: "magazine",
      order: ["-fields.date"],
    });

    const magazines: IMagazine[] = response.items.map(magazineMapper);

    return { status: "success", magazines };
  } catch (error) {
    console.error("Error fetching magazines:", error);
    return { status: "error", magazines: [] };
  }
};

/**
 * Fetch the latest magazine (most recent by date)
 */
export const getLatestMagazine = async (): Promise<
  | { status: "success"; magazine: IMagazine | null }
  | { status: "error"; magazine: null }
> => {
  try {
    const response = await client.getEntries({
      content_type: "magazine",
      order: ["-fields.date"],
      limit: 1,
    });

    const magazine = response.items.map(magazineMapper)[0] ?? null;

    return { status: "success", magazine };
  } catch (error) {
    console.error("Error fetching latest magazine:", error);
    return { status: "error", magazine: null };
  }
};
