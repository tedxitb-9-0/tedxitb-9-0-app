import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";

import { env } from "~/env";
import * as schema from "./schema";

/**
 * Neon uses HTTP-based pooling.
 * This is safe for serverless (Vercel).
 */
const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

