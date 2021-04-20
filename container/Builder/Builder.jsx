import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { useIntl } from 'react-intl';

import Content from 'container/Content/Content';
import Navigation from 'container/Navigation/Navigation';
import Head from 'next/head';
import Component from 'components/ComponentCollection/Component';
import Portal from 'components/Portal/Portal';
import styles from './Builder.module.scss';

export default function Builder({ page = {
}, onSubmit, pages, loading, images, setImages, modules, mode = 'page', errors }) {
    // Use translation
    const intl = useIntl();

    const [layouts, setLayouts] = useState(page.content ? JSON.parse(page.content) : []);

    const [currentElement, setCurrentElement] = useState({
    });

    const [hideMenu, setHideMenu] = useState(false);

    const [device, setDevice] = useState('desktop');

    const components = modules;

    /**
     * Allows you to add a layout
     */
    const layoutAdd = function () {
        const layout = {
        };
        layout.id = new Date().getTime();
        layout.nbColumns = 0;
        layout.columns = [];
        setLayouts([...layouts, layout]);
    };

    /**
     * Allows you to update a layout
     * @param layout
     */
    const layoutUpdate = function (layout) {
        setLayouts(layouts.map((d) => (d.id === layout.id ? layout : d)));
    };

    /**
     * Allows you to delete a layout
     * @param layout
     */
    const layoutDelete = function (layout) {
        layout.columns.map((column) => {
            column.elements.map((element) => {
                if (element.id === currentElement.id) {
                    setCurrentElement({
                        id: 'empty',
                    });
                }
            });
        });
        setLayouts(layouts.filter((d) => d !== layout));
    };

    /**
     *
     * @param list
     * @param startIndex
     * @param endIndex
     * @return {unknown[]}
     */
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const rightComponents = components.filter((item, index) => index % 2 && item);
    const leftComponents = components.filter((item, index) => !(index % 2) && item);

    /**
     *
     * @param result
     */
    const onDragEnd = (result) => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        if (destination.droppableId === 'componentsLeft' || destination.droppableId === 'componentsRight') {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            const column = getcolumnListeById(destination.droppableId);
            const elements = reorder(column.elements, source.index, destination.index);
            columnUpdate(column, elements);
        } else {
            let result = [];
            const columnDestination = getcolumnListeById(destination.droppableId);
            if (source.droppableId === 'componentsLeft' || source.droppableId === 'componentsRight') {
                result = move(source.droppableId === 'componentsLeft' ? leftComponents : rightComponents, columnDestination.elements, source, destination);
            } else {
                const columnSource = getcolumnListeById(source.droppableId);
                result = move(columnSource.elements, columnDestination.elements, source, destination);
                columnUpdate(columnSource, result[source.droppableId]);
            }
            columnUpdate(columnDestination, result[destination.droppableId]);
        }
    };

    /**
     * Allows you to retrieve the list of items in a column.
     * @param id
     * @return {[]}
     */
    const getcolumnListeById = function (id) {
        let c = [];
        layouts.map((layout) => {
            layout.columns.map((column) => {
                if (column.id.toString() === id.toString()) {
                    c = column;
                }
            });
        });
        return c;
    };

    /**
     * Allows you to modify the elements of a column and to update the layout.
     * @param column
     * @param elements
     */
    const columnUpdate = function (column, elements) {
        let layout = {
        };
        column.elements = elements;
        layouts.map((d) => {
            d.columns.map((c) => {
                if (c.id === column.id) {
                    layout = d;
                }
            });
        });
        if (layout.id) {
            layout.columns.map((c) => (c.id === column.id ? column : c));
        }
        layoutUpdate(layout);
    };

    /**
     * Allows you to move/add an item in a list.
     * @param source
     * @param destination
     * @param droppableSource
     * @param droppableDestination
     * @return {{}}
     */
    const move = (source, destination, droppableSource, droppableDestination) => {
        const result = {
        };
        if (droppableSource.droppableId !== 'componentsLeft' && droppableSource.droppableId !== 'componentsRight') {
            const sourceClone = Array.from(source);
            const destClone = Array.from(destination);
            const [removed] = sourceClone.splice(droppableSource.index, 1);
            destClone.splice(droppableDestination.index, 0, removed);
            result[droppableSource.droppableId] = sourceClone;
            result[droppableDestination.droppableId] = destClone;
        } else {
            const sourceClone = Array.from(source);
            const destClone = Array.from(destination);
            const [component] = sourceClone.splice(droppableSource.index, 1);
            const element = generateElement(component);
            setCurrentElement(element);
            destClone.splice(droppableDestination.index, 0, element);
            result[droppableDestination.droppableId] = destClone;
            handleClosePortal();
        }
        return result;
    };

    /**
     *
     * @param element
     */
    const elementUpdate = function (element) {
        let column = {
        };
        let elements = [];
        if (element.id === currentElement.id) {
            layouts.map((layout) => {
                layout.columns.map((c) => {
                    c.elements.map((e) => {
                        if (e.id === element.id) {
                            column = c;
                            elements = column.elements;
                        }
                    });
                });
            });
        }
        elements = elements.map((e) => (e.id === element.id ? element : e));
        columnUpdate(column, elements);
    };

    /**
     *
     */
    const handleHideMenu = function () {
        setHideMenu(!hideMenu);
    };

    /**
     *
     * @param e
     */
    const handleSubmit = function (e) {
        onSubmit(e, layouts);
    };

    const [portal, setPortal] = useState({
        open: false,
    });

    const handleOpenPortal = (e) => {
        setPortal({
            x: e.clientX, y: e.clientY, open: true,
        });
    };
    const handleClosePortal = () => setPortal(() => ({
        open: false,
    }));

    const addComponentFromPortal = (component) => {
        const column = getcolumnListeById(currentElement.column);
        const element = generateElement(component);
        setCurrentElement(element);
        columnUpdate(column, [element]);
        handleClosePortal();
    };

    const generateElement = (component) => {
        const element = {
        };
        element.id = new Date().getTime();
        element.content = component.defaultValue;
        element.type = component.type;
        element.styles = {
            desktop: {
                margin: {
                    unit: 'px',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                },
                padding: {
                    unit: 'px',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                },
            },
            tablet: {
                margin: {
                    unit: 'px',
                    top: '',
                    left: '',
                    right: '',
                    bottom: '',
                },
                padding: {
                    unit: 'px',
                    top: '',
                    left: '',
                    right: '',
                    bottom: '',
                },
            },
            mobile: {
                margin: {
                    unit: 'px',
                    top: '',
                    left: '',
                    right: '',
                    bottom: '',
                },
                padding: {
                    unit: 'px',
                    top: '',
                    left: '',
                    right: '',
                    bottom: '',
                },
            },
        };
        return element;
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
            </Head>
            <div className={styles.builder}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Navigation
                        components={components}
                        currentItem={currentElement}
                        onElementValueChange={elementUpdate}
                        setCurrentElement={setCurrentElement}
                        hideMenu={handleHideMenu}
                        onSubmit={handleSubmit}
                        page={page}
                        pages={pages}
                        loading={loading}
                        hide={hideMenu}
                        device={device}
                        setDevice={setDevice}
                        images={images}
                        setImages={setImages}
                        mode={mode}
                        content={layouts}
                        errors={errors}
                    />
                    <Content
                        layouts={layouts}
                        setLayouts={setLayouts}
                        layoutAdd={layoutAdd}
                        layoutUpdate={layoutUpdate}
                        layoutDelete={layoutDelete}
                        onElementClick={setCurrentElement}
                        currentElement={currentElement}
                        setCurrentElement={setCurrentElement}
                        hide={hideMenu}
                        device={device}
                        handleOpenPortal={handleOpenPortal}
                        mode={mode}
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
                                tag={item.tag}
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
}
