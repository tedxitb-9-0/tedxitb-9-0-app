"use client";

import { useEffect } from "react";
import { useSession } from "~/server/better-auth/client";
import { useAuthStore, type User } from "~/stores";

/**
 * AuthProvider syncs Better Auth's session with the Zustand auth store.
 * This component should wrap the app to ensure auth state is available globally.
 */
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    if (isPending) {
      setLoading(true);
      return;
    }

    if (session?.user) {
      // Map Better Auth user to our store's User type
      const user: User = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        emailVerified: session.user.emailVerified,
        createdAt: new Date(session.user.createdAt),
        updatedAt: new Date(session.user.updatedAt),
      };
      setUser(user);
    } else {
      setUser(null);
    }
  }, [session, isPending, setUser, setLoading]);

  return <>{children}</>;
}
