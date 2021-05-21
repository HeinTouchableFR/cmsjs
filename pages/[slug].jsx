import React, {
    useEffect, useState,
} from 'react';
import Header from 'container/Sites/Header/Header';
import RenderPage from 'container/RenderPage/RenderPage';
import { useSettings } from 'context/settings';
import { Global } from '@emotion/react';
import PropTypes from 'prop-types';
import Footer from 'container/Sites/Footer/Footer';

export default function Page({ post }) {
    const { value: settings } = useSettings();
    const [showRender, setShowRender] = useState(false);
    const [params, setParams] = useState(post.params ? JSON.parse(post.params) : {
    });

    useEffect(() => {
        setParams(post.params ? JSON.parse(post.params) : {
        });
    }, [post]);

    return (
        <>
            <Header
                settings={settings}
                setShowRender={setShowRender}
                showRender={showRender}
                post={post}
            />
            <Global
                styles={{
                    body: {
                        background: params.background,
                    },
                }}
            />
            <RenderPage
                page={post}
                showRender={showRender}
            />
            <Footer
                showRender={showRender}
                setShowRender={setShowRender}
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

export async function getServerSideProps({ params, res }) {
    const { slug } = params;
    let post = [];
    const errors = [];

    const resItem = await fetch(`${process.env.URL}/api/pages/slug/${slug}`, {
        credentials: 'same-origin',
    });
    const dataItem = await resItem.json();
    if (dataItem.success) {
        post = dataItem.data;
    } else {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            post,
            errors,
        },
    };
}
