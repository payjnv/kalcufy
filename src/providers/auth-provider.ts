import { AuthProvider } from "@refinedev/core";
import { getSession, signIn, signOut } from "next-auth/react";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      return { success: true, redirectTo: "/admin" };
    }

    return {
      success: false,
      error: { name: "LoginError", message: "Invalid credentials" },
    };
  },

  logout: async () => {
    await signOut({ redirect: false });
    return { success: true, redirectTo: "/" };
  },

  check: async () => {
    const session = await getSession();
    
    // Check if user is admin
    if (session?.user && (session.user as any).role === "ADMIN") {
      return { authenticated: true };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
      error: { name: "Unauthorized", message: "Admin access required" },
    };
  },

  getIdentity: async () => {
    const session = await getSession();
    
    if (session?.user) {
      return {
        id: (session.user as any).id,
        name: session.user.name,
        email: session.user.email,
        avatar: session.user.image,
        role: (session.user as any).role,
      };
    }

    return null;
  },

  getPermissions: async () => {
    const session = await getSession();
    return (session?.user as any)?.role || null;
  },

  onError: async (error) => {
    if (error.status === 401 || error.status === 403) {
      return { logout: true, redirectTo: "/login" };
    }
    return { error };
  },
};
