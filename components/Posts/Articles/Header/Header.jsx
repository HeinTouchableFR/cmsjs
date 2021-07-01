import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header({ post }) {
    const intl = useIntl();

    return (
        <>
            <header className={styles.header}>
                <div className={styles.title}>{post.title}</div>
                <div className={styles.meta}>
                    {post.categories && post.categories.length > 0
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
                    <div className={styles.date}>
                        {
                            intl.formatMessage({
                                id: 'article.published', defaultMessage: 'Published on {date} at {time}',
                            }, {
                                date: new Date(post.published || Date.now()).toLocaleDateString(),
                                time: new Date(post.published || Date.now()).toLocaleTimeString(),
                            })
                        }
                    </div>
                </div>
            </header>
        </>
    );
}

Header.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string,
        published: PropTypes.string,
        categories: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            slug: PropTypes.string,
        })),
    }).isRequired,
};

Header.defaultProps = {
};
