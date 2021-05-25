import React, {useEffect, useState} from 'react';
import { useIntl } from 'react-intl';
import Head from 'next/head';
import nookies from 'nookies';
import Table from 'components/Table/Table';
import Template from 'components/rowTemplate/Template/Template';
import Admin from 'container/Admin/Admin';
import Card from 'components/Cards/Card/Card';
import {
    getSession, signIn, useSession,
} from 'next-auth/client';
import Flash from 'components/Flash/Flash';
import PropTypes from 'prop-types';

export default function Index({ items, errors }) {
    const intl = useIntl();
    const [session] = useSession();

    useEffect(() => {
        if (!session) {
            signIn();
        }
    }, [session]);

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
    const [indexErrors, setIndexErrors] = useState(errors);

    return (
        <>
            {session && (
                <>
                    <Head>
                        <title>
                            {intl.formatMessage({
                                id: 'templates', defaultMessage: 'Templates',
                            })}
                        </title>
                    </Head>
                    <Admin>
                        {indexErrors
                        && indexErrors.map((error, index) => (
                            <Flash
                                key={index}
                                error={error}
                            />
                        ))}
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
                                            key={item.id}
                                        />
                                    ))}
                                </Table>
                            </Card.Body>
                        </Card>
                    </Admin>
                </>
            )}
        </>
    );
}

Index.propTypes = {
    items: PropTypes.oneOfType([
        PropTypes.shape({
        }),
        PropTypes.arrayOf(PropTypes.shape({
        })),
    ]).isRequired,
    errors: PropTypes.oneOfType([
        PropTypes.shape({
        }),
        PropTypes.arrayOf(PropTypes.shape({
        })),
    ]).isRequired,
};

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

    const errors = [];
    let items = [];

    if (token) {
        const resPages = await fetch(`${process.env.SERVER}/api/templates`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'same-origin',
        });
        const data = await resPages.json();
        if (data.success) {
            items = data.data;
        } else {
            errors.push(data.errors);
        }
    }

    return {
        props: {
            items,
            errors,
            session,
        },
    };
}
