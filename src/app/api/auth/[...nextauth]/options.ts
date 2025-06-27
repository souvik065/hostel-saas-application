import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

const ADMIN_API_URL = process.env.ADMIN_API_URL;
const GOOGLE_AUTHORIZATION_URL =
  (process.env.GOOGLE_AUTHORIZATION_URL as string) +
  new URLSearchParams({
    prompt: 'consent',
    access_type: 'offline',
    response_type: 'code',
  });

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ? (process.env.GOOGLE_CLIENT_ID as string) : '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ? (process.env.GOOGLE_CLIENT_SECRET as string) : '',
      authorization: GOOGLE_AUTHORIZATION_URL,
      accessTokenUrl: process.env.GOOGLE_ACCESSTOKEN_URL ? (process.env.GOOGLE_ACCESSTOKEN_URL as string) : '',
      requestTokenUrl: process.env.GOOGLE_REQUESTTOKEN_URL ? (process.env.GOOGLE_REQUESTTOKEN_URL as string) : '',
    }),
  ],
  secret: process.env.NEXTAUTH_URL,
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        let userRole = "";
        const headers = {
          Accept: 'application/json',
          'content-type': 'application/json',
        };
        const response = await axios.get(`${ADMIN_API_URL}/api/admin/GetUserRoleByEmail?Email=${user?.email}`, {
          headers,
        });
        
        if (response?.data?.data) {
          userRole = response?.data?.data;
        } else {
          throw new Error('Unauthorized');
        }
        if (account) {
          if (userRole !== "") {
            account.userRole = userRole;
            return true;
          } else {
            return false;
          }
        }
        return false;
      } catch (error) {
        console.error('error', error);
        throw new Error('Unauthorized');
      }
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.userRole = account.userRole;
      }
      // Return previous token if the access token has not expired yet
      const tokenExpires = Date.now() + (account?.expires_at || 0) * 1000;
      if (Date.now() < tokenExpires) {
        return token;
      }

      return token;
    },
    async session({ session, token }) {
      if (session) {
        const { userRole, idToken } = token;
        session.userRole = typeof userRole === 'string' || userRole === null ? userRole || 'Guest' : 'Guest';
        session.token = typeof idToken === 'string' || idToken === null ? idToken || 'Guest' : 'Guest';
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      const redirectUrl = `${baseUrl}/user-selection`;
      return redirectUrl;
    },
  },
};
