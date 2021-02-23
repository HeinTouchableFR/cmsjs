import React, {useState} from 'react';
import Head from 'next/head';
import Builder from 'container/Builder/Builder';
import axios from 'axios';

export default function Edit({item, pages}) {
    const url = 'pages';

    const [post, setPost] = useState(item)
    const [loading, setLoading] = useState(false)

    /*const onSubmit = async function (e, content) {
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
        setPost(result.data)
        setLoading(false)
    }*/

    return (
        <>
            <Head>
                <title>Edit {item.title}</title>
            </Head>
            <Builder url={url} pages={pages} page={post} loading={loading}/>
        </>
    );
}


export async function getServerSideProps({ params }) {
    const { id } = params;

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

    return {
        props: { item, errors, pages },
    };
}
