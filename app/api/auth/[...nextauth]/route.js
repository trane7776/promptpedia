import NextAuth from "next-auth";
import VkProvider from "next-auth/providers/vk";
import User from "@/models/user";
import { connectToDatabase } from "@/utils/database";

const handler = NextAuth({
  providers: [
    VkProvider({
      clientId: process.env.VK_CLIENT_ID,
      clientSecret: process.env.VK_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {
    const sessionUser = await User.findOne({
      email: session.user.email,
    });
    session.user.id = sessionUser._id.toString();
    return session;
  },
  async signIn({ profile }) {
    try {
      await connectToDatabase();
      const userExists = await User.findOne({
        email: profile.email,
      });
      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }
      //serverless -> lambda
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
});
export { handler as GET, handler as POST };
