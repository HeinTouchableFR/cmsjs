import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Confirm } from 'semantic-ui-react';

import Header from 'components/Header/Header';
import Content from 'components/Content/Content';
import { ActionButton, ActionButtonNoLink } from 'components/Button/ActionButton/ActionButton';

export default function Index({ items, errors }) {
    const url = 'pages';
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
                <title>Pages</title>
            </Head>
            <Header>
                <Content title='Pages' icon='fa-file-word' url={url}>
                    {errors}
                    <table className={"table tableStriped"}>
                        <thead className={"thead"}>
                        <tr>
                            <th className={"th"} scope='col'>
                                Title
                            </th>
                            <th className={"th"} scope='col'>
                                Author
                            </th>
                            <th className={"th"} scope='col'>
                                Date
                            </th>
                            <th className={"th"} scope='col'>
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className={"tbody"}>
                        {items && items.map((item) => <Page item={item} url={url} key={item._id} handleDelete={open} />)}
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

const Page = function ({ item, url, PageParent, tiret = '', handleDelete }) {
    if (PageParent) {
        tiret += ' — ';
    }

    return (
        <>
            <tr className={"tr"}>
                <td className={"td title"}>
                    {PageParent ? tiret : ''} {item.title}
                </td>
                <td className={"td"}>
                    {item.author}
                </td>
                <td className={"td"}>
                    {item.lastUpdate ?
                        `Updated \n ${new Date(item.lastUpdate).toLocaleDateString()}  ${new Date(item.lastUpdate).toLocaleTimeString()}`
                        :
                        `Published \n ${new Date(item.published).toLocaleDateString()}  ${new Date(item.published).toLocaleTimeString()}`
                    }
                </td>
                <td className={"td"}>
                    <ActionButton url={url} style={'voir'} icon={'fa-eye'} action={'voir'} id={item._id} />
                    <ActionButton url={url} style={'modifier'} icon={'fa-pen'} action={'modifier'} id={item._id} />
                    <ActionButtonNoLink style={'supprimer'} icon={'fa-trash'} onClick={() => handleDelete(item)} />
                </td>
            </tr>
            {item.childPagesData &&
            item.childPagesData.map((itemE) => (
                <Page handleDelete={handleDelete} item={itemE} url={url} PageParent={item} tiret={tiret} key={itemE._id} />
            ))}
        </>
    );
};

export async function getServerSideProps() {
    let items = [];
    let errors = [];

    await axios
        .get(process.env.URL + '/api/pages')
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
