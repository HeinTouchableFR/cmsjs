import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header/Header';
import Head from 'next/head';
import Content from '../../../components/Content/Content';
import styles from '../../style/table.module.scss';
import { ActionButton, ActionButtonNoLink } from '../../../components/Button/ActionButton/ActionButton';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Button, Confirm } from 'semantic-ui-react';

export default function Index({ items, errors }) {
    const url = 'attributs';
    const router = useRouter();

    const [isDeleting, setIsDeleting] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [itemToDelete, setItemToDelete] = useState({});
    const [isItemHasCategorieParent, setIsItemHasCategorieParent] = useState(false);

    const open = function (item) {
        setConfirm(true);
        setItemToDelete(item);
        setIsItemHasCategorieParent(!!item.categorieParent);
    };

    const close = () => setConfirm(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    };

    const deleteElement = async () => {
        try {
            if (isItemHasCategorieParent) {
                const response = await fetch(`${process.env.URL}/api/${url}/${itemToDelete.categorieParent}`);
                const { data: categorieParent } = await response.json();

                categorieParent.categoriesEnfant = categorieParent.categoriesEnfant.filter((i) => i !== itemToDelete._id);

                const res = await fetch(`${process.env.URL}/api/${url}/${categorieParent._id}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(categorieParent),
                });
            }

            const deleted = await fetch(`${process.env.URL}/api/${url}/${itemToDelete._id}`, {
                method: 'Delete',
            });

            setItemToDelete({});
            setIsItemHasCategorieParent(null);

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
                <title>Attributs</title>
            </Head>
            <Header>
                <Content title='Attributs' icon='fa-cubes' url={url}>
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
                                    Nombre de valeur(s)
                                </th>
                                <th className={styles.th} scope='col'>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            {items && items.map((item) => <Item item={item} url={url} key={item._id} handleDelete={open} />)}
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

const Item = function ({ item, url, handleDelete }) {
    return (
        <>
            <tr className={styles.tr}>
                <td scope='row' className={styles.td}>
                    {item._id}
                </td>
                <td className={styles.td}>{item.nom}</td>
                <td className={styles.td}>{item.valeurs.length}</td>
                <td className={styles.td}>
                    <ActionButton url={url} style={'voir'} icon={'fa-eye'} action={'voir'} id={item._id} />
                    <ActionButton url={url} style={'modifier'} icon={'fa-pen'} action={'modifier'} id={item._id} />
                    <ActionButtonNoLink style={'supprimer'} icon={'fa-trash'} onClick={() => handleDelete(item)} />
                </td>
            </tr>
        </>
    );
};

export async function getServerSideProps() {
    let items = [];
    let errors = [];

    await axios
        .get(process.env.URL + '/api/attributs')
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
