import React, {
    useEffect, useState,
} from 'react';
import Header from 'container/Sites/Header/Header';
import { useSettings } from 'context/settings';
import { Global } from '@emotion/react';
import RenderPage from 'container/RenderPage/RenderPage';
import PropTypes from 'prop-types';
import Footer from 'container/Sites/Footer/Footer';
import {populatePost} from '../utils/api';

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
            <RenderPage
                page={post}
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

export async function getServerSideProps() {
    let post = [];
    let templates = [];
    const resSettings = await fetch(`${process.env.SERVER}/api/settings/homepage`, {
        credentials: 'same-origin',
    });
    const dataHomepage = await resSettings.json();
    if (dataHomepage.success && dataHomepage.data) {
        post = await populatePost(dataHomepage.data.page);
    } else {
        return {
            notFound: true,
        };
    }

    const resTemplates = await fetch(`${process.env.SERVER}/api/templates/getHeaderFooter`, {
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
