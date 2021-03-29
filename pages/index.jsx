import React, {useState} from 'react';
import Header from 'container/Sites/Header/Header';
import RenderPage from '../container/RenderPage/RenderPage';
import {db} from '../utils/dbConnect';
import {useSiteName} from 'context/siteName';

export default function Home({post}) {
    const {siteName} = useSiteName()

    const [showRender, setShowRender] = useState(false)


    return (
        <>
            <Header title={`HomePage | ${siteName}`} setShowRender={setShowRender} showRender={showRender}/>
            <div className='container'>
                <RenderPage page={post} showRender={showRender}/>
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
        props: {post},
    };
}
