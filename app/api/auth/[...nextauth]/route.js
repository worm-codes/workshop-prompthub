import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;   
    },
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      //burrasi
      session.user.id = sessionUser?._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        const userAlreadyExists = await User.findOne({
          email: profile.email,
        });
        if (!userAlreadyExists) {
          await User.create({
            email: profile.email,
            //burasi
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.image,
            prompts: [],
          });
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
