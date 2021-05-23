import React, {
    useEffect, useState,
} from 'react';
import Header from 'container/Sites/Header/Header';
import { useSettings } from 'context/settings';
import { Global } from '@emotion/react';
import RenderPage from 'container/RenderPage/RenderPage';
import PropTypes from 'prop-types';
import Footer from 'container/Sites/Footer/Footer';

export default function Home({ post }) {
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
                showRender={showRender}
            />
            <Footer
                showRender={showRender}
                setShowRender={setShowRender}
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
};

export async function getServerSideProps() {
    let post = [];
    const resSettings = await fetch(`${process.env.URL}/api/settings/homepage`, {
        credentials: 'same-origin',
    });
    const dataHomepage = await resSettings.json();
    let homePageId = '';
    if (dataHomepage.success && dataHomepage.data) {
        homePageId = dataHomepage.data.pagesId;

        const resItem = await fetch(`${process.env.URL}/api/pages/${homePageId}`, {
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
    } else {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            post,
        },
    };
}
