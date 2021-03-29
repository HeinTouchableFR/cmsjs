import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Head from 'next/head';
import axios from 'axios';
import nookies from 'nookies';
import {auth} from 'utils/dbConnect';
import Builder from 'container/Builder/Builder';
import defaultComponents from 'variables/components'

export default function Edit({ item, images }) {
    const url = 'templates';

    const intl = useIntl();

    const [post, setPost] = useState(item);
    const [imagesList, setImagesList] = useState(JSON.parse(images))
    const [loading, setLoading] = useState(false);

    const onSubmit = async function (e, content) {
        setLoading(true);
        console.log(item._id)
        const res = await fetch(`/api/templates/${item._id}`, {
            body: JSON.stringify({
                content: JSON.stringify(content),
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
        });

        const result = await res.json();
        setPost(result.data);
        setLoading(false);
    };

    return (
        <>
            <Head>
                <title>
                    {intl.formatMessage({ id: 'page.edit', defaultMessage: 'Edit' })}
                    {': '}
                    {item.name}
                </title>
            </Head>
            <Builder url={url} mode={"template"} page={post} loading={loading} onSubmit={onSubmit} setImages={setImagesList} images={imagesList} modules={defaultComponents.templateComponents(intl)} />
        </>
    );
}

export async function getServerSideProps(ctx) {
    try {
        const cookies = nookies.get(ctx);
        const token = await auth.verifyIdToken(cookies.token);

        if (!token.roles.some((r) => ['admin', 'editor', 'moderator'].includes(r))) {
            throw new Error('unauthorized');
        }

        const { id } = ctx.params;

        let item = {};
        let errors = [];

        await axios
            .get(process.env.URL + '/api/templates/' + id)
            .then((res) => {
                item = res.data.data;
            })
            .catch((error) => {
                errors = JSON.stringify(error);
            });

        let images = []
        await axios
            .get(process.env.URL + '/api/images')
            .then((res) => {
                images = res.data.data;
            })
            .catch(() => {});

        return {
            props: { item, errors, images: JSON.stringify(images) },
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
