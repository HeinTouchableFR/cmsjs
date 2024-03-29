import React from 'react';
import Header from 'container/Sites/Header/Header';
import PropTypes from 'prop-types';
import Footer from 'container/Sites/Footer/Footer';
import Article from 'components/Posts/Articles/Article/Article';
import fetcher from 'utils/fetcher';
import styles from './Articles.module.scss';

export default function Articles({ category, templates }) {
    return (
        <>
            <Header
                post={category}
                template={templates.header}
                isHomePage
            />
            <main className={styles.main}>
                <div className={styles.list}>
                    {category.posts.map((post) => <Article post={post} />)}
                </div>
            </main>
            <Footer
                template={templates.footer}
            />
        </>
    );
}

Articles.propTypes = {
    category: PropTypes.shape({
        posts: PropTypes.arrayOf(PropTypes.shape({
        })).isRequired,
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
    let category = [];
    let templates = [];

    const resItem = await fetch(`${process.env.SERVER}/api/categories/slug/${slug}`, {
        credentials: 'same-origin',
    });
    const dataItem = await resItem.json();
    if (dataItem.success && dataItem.data) {
        category = dataItem.data;
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
            category,
            templates,
        },
    };
}
