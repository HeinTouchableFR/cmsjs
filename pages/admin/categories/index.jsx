import React, { useEffect, useState } from 'react';
import Header from 'components/Header/Header';
import Head from 'next/head';
import Content from 'components/Content/Content';
import styles from '../../style/Table.module.scss';
import { ActionButton, ActionButtonNoLink } from 'components/Button/ActionButton/ActionButton';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Button, Confirm } from 'semantic-ui-react';

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
            const deleted = await fetch(`${process.env.URL}/api/${url}/${itemToDelete._id}`, {
                method: 'Delete',
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
                <title>Catégories</title>
            </Head>
            <Header>
                <Content title='Catégories' icon='fa-folder' url={url}>
                    {errors}
                    <table className={styles.table + ' ' + styles.tableStriped}>
                        <thead className={styles.thead}>
                            <tr>
                                <th className={styles.th} scope='col'>
                                    Id
                                </th>
                                <th className={styles.th} scope='col'>
                                    Nom
                                </th>
                                <th className={styles.th} scope='col'>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
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
            <tr className={styles.tr}>
                <td scope='row' className={styles.td}>
                    {item._id}
                </td>
                <td className={styles.td}>
                    {categorieParent ? tiret : ''} {item.nom}
                </td>
                <td className={styles.td}>
                    <ActionButton url={url} style={'voir'} icon={'fa-eye'} action={'voir'} id={item._id} />
                    <ActionButton url={url} style={'modifier'} icon={'fa-pen'} action={'modifier'} id={item._id} />
                    <ActionButtonNoLink style={'supprimer'} icon={'fa-trash'} onClick={() => handleDelete(item)} />
                </td>
            </tr>
            {item.categoriesEnfantData &&
                item.categoriesEnfantData.map((itemE) => (
                    <Categorie handleDelete={handleDelete} item={itemE} url={url} categorieParent={item} tiret={tiret} key={itemE._id} />
                ))}
        </>
    );
};

export async function getServerSideProps() {
    let items = [];
    let errors = [];

    await axios
        .get(process.env.URL + '/api/categories/admin')
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
