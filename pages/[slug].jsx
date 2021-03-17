import React from 'react';
import axios from 'axios';
import Header from 'container/Sites/Header/Header';
import RenderPage from 'container/Builder/RenderPage/RenderPage';
import createCache from '@emotion/cache'
import {CacheProvider} from '@emotion/react';

export default function Page({post}) {

    const cache = createCache({
        key: post.slug.replace(/[0-9]/g, '')
    })

    return (
        <>
            <Header title={post.title}/>
            <div className='container'>
                <CacheProvider value={cache}>
                    <RenderPage page={post}/>
                </CacheProvider>
            </div>
        </>
    );
}

export async function getServerSideProps({params}) {
    const {slug} = params;

    let post = {};
    let success = false;
    let errors = [];

    await axios.get(process.env.URL + '/api/pages/slug/' + slug).then((res) => {
        post = res.data.data;
        success = res.data.success;
    });

    return {
        props: {post},
    };
}
