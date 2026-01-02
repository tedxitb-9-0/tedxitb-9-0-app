import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "~/server/better-auth";

const handler = toNextJsHandler(auth.handler);

export const { GET, POST } = handler;
