import { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { Session } from "next-auth";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export interface session extends Session {
  accessToken?: string;
  idToken?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secr3t",
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      const mySession: session = session as Session;
      if (mySession.user && token) {
        mySession.accessToken = token.accessToken as string;
        mySession.idToken = token.idToken as string;
      }
      return mySession!;
    },
    signIn: async ({ profile }): Promise<any> => {
      const myProfile: GoogleProfile = profile as GoogleProfile;
      if (myProfile) {
        try {
          const findUser = await db.user.findUnique({
            where: { email: myProfile.email },
          });
          if (!findUser) {
            await db.user.create({
              data: {
                image: myProfile.picture,
                email: myProfile.email,
              },
            });
          }
          return true;
        } catch (e) {
          return false;
        }
      }
    },
  },
};
