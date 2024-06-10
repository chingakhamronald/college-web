
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {

          console.log({ 'credentials': credentials });


          if (!credentials?.email || !credentials?.password) return null;

          const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/auth/login`, credentials)

          console.log({ 'res...': res });


          if (res.status == 401) {
            throw new Error("auth/login unauthorized.")
          }

          const user = res.data

          console.log({ 'user...': user });


          if (!user || !user.role) {
            throw new Error("user or role not found.")
          }

          return { ...user, password: null, role: user.role };
        }
        catch (error) {
          console.log({ "error.....": error })
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {

      console.log({ 'token': token, 'user': user });


      if (user) {
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      console.log('session user ', session.user)
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
}
