import React, {
    useEffect, useState,
} from 'react';
import Header from 'container/Sites/Header/Header';
import { useSettings } from 'context/settings';
import { Global } from '@emotion/react';
import RenderPage from 'container/RenderPage/RenderPage';
import { db } from 'utils/dbConnect';
import useDarkMode from 'variables/darkMode';
import PropTypes from 'prop-types';

export default function Home({ post }) {
    const { settings } = useSettings();
    const [showRender, setShowRender] = useState(false);
    const [params, setParams] = useState(post.params ? JSON.parse(post.params) : {
    });
    const mode = useDarkMode(params);

    useEffect(() => {
        setParams(post.params ? JSON.parse(post.params) : {
        });
    }, [post]);

    return (
        <>
            <Header
                title='HomePage'
                settings={settings}
                setShowRender={setShowRender}
                showRender={showRender}
            />
            <Global
                styles={{
                    body: {
                        background: params.background && params.background[mode],
                    },
                }}
            />
            <div className='container'>
                <RenderPage
                    page={post}
                    showRender={showRender}
                />
            </div>
        </>
    );
}

Home.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        params: PropTypes.shape({
            background: PropTypes.shape({
            }).isRequired,
        }).isRequired,
    }).isRequired,
};

export async function getServerSideProps() {
    const settingRef = db.collection('settings');
    const homepageSnapshot = await settingRef.doc('homepage').get();
    const homepage = {
        ...homepageSnapshot.data(),
    };

    const pageRef = db.doc(`pages/${homepage.value}`);
    const pageSnapshot = await pageRef.get();
    const post = {
        _id: pageSnapshot.id,
        ...pageSnapshot.data(),
    };

    return {
        props: {
            post,
        },
    };
}
