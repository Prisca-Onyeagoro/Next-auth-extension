import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialProvider from 'next-auth/providers/credentials';
import connect from '@/Database/Connectdb';
import Users from '@/model/Schema';
import { compare } from 'bcryptjs';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        connect().catch((error) => {
          error: 'connection failed...';
        });
        // check if user exits
        const userexist = await Users.findOne({ email: credentials.email });

        if (!userexist) {
          throw new Error('No User Found Please Sign Up');
        }
        // comparing the users password
        const correctpassword = await compare(
          credentials.password,
          userexist.password
        );
        if (!correctpassword || userexist.email !== credentials.email) {
          throw new Error(
            'Invalid password or email, check your input details correctly'
          );
        }

        return userexist;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
