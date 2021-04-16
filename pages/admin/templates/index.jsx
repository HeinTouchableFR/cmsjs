import React from 'react';
import { useIntl } from 'react-intl';
import Head from 'next/head';
import axios from 'axios';
import nookies from 'nookies';
import { auth } from 'utils/dbConnect';
import Table from 'components/Table/Table';
import Template from 'components/rowTemplate/Template/Template';
import Admin from 'container/Admin/Admin';
import Card from 'components/Cards/Card/Card';

export default function Index({items}) {
    const intl = useIntl();
    const url = 'templates';

    const labels = [
        {
            id: 'id', defaultMessage: 'Id',
        },
        {
            id: 'name', defaultMessage: 'Name',
        },
        {
            id: 'actions', defaultMessage: 'Actions',
        },
    ];

    return (
        <>
            <Head>
                <title>
                    {intl.formatMessage({
                        id: 'templates', defaultMessage: 'Templates',
                    })}
                </title>
            </Head>
            <Admin>
                <Card
                    color='red'
                >
                    <Card.Header
                        title={intl.formatMessage({
                            id: 'templates', defaultMessage: 'Templates',
                        })}
                    />
                    <Card.Body>
                        <Table labels={labels}>
                            {items && items.map((item) => (
                                <Template
                                    item={item}
                                    url={url}
                                    key={item._id}
                                />
                            ))}
                        </Table>
                    </Card.Body>
                </Card>
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

        let items = [];
        await axios
            .get(`${process.env.URL}/api/templates`)
            .then((res) => {
                items = res.data.data;
            })
            .catch((error) => {
            });

        return {
            props: {
                items,
            },
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
