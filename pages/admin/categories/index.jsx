import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Confirm } from 'semantic-ui-react';
import axios from 'axios';
import nookies from 'nookies';

import { auth } from 'utils/dbConnect';

import Header from 'components/Header/Header';
import Content from 'components/Content/Content';
import Table from 'components/Table/Table';
import Category from 'components/rowTemplate/Category/Category';

export default function Index({ items, errors }) {
    const url = 'categories';
    const router = useRouter();

    const labels = [
        { id: 'id', defaultMessage: 'Id' },
        { id: 'name', defaultMessage: 'Name' },
        { id: 'actions', defaultMessage: 'Actions' },
    ];

    const [isDeleting, setIsDeleting] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [itemToDelete, setItemToDelete] = useState({});

    const open = function (item) {
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
                <title>Categories</title>
            </Head>
            <Header>
                <Content title='Categories' icon='fa-folder' url={url}>
                    {errors}
                    <Table labels={labels}>
                        {items && items.map((item) => <Category item={item} url={url} key={item._id} handleDelete={open} />)}
                    </Table>
                    <Confirm
                        open={confirm}
                        onCancel={close}
                        onConfirm={handleDelete}
                        content='Are you sure you want to delete this item?'
                        cancelButton='No'
                        confirmButton='Yes'
                    />
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
            .get(process.env.URL + '/api/categories')
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
