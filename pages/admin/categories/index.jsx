import React, {
    useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import nookies from 'nookies';
import { auth } from 'utils/dbConnect';
import Table from 'components/Table/Table';
import Category from 'components/rowTemplate/Category/Category';
import Admin from 'container/Admin/Admin';
import Card from 'components/Cards/Card/Card';
import Confirm from 'components/Confirm/Confirm';

export default function Index({items}) {
    const intl = useIntl();
    const url = 'categories';
    const router = useRouter();

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

    const [isDeleting, setIsDeleting] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [itemToDelete, setItemToDelete] = useState({});

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
                        id: 'categories', defaultMessage: 'Categories',
                    })}
                </title>
            </Head>
            <Admin>
                <Card
                    color='orange'
                >
                    <Card.Header
                        title={intl.formatMessage({
                            id: 'categories', defaultMessage: 'Categories',
                        })}
                        buttonLabel={intl.formatMessage({
                            id: 'add', defaultMessage: 'Add',
                        })}
                        buttonAction={`/admin/${url}/add`}
                        buttonIcon='las la-plus'
                    />
                    <Card.Body>
                        <Table labels={labels}>
                            {items && items.map((item) => (
                                <Category
                                    item={item}
                                    url={url}
                                    key={item._id}
                                    handleDelete={open}
                                />
                            ))}
                        </Table>
                        <Confirm
                            name='categoriesConfim'
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
            .get(`${process.env.URL}/api/categories`)
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
