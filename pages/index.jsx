import React, {
    useEffect, useState,
} from 'react';
import Header from 'container/Sites/Header/Header';
import { useSettings } from 'context/settings';
import { Global } from '@emotion/react';
import RenderPost from 'container/RenderPost/RenderPost';
import PropTypes from 'prop-types';
import Footer from 'container/Sites/Footer/Footer';
import { populatePost } from '../utils/api';

export default function Home({ post, templates }) {
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

Home.propTypes = {
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

export async function getServerSideProps({ res }) {
    res.setHeader('Cache-Control',
        'public, s-maxage=1, stale-while-revalidate');
    let post = [];
    let templates = [];
    const resSettings = await fetch(`${process.env.SERVER}/api/settings/homepage`, {
        credentials: 'same-origin',
    });
    const dataHomepage = await resSettings.json();
    if (dataHomepage.success && dataHomepage.data) {
        post = await populatePost(dataHomepage.data.post);
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
