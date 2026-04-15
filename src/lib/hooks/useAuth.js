"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function useAuth() {
  const { data: session, status } = useSession();

  const login = async (email, password) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return result;
  };

  const logout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return {
    user: session?.user,
    isAuthenticated: status === "authenticated",
    loading: status === "loading",
    login,
    logout,
  };
}
