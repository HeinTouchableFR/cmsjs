import React from 'react';

import styles from './Content.module.scss';

import AddLayout from 'container/Layout/AddLayout/AddLayout';
import Layout from 'container/Layout/Layout';

export default function Content({layouts, layoutAdd, layoutUpdate, layoutDelete, onElementClick, currentElement, setCurrentElement, hide, device, handleOpenPortal, mode = "page"}) {
    return (
        <>
            <div className={`${styles.content} ${styles.container} ${hide ? styles.hide : ''} ${device === "tablet" ? styles.tablet__preview : ''} ${device === "mobile" ? styles.mobile__preview : ''}`}>
                {mode === "page" ? layouts.map((item) => (
                        <Layout
                            key={item.id}
                            layout={item}
                            layoutUpdate={layoutUpdate}
                            layoutDelete={layoutDelete}
                            onElementClick={onElementClick}
                            currentElement={currentElement}
                            setCurrentElement={setCurrentElement}
                            device={device}
                            handleOpenPortal={handleOpenPortal}
                        />
                )) : <header className="nav">{layouts.map((item) => (
                    <Layout
                        key={item.id}
                        layout={item}
                        layoutUpdate={layoutUpdate}
                        layoutDelete={layoutDelete}
                        onElementClick={onElementClick}
                        currentElement={currentElement}
                        setCurrentElement={setCurrentElement}
                        device={device}
                        handleOpenPortal={handleOpenPortal}
                        mode={mode}
                    />
                ))}</header>}
                <AddLayout handleAddLayout={layoutAdd}/>
            </div>
        </>
    );
}
