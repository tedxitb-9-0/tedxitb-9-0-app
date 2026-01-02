import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { env } from "~/env";
import { db } from "~/server/db";

const isProduction = env.NODE_ENV === "production";
const baseURL = isProduction ? "https://tedxitb.id" : "http://localhost:3000";

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
    github: {
      clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
    },
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
});

export type Session = typeof auth.$Infer.Session;
