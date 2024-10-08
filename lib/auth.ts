import GoogleProvider from "next-auth/providers/google";
import db from "@/app/db";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Account, User } from "next-auth";

export interface CustomSession extends Session {
  user: {
    email: string;
    name: string;
    image: string;
    uid?: string;
  };
}

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    session: async ({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<CustomSession> => {
      if (session.user) {
        (session.user as CustomSession["user"]).uid = token.uid as string;
        session.user.name = token.name as string;
      }
      return session as CustomSession;
    },
    async jwt({ token, account }: { token: JWT; account: Account | null }) {
      if (account) {
        const user = await db.user.findUnique({
          where: {
            username: token.email as string,
          },
        });
        if (user) {
          token.uid = user.id;
        }
      }
      return token;
    },
    async signIn({ user, account }: { user: User; account: Account | null }) {
      if (account?.provider === "google") {
        const email = user.email;
        if (!email) {
          return false;
        }

        let userDb = await db.user.findUnique({
          where: {
            username: email,
          },
        });

        if (!userDb) {
          userDb = await db.user.create({
            data: {
              username: email,
              profilePicture: user.image || "",
              provider: "Google",
              sub: account.providerAccountId,
            },
          });
        }

        return true;
      }

      return false;
    },
  },
};
