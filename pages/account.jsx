import React from 'react';
import Header from 'container/Sites/Header/Header';
import PropTypes from 'prop-types';
import Footer from 'container/Sites/Footer/Footer';
import { getSession } from 'next-auth/client';
import fetcher from 'utils/fetcher';

export default function Home({ templates, session }) {
    return (
        <>
            <Header
                post={
                    {
                        title: 'Articles',
                    }
                }
                template={templates.header}
                isHomePage
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
        params: PropTypes.shape({
        }),
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
    let templates = [];

    const resTemplates = await fetcher(`${process.env.SERVER}/api/posts/getHeaderFooter`, {
        credentials: 'same-origin',
    });
    if (resTemplates.success && resTemplates.result.data) {
        templates = resTemplates.result.data;
    }

    return {
        props: {
            templates,
            session,
        },
    };
}
