import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "name@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email) {
          throw new Error("Missing credentials");
        }
        // Fetch user by email
        const res = await axios.get(`https://health-q-tau.vercel.app/signin/${credentials?.email}`);
        const user = res.data.userInfo;

        if (user) {
          console.log("User found", user);
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } else {
          console.log("User not found");
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async session({ session}) {
      
      // You can customize the session object here if needed
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
