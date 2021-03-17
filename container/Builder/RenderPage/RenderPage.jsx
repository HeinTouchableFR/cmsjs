import React, {useState} from 'react';
import styles from '../Builder.module.scss';
import ComponentDispatcher from 'components/ComponentCollection/ComponentDispatcher';

export default function RenderPage({page}) {
    const [content] = useState(JSON.parse(page.content));

    return (
        <>
            {content.map((layout) => (
                <div className={`${styles.render} ${styles.layout}`} key={layout.id}>
                    <div className={`${styles.layout__container}`}>
                        {layout.columns && layout.columns.map((column) =>
                            <div className={`${styles.column}`} key={column.id}>
                                <div className={`${styles.element__wrap}`}>
                                    {column.elements.map((item) => (
                                        <ComponentDispatcher key={item.id} element={item}/>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
}
