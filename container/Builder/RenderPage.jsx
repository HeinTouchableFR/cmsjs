import React, { useState } from 'react';
import styles from './Builder.module.scss';
import parse from 'html-react-parser';
import TitleRender from 'components/ComponentCollection/Title/TitleRender';

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
                    {disposition.colonnes && disposition.colonnes.map((column) => <Column key={'element-' + column.id} column={column} />)}
                </div>
            </div>
        </>
    );
};

const Column = function ({ column }) {
    return (
        <>
            <div className={`${styles.colonne}`}>
                <div className={`${styles.element__wrap}`}>
                    <div className={styles.colonne__populated}>
                        {column.elements.map((item) => (
                            <div key={item.id} className={styles.element__widget}>
                                <div className={'content'}>
                                    {item.type === 'title' ? <TitleRender element={item} /> : parse(item.content)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
