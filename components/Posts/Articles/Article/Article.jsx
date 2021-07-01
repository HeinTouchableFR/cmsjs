import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import styles from './Article.module.scss';

export default function Article({ post }) {
    const intl = useIntl();

    return (
        <>
            <article className={styles.news}>
                <Link
                    href={`${process.env.SERVER}/${post.slug}`}
                >
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                        title={post.title}
                        className={styles.image}
                    >
                        <img
                            width='250'
                            height='250'
                            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8VA8AAikBU9RsF2cAAAAASUVORK5CYII='
                        />
                    </a>
                </Link>
                <div className={styles.body}>
                    <header className={styles.header}>
                        <div className={styles.meta}>
                            {post.categories.length > 0
                                ? post.categories.map((item) => (
                                    <Link
                                        href={`${process.env.SERVER}/articles/${item.slug}`}
                                    >
                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                        <a
                                            className={styles.tag}
                                        >
                                            {item.title}
                                        </a>
                                    </Link>
                                ))
                                : (
                                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                    <a
                                        className={styles.tag}
                                    >
                                        Non classé
                                    </a>
                                )}
                        </div>
                        <Link
                            href={`${process.env.SERVER}/${post.slug}`}
                        >
                            <a
                                className={styles.title}
                            >
                                {post.title}
                            </a>
                        </Link>
                        <div className={styles.date}>
                            {
                                intl.formatMessage({
                                    id: 'article.published', defaultMessage: 'Published on {date} at {time}',
                                }, {
                                    date: new Date(post.published).toLocaleDateString(),
                                    time: new Date(post.published).toLocaleTimeString(),
                                })
                            }
                        </div>
                    </header>
                    <div className={styles.content}>
                        <p>
                            {post.description}
                        </p>
                    </div>
                    <Link
                        href={`${process.env.SERVER}/${post.slug}`}
                    >
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a
                            className={styles.action}
                        >
                            Lire la suite
                        </a>
                    </Link>
                </div>
            </article>
        </>
    );
}

Article.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string,
        published: PropTypes.string,
        categories: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            slug: PropTypes.string,
        })),
    }).isRequired,
};

Article.defaultProps = {
};
