import React, {
    useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { auth } from 'utils/dbConnect';
import Table from 'components/Table/Table';
import Page from 'components/rowTemplate/Page/Page';
import Admin from 'container/Admin/Admin';
import Card from 'components/Cards/Card/Card';
import Confirm from 'components/Confirm/Confirm';
import PropTypes from 'prop-types';
import Flash from 'components/Flash/Flash';
import { useAuth } from 'context/auth';

export default function Index({ items, errors }) {
    const intl = useIntl();
    const { user } = useAuth();
    const url = 'pages';
    const router = useRouter();

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
            const res = await fetch(`${process.env.URL}/api/${url}/auth/${itemToDelete.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                credentials: 'same-origin',
            });
            setIsDeleting(false);
            const result = await res.json();
            if (result.success) {
                router.push(`/admin/${url}`);
            } else {
                setIndexErrors([result.errors]);
            }
        } catch (err) {
            setIndexErrors([err]);
        }
    };

    useEffect(() => {
        if (isDeleting) {
            deleteElement();
        }
    }, [isDeleting]);

    return (
        <>
            <Head>
                <title>
                    {intl.formatMessage({
                        id: 'pages', defaultMessage: 'Pages',
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
                            id: 'pages', defaultMessage: 'Pages',
                        })}
                        buttonLabel={intl.formatMessage({
                            id: 'add', defaultMessage: 'Add',
                        })}
                        buttonAction='/admin/pages/add'
                        buttonIcon='las la-plus'
                    />
                    <Card.Body>
                        <Table labels={labels}>
                            {items && items.map((item) => (
                                <Page
                                    item={item}
                                    url={url}
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
                                id: 'item.deleteSentence', defaultMessage: 'Are you sure you want to delete this item?',
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
    try {
        const cookies = nookies.get(ctx);
        const token = await auth.verifyIdToken(cookies.token);

        if (!token.roles.some((r) => ['admin', 'editor', 'moderator'].includes(r))) {
            throw new Error('unauthorized');
        }

        const errors = [];
        let items = [];

        const res = await fetch(`${process.env.URL}/api/pages`, {
            headers: {
                Authorization: `Bearer ${cookies.token}`,
            },
            credentials: 'same-origin',
        });
        const data = await res.json();
        if (data.success) {
            items = data.data;
        } else {
            errors.push(data.errors);
        }

        return {
            props: {
                items,
                errors,
            },
        };
    } catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: '/admin/login',
            },
            props: {
            },
        };
    }
}
