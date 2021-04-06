import React from 'react';
import Head from 'next/head';
import nookies from 'nookies';
import { auth } from 'utils/dbConnect';
import styles from './dashboard.module.scss';
import Admin from 'container/Admin/Admin';
import RecentOrders from 'components/Dashboard/RecentOrders/RecentOrders';
import NewCustomers from 'components/Dashboard/NewCustomers/NewCustomers';
import Cards from 'components/Cards/Cards';
import Single from 'components/Cards/Single/Single';

export default function Index() {

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <Admin>
                <Cards>
                    <Single number={54} label={"Customers"} icon={"las la-users"} />
                    <Single number={79} label={"Projects"} icon={"las la-clipboard"} />
                    <Single number={124} label={"Orders"} icon={"las la-shopping-bag"} />
                    <Single number={"6000 €"} label={"Income"} icon={"lab la-google-wallet"} />
                </Cards>
                <div className={styles.recent_grid}>
                    <RecentOrders/>
                    <NewCustomers/>
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
