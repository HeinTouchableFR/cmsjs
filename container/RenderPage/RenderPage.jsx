import React, {
    useEffect, useState,
} from 'react';
import Loader from 'components/Loader/Loader';
import Layout from './Layout';

export default function RenderPage({ page, showRender = false }) {
    const [content, setContent] = useState(page.content ? JSON.parse(page.content) : []);

    useEffect(() => {
        setContent(page.content ? JSON.parse(page.content) : []);
    }, [page]);

    return (
        <>
            <div>
                {showRender
                    ? content.map((layout) => (
                        <Layout
                            layout={layout}
                            key={layout.id}
                        />
                    ))
                    : <Loader />}
            </div>
        </>
    );
}
