import React, {
    useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import Layout from './Layout';

export default function RenderPage({ page }) {
    const [content, setContent] = useState(page.content ? JSON.parse(page.content) : []);

    useEffect(() => {
        setContent(page.content ? JSON.parse(page.content) : []);
    }, [page]);

    return (
        <>
            <div>
                {content.map((layout) => (
                    <Layout
                        layout={layout}
                        key={layout.id}
                    />
                ))}
            </div>
        </>
    );
}

RenderPage.propTypes = {
    page: PropTypes.shape({
        content: PropTypes.string,
    }).isRequired,
};
