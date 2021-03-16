import React, { useState } from 'react';
import styles from './Builder.module.scss';
import parse from 'html-react-parser';
import TitleRender from 'components/ComponentCollection/Title/TitleRender';
import ComponentDispatcher from '../../components/ComponentCollection/ComponentDispatcher';

export default function RenderPage({ page }) {
    const [content] = useState(JSON.parse(page.content));

    return (
        <>
            {content.map((disposition) => (
                <Disposition key={disposition.id} disposition={disposition} />
            ))}
        </>
    );
}

const Disposition = function ({ disposition }) {
    return (
        <>
            <div className={`${styles.render} ${styles.disposition}`}>
                <div className={`${styles.disposition__container}`}>
                    {disposition.columns && disposition.columns.map((column) => <Column key={'element-' + column.id} column={column} />)}
                </div>
            </div>
        </>
    );
};

const Column = function ({ column }) {
    return (
        <>
            <div className={`${styles.column}`}>
                <div className={`${styles.element__wrap}`}>
                    <div className={styles.column__populated}>
                        {column.elements.map((item) => (
                            <div key={item.id} className={styles.element__widget}>
                                <div className={'content'}>
                                    <ComponentDispatcher element={item} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
