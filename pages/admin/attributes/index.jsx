import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Confirm } from 'semantic-ui-react';

import Header from 'components/Header/Header';
import Content from 'components/Content/Content';
import { ActionButton, ActionButtonNoLink } from 'components/Button/ActionButton/ActionButton';

export default function Index({ items, errors }) {
    const url = 'attributes';
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
            const response = await fetch(`${process.env.URL}/api/${url}/${itemToDelete._id}`, {
                method: 'DELETE'
            });
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
                <title>Attributes</title>
            </Head>
            <Header>
                <Content title='Attributes' icon='fa-cubes' url={url}>
                    {errors}
                    <table className={"table tableStriped"}>
                        <thead className={"thead"}>
                            <tr>
                                <th className={"th"} scope='col'>
                                    Id
                                </th>
                                <th className={"th"} scope='col'>
                                    Name
                                </th>
                                <th className={"th"} scope='col'>
                                    Number of value(s)
                                </th>
                                <th className={"th"} scope='col'>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className={"tbody"}>
                            {items && items.map((item) => <Attribute item={item} url={url} key={item._id} handleDelete={open} />)}
                        </tbody>
                    </table>
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

const Attribute = function ({ item, url, handleDelete }) {
    return (
        <>
            <tr className={"tr"}>
                <td scope='row' className={"td"}>
                    {item._id}
                </td>
                <td className={"td"}>{item.name}</td>
                <td className={"td"}>{item.values.length}</td>
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
        .get(process.env.URL + '/api/attributes')
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
