import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { eq, and } from "drizzle-orm";

import { env } from "~/env";
import { db } from "~/server/db";
import { orders } from "~/server/db/schema";

const isProduction = env.NODE_ENV === "production";
const baseURL = isProduction ? "https://tedxitb.id" : "http://localhost:3000";

type SessionCallbackSession = {
  user: Record<string, unknown>;
} & Record<string, unknown>;

type SessionCallbackArgs = {
  session: SessionCallbackSession;
  user: unknown;
};

const getRoleFromUser = (user: unknown): "user" | "admin" => {
  if (
    typeof user === "object" &&
    user !== null &&
    "role" in user &&
    user.role === "admin"
  ) {
    return "admin";
  }

  return "user";
};

const getUserId = (user: unknown): string | null => {
  if (
    typeof user === "object" &&
    user !== null &&
    "id" in user &&
    typeof user.id === "string"
  ) {
    return user.id;
  }

  return null;
};

export const auth = betterAuth({
  plugins: [nextCookies()],
  baseURL,
  trustedOrigins: [baseURL],
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.BETTER_AUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_GOOGLE_CLIENT_SECRET,
    },
  },
  advanced: {
    cookies: {
      state: {
        attributes: {
          sameSite: "none",
          secure: true,
        }
      }
    },
    cookiePrefix: "better-auth",
    useSecureCookies: isProduction, // true in production (HTTPS), false in development (HTTP)
  },
  callbacks: {
    session: async ({ session, user }: SessionCallbackArgs) => {
      const userId = getUserId(user);

      if (!userId) {
        return session;
      }

      const existingOrder = await db.query.orders.findFirst({
        where: and(
          eq(orders.userId, userId),
          eq(orders.orderType, "pre_event_ticket"),
        ),
      });

      return {
        ...session,
        hasPreEventTicket: !!existingOrder,
        user: {
          ...session.user,
          role: getRoleFromUser(user),
          hasPreEventTicket: !!existingOrder,
        },
      };
    },
  },
});

export type Session = typeof auth.$Infer.Session;
