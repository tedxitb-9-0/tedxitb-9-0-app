import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  getAllMerchandises,
  getMerchandiseBySlug,
  getAllBundles,
  getBundleBySlug,
  getMerchandiseOptions,
  requiresDesignSelection,
  type IMerchandiseType,
} from "~/server/contentful";

export const merchandiseRouter = createTRPCRouter({
  /**
   * Get all merchandises from Contentful
   */
  getAll: protectedProcedure.query(async () => {
    const result = await getAllMerchandises();
    if (result.status === "error") {
      throw new Error("Failed to fetch merchandises");
    }
    return result.merchandises;
  }),

  /**
   * Get a single merchandise by slug
   */
  getBySlug: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const result = await getMerchandiseBySlug(input.slug);
      if (result.status === "error") {
        throw new Error("Failed to fetch merchandise");
      }
      return result.merchandise;
    }),

  /**
   * Get all bundles from Contentful
   */
  getAllBundles: protectedProcedure.query(async () => {
    const result = await getAllBundles();
    if (result.status === "error") {
      throw new Error("Failed to fetch bundles");
    }
    return result.bundles;
  }),

  /**
   * Get a single bundle by slug
   */
  getBundleBySlug: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const result = await getBundleBySlug(input.slug);
      if (result.status === "error") {
        throw new Error("Failed to fetch bundle");
      }
      return result.bundle;
    }),

  /**
   * Get design options for a merchandise type
   */
  getOptions: protectedProcedure
    .input(z.object({ type: z.string() }))
    .query(({ input }) => {
      return getMerchandiseOptions(input.type as IMerchandiseType);
    }),

  /**
   * Check if a merchandise type requires design selection
   */
  requiresSelection: protectedProcedure
    .input(z.object({ type: z.string() }))
    .query(({ input }) => {
      return requiresDesignSelection(input.type as IMerchandiseType);
    }),
});
