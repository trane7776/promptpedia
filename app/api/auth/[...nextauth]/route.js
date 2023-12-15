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
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        username: session.user.name,
        image: session.user.image,
      });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        //connect to database
        await connectToDatabase();
        //check if a user already exists
        const userExists = await User.findOne({
          vkID: profile.response[0].id,
        });
        //if not, create a user
        if (!userExists) {
          await User.create({
            vkId: profile.response[0].id,
            username: [
              profile.response[0].first_name,
              profile.response[0].last_name,
            ]
              .filter(Boolean)
              .join(" "),
            image: profile.response[0].photo_100,
          });
        }
        //serverless -> lambda
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});
export { handler as GET, handler as POST };
