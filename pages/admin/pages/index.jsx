import React, {
    useEffect, useState,
} from 'react';
import {useIntl} from 'react-intl';
import Head from 'next/head';
import {useRouter} from 'next/router';
import axios from 'axios';
import {Confirm} from 'semantic-ui-react';
import nookies from 'nookies';
import {auth} from 'utils/dbConnect';
import Table from 'components/Table/Table';
import Page from 'components/rowTemplate/Page/Page';
import Admin from 'container/Admin/Admin';
import Card from 'components/Cards/Card/Card';

export default function Index({items}) {
    const intl = useIntl();
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
    const [confirmCannotDelete, setConfirmCannotDelete] = useState(false);
    const [itemToDelete, setItemToDelete] = useState({});

    const open = function (item, canDelete = false) {
        if (canDelete) {
            setConfirm(true);
            setItemToDelete(item);
        } else {
            setConfirmCannotDelete(true);
        }
    };

    const close = () => setConfirm(false);
    const closeCannotDelete = () => setConfirmCannotDelete(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    };

    const deleteElement = async () => {
        try {
            setItemToDelete({});
            await fetch(`${process.env.URL}/api/${url}/${itemToDelete._id}`, {
                method: 'DELETE',
            });
            setIsDeleting(false);
            router.push(`/admin/${url}`);
        } catch (error) {
            console.log(error);
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
                                    key={item._id}
                                    handleDelete={open}
                                />
                            ))}
                        </Table>
                        <Confirm
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
                        <Confirm
                            open={confirmCannotDelete}
                            onConfirm={closeCannotDelete}
                            onCancel={closeCannotDelete}
                            content={intl.formatMessage({
                                id: 'page.cantDeleteChildren',
                                defaultMessage:
                                    'You cannot delete a page that has children. Please delete child pages or edit the parent page for each child.',
                            })}
                        />
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
            .get(`${process.env.URL}/api/pages`)
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
