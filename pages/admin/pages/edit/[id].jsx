import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Head from 'next/head';
import axios from 'axios';
import nookies from 'nookies';

import {auth, db} from 'utils/dbConnect';
import Builder from 'container/Builder/Builder';

export default function Edit({ item, pages, images }) {
    const url = 'pages';

    const intl = useIntl();

    const [post, setPost] = useState(item);
    const [imagesList, setImagesList] = useState(JSON.parse(images))
    const [loading, setLoading] = useState(false);

    const onSubmit = async function (e, content) {
        setLoading(true);
        const res = await fetch(`/api/pages/${item._id}`, {
            body: JSON.stringify({
                title: e.title,
                slug: e.slug,
                updated: new Date(),
                content: JSON.stringify(content),
                parentPage: e.parentPage,
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
                    {item.title}
                </title>
            </Head>
            <Builder url={url} pages={pages} page={post} loading={loading} onSubmit={onSubmit} setImages={setImagesList} images={imagesList} />
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
            .get(process.env.URL + '/api/pages/' + id)
            .then((res) => {
                item = res.data.data;
            })
            .catch((error) => {
                errors = JSON.stringify(error);
            });

        let pages = [];

        await axios
            .get(process.env.URL + '/api/pages/')
            .then((res) => {
                pages = res.data.data;
            })
            .catch((error) => {
                console.log(error);
            });

        let images = []
        const imagesSnapshot = await db.collection('images').orderBy('created_at', 'desc').get()
        imagesSnapshot.docs.map(snapshot => {
            const item = {
                _id: snapshot.id,
                ...snapshot.data()
            }
            images.push(item)
        })

        return {
            props: { item, errors, pages, images: JSON.stringify(images) },
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
