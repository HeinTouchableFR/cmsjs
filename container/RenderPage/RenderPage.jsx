import React, {
    useEffect, useState,
} from 'react';
import styles from 'container/Builder/Layout/Layout.module.scss';
import ComponentDispatcher from 'components/ComponentCollection/ComponentDispatcher';
import Loader from 'components/Loader/Loader';

export default function RenderPage({ page, showRender = false }) {
    const [content, setContent] = useState(page.content ? JSON.parse(page.content) : []);

    useEffect(() => {
        setContent(page.content ? JSON.parse(page.content) : []);
    }, [page]);

    return (
        <>
            {showRender
                ? content.map((layout) => (
                    <div
                        className={`${styles.layout}`}
                        key={layout.id}
                    >
                        {layout.columns && layout.columns.map((column) => (
                            <div
                                className={`${styles.column}`}
                                key={column.id}
                            >
                                {column.elements.map((item) => (
                                    <div
                                        className={styles.element__widget}
                                        key={item.id}
                                    >
                                        <ComponentDispatcher
                                            element={item}
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))
                : <Loader />}
        </>
    );
}
