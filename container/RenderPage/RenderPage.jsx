import React, {
    useEffect, useState,
} from 'react';
import styles from 'container/Layout/Layout.module.scss';
import ComponentDispatcher from 'components/ComponentCollection/ComponentDispatcher';
import { Loader } from 'semantic-ui-react';

export default function RenderPage({ page, showRender = false }) {
    const [content, setContent] = useState(page.content ? JSON.parse(page.content) : {
    });

    useEffect(() => {
        setContent(page.content ? JSON.parse(page.content) : {
        });
    }, [page]);

    return (
        <>
            { showRender
                ? content.map((layout) => (
                    <div
                        className={`${styles.render} ${styles.layout}`}
                        key={layout.id}
                    >
                        <div className={`${styles.layout__container}`}>
                            {layout.columns && layout.columns.map((column) => (
                                <div
                                    className={`${styles.column}`}
                                    key={column.id}
                                >
                                    <div className={`${styles.element__wrap}`}>
                                        {column.elements.map((item) => (
                                            <ComponentDispatcher
                                                key={item.id}
                                                element={item}
                                            />
                                        ))}
                                    </div>
                                </div>
                              ))}
                        </div>
                    </div>
                ))
                : <Loader active />}
        </>
    );
}
