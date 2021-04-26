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
import Footer from 'container/Sites/Footer/Footer';

export default function Page({ post }) {
    const { value: settings } = useSettings();
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
            <Footer
                showRender={showRender}
                setShowRender={setShowRender}
                mode={mode}
            />
        </>
    );
}

Page.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        params: PropTypes.string.isRequired,
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
