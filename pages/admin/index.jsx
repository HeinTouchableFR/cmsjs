import Head from 'next/head';
import Header from 'components/Header/Header';
import React from 'react';
import nookies from 'nookies';
import {admin} from '../../utils/dbConnect';

export default function HomeAdmin() {
    return (
        <>
            <Head>
                <link
                    rel='stylesheet'
                    href='https://pro.fontawesome.com/releases/v5.10.0/css/all.css'
                    integrity='sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p'
                    crossOrigin='anonymous'
                />
                <title>Administration</title>
            </Head>
            <Header />
        </>
    );
}

export const getServerSideProps = async (ctx) => {
    try {
        const cookies = nookies.get(ctx);
        const token = await admin.auth().verifyIdToken(cookies.token);

        if(!token.roles.some(r=> ["admin", "editor", "moderator"].includes(r))){
            throw new Error('unauthorized');
        }

        return {
            props: {},
        };
    } catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: "/admin/login",
            },
            props: {},
        };
    }
};
