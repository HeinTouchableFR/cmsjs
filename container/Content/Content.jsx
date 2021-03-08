import React from 'react';

import styles from './Content.module.scss';

import AddLayout from 'container/Layout/AddLayout/AddLayout';
import Layout from 'container/Layout/Layout';

export default function Content({
    layouts,
    layoutAdd,
    layoutUpdate,
    layoutDelete,
    onElementClick,
    currentElement,
    setCurrentElement,
}) {
    return (
        <>
            <div className={`${styles.content} ${styles.container}`}>
                {layouts.map((item) => (
                    <Layout
                        key={item.id}
                        layout={item}
                        layoutUpdate={layoutUpdate}
                        layoutDelete={layoutDelete}
                        onElementClick={onElementClick}
                        currentElement={currentElement}
                        setCurrentElement={setCurrentElement}
                    />
                ))}
                <AddLayout handleAddLayout={layoutAdd} />
            </div>
        </>
    );
}
