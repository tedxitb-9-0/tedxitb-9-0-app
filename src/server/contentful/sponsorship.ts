import client from "./contentful";
import { type ISponsor, type ISponsorSize, type ISponsorType } from "./types";
import { type Entry, type EntrySkeletonType, type Asset } from "contentful";

/**
 * Maps a Contentful entry to our ISponsor type
 */
const sponsorMapper = (
  item: Entry<EntrySkeletonType, undefined, string>,
): ISponsor => ({
  id: item.sys.id,
  companyName: item.fields.companyName as string,
  companyWebsiteLink:
    (item.fields.companyWebsiteLink as string | undefined) ?? undefined,
  logo:
    `https:${(item.fields.logo as Asset)?.fields.file?.url as string}` || "",
  size:
    ((item.fields.size as Entry<EntrySkeletonType, undefined, string>)?.fields
      .name as ISponsorSize) ?? "S",
  type:
    ((item.fields.type as Entry<EntrySkeletonType, undefined, string>)?.fields
      .name as ISponsorType) ?? "Sponsorship",
});

/**
 * Fetch all sponsorships from Contentful
 */
export const getSponsorships = async (): Promise<
  | { status: "success"; sponsors: ISponsor[] }
  | { status: "error"; sponsors: [] }
> => {
  try {
    const response = await client.getEntries({
      content_type: "Sponsor",
      include: 2, // Include linked entries (size, type)
    });

    const sponsors: ISponsor[] = response.items.map(sponsorMapper);

    return { status: "success", sponsors };
  } catch (error) {
    console.error("Error fetching sponsorships:", error);
    return { status: "error", sponsors: [] };
  }
};
