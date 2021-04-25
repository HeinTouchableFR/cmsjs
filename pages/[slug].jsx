import React, {
    useEffect, useState,
} from 'react';
import Header from 'container/Sites/Header/Header';
import RenderPage from 'container/RenderPage/RenderPage';
import { db } from 'utils/dbConnect';
import { useSettings } from 'context/settings';
import { Global } from '@emotion/react';
import useDarkMode from 'variables/darkMode';
import PropTypes from 'prop-types';

export default function Page({ post }) {
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
                title={`${post.title}`}
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

Page.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        params: PropTypes.shape({
            background: PropTypes.shape({
            }).isRequired,
        }).isRequired,
    }).isRequired,
};

export async function getServerSideProps({ params }) {
    const { slug } = params;

    const snapshot = await db.collection('pages').where('slug', '==', slug).get();
    const post = {
        _id: snapshot.docs[0].id,
        ...snapshot.docs[0].data(),
    };

    return {
        props: {
            post,
        },
    };
}
