import React, {useState} from 'react';
import Head from 'next/head';
import Builder from 'container/Builder/Builder';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Ajouter({pages}) {
    const url = 'pages';

    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const onSubmit = async function (e, content) {
        setLoading(true)
        const res = await fetch('/api/pages', {
            body: JSON.stringify({
                title: e.title,
                slug: e.slug,
                author: "A faire",
                published: new Date(),
                content: JSON.stringify(content),
                parentPage: e.parentPage
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        const result = await res.json()
        console.log(result)
        setPost(result)
        setLoading(false)
        router.push(`/admin/${url}/edit/${result.data._id}`);
    }

    return (
        <>
            <Head>
                <title>Add new page</title>
            </Head>
            <Builder url={url} onSubmit={onSubmit} pages={pages} page={post} loading={loading}/>
        </>
    );
}


export async function getServerSideProps() {
    let pages = [];

    await axios
        .get(process.env.URL + '/api/pages')
        .then((res) => {
            pages = res.data.data;
        })
        .catch((error) => {});

    return {
        props: { pages },
    };
}
