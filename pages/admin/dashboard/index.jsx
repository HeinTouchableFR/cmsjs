import React, { useEffect } from 'react';
import Head from 'next/head';
import nookies from 'nookies';
import Admin from 'container/Admin/Admin';
import {
    getSession, signIn, useSession,
} from 'next-auth/client';
import styles from './dashboard.module.scss';

export default function Index() {
    const [session] = useSession();

    useEffect(async () => {
        if (!session) {
            await signIn();
        }
    }, [session]);

    return (
        <>
            {session && (
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
            )}
        </>
    );
}

export async function getServerSideProps(ctx) {
    const authorized = ['ADMIN', 'EDITOR', 'MODERATOR'];
    const session = await getSession(ctx);
    if (session && !authorized.includes(session.user.role)) {
        return {
            props: {
            },
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    const cookies = nookies.get(ctx);
    const token = process.env.NODE_ENV === 'production' ? cookies['__Secure-next-auth.session-token'] : cookies['next-auth.session-token']

    if (token) {
        // TODO
    }

    return {
        props: {
            session,
        },
    };
}
