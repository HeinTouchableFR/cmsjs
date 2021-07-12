import React, {
    useCallback, useEffect, useState, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import {
    FormattedPlural, useIntl,
} from 'react-intl';
import {
    offsetTop, windowHeight,
} from 'utils/dom';
import styles from './Comments.module.scss';
import Form from './Form';
import Comment from './Comment';

export default function Comments({ post, user, disableForm }) {
    const intl = useIntl();
    const [comments, setComments] = useState(post.comments || []);

    useEffect(() => {
        setComments(post.comments);
    }, [post]);

    useEffect(() => {
        const path = window.location.hash;
        if (path && path.includes('#')) {
            const id = path.replace('#', '');
            const element = window.document.getElementById(id);
            if (element === null) {
                return;
            }
            element.classList.add(styles.isAnchor);
            const elementOffset = offsetTop(element);
            const elementHeight = element.getBoundingClientRect().height;
            const viewHeight = windowHeight();
            let top = elementOffset - 100;
            if (elementHeight <= viewHeight) {
                top = elementOffset - (viewHeight - elementHeight) / 2;
            }
            console.log(top)
            window.scrollTo({
                top,
                left: 0,
                behavior: 'smooth',
            });
        }
    });

    const filteredComments = useMemo(() => {
        if (comments === null) {
            return null;
        }
        return comments
            .filter((c) => c.parentId === null)
            .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
    }, [comments]);

    const addComment = useCallback((comment) => {
        setComments((items) => [comment, ...items]);
    }, []);

    const deleteComment = useCallback((comment) => {
        setComments((items) => items.filter((c) => c !== comment));
    }, []);

    const updateComment = useCallback((newComment, oldComment) => {
        setComments((items) => items.map((c) => (c === oldComment ? newComment : c)));
    }, []);

    return (
        <>
            <div className={styles.comments}>
                <div className={styles.container}>
                    {
                        user && (
                            <Form
                                post={post.id}
                                onComment={addComment}
                                disableForm={disableForm}
                            />
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
                                count: comments.length,
                            })}
                            other={intl.formatMessage({
                                id: 'comment.count', defaultMessage: '{count} comments',
                            }, {
                                count: comments.length,
                            })}
                            value={comments.length}
                        />
                    </h3>
                    {filteredComments.map((comment) => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            canEdit={(user && !disableForm) && comment.author.id === user.id}
                            onDelete={deleteComment}
                            onUpdate={updateComment}
                            onReply={addComment}
                            user={user}
                            comments={comments}
                            post={post.id}
                        />
                    ))}
                </div>
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
    disableForm: PropTypes.bool,
};

Comments.defaultProps = {
    disableForm: false,
};
