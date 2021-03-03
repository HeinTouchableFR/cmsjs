import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Confirm } from 'semantic-ui-react';
import axios from 'axios';
import nookies from 'nookies';

import Header from 'components/Header/Header';
import Content from 'components/Content/Content';
import { ActionButton, ActionButtonNoLink } from 'components/Button/ActionButton/ActionButton';
import { admin } from 'utils/dbConnect';

export default function Index({ items, errors }) {
    const url = 'categories';
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
                    <table className={'table tableStriped'}>
                        <thead className={'thead'}>
                            <tr>
                                <th className={'th'} scope='col'>
                                    Id
                                </th>
                                <th className={'th'} scope='col'>
                                    Name
                                </th>
                                <th className={'th'} scope='col'>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className={'tbody'}>
                            {items && items.map((item) => <Category item={item} url={url} key={item._id} handleDelete={open} />)}
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

const Category = function ({ item, url, parentCategory, dash = '', handleDelete }) {
    if (parentCategory) {
        dash += ' — ';
    }

    return (
        <>
            <tr className={'tr'}>
                <td scope='row' className={'td'}>
                    {item._id}
                </td>
                <td className={'td'}>
                    {parentCategory ? dash : ''} {item.name}
                </td>
                <td className={'td'}>
                    <ActionButton url={url} style={'show'} icon={'fa-eye'} action={'show'} id={item._id} />
                    <ActionButton url={url} style={'edit'} icon={'fa-pen'} action={'edit'} id={item._id} />
                    <ActionButtonNoLink style={'delete'} icon={'fa-trash'} onClick={() => handleDelete(item)} />
                </td>
            </tr>
            {item.childCategoriesData &&
                item.childCategoriesData.map((child) => (
                    <Category handleDelete={handleDelete} item={child} url={url} parentCategory={item} dash={dash} key={child._id} />
                ))}
        </>
    );
};

export async function getServerSideProps(ctx) {
    try {
        const cookies = nookies.get(ctx);
        const token = await admin.auth().verifyIdToken(cookies.token);

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
