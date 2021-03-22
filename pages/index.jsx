import React, {useState} from 'react';
import Header from 'container/Sites/Header/Header';
import createCache from '@emotion/cache';
import {CacheProvider} from '@emotion/react';
import RenderPage from '../container/RenderPage/RenderPage';
import {db} from '../utils/dbConnect';
import {useSiteName} from 'context/siteName';

export default function Home({ post }) {
    const {siteName} = useSiteName()

    const [showRender, setShowRender] = useState(false)

    const cache = createCache({
        key: 'homepage'
    })

    return (
        <>
            <Header title={`HomePage | ${siteName}`} setShowRender={setShowRender} />
            <div className='container'>
                <CacheProvider value={cache}>
                    <RenderPage page={post} showRender={showRender}/>
                </CacheProvider>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    const settingRef = db.collection(`settings`)
    const homepageSnapshot = await settingRef.doc(`homepage`).get()
    const homepage = {
        ...homepageSnapshot.data()
    }

    const pageRef = db.doc(`pages/${homepage.value}`)
    const pageSnapshot = await pageRef.get()
    const post = {
        _id: pageSnapshot.id,
        ...pageSnapshot.data()
    }


    return {
        props: { post },
    };
}
