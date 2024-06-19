import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Enter your email'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          console.log({ credentials: credentials });

          if (!credentials?.email || !credentials?.password) return null;

          const res = await axios.post(
            `${process.env.NEXTAUTH_URL}/api/auth/login`,
            credentials
          );

          console.log({ 'res...': res.data });

          if (res.status == 401) {
            throw new Error('Invalid email or password');
          }

          const user = res.data;

          console.log({ 'user...': user });

          if (!user || !user.role) {
            throw new Error(user.message);
          }

          return { ...user, password: null, role: user.role, id: user.id };
        } catch (error: any) {
          console.log({ 'error.....': error.message });
          return Promise.reject(new Error(error.message));
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log({ token: token, user: user });

      if (user) {
        token.role = user.role;
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      console.log('session user ', session.user);
      return session;
    }
  },
  pages: {
    signIn: '/'
  }
};
