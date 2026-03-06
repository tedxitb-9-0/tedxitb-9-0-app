import { createTRPCRouter, publicProcedure } from "../trpc";
import { getSponsorships } from "~/server/contentful/sponsorship";

export const sponsorshipRouter = createTRPCRouter({
  /**
   * Get all sponsorships from Contentful
   */
  getAll: publicProcedure.query(async () => {
    const result = await getSponsorships();
    if (result.status === "error") {
      throw new Error("Failed to fetch sponsorships");
    }
    return result.sponsors;
  }),
});
