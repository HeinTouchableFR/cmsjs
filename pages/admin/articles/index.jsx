import React, {
    useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
    getSession, signIn, useSession,
} from 'next-auth/client';
import Table from 'components/Table/Table';
import Article from 'components/rowTemplate/Article/Article';
import Admin from 'container/Admin/Admin';
import Card from 'components/Cards/Card/Card';
import Confirm from 'components/Confirm/Confirm';
import PropTypes from 'prop-types';
import Flash from 'components/Flash/Flash';
import nookies from 'nookies';

export default function Index({ items, errors }) {
    const intl = useIntl();
    const router = useRouter();
    const [session] = useSession();

    useEffect(async () => {
        if (!session) {
            await signIn();
        }
    }, [session]);

    const labels = [
        {
            id: 'title', defaultMessage: 'Title',
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

    const [isDeleting, setIsDeleting] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [itemToDelete, setItemToDelete] = useState({
    });
    const [indexErrors, setIndexErrors] = useState(errors);

    const open = (item) => {
        setConfirm(true);
        setItemToDelete(item);
    };

    const close = () => setConfirm(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    };

    const deleteElement = async () => {
        try {
            setItemToDelete({
            });
            const res = await fetch(`${process.env.SERVER}/api/posts/${itemToDelete.id}`, {
                method: 'DELETE',
                credentials: 'same-origin',
            });
            setIsDeleting(false);
            const result = await res.json();
            if (result.success) {
                await router.push('/admin/articles');
            } else {
                setIndexErrors([result.errors]);
            }
        } catch (err) {
            setIndexErrors([err]);
        }
    };

    useEffect(async () => {
        if (isDeleting) {
            await deleteElement();
        }
    }, [isDeleting]);

    return (
        <>
            {session && (
                <>
                    <Head>
                        <title>
                            {intl.formatMessage({
                                id: 'articles', defaultMessage: 'Articles',
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
                            color='grey'
                        >
                            <Card.Header
                                title={intl.formatMessage({
                                    id: 'articles', defaultMessage: 'Articles',
                                })}
                                buttonLabel={intl.formatMessage({
                                    id: 'add', defaultMessage: 'Add',
                                })}
                                buttonAction='/admin/posts/add?postType=ARTICLE'
                                buttonIcon='fas fa-plus'
                            />
                            <Card.Body>
                                <Table labels={labels}>
                                    {items && items.map((item) => (
                                        <Article
                                            item={item}
                                            key={item.id}
                                            handleDelete={open}
                                        />
                                    ))}
                                </Table>
                                <Confirm
                                    name='pagesConfirm'
                                    open={confirm}
                                    onCancel={close}
                                    onConfirm={handleDelete}
                                    content={intl.formatMessage({
                                        id: 'item.deleteSentence',
                                        defaultMessage: 'Are you sure you want to delete this item?',
                                    })}
                                    cancelButton={intl.formatMessage({
                                        id: 'no', defaultMessage: 'No',
                                    })}
                                    confirmButton={intl.formatMessage({
                                        id: 'yes', defaultMessage: 'Yes',
                                    })}
                                />
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
        const resArticles = await fetch(`${process.env.SERVER}/api/posts?type=ARTICLE`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'same-origin',
        });
        const data = await resArticles.json();
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
