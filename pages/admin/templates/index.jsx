import React from 'react';
import { useIntl } from 'react-intl';

import Head from 'next/head';
import axios from 'axios';
import nookies from 'nookies';

import { auth } from 'utils/dbConnect';

import Header from 'components/Header/Header';
import Content from 'components/Content/Content';
import Table from 'components/Table/Table';
import Template from 'components/rowTemplate/Template/Template';

export default function Index({ items, errors }) {
    const intl = useIntl();
    const url = 'templates';

    const labels = [
        { id: 'id', defaultMessage: 'Id' },
        { id: 'name', defaultMessage: 'Name' },
        { id: 'actions', defaultMessage: 'Actions' },
    ];

    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: 'templates', defaultMessage: 'Templates' })}</title>
            </Head>
            <Header>
                <Content title={intl.formatMessage({ id: 'templates', defaultMessage: 'Templates' })} icon='fa-project-diagram' url={url} action={intl.formatMessage({ id: 'templates', defaultMessage: 'Templates' })}>
                    {errors}
                    <Table labels={labels}>
                        {items && items.map((item) => <Template item={item} url={url} key={item._id} />)}
                    </Table>
                </Content>
            </Header>
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

        let items = [];
        let errors = [];

        await axios
            .get(process.env.URL + '/api/templates')
            .then((res) => {
                items = res.data.data;
            })
            .catch((error) => {
                errors = JSON.stringify(error);
            });

        return {
            props: { items, errors },
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
