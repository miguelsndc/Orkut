import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import Providers from 'next-auth/providers';

const options: NextAuthOptions = {
	providers: [
		Providers.GitHub({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
	],
	session: {
		jwt: true,
	},

	callbacks: {
		jwt: async (token, user, account, profile, isNewUser) => {
			if (account?.accessToken) token.accessToken = account.accessToken;
			return token;
		},
		session: async (session, token) => {
			session.accessToken = token.accessToken;
			return session;
		},
	},
};

export default (req: NextApiRequest, res: NextApiResponse) =>
	NextAuth(req, res, options);
