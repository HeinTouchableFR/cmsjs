import React from 'react';
import PropTypes from 'prop-types';
import {
    FormattedPlural, useIntl,
} from 'react-intl';
import styles from './Comments.module.scss';
import TextArea from '../../../Form/TextArea/TextArea';
import Button from '../../../Button/Button';

export default function Comments({ post, user }) {
    const intl = useIntl();

    return (
        <>
            <div className={styles.comments}>
                {
                    user && (
                        <div className={styles.addComment}>
                            <h4>
                                <i
                                    className='fa fa-comment'
                                    aria-hidden='true'
                                />
                                {intl.formatMessage({
                                    id: 'comment.add', defaultMessage: 'Add a comment',
                                })}
                            </h4>
                            <TextArea
                                name='message'
                            />
                            <span className={styles.prevent}>
                                {
                                intl.formatMessage({
                                    id: 'comment.prevent',
                                    defaultMessage: 'Comments not complying with our Code of Conduct will be moderated.',
                                })
                            }
                            </span>
                            <Button
                                label={intl.formatMessage({
                                    id: 'comment.publish', defaultMessage: 'Publish',
                                })}
                                type='submit'
                                icon='fa fa-paper-plane'
                            />
                        </div>
                    )
                }
                <h3>
                    <i
                        className='fa fa-comments'
                        aria-hidden='true'
                    />
                    <FormattedPlural
                        one={intl.formatMessage({
                            id: 'comment.oneOrZero', defaultMessage: '{count} comment',
                        }, {
                            count: post.comments.length,
                        })}
                        other={intl.formatMessage({
                            id: 'comment.count', defaultMessage: '{count} comments',
                        }, {
                            count: post.comments.length,
                        })}
                        value={post.comments.length}
                    />
                </h3>
                {post.comments.map((comment) => (
                    <div
                        className={styles.postComment}
                        key={comment.id}
                    >
                        <h4>
                            <strong>{comment.author.name}</strong>
                            {
                                intl.formatMessage({
                                    id: 'comment.on', defaultMessage: 'commented on',
                                })
                            }
                            <strong>
                                {
                                    intl.formatMessage({
                                        id: 'comment.published', defaultMessage: '{date} at {time}',
                                    }, {
                                        date: new Date(comment.published).toLocaleDateString(),
                                        time: new Date(comment.published).toLocaleTimeString(),
                                    })
                                }
                            </strong>
                        </h4>
                        <p>
                            {comment.content}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
}

Comments.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string,
        published: PropTypes.string,
        categories: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            slug: PropTypes.string,
        })),
        comments: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            content: PropTypes.string,
            published: PropTypes.string,
            author: PropTypes.shape({
            }),
        })),
    }).isRequired,
};

Comments.defaultProps = {
};
