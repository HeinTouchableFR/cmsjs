import React from 'react';
import nookies from 'nookies';
import { auth } from 'utils/dbConnect';


export const getServerSideProps = async (ctx) => {
    try {
        const cookies = nookies.get(ctx);
        const token = await auth.verifyIdToken(cookies.token);

        if (!token.roles.some((r) => ['admin', 'editor', 'moderator'].includes(r))) {
            throw new Error('unauthorized');
        }

        return {
            redirect: {
                permanent: true,
                destination: '/admin/dashboard',
            },
            props: {},
        };
    } catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: '/admin/login',
            },
            props: {},
        };
    }
};
