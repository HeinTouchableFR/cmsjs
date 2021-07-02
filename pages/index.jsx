import React, {
    useEffect, useState,
} from 'react';
import Header from 'container/Sites/Header/Header';
import { useSettings } from 'context/settings';
import { Global } from '@emotion/react';
import RenderPost from 'container/RenderPost/RenderPost';
import PropTypes from 'prop-types';
import Footer from 'container/Sites/Footer/Footer';
import { getSession } from 'next-auth/client';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';

export default function Home({ post, templates, session }) {

    const { data } = useSWR(`${process.env.SERVER}/api/posts/slug/${post.result.data.post.slug}`, fetcher, {
        initialData: post,
    });
    const { data: dataTemplate } = useSWR(`${process.env.SERVER}/api/posts/getHeaderFooter`, fetcher, {
        initialData: templates,
    });
    const { value: settings } = useSettings();
    const [params, setParams] = useState(data.result.data.post.params
        ? JSON.parse(data.result.data.post.params)
        : {
        });

    return (
        <>
            <Header
                settings={settings}
                post={data.result.data.post}
                template={dataTemplate.result.data.header}
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
                post={data.result.data.post}
                user={session ? session.user : null}
            />
            <Footer
                template={dataTemplate.result.data.footer}
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
        post = resSettings;
    } else {
        return {
            notFound: true,
        };
    }

    const resTemplates = await fetcher(`${process.env.SERVER}/api/posts/getHeaderFooter`, {
        credentials: 'same-origin',
    });
    if (resTemplates.success && resTemplates.result.data) {
        templates = resTemplates;
    }

    return {
        props: {
            post,
            templates,
            session,
        },
    };
}
