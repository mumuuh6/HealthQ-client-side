import axios from "axios"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
export const authOptions={
    secret:process.env.NEXTAUTH_SECRET,
    providers:[
      CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: "email", type: "email",placeholder:"name@gmail.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            const res =await axios.get(`https://quiz-mania-iota.vercel.app/signin/${credentials.email}`)
            const user =res.data.userInfo

    
          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            console.log("User found", user)
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
          } else {
              console.log("User not found")
            // If you return null then an error will be displayed advising the user to check their details.
            return null
    
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        }
      })
    ],
    callbacks:{
        async session({session}){
            return session
        }
    }
    
  }


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }