import React from 'react';

import styles from './Content.module.scss';

import AddDisposition from 'container/Disposition/AddDisposition/AddDisposition';
import Disposition from 'container/Disposition/Disposition';

export default function Content({
    dispositions,
    dispositionAdd,
    dispositionUpdate,
    dispositionDelete,
    onElementClick,
    currentElement,
    setCurrentElement,
}) {
    return (
        <>
            <div className={`${styles.content} ${styles.container}`}>
                {dispositions.map((item) => (
                    <Disposition
                        key={item.id}
                        disposition={item}
                        dispositionUpdate={dispositionUpdate}
                        dispositionDelete={dispositionDelete}
                        onElementClick={onElementClick}
                        currentElement={currentElement}
                        setCurrentElement={setCurrentElement}
                    />
                ))}
                <AddDisposition handleAddDisposition={dispositionAdd} />
            </div>
        </>
    );
}
