import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header/header.component';
import Head from 'next/head';
import Content from '../../../components/Content/content.component';
import styles from '../../style/table.module.scss';
import { ActionBouton, ActionBoutonNoLink } from '../../../components/Bouton/ActionBouton';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Confirm } from 'semantic-ui-react';

export default function Index({ items }) {
    const url = 'produits';
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
                    <table className={styles.table + ' ' + styles.tableStriped}>
                        <thead className={styles.thead}>
                            <tr>
                                <th className={styles.th} scope='col'>
                                    Id
                                </th>
                                <th className={styles.th} scope='col'>
                                    Image
                                </th>
                                <th className={styles.th} scope='col'>
                                    Nom
                                </th>
                                <th className={styles.th} scope='col'>
                                    Prix
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
                <td scope='row' className={styles.td}>
                    <img src={item.imageEnAvant ? item.imageEnAvant.url : '/empty.png'} alt={'Image en avant ' + item.nom} width={120} height={120} />
                </td>
                <td className={styles.td}>{item.nom}</td>
                <td className={styles.td}>{item.prix}</td>
                <td className={styles.td}>
                    <ActionBouton url={url} style={'voir'} icon={'fa-eye'} action={'voir'} id={item._id} />
                    <ActionBouton url={url} style={'modifier'} icon={'fa-pen'} action={'modifier'} id={item._id} />
                    <ActionBoutonNoLink style={'supprimer'} icon={'fa-trash'} onClick={() => handleDelete(item)} />
                </td>
            </tr>
        </>
    );
};

export async function getServerSideProps() {
    let items = [];
    let errors = [];

    await axios
        .get(process.env.URL + '/api/produits')
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
