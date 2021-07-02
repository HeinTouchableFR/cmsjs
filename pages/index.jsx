import React, { useState } from 'react';
import Header from 'container/Sites/Header/Header';
import { useSettings } from 'context/settings';
import { Global } from '@emotion/react';
import RenderPost from 'container/RenderPost/RenderPost';
import PropTypes from 'prop-types';
import Footer from 'container/Sites/Footer/Footer';
import { getSession } from 'next-auth/client';
import fetcher from '../utils/fetcher';

export default function Home({ post, templates, session }) {
    const { value: settings } = useSettings();
    const [params, setParams] = useState(JSON.parse(post.params));

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
                user={session ? session.user : null}
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

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);
    let post = [];
    let templates = [];
    const resSettings = await fetcher(`${process.env.SERVER}/api/settings/homepage`, {
        credentials: 'same-origin',
    });
    if (resSettings.success && resSettings.result.data) {
        post = resSettings.result.data.post;
    } else {
        return {
            notFound: true,
        };
    }

    const resTemplates = await fetcher(`${process.env.SERVER}/api/posts/getHeaderFooter`, {
        credentials: 'same-origin',
    });
    if (resTemplates.success && resTemplates.result.data) {
        templates = resTemplates.result.data;
    }

    return {
        props: {
            post,
            templates,
            session,
        },
    };
}
