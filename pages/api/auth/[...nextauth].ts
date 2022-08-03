import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export default NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // theme: {
  //   logo: "https://links.papareact.com/sq0",
  //   brandColor: "#F13287",
  //   colorScheme: "auto",
  // },

  pages: {
    signIn: "/auth/signin",
  },
});
