import { createTRPCRouter, publicProcedure } from "../trpc";
import { getAllMagazines, getLatestMagazine } from "~/server/contentful/magazine";

export const magazineRouter = createTRPCRouter({
  /**
   * Get all magazines from Contentful, sorted by date (newest first)
   */
  getAll: publicProcedure.query(async () => {
    const result = await getAllMagazines();
    if (result.status === "error") {
      throw new Error("Failed to fetch magazines");
    }
    return result.magazines;
  }),

  /**
   * Get the latest (most recent) magazine
   */
  getLatest: publicProcedure.query(async () => {
    const result = await getLatestMagazine();
    if (result.status === "error") {
      throw new Error("Failed to fetch latest magazine");
    }
    return result.magazine;
  }),
});
