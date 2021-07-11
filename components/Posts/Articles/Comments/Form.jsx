import React, {
    useCallback, useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import TextArea from 'components/Form/TextArea/TextArea';
import Button from 'components/Button/Button';
import { useFetcher } from 'utils/fetcher';
import styles from './Comments.module.scss';

export default function Form({ post, onComment, onCancel, comment, disableForm, parent }) {
    // Variables
    const intl = useIntl();
    const ref = useRef(null);

    // Event
    const onSuccess = useCallback((item) => {
        onComment(item);
        ref.current.value = '';
    }, [ref, onComment]);

    // Hook
    const method = comment ? 'PUT' : 'POST';
    const url = comment ? comment.id : '';
    const { load, loading, errors } = useFetcher(`${process.env.SERVER}/api/comments/${url}`, method, onSuccess);
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        load({
            post: post,
            content: ref.current.value,
            parent,
        });
    }, [load, ref, post]);

    // Effect
    useEffect(() => {
        if (comment && comment.content && ref.current) {
            ref.current.value = comment.content;
        }
    }, [comment, ref]);

    return (
        <>
            <div className={styles.addComment}>
                <form onSubmit={onSubmit}>
                    {
                        comment === null && (
                            <h4>
                                <i
                                    className='fa fa-comment'
                                    aria-hidden='true'
                                />
                                {intl.formatMessage({
                                    id: 'comment.add', defaultMessage: 'Add a comment',
                                })}
                            </h4>
                        )
                    }
                    <TextArea
                        label={intl.formatMessage({
                            id: 'comment', defaultMessage: 'Comment',
                        })}
                        name='message'
                        ref={ref}
                        required
                        minLength={10}
                        maxLength={255}
                        disabled={disableForm}
                    />
                    <span className={styles.prevent}>
                        {
                            intl.formatMessage({
                                id: 'comment.prevent',
                                defaultMessage: 'Comments not complying with our Code of Conduct will be moderated.',
                            })
                        }
                    </span>
                    <div className={styles.action}>
                        <Button
                            label={comment === null
                                ? intl.formatMessage({
                                    id: 'comment.publish', defaultMessage: 'Publish',
                                })
                                : intl.formatMessage({
                                    id: 'comment.update', defaultMessage: 'Update',
                                })}
                            type='submit'
                            icon='fa fa-paper-plane'
                            loading={loading}
                            disabled={disableForm}
                        />
                        {
                            onCancel && (
                                <Button
                                    label={intl.formatMessage({
                                        id: 'comment.cancel', defaultMessage: 'Cancel',
                                    })}
                                    type='button'
                                    loading={loading}
                                    onClick={onCancel}
                                />
                            )
                        }
                    </div>
                </form>
            </div>
        </>
    );
}

Form.propTypes = {
    post: PropTypes.number,
    comment: PropTypes.shape({
        id: PropTypes.number,
    }),
};

Form.defaultProps = {
    post: null,
    comment: null,
};
