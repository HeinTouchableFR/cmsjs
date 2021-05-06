import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Content from 'container/Builder/Content/Content';
import Navigation from 'container/Builder/Navigation/Navigation';
import Head from 'next/head';
import Component from 'components/ComponentCollection/Component';
import Portal from 'components/Portal/Portal';
import PropTypes from 'prop-types';
import {
    useDnd, useLayout,
} from 'variables/builder';
import styles from './Builder.module.scss';

const Builder = ({ page,
    onSubmit,
    loading,
    images,
    setImages,
    modules,
    mode,
    formErrors,
    errors }) => {
    const [params, setParams] = useState(JSON.parse(page.params));

    const [currentElement, setCurrentElement] = useState({
    });

    const [device, setDevice] = useState('desktop');

    const components = modules;

    const { layouts, addLayout, updateLayout, deleteLayout } = useLayout(page.content);
    const { onDragEnd,
        portal,
        handleOpenPortal,
        handleClosePortal,
        addComponentFromPortal,
        updateElement } = useDnd(components,
        layouts,
        currentElement,
        updateLayout,
        setCurrentElement);

    /**
     * Allows you to submit the page
     * @param e
     */
    const handleSubmit = (e) => {
        onSubmit(e, layouts, params);
    };

    return (
        <>
            <Head>
                <link
                    rel='stylesheet'
                    href='https://pro.fontawesome.com/releases/v5.10.0/css/all.css'
                    integrity='sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p'
                    crossOrigin='anonymous'
                />
                <title>Builder</title>
            </Head>
            <div className={styles.builder}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Content
                        layouts={layouts}
                        addLayout={addLayout}
                        updateLayout={updateLayout}
                        deleteLayout={deleteLayout}
                        onElementClick={setCurrentElement}
                        onLayoutClick={setCurrentElement}
                        currentElement={currentElement}
                        setCurrentElement={setCurrentElement}
                        device={device}
                        handleOpenPortal={handleOpenPortal}
                        mode={mode}
                        type={page.type ? page.type : 'page'}
                        params={params}
                    />
                    <Navigation
                        components={components}
                        currentElement={currentElement}
                        onElementValueChange={updateElement}
                        onLayoutValueChange={updateLayout}
                        onSubmit={handleSubmit}
                        page={page}
                        loading={loading}
                        device={device}
                        setDevice={setDevice}
                        images={images}
                        setImages={setImages}
                        mode={mode}
                        content={layouts}
                        formErrors={formErrors}
                        errors={errors}
                        params={params}
                        setParams={setParams}
                    />
                </DragDropContext>
                <Portal
                    open={portal.open}
                    onClose={handleClosePortal}
                    transition={{
                        animation: 'fly_down', duration: 500,
                    }}
                    top={portal.y}
                    left={portal.x}
                >
                    <Portal.Pallet>
                        {components.map((item) => (
                            <Component
                                icon={item.icon}
                                label={item.label}
                                color={item.color}
                                key={item.type}
                                onClick={() => addComponentFromPortal(item)}
                            />
                        ))}
                    </Portal.Pallet>
                </Portal>
            </div>
        </>
    );
};

export default React.memo(Builder);

Builder.propTypes = {
    page: PropTypes.shape({
        content: PropTypes.string.isRequired,
        params: PropTypes.string.isRequired,
        type: PropTypes.string,
    }),
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    setImages: PropTypes.func.isRequired,
    modules: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    mode: PropTypes.string,
    formErrors: PropTypes.shape({
    }).isRequired,
    errors: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
};

Builder.defaultProps = {
    page: {
        title: '',
        slug: '',
        content: '[]',
        params: '{"background":"#f7fafb"}',
    },
    mode: 'page',
};
