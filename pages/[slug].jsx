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
                title={`${post.title}`}
                settings={settings}
                setShowRender={setShowRender}
                showRender={showRender}
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

export async function getServerSideProps({ params }) {
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
        errors.push({
            ...dataItem.errors,
            request: `${process.env.URL}/api/pages/slug/${slug}`,
        });
    }

    return {
        props: {
            post,
            errors,
        },
    };
}
