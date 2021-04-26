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
import Footer from '../container/Sites/Footer/Footer';

export default function Home({ post }) {
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
            <Footer
                showRender={showRender}
                setShowRender={setShowRender}
                mode={mode}
            />
        </>
    );
}

Home.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        params: PropTypes.string.isRequired,
    }).isRequired,
};

export async function getServerSideProps() {
    const settingRef = db.collection('settings');
    const generalSnapshot = await settingRef.doc('general').get();
    const generalSettings = {
        ...generalSnapshot.data(),
    };

    const pageRef = db.doc(`pages/${generalSettings.homePage}`);
    const pageSnapshot = await pageRef.get();
    const post = {
        id: pageSnapshot.id,
        ...pageSnapshot.data(),
    };

    return {
        props: {
            post,
        },
    };
}
