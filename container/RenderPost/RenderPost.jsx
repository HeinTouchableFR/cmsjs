import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Posts/Articles/Header/Header';
import Comments from 'components/Posts/Articles/Comments/Comments';
import Layout from './Layout';

export default function RenderPost({ post, user }) {
    return (
        <>
            <div>
                {post.postType === 'ARTICLE' && <Header post={post} />}
                {post.content.map((layout) => (
                    <Layout
                        layout={layout}
                        key={layout.id}
                    />
                ))}
                {post.params.enableComments && (
                <Comments
                    post={post}
                    user={user}
                />
)}
            </div>
        </>
    );
}

RenderPost.propTypes = {
    post: PropTypes.shape({
        content: PropTypes.arrayOf(PropTypes.shape({
        })),
        params: PropTypes.shape({
        }),
        postType: PropTypes.string,
    }).isRequired,
    user: PropTypes.shape({
    }).isRequired,
};
