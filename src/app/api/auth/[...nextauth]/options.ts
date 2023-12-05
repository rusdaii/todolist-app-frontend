import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 7,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      authorize: async (credentials, req) => {
        const { username, accessToken } = credentials as {
          username: string;
          accessToken: string;
        };

        const user = {
          username: username,
          accessToken: accessToken,
        };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {},
};
