import React from 'react';
import styled from '@emotion/styled';
import AddLayout from 'container/Builder/Layout/AddLayout/AddLayout';
import Layout from 'container/Builder/Layout/Layout';
import PropTypes from 'prop-types';
import styles from './Content.module.scss';

export default function Content({ layouts,
    addLayout,
    updateLayout,
    deleteLayout,
    onElementClick,
    currentElement,
    setCurrentElement,
    hide,
    device,
    handleOpenPortal,
    mode,
    type,
    params }) {

    const Div = styled.div`
        background: ${params.background};
    `;

    return (
        <>
            <Div
                className={`${styles.content} ${styles.container} ${hide ? styles.hide : ''} ${device === 'tablet' ? styles.tablet__preview : ''} ${device === 'mobile' ? styles.mobile__preview : ''}`}
            >
                {mode === 'page' ? layouts.map((item) => (
                    <Layout
                        key={item.id}
                        layout={item}
                        updateLayout={updateLayout}
                        deleteLayout={deleteLayout}
                        onElementClick={onElementClick}
                        currentElement={currentElement}
                        setCurrentElement={setCurrentElement}
                        device={device}
                        handleOpenPortal={handleOpenPortal}
                    />
                )) : (
                    <>
                        {type === 'header'
                        && (
                        <header>
                            {layouts.map((item) => (
                                <Layout
                                    key={item.id}
                                    layout={item}
                                    updateLayout={updateLayout}
                                    deleteLayout={deleteLayout}
                                    onElementClick={onElementClick}
                                    currentElement={currentElement}
                                    setCurrentElement={setCurrentElement}
                                    device={device}
                                    handleOpenPortal={handleOpenPortal}
                                    type={type}
                                />
                            ))}
                        </header>
                        )}
                        {type === 'footer'
                        && (
                            <footer>
                                {layouts.map((item) => (
                                    <Layout
                                        key={item.id}
                                        layout={item}
                                        updateLayout={updateLayout}
                                        deleteLayout={deleteLayout}
                                        onElementClick={onElementClick}
                                        currentElement={currentElement}
                                        setCurrentElement={setCurrentElement}
                                        device={device}
                                        handleOpenPortal={handleOpenPortal}
                                        type={type}
                                    />
                                ))}
                            </footer>
                        )}
                    </>

                )}
                <AddLayout handleAddLayout={addLayout} />
            </Div>
        </>
    );
}

Content.propTypes = {
    layouts: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    currentElement: PropTypes.shape({
    }).isRequired,
    device: PropTypes.string.isRequired,
    hide: PropTypes.bool.isRequired,
    mode: PropTypes.string,
    type: PropTypes.string,
    params: PropTypes.shape({
        background: PropTypes.string.isRequired,
    }).isRequired,
    addLayout: PropTypes.func.isRequired,
    updateLayout: PropTypes.func.isRequired,
    deleteLayout: PropTypes.func.isRequired,
    onElementClick: PropTypes.func.isRequired,
    setCurrentElement: PropTypes.func.isRequired,
    handleOpenPortal: PropTypes.func.isRequired,
};

Content.defaultProps = {
    mode: 'page',
    type: 'page',
};
