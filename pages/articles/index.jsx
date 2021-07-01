import React from 'react';
import Header from 'container/Sites/Header/Header';
import { useSettings } from 'context/settings';
import PropTypes from 'prop-types';
import Footer from 'container/Sites/Footer/Footer';
import Article from 'components/Posts/Articles/Article/Article';
import styles from './Articles.module.scss';

export default function Index({ posts, templates }) {
    const { value: settings } = useSettings();

    return (
        <>
            <Header
                settings={settings}
                post={
                    {
                        title: 'Articles',
                    }
                }
                template={templates.header}
                isHomePage
            />
            <main className={styles.main}>
                <div className={styles.list}>
                    {posts.map((post) => <Article post={post} />)}
                </div>
            </main>
            <Footer
                template={templates.footer}
            />
        </>
    );
}

Index.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    templates: PropTypes.shape({
        header: PropTypes.shape({
        }).isRequired,
        footer: PropTypes.shape({
        }).isRequired,
    }).isRequired,
};

export async function getServerSideProps({ res }) {
    res.setHeader('Cache-Control',
        'public, s-maxage=604800, stale-while-revalidate=59, must-revalidate');
    let posts = [];
    let templates = [];

    const resItem = await fetch(`${process.env.SERVER}/api/posts?type=ARTICLE`, {
        credentials: 'same-origin',
    });
    const dataItem = await resItem.json();
    if (dataItem.success && dataItem.data) {
        posts = dataItem.data;
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
            posts,
            templates,
        },
    };
}
