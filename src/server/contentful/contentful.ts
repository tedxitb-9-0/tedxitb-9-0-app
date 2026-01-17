import { createClient } from "contentful";
import { env } from "~/env";

/**
 * Contentful client for fetching content from the CMS.
 * Uses environment variables for space ID and access token.
 */
const client = createClient({
  space: env.CONTENTFUL_SPACE_ID,
  accessToken: env.CONTENTFUL_ACCESS_TOKEN,
});

export default client;
