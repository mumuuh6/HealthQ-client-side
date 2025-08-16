// lib/auth.ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };

        try {
          const res = await axios.post(
            `https://health-q-server.vercel.app/signin/${email}`,
            { email, password }
          );
          
          const user = res?.data?.userInfo;
          if (user) {
            
            return {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          } else {
            
            return null;
          }
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      if (!session?.user?.email) return session;

    try {

      const res = await axios.get(
        `https://health-q-server.vercel.app/signin/${session?.user?.email}`
      );
      const user = res.data?.userInfo;
      
      if (user) {
        session.user.name = user.name;
        
      }
    } catch (err) {
      console.error("Error fetching user in session callback:", err);
    }
      
      return session;
    },
    
  },
});
