import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
            session.user.role = user.role;
            session.user.id = user.id;
            return session;
        },
        async jwt(token, user, account, profile, isNewUser) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
    },
});
