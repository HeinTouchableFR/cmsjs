import React, {useState} from 'react';
import Header from 'container/Sites/Header/Header';
import RenderPage from 'container/RenderPage/RenderPage';
import {db} from '../utils/dbConnect';
import {useSiteName} from 'context/siteName';

export default function Page({post}) {
    const {siteName} = useSiteName()

    const [showRender, setShowRender] = useState(false)

    return (
        <>
            <Header title={`${post.title} | ${siteName}`} setShowRender={setShowRender}/>
            <div className='container'>
                <RenderPage page={post} showRender={showRender}/>
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
