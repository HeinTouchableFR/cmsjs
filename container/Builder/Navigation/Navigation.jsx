import React, {
    useEffect, useState,
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
import Tab from 'components/Tab/Tab';
import DarkModeButton from 'components/Button/DarkModeButton/DarkModeButton';
import Flash from 'components/Flash/Flash';
import ColorPicker from 'components/ColorPicker/ColorPicker';
import PropTypes from 'prop-types';
import styles from './Navigation.module.scss';

export default function Navigation({ components,
    currentElement,
    onElementValueChange,
    onLayoutValueChange,
    setCurrentElement,
    page,
    onSubmit,
    loading,
    hide,
    device,
    setDevice,
    hideMenu,
    images,
    setImages,
    mode,
    content,
    formErrors,
    errors,
    params,
    setParams }) {
    const intl = useIntl();

    const [form, setForm] = useState({
        title: page.title || '',
        slug: page.slug || '',
    });

    const [activeIndex, setActiveIndex] = useState(0);
    const handleTabChange = (index) => {
        setCurrentElement({
        });
        setActiveIndex(index);
    };

    useEffect(() => {
        if (currentElement.id === 'empty') {
            setActiveIndex(1);
        } else if (currentElement.type) {
            setActiveIndex(2);
        }
    },
    [currentElement]);

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
    };

    // This method is needed for rendering clones of draggables
    const getRenderItem = (items, name) => (provided, snapshot, rubric) => {
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

        if (page.content === JSON.stringify(content)) {
            return true;
        }

        if (mode === 'page') {
            return form.title === '' || form.slug === '';
        }

        return false;
    };

    const rightComponents = components.filter((item, index) => index % 2 && item);
    const leftComponents = components.filter((item, index) => !(index % 2) && item);

    const handleColorChange = (color) => {
        setParams({
            ...params,
            background: color,
        });
    };

    const DroppablePanel = (items, name) => (
        <Droppable
            droppableId={name}
            renderClone={getRenderItem(items, name)}
            isDropDisabled
        >
            {(provided, _snapshot) => (
                <div
                    className={styles.droppable}
                    ref={provided.innerRef}
                >
                    {items.map((item, index) => {
                        const shouldRenderClone = item.type === _snapshot.draggingFromThisWith;
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
                                                style={getStyle(supplied.draggableProps.style,
                                                    snapshot)}
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
                </div>
            )}
        </Droppable>
    );

    const panes = [
        {
            label: intl.formatMessage({
                id: 'settings', defaultMessage: 'Settings',
            }),
            render: () => (
                <Tab.Pane>
                    <form
                        onSubmit={handleSubmit}
                        id='pageForm'
                        name='pageForm'
                    >
                        {mode === 'page' && (
                            <>
                                <Input
                                    label={intl.formatMessage({
                                        id: 'title', defaultMessage: 'Title',
                                    })}
                                    placeholder={intl.formatMessage({
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
                                    placeholder={intl.formatMessage({
                                        id: 'slug', defaultMessage: 'Slug',
                                    })}
                                    required
                                    name='slug'
                                    defaultValue={form.slug}
                                    onChange={handleChange}
                                    error={formErrors.slug}
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
                </Tab.Pane>
            ),
        },
        {
            label: intl.formatMessage({
                id: 'component', defaultMessage: 'Component',
            }),
            render: () => (
                <Tab.Pane>
                    <div className={`${styles.navGrid}`}>
                        {DroppablePanel(leftComponents, 'componentsLeft')}
                        {DroppablePanel(rightComponents, 'componentsRight')}
                    </div>
                </Tab.Pane>
            ),
        },
        currentElement.type && {
            label: `${intl.formatMessage({
                id: 'edit',
                defaultMessage: 'Edit',
            })} ${intl.formatMessage({
                id: currentElement.type,
            })}`,
            render: () => (
                <Tab.Pane>
                    <ComponentDispatcher
                        element={currentElement}
                        mode='editor'
                        device={device}
                        onElementValueChange={onElementValueChange}
                        onLayoutValueChange={onLayoutValueChange}
                        images={images}
                        setImages={setImages}
                    />
                </Tab.Pane>
            ),
        },
    ];

    return (
        <>
            <div className={`${styles.navigation} ${hide ? styles.hide : ''}`}>
                <div className={styles.inner}>
                    <main>
                        <Tab
                            panes={panes}
                            activeIndex={activeIndex}
                            onTabChange={handleTabChange}
                        />
                    </main>
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
                    <footer>
                        <div className={styles.navigation__bottom_menu}>
                            <DarkModeButton />
                            <Button
                                label={page.content
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
                            />
                            <Dropdown
                                defaultValue={device}
                                options={deviceOptions}
                                onChange={handleDeviceChange}
                                position='up'
                            />
                        </div>
                    </footer>
                </div>
            </div>
            <div
                className={`${styles.hideMenuBtn} ${hide ? styles.hide : ''}`}
                onClick={() => hideMenu()}
                onKeyDown={() => hideMenu()}
                role='button'
                tabIndex={0}
                id='hideButton'
            >
                <span />
            </div>
        </>
    );
}

Navigation.propTypes = {
    components: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    currentElement: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        type: PropTypes.string,
    }).isRequired,
    page: PropTypes.shape({
        title: PropTypes.string,
        slug: PropTypes.string,
        content: PropTypes.string,
    }).isRequired,
    params: PropTypes.shape({
        background: PropTypes.string.isRequired,
    }).isRequired,
    loading: PropTypes.bool,
    hide: PropTypes.bool,
    device: PropTypes.string,
    mode: PropTypes.string,
    content: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    errors: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    formErrors: PropTypes.shape({
        title: PropTypes.string,
        slug: PropTypes.string,
    }).isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    onElementValueChange: PropTypes.func.isRequired,
    onLayoutValueChange: PropTypes.func.isRequired,
    setCurrentElement: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    setDevice: PropTypes.func.isRequired,
    setImages: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
    hideMenu: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
    loading: false,
    hide: false,
    device: 'desktop',
    mode: 'page',
};
