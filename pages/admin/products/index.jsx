import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Confirm } from 'semantic-ui-react';

import Header from 'components/Header/Header';
import Content from 'components/Content/Content';
import Table from 'components/Table/Table';
import Product from 'components/rowTemplate/Product/Product';

export default function Index({ items }) {
    const url = 'products';
    const router = useRouter();

    const labels = [
        { id: 'id', defaultMessage: 'Id' },
        { id: 'image', defaultMessage: 'Image' },
        { id: 'name', defaultMessage: 'Name' },
        { id: 'price', defaultMessage: 'Price' },
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
                <title>Produits</title>
            </Head>
            <Header>
                <Content title='Produits' icon='fa-cubes' url={url}>
                    <Table labels={labels}>
                        {items && items.map((item) => <Product item={item} url={url} key={item._id} handleDelete={open} />)}
                    </Table>
                    <Confirm
                        open={confirm}
                        onCancel={close}
                        onConfirm={handleDelete}
                        content='Are you sure you want to delete this item ?'
                        cancelButton='No'
                        confirmButton='Yes'
                    />
                </Content>
            </Header>
        </>
    );
}

export async function getServerSideProps() {
    let items = [];
    let errors = [];

    await axios
        .get(process.env.URL + '/api/products')
        .then((res) => {
            items = res.data.data;
        })
        .catch((error) => {
            errors = JSON.stringify(error);
        });

    return {
        props: { items, errors },
    };
}