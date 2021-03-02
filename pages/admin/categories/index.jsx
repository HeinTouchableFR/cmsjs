import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Confirm } from 'semantic-ui-react';

import Header from 'components/Header/Header';
import Content from 'components/Content/Content';
import { ActionButton, ActionButtonNoLink } from 'components/Button/ActionButton/ActionButton';
import nookies from 'nookies';
import {admin} from '../../../utils/dbConnect';

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
                method: 'DELETE'
            })
            setIsDeleting(false)
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
                <title>Catégories</title>
            </Head>
            <Header>
                <Content title='Catégories' icon='fa-folder' url={url}>
                    {errors}
                    <table className={"table tableStriped"}>
                        <thead className={"thead"}>
                            <tr>
                                <th className={"th"} scope='col'>
                                    Id
                                </th>
                                <th className={"th"} scope='col'>
                                    Nom
                                </th>
                                <th className={"th"} scope='col'>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className={"tbody"}>
                            {items && items.map((item) => <Categorie item={item} url={url} key={item._id} handleDelete={open} />)}
                        </tbody>
                    </table>
                    <Confirm
                        open={confirm}
                        onCancel={close}
                        onConfirm={handleDelete}
                        content='Êtes-vous sûr de vouloir supprimer cet élément ?'
                        cancelButton='Non'
                        confirmButton='Oui'
                    />
                </Content>
            </Header>
        </>
    );
}

const Categorie = function ({ item, url, categorieParent, tiret = '', handleDelete }) {
    if (categorieParent) {
        tiret += ' — ';
    }

    return (
        <>
            <tr className={"tr"}>
                <td scope='row' className={"td"}>
                    {item._id}
                </td>
                <td className={"td"}>
                    {categorieParent ? tiret : ''} {item.nom}
                </td>
                <td className={"td"}>
                    <ActionButton url={url} style={'show'} icon={'fa-eye'} action={'show'} id={item._id} />
                    <ActionButton url={url} style={'edit'} icon={'fa-pen'} action={'edit'} id={item._id} />
                    <ActionButtonNoLink style={'delete'} icon={'fa-trash'} onClick={() => handleDelete(item)} />
                </td>
            </tr>
            {item.categoriesEnfantData &&
                item.categoriesEnfantData.map((itemE) => (
                    <Categorie handleDelete={handleDelete} item={itemE} url={url} categorieParent={item} tiret={tiret} key={itemE._id} />
                ))}
        </>
    );
};

export async function getServerSideProps(ctx) {
    try {
        const cookies = nookies.get(ctx);
        const token = await admin.auth().verifyIdToken(cookies.token);

        if(!token.roles.some(r=> ["admin", "editor", "moderator"].includes(r))){
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
                destination: "/admin/login",
            },
            props: {},
        };
    }
}
