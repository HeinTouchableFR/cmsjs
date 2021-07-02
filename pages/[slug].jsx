import React, {
    useEffect, useState,
} from 'react';
import Header from 'container/Sites/Header/Header';
import RenderPost from 'container/RenderPost/RenderPost';
import { useSettings } from 'context/settings';
import { Global } from '@emotion/react';
import PropTypes from 'prop-types';
import Footer from 'container/Sites/Footer/Footer';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';

export default function Page({ post, templates }) {
    const { data } = useSWR(`${process.env.SERVER}/api/posts/slug/${post.result.data.slug}`, fetcher, {
        initialData: post,
    });
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
                post={data.result.data}
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
                post={data.result.data}
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

export async function getServerSideProps({ params }) {
    const { slug } = params;
    let post = [];
    let templates = [];

    const resItem = await fetcher(`${process.env.SERVER}/api/posts/slug/${slug}`, {
        credentials: 'same-origin',
    });
    if (resItem.success && resItem.result.data) {
        post = resItem;
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
