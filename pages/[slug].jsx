import React, {useState} from 'react';
import Header from 'container/Sites/Header/Header';
import createCache from '@emotion/cache'
import {CacheProvider} from '@emotion/react';
import RenderPage from 'container/RenderPage/RenderPage';
import {db} from '../utils/dbConnect';
import {useSiteName} from 'context/siteName';

export default function Page({post}) {
    const {siteName} = useSiteName()

    const [showRender, setShowRender] = useState(false)

    const cache = createCache({
        key: post.slug.replace(/[0-9]/g, '')
    })

    return (
        <>
            <Header title={`${post.title} | ${siteName}`} setShowRender={setShowRender}/>
            <div className='container'>
                <CacheProvider value={cache}>
                    <RenderPage page={post} showRender={showRender}/>
                </CacheProvider>
            </div>
        </>
    );
}

export async function getServerSideProps({params}) {
    const {slug} = params;

    const snapshot = await db.collection('pages').where('slug', '==', slug).get();
    const post = {
        _id: snapshot.docs[0].id,
        ...snapshot.docs[0].data(),
    };

    return {
        props: {post},
    };
}
