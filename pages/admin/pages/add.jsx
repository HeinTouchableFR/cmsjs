import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import nookies from 'nookies';

import Builder from 'container/Builder/Builder';
import {auth, db} from 'utils/dbConnect';

export default function Ajouter({ pages, images }) {
    const url = 'pages';

    const intl = useIntl();

    const [post, setPost] = useState({});
    const [imagesList, setImagesList] = useState(JSON.parse(images))
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async function (e, content) {
        setLoading(true);
        const res = await fetch('/api/pages', {
            body: JSON.stringify({
                title: e.title,
                slug: e.slug,
                author: 'A faire',
                published: new Date(),
                content: JSON.stringify(content),
                parentPage: e.parentPage,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });

        const result = await res.json();
        setPost(result);
        setLoading(false);
        router.push(`/admin/${url}/edit/${result.data._id}`);
    };

    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: 'page.addNew', defaultMessage: 'Add a new page' })}</title>
            </Head>
            <Builder url={url} onSubmit={onSubmit} pages={pages} page={post} loading={loading} images={imagesList} setImages={setImagesList} />
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

        let pages = [];

        await axios
            .get(process.env.URL + '/api/pages')
            .then((res) => {
                pages = res.data.data;
            })
            .catch((error) => {});

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
            props: { pages, images: JSON.stringify(images) },
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
