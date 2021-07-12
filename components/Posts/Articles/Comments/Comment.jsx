import React, {
    useCallback, useState,
} from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import IconButton from 'components/Button/IconButton/IconButton';
import { useFetcher } from 'utils/fetcher';
import TimeAgo from 'components/TimeAgo/TimeAgo';
import styles from './Comments.module.scss';
import Form from './Form';

const VIEW = 'VIEW';
const EDIT = 'EDIT';
const REPLY = 'REPLY';

const Comment = React.memo(({ comment,
    canEdit,
    onDelete,
    onUpdate,
    onReply,
    user,
    comments,
    indent,
    post }) => {
    // Variables
    const intl = useIntl();
    const [state, setState] = useState(VIEW);

    // Event
    const toggleEdit = useCallback(() => {
        setState((e) => (e === VIEW ? EDIT : VIEW));
    }, []);
    const toggleReply = useCallback(() => {
        setState((e) => (e === VIEW ? REPLY : VIEW));
    }, []);
    const onDeleteCallback = useCallback(() => {
        onDelete(comment);
    }, [comment]);
    const onReplyCallback = useCallback((newComment) => {
        onReply(newComment);
        toggleReply();
    }, [comment]);
    const onComment = useCallback((newComment) => {
        onUpdate(newComment, comment);
        toggleEdit();
    }, [comment]);

    // Hook
    const { load: callDelete, loading: loadingDelete } = useFetcher(`${process.env.SERVER}/api/comments/${comment.id}`, 'DELETE', onDeleteCallback);

    function repliesFor() {
        return comments
            .filter((c) => c.parentId === comment.id)
            .sort((a, b) => new Date(a.published).getTime() - new Date(b.published).getTime());
    }

    return (
        <div
            className={styles.postComment}
            id={comment.id}
        >
            <div
                className={styles.comment}
            >
                <h4>
                    <strong>{comment.author.name}</strong>
                    <TimeAgo timestamp={comment.published} />
                    {user
                    && (
                        <div>
                            {indent < 5 && (
                                <IconButton
                                    action={toggleReply}
                                    icon='fas fa-reply'
                                />
                            )}
                            {
                                canEdit && (
                                    <>
                                        <IconButton
                                            action={toggleEdit}
                                            icon='fas fa-edit'
                                        />
                                        <IconButton
                                            action={callDelete.bind(this, null)}
                                            icon='fas fa-trash'
                                        />
                                    </>
                                )
                            }
                        </div>
                    )}
                </h4>
                {state === EDIT ? (
                    <Form
                        comment={comment}
                        onComment={onComment}
                        onCancel={toggleEdit}
                    />
                ) : (
                    <>
                        <p>
                            {comment.content}
                        </p>
                    </>
                )}
            </div>
            <div className={styles.replies}>
                {state === REPLY && (
                    <Form
                        post={post}
                        onComment={onReplyCallback}
                        onCancel={toggleReply}
                        parent={comment.id}
                    />
                )}
                {repliesFor(comment).map((reply) => (
                    <Comment
                        key={reply.id}
                        comment={reply}
                        canEdit={(user) && reply.author.id === user.id}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                        onReply={onReply}
                        user={user}
                        comments={comments}
                        post={post}
                        indent={indent + 1}
                    />
                ))}
            </div>
        </div>
    );
});

export default Comment;

Comment.propTypes = {
    comment: PropTypes.shape({
        id: PropTypes.number,
        content: PropTypes.string,
        published: PropTypes.string,
        author: PropTypes.shape({
            name: PropTypes.string,
        }),
    }).isRequired,
    canEdit: PropTypes.bool,
    comments: PropTypes.arrayOf(PropTypes.shape({
    })),
    indent: PropTypes.number,
};

Comment.defaultProps = {
    canEdit: false,
    comments: [],
    indent: 0,
};
