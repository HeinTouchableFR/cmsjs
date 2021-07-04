import React, {
    useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Posts/Articles/Header/Header';
import Comments from 'components/Posts/Articles/Comments/Comments';
import Layout from './Layout';

export default function RenderPost({ post, user }) {
    const [content, setContent] = useState(post.content ? JSON.parse(post.content) : []);

    useEffect(() => {
        setContent(post.content ? JSON.parse(post.content) : []);
    }, [post]);

    return (
        <>
            <div>
                {post.postType === 'ARTICLE' && <Header post={post} />}
                {content.map((layout) => (
                    <Layout
                        layout={layout}
                        key={layout.id}
                    />
                ))}
                {JSON.parse(post.params).enableComments && (
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
        content: PropTypes.string,
        postType: PropTypes.string,
        params: PropTypes.string,
    }).isRequired,
    user: PropTypes.shape({
    }).isRequired,
};
