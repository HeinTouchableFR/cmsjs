import React, {
    useEffect, useState,
} from 'react';
import {useIntl} from 'react-intl';
import slugify from 'react-slugify';
import {
    Droppable, Draggable,
} from 'react-beautiful-dnd';
import Component from 'components/ComponentCollection/Component';
import ComponentDispatcher from 'components/ComponentCollection/ComponentDispatcher';
import Input from 'components/Form/Input/Input';
import Dropdown from 'components/Form/Dropdown/Dropdown';
import Button from 'components/Button/Button';
import styles from './Navigation.module.scss';
import Tab from '../../components/Tab/Tab';
import DarkModeButton from '../../components/Button/DarkModeButton/DarkModeButton';
import Flash from '../../components/Flash/Flash';

export default function Navigation({components, currentItem, onElementValueChange, setCurrentElement, page, onSubmit, loading, hide, device, setDevice, hideMenu, images, setImages, mode, content, formErrors, errors}) {
    const intl = useIntl();

    const [form, setForm] = useState({
        title: page.title || '',
        slug: page.slug || '',
    });

    const [activeIndex, setActiveIndex] = useState(0);
    const handleTabChange = (index) => {
        setCurrentElement({});
        setActiveIndex(index);
    };

    useEffect(() => {
            if (currentItem.id === 'empty') {
                setActiveIndex(1);
            } else if (currentItem.type) {
                setActiveIndex(2);
            }
        },
        [currentItem]);

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
    const getRenderItem = (items) => (provided, snapshot, rubric) => {
        const item = items[rubric.source.index];
        return (
            <>
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={provided.draggableProps.style}
                    className={styles.draggable}
                >
                    <Component
                        tag={item.tag}
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
            return {};
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

        return form.title === '' || form.slug === '';
    };

    const rightComponents = components.filter((item, index) => index % 2 && item);
    const leftComponents = components.filter((item, index) => !(index % 2) && item);

    const panes = [
        {
            label: intl.formatMessage({
                id: 'settings', defaultMessage: 'Settings',
            }),
            render: () => (
                <Tab.Pane>
                    {mode === 'page' ? (
                            <>
                                <form
                                    onSubmit={handleSubmit}
                                    id='pageForm'
                                    name='pageForm'
                                >
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
                                </form>
                            </>
                        )
                        : <>{mode}</>}

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
                        <Droppable
                            droppableId='componentsLeft'
                            renderClone={getRenderItem(leftComponents)}
                            isDropDisabled
                        >
                            {(provided, _snapshot) => (
                                <div
                                    className={styles.droppable}
                                    ref={provided.innerRef}
                                >
                                    {leftComponents.map((item, index) => {
                                        const shouldRenderClone = item.type === _snapshot.draggingFromThisWith;
                                        return (
                                            shouldRenderClone
                                                ? (
                                                    <div
                                                        className={styles.draggable}
                                                        key={item.type}
                                                    >
                                                        <Component
                                                            tag={item.tag}
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
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={getStyle(provided.draggableProps.style, snapshot)}
                                                                className={styles.draggable}
                                                            >
                                                                <Component
                                                                    tag={item.tag}
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
                        <Droppable
                            droppableId='componentsRight'
                            renderClone={getRenderItem(rightComponents)}
                            isDropDisabled
                        >
                            {(provided, _snapshot) => (
                                <div
                                    className={styles.droppable}
                                    ref={provided.innerRef}
                                >
                                    {rightComponents.map((item, index) => {
                                        const shouldRenderClone = item.type === _snapshot.draggingFromThisWith;
                                        return (
                                            shouldRenderClone
                                                ? (
                                                    <div
                                                        className={styles.draggable}
                                                        key={item.type}
                                                    >
                                                        <Component
                                                            tag={item.tag}
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
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={getStyle(provided.draggableProps.style, snapshot)}
                                                                className={styles.draggable}
                                                            >
                                                                <Component
                                                                    tag={item.tag}
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
                    </div>
                </Tab.Pane>
            ),
        },
        currentItem.type && {
            label: `${intl.formatMessage({
                id: 'edit',
                defaultMessage: 'Edit',
            })} ${intl.formatMessage({
                id: currentItem.type,
            })}`,
            render: () => (
                <Tab.Pane>
                    <ComponentDispatcher
                        element={currentItem}
                        mode='editor'
                        device={device}
                        onElementValueChange={onElementValueChange}
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
                            <DarkModeButton/>
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
            />
        </>
    );
}
