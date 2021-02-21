import Header from 'components/Header/Header';
import React from 'react';
import Head from 'next/head';

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <Header>Dashboard</Header>
        </>
    );
}
