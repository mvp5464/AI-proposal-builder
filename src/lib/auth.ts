import { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { Session } from "next-auth";
import db from "@/db";

export interface session extends Session {
  user: {
    userId: string;
    email: string;
    name: string;
    image: string;
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secr3t",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      const mySession: session = session as session;
      if (mySession.user && token) {
        mySession.user.userId = token.sub as string;
        mySession.user.email = token.email as string;
        mySession.user.image = token.picture as string;
        mySession.user.name = token.name as string;
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
                userId: myProfile.sub,
              },
            });
          }
          return true;
        } catch (e) {
          console.log({ e });
          return false;
        }
      }
    },
  },
};
