import { desc, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { session, user } from "~/server/db/schema";
import z from "zod";

export const userRouter = createTRPCRouter({
  // Get user profile
  getProfileById: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const userProfile = await ctx.db.query.user.findFirst({
      where: eq(user.id, userId),
    });

    return userProfile;
  }),

  // Get user sessions
  getSessions: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const userSessions = await ctx.db
      .select()
      .from(session)
      .where(eq(session.userId, userId))
      .orderBy(desc(session.createdAt))
      .limit(10);

    return userSessions;
  }),

  // Update user profile
  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(256).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const updatedUser = await ctx.db
        .update(user)
        .set({
          ...(input.name && { name: input.name }),
          updatedAt: new Date(),
        })
        .where(eq(user.id, userId))
        .returning();

      return updatedUser[0];
    }),
});
