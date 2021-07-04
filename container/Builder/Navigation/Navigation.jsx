import React, {
    useEffect, useRef, useState,
} from 'react';
import { useIntl } from 'react-intl';
import slugify from 'react-slugify';
import {
    Droppable, Draggable,
} from 'react-beautiful-dnd';
import Component from 'components/ComponentCollection/Component';
import ComponentDispatcher from 'components/ComponentCollection/ComponentDispatcher';
import Input from 'components/Form/Input/Input';
import Dropdown from 'components/Form/Dropdown/Dropdown';
import Button from 'components/Button/Button';
import DarkModeButton from 'components/Button/DarkModeButton/DarkModeButton';
import Flash from 'components/Flash/Flash';
import ColorPicker from 'components/ColorPicker/ColorPicker';
import PropTypes from 'prop-types';
import TextArea from 'components/Form/TextArea/TextArea';
import { useBuilder } from 'context/builder';
import styles from './Navigation.module.scss';
import Checkbox from '../../../components/Form/Checkbox/Checkbox';

export default function Navigation({ onSubmit,
    loading,
    images,
    setImages,
    formErrors,
    errors }) {
    const intl = useIntl();
    const { post,
        layouts,
        params,
        currentElement,
        components,
        device,
        type,
        setType,
        form,
        setForm,
        setParams,
        setDevice } = useBuilder();

    const [activeIndex, setActiveIndex] = useState(0);
    const handleTabChange = (index) => {
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    };

    const handleTabClose = (index) => {
        if (index === activeIndex) {
            setActiveIndex(null);
        }
    };

    useEffect(() => {
        if (currentElement.id === 'empty') {
            setActiveIndex(null);
        } else if (currentElement.type) {
            setActiveIndex(1);
        }
    },
    [currentElement]);

    useEffect(() => {
        if (errors.length > 0 || formErrors.slug) {
            setActiveIndex(0);
        }
    },
    [errors, formErrors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    const handleChange = (_e, data) => {
        setForm({
            ...form,
            [data.name]: (data.value && data.name !== 'slug') && data.value,
            slug: data.name === 'title' ? slugify(data.value) : form.slug,
        });

        if (data.name === 'slug') {
            setForm({
                ...form,
                [data.name]: slugify(data.value),
            });
        }

        if (data.name === 'type') {
            setType(data.value);
        }
    };

    const handleChangeParams = (_e, data) => {
        setParams({
            ...params,
            [data.name]: data.value,
        });
    };

    /**
     * Variables used to move the component tab
     */
    const componentTabRef = useRef(null);
    let mousePosition;
    let width;
    let offset = [0, 0];
    const minMaxOffsetX = [215, 55];
    let isDown = false;

    /**
     * Handle moving tab
     */
    useEffect(() => {
        width = (window.innerWidth > 0) ? (window.innerWidth) : 1500;
        document.addEventListener('mouseup', () => {
            isDown = false;
        }, true);

        const handleMoveTab = (e) => {
            if (isDown) {
                mousePosition = {
                    x: e.clientX,
                };
                const left = mousePosition.x + offset[0];
                const right = width - mousePosition.x - 25;
                if (left > minMaxOffsetX[0] && left < (width / 2)) {
                    componentTabRef.current.style.left = `${left}px`;
                    componentTabRef.current.style.removeProperty('right');
                } else if (right > minMaxOffsetX[1] && right < (width / 2)) {
                    componentTabRef.current.style.right = `${right}px`;
                    componentTabRef.current.style.removeProperty('left');
                } else if (left < minMaxOffsetX[0]) {
                    componentTabRef.current.style.left = `${minMaxOffsetX[0]}px`;
                    componentTabRef.current.style.removeProperty('right');
                } else if (right < minMaxOffsetX[1]) {
                    componentTabRef.current.style.right = `${minMaxOffsetX[1]}px`;
                    componentTabRef.current.style.removeProperty('left');
                }
            }
        };

        document.addEventListener('mousemove', handleMoveTab, true);

        return function cleanup() {
            document.removeEventListener('mousemove', handleMoveTab, false);
        };
    }, []);

    /**
     * Detection of the width of the tab + activation of movement
     */
    useEffect(() => {
        const mousePointer = componentTabRef.current.querySelector('i');
        const getOffset = (e) => {
            isDown = true;
            offset = [
                componentTabRef.current.offsetLeft - e.clientX,
            ];
        };

        if (componentTabRef && componentTabRef.current) {
            mousePointer.addEventListener('mousedown', getOffset, true);
        }

        return function cleanup() {
            mousePointer.removeEventListener('mousedown', getOffset, false);
        };
    }, [componentTabRef]);

    // This method is needed for rendering clones of draggables
    const getRenderItem = (items) => (provided, snapshot, rubric) => {
        const item = items[rubric.source.index];
        const { innerRef, draggableProps, dragHandleProps } = provided;
        return (
            <>
                <div
                    ref={innerRef}
                    {...draggableProps}
                    {...dragHandleProps}
                    style={draggableProps.style}
                >
                    <Component
                        icon={item.icon}
                        label={item.label}
                        color={item.color}
                        tooltip={item.tooltip}
                    />
                </div>
            </>
        );
    };

    const deviceOptions = [
        {
            key: intl.formatMessage({
                id: 'builder.desktop', defaultMessage: 'Desktop',
            }),
            text: intl.formatMessage({
                id: 'builder.desktop', defaultMessage: 'Desktop',
            }),
            value: 'desktop',
        },
        {
            key: intl.formatMessage({
                id: 'builder.tablet', defaultMessage: 'Tablet',
            }),
            text: intl.formatMessage({
                id: 'builder.tablet', defaultMessage: 'Tablet',
            }),
            value: 'tablet',
        },
        {
            key: intl.formatMessage({
                id: 'builder.mobile', defaultMessage: 'Mobile',
            }),
            text: intl.formatMessage({
                id: 'builder.mobile', defaultMessage: 'Mobile',
            }),
            value: 'mobile',
        },
    ];

    const handleDeviceChange = (e, data) => {
        setDevice(data.value);
    };

    const getStyle = (style, snapshot) => {
        if (!snapshot.isDragging) {
            return {
            };
        }
        if (!snapshot.isDropAnimating) {
            return style;
        }

        return {
            ...style,
            // cannot be 0, but make it super tiny
            transitionDuration: '0.001s',
        };
    };

    const checkButtonDisabled = () => {
        if (loading) {
            return true;
        }

        if (type === 'PAGE' || type === 'ARTICLE') {
            return !(form.title !== post.title)
                && !(form.slug !== post.slug)
                && !(form.description !== post.description)
                && !(params.background !== post.params.background)
                && !(params.enableComments !== post.params.enableComments)
                && post.content === JSON.stringify(layouts);
        }

        if (type === 'HEADER' || type === 'FOOTER') {
            return !(form.title !== post.name)
                && !(params.background !== post.params.background)
                && post.content === JSON.stringify(layouts);
        }

        return post.content === JSON.stringify(layouts)
            && !(params.background !== post.params.background);
    };

    const handleColorChange = (color) => {
        setParams({
            ...params,
            background: color,
        });
    };

    return (
        <>
            <div
                className={`${styles.tab} ${styles.visible} ${styles.left} ${styles.small} ${activeIndex === 0 && styles.active}`}
                onClick={() => handleTabChange(0)}
                onKeyDown={() => handleTabChange(0)}
                role='button'
                tabIndex={0}
            >
                <div
                    className={`${styles.header}`}
                    onClick={() => handleTabClose(0)}
                    onKeyDown={() => handleTabClose(0)}
                    role='button'
                    tabIndex={0}
                >
                    {intl.formatMessage({
                        id: 'settings', defaultMessage: 'Settings',
                    })}
                </div>
                <div className={`${styles.content}`}>
                    <form
                        onSubmit={handleSubmit}
                        id='pageForm'
                        name='pageForm'
                    >
                        {(type === 'PAGE' || type === 'ARTICLE') && (
                            <>
                                <Input
                                    label={intl.formatMessage({
                                        id: 'title', defaultMessage: 'Title',
                                    })}
                                    required
                                    name='title'
                                    defaultValue={form.title}
                                    onChange={handleChange}
                                    error={formErrors.title}
                                />
                                <Input
                                    label={intl.formatMessage({
                                        id: 'slug', defaultMessage: 'Slug',
                                    })}
                                    required
                                    name='slug'
                                    defaultValue={form.slug}
                                    onChange={handleChange}
                                    error={formErrors.slug}
                                />
                                <TextArea
                                    label={intl.formatMessage({
                                        id: 'description', defaultMessage: 'Description',
                                    })}
                                    name='description'
                                    defaultValue={form.description}
                                    onChange={handleChange}
                                />
                                <Checkbox
                                    label={intl.formatMessage({
                                        id: 'comment.enable', defaultMessage: 'Enable comments',
                                    })}
                                    name='enableComments'
                                    defaultChecked={params.enableComments || false}
                                    onChange={handleChangeParams}
                                />
                            </>
                        )}
                        {(type === 'HEADER' || type === 'FOOTER') && (
                            <>
                                <Input
                                    label={intl.formatMessage({
                                        id: 'title', defaultMessage: 'Title',
                                    })}
                                    required
                                    name='title'
                                    defaultValue={form.title}
                                    onChange={handleChange}
                                    error={formErrors.title}
                                />
                                <Dropdown
                                    label={intl.formatMessage({
                                        id: 'template.type', defaultMessage: 'Template type',
                                    })}
                                    required
                                    name='type'
                                    defaultValue={form.type}
                                    onChange={handleChange}
                                    notClearable
                                    options={[
                                        {
                                            key: 'header',
                                            text: intl.formatMessage({
                                                id: 'settings.header', defaultMessage: 'Header',
                                            }),
                                            value: 'HEADER',
                                        },
                                        {
                                            key: 'footer',
                                            text: intl.formatMessage({
                                                id: 'settings.footer', defaultMessage: 'Footer',
                                            }),
                                            value: 'FOOTER',
                                        },
                                    ]}
                                />
                            </>
                        )}
                        <ColorPicker
                            defaultColor={params.background}
                            onColorChange={(color) => handleColorChange(color)}
                            label={intl.formatMessage({
                                id: 'builder.background',
                                defaultMessage: 'background',
                            })}
                        />
                    </form>
                    {errors
                    && (
                        <div className={styles.errors}>
                            {errors.map((error, index) => (
                                <Flash
                                    key={index}
                                    error={error}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className={`${styles.navigation}`}>
                <div className={`${styles.actions}`}>
                    <DarkModeButton />
                    <Button
                        label={post.content !== '[]'
                            ? intl.formatMessage({
                                id: 'update', defaultMessage: 'Update',
                            })
                            : intl.formatMessage({
                                id: 'publish', defaultMessage: 'Publish',
                            })}
                        loading={loading}
                        disabled={checkButtonDisabled()}
                        color='green'
                        type='submit'
                        form='pageForm'
                        name='pageButton'
                        id='pageButton'
                        onClick={() => handleTabChange(0)}
                    />
                    <Dropdown
                        defaultValue={device}
                        options={deviceOptions}
                        onChange={handleDeviceChange}
                        position='up'
                        notClearable
                    />
                </div>
                <Droppable
                    droppableId='components'
                    renderClone={getRenderItem(components, 'components')}
                    isDropDisabled
                >
                    {(provided, _snapshot) => (
                        <main
                            ref={provided.innerRef}
                        >
                            {components.map((item, index) => {
                                const shouldRenderClone = item.type
                                    === _snapshot.draggingFromThisWith;
                                return (
                                    shouldRenderClone
                                        ? (
                                            <div
                                                key={item.type}
                                            >
                                                <Component
                                                    icon={item.icon}
                                                    label={item.label}
                                                    color={item.color}
                                                    tooltip={item.tooltip}
                                                    key={item.type}
                                                />
                                            </div>
                                        )
                                        : (
                                            <Draggable
                                                key={item.type}
                                                draggableId={item.type}
                                                index={index}
                                            >
                                                {(supplied, snapshot) => (
                                                    <div
                                                        ref={supplied.innerRef}
                                                        {...supplied.draggableProps}
                                                        {...supplied.dragHandleProps}
                                                        style={
                                                            getStyle(supplied.draggableProps.style,
                                                                snapshot)
                                                        }
                                                    >
                                                        <Component
                                                            icon={item.icon}
                                                            label={item.label}
                                                            color={item.color}
                                                            tooltip={item.tooltip}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                );
                            })}
                            {provided.placeholder}
                        </main>
                    )}
                </Droppable>
            </div>
            <div
                className={`${styles.tab} ${currentElement.type && styles.visible} ${styles.right} ${activeIndex === 1 && styles.active}`}
                onClick={() => handleTabChange(1)}
                onKeyDown={() => handleTabChange(1)}
                role='button'
                tabIndex={0}
                ref={componentTabRef}
            >
                <i className={`fas fa-arrows-alt ${styles.moveCursor}`} />
                {
                    currentElement.type && (
                        <>
                            <div
                                className={`${styles.header}`}
                                onClick={() => handleTabClose(1)}
                                onKeyDown={() => handleTabClose(1)}
                                role='button'
                                tabIndex={0}
                            >
                                {`${intl.formatMessage({
                                    id: 'edit',
                                    defaultMessage: 'Edit',
                                })} ${intl.formatMessage({
                                    id: currentElement.type,
                                })}`}
                            </div>
                            <div className={`${styles.content}`}>
                                <ComponentDispatcher
                                    element={currentElement}
                                    mode='editor'
                                    images={images}
                                    setImages={setImages}
                                />
                            </div>
                        </>
                    )
                }
            </div>
        </>
    );
}

Navigation.propTypes = {
    loading: PropTypes.bool,
    errors: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    formErrors: PropTypes.shape({
        title: PropTypes.string,
        slug: PropTypes.string,
    }).isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    onSubmit: PropTypes.func.isRequired,
    setImages: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
    loading: false,
};
