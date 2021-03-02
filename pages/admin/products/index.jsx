import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Confirm } from 'semantic-ui-react';

import Header from 'components/Header/Header';
import Content from 'components/Content/Content';
import { ActionButton, ActionButtonNoLink } from 'components/Button/ActionButton/ActionButton';

export default function Index({ items }) {
    const url = 'products';
    const router = useRouter();

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
                    <table className={"table tableStriped"}>
                        <thead className={"thead"}>
                            <tr>
                                <th className={"th"} scope='col'>
                                    Id
                                </th>
                                <th className={"th"} scope='col'>
                                    Image
                                </th>
                                <th className={"th"} scope='col'>
                                    Name
                                </th>
                                <th className={"th"} scope='col'>
                                    Price
                                </th>
                                <th className={"th"} scope='col'>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className={"tbody"}>
                            {items && items.map((item) => <Product item={item} url={url} key={item._id} handleDelete={open} />)}
                        </tbody>
                    </table>
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

const Product = function ({ item, url, handleDelete }) {
    return (
        <>
            <tr className={"tr"}>
                <td scope='row' className={"td"}>
                    {item._id}
                </td>
                <td scope='row' className={"td"}>
                    <img src={item.productImage ? item.productImage.url : '/empty.png'} alt={'Product image ' + item.name} width={120} height={120} />
                </td>
                <td className={"td"}>{item.name}</td>
                <td className={"td"}>{item.price} €</td>
                <td className={"td"}>
                    <ActionButton url={url} style={'show'} icon={'fa-eye'} action={'show'} id={item._id} />
                    <ActionButton url={url} style={'edit'} icon={'fa-pen'} action={'edit'} id={item._id} />
                    <ActionButtonNoLink style={'delete'} icon={'fa-trash'} onClick={() => handleDelete(item)} />
                </td>
            </tr>
        </>
    );
};

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
