import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Content from 'container/Builder/Content/Content';
import Navigation from 'container/Builder/Navigation/Navigation';
import Component from 'components/ComponentCollection/Component';
import Portal from 'components/Portal/Portal';
import PropTypes from 'prop-types';
import { useBuilder } from 'context/builder';
import styles from './Builder.module.scss';

const Builder = ({ onSubmit,
    loading,
    images,
    setImages,
    templates,
    formErrors,
    errors }) => {
    const { layouts,
        params,
        portal,
        addComponentFromPortal,
        handleClosePortal,
        onDragEnd,
        components } = useBuilder();

    /**
     * Allows you to submit the page
     * @param e
     */
    const handleSubmit = (e) => {
        onSubmit(e, layouts, params);
    };

    return (
        <>
            <div className={styles.builder}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Content
                        templates={templates}
                    />
                    <Navigation
                        onSubmit={handleSubmit}
                        loading={loading}
                        images={images}
                        setImages={setImages}
                        formErrors={formErrors}
                        errors={errors}
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
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    setImages: PropTypes.func.isRequired,
    formErrors: PropTypes.shape({
    }).isRequired,
    errors: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    templates: PropTypes.shape([
    ]).isRequired,
};

Builder.defaultProps = {
};
