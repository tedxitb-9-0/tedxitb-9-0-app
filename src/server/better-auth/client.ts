import { createAuthClient } from "better-auth/react";
import { auth } from "./config";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : undefined,
});

export type Session = typeof authClient.$Infer.Session;

export const { signIn, signOut, signUp, useSession } = authClient;
