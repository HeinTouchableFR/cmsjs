import React, {
    useEffect, useState,
} from 'react';
import Header from 'container/Sites/Header/Header';
import RenderPost from 'container/RenderPost/RenderPost';
import { useSettings } from 'context/settings';
import { Global } from '@emotion/react';
import PropTypes from 'prop-types';
import Footer from 'container/Sites/Footer/Footer';

export default function Page({ post, templates }) {
    const { value: settings } = useSettings();
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
                post={post}
                template={templates.header}
                isHomePage
            />
            <Global
                styles={{
                    body: {
                        background: params.background,
                    },
                }}
            />
            <RenderPost
                post={post}
            />
            <Footer
                template={templates.footer}
            />
        </>
    );
}

Page.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        params: PropTypes.string.isRequired,
    }).isRequired,
    templates: PropTypes.shape({
        header: PropTypes.shape({
        }).isRequired,
        footer: PropTypes.shape({
        }).isRequired,
    }).isRequired,
};

export async function getServerSideProps({ res, params }) {
    res.setHeader('Cache-Control',
        'public, s-maxage=1, stale-while-revalidate');
    const { slug } = params;
    let post = [];
    let templates = [];

    const resItem = await fetch(`${process.env.SERVER}/api/posts/slug/${slug}`, {
        credentials: 'same-origin',
    });
    const dataItem = await resItem.json();
    if (dataItem.success && dataItem.data) {
        post = dataItem.data;
    } else {
        return {
            notFound: true,
        };
    }

    const resTemplates = await fetch(`${process.env.SERVER}/api/posts/getHeaderFooter`, {
        credentials: 'same-origin',
    });
    const dataTemplates = await resTemplates.json();
    if (dataTemplates.success && dataTemplates.data) {
        templates = dataTemplates.data;
    }

    return {
        props: {
            post,
            templates,
        },
    };
}
