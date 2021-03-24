import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Confirm } from 'semantic-ui-react';

import Header from 'components/Header/Header';
import Content from 'components/Content/Content';
import Table from 'components/Table/Table';
import Attribute from 'components/rowTemplate/Attribute/Attribute';

export default function Index({ items, errors }) {
    const intl = useIntl();
    const url = 'attributes';
    const router = useRouter();

    const labels = [
        { id: 'id', defaultMessage: 'Id' },
        { id: 'name', defaultMessage: 'Name' },
        { id: 'value.nb', defaultMessage: 'Number of value(s)' },
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
            const response = await fetch(`${process.env.URL}/api/${url}/${itemToDelete._id}`, {
                method: 'DELETE',
            });
            setItemToDelete({});
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
                <title>{intl.formatMessage({ id: 'attributes', defaultMessage: 'Attribute' })}</title>
            </Head>
            <Header>
                <Content title={intl.formatMessage({ id: 'attributes', defaultMessage: 'Attributes' })} icon='fa-cubes' url={url}>
                    {errors}
                    <Table labels={labels}>
                        {items && items.map((item) => <Attribute item={item} url={url} key={item._id} handleDelete={open} />)}
                    </Table>
                    <Confirm
                        open={confirm}
                        onCancel={close}
                        onConfirm={handleDelete}
                        content={intl.formatMessage({ id: 'item.deleteSentence', defaultMessage: 'Are you sure you want to delete this item?' })}
                        cancelButton={intl.formatMessage({ id: 'no', defaultMessage: 'No' })}
                        confirmButton={intl.formatMessage({ id: 'yes', defaultMessage: 'Yes' })}
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
