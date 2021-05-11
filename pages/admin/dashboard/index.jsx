import React from 'react';
import Head from 'next/head';
import nookies from 'nookies';
import { auth } from 'utils/dbConnect';
import Admin from 'container/Admin/Admin';
import styles from './dashboard.module.scss';

export default function Index() {
    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <Admin>
                <div className={styles.comingsoon}>
                    <span>Coming Soon</span>
                </div>
            </Admin>
        </>
    );
}

export async function getServerSideProps(ctx) {
    try {
        const cookies = nookies.get(ctx);
        const token = await auth.verifyIdToken(cookies.token);

        if (!token.roles.some((r) => ['admin', 'editor', 'moderator'].includes(r))) {
            throw new Error('unauthorized');
        }

        return {
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
}
