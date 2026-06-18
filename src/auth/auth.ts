import NextAuth from "next-auth";
import CredentialsP from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { createClient } from "@/lib/supabase/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsP({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email",
        },

        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const supabase = await createClient();

        const email = credentials.email as string;
        const password = credentials.password as string;

        const resp = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .maybeSingle();

        const user = resp.data;
        const error = resp.error;

        if (error || !user) {
          return null;
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          username: user.username,
          email: user.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        name: token.username as string,
        email: token.email as string,
      };

      return session;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
});
