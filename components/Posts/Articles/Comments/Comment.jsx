import React, {
    useCallback, useState,
} from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import IconButton from 'components/Button/IconButton/IconButton';
import { useFetcher } from 'utils/fetcher';
import styles from './Comments.module.scss';
import Form from './Form';

const VIEW = 'VIEW';
const EDIT = 'EDIT';

const Comment = React.memo(({ comment, canEdit, onDelete, onUpdate }) => {
    // Variables
    const intl = useIntl();
    const [state, setState] = useState(VIEW);

    // Event
    const toggleEdit = useCallback(() => {
        setState((e) => (e === VIEW ? EDIT : VIEW));
    }, []);
    const onDeleteCallback = useCallback(() => {
        onDelete(comment);
    }, [comment]);
    const onComment = useCallback((newComment) => {
        onUpdate(newComment, comment);
        toggleEdit();
    }, [comment]);

    // Hook
    const { load: callDelete, loading: loadingDelete } = useFetcher(`${process.env.SERVER}/api/comments/${comment.id}`, 'DELETE', onDeleteCallback);

    return (
        <>
            <div
                className={styles.postComment}
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
                    {canEdit && (
                        <div>
                            <IconButton
                                action={toggleEdit}
                                icon='fas fa-edit'
                            />
                            <IconButton
                                action={callDelete.bind(this, null)}
                                icon='fas fa-trash'
                            />
                        </div>
                    )}
                </h4>
                {state === VIEW ? (
                    <p>
                        {comment.content}
                    </p>
                ) : (
                    <Form
                        comment={comment}
                        onComment={onComment}
                        onCancel={toggleEdit}
                    />
                )}
            </div>
        </>
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
    canEdit: PropTypes.bool.isRequired,
};

Comment.defaultProps = {
};
