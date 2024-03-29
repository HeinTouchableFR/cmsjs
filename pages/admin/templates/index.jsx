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
            id: 'title', defaultMessage: 'Title',
        },
        {
            id: 'type', defaultMessage: 'Type',
        },
        {
            id: 'author', defaultMessage: 'Author',
        },
        {
            id: 'date', defaultMessage: 'Date',
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
                                buttonLabel={intl.formatMessage({
                                    id: 'add', defaultMessage: 'Add',
                                })}
                                buttonAction='/admin/posts/add?postType=HEADER'
                                buttonIcon='fas fa-plus'
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
        const resHeader = await fetch(`${process.env.SERVER}/api/posts?type=HEADER`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'same-origin',
        });
        const dataHeader = await resHeader.json();
        if (dataHeader.success) {
            items = dataHeader.data;
        } else {
            errors.push(dataHeader.errors);
        }

        const resFooter = await fetch(`${process.env.SERVER}/api/posts?type=FOOTER`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'same-origin',
        });
        const dataFooter = await resFooter.json();
        if (dataFooter.success) {
            items = [...items, ...dataFooter.data];
        } else {
            errors.push(dataFooter.errors);
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
