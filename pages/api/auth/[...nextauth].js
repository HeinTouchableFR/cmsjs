import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';

import prisma from 'utils/prisma';

export default NextAuth({
    providers: [
        Providers.Credentials({
            credentials: {
                email: {
                    label: 'Email', type: 'text',
                },
                password: {
                    label: 'Password', type: 'password',
                },
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.SERVER}/api/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                if (data.success) {
                    return data.data;
                }
                return null;
            },
        }),
        Providers.Facebook({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
        }),
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    session: {
        jwt: true,
    },
    adapter: Adapters.Prisma.Adapter({
        prisma,
        modelMapping: {
            User: 'users',
            Account: 'accounts',
            Session: 'sessions',
            VerificationRequest: 'verification_request',
        },
    }),
    secret: process.env.SECRET,
    callbacks: {
        async session(session, user) {
            const newSession = session;
            newSession.user.role = user.role;
            newSession.user.id = user.id;
            return newSession;
        },
        async jwt(token, user) {
            if (user) {
                const newToken = token;
                newToken.role = user.role;
                newToken.id = user.id;

                return newToken;
            }
            return token;
        },
        redirect: async (url, baseUrl) => (url.startsWith(baseUrl)
            ? Promise.resolve(url)
            : Promise.resolve(baseUrl)),
    },
    pages: {
        signIn: '/auth/signin',
    },
});
