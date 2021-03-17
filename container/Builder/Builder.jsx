import React, {useState} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';

import {useIntl} from 'react-intl';

import styles from './Builder.module.scss';

import Content from 'container/Content/Content';
import Navigation from 'container/Navigation/Navigation';
import defaultComponents from 'variables/components'
import Head from 'next/head';

export default function Builder({page = {}, onSubmit, pages, loading}) {
    // Use translation
    const intl = useIntl();

    const [layouts, setLayouts] = useState(page.content ? JSON.parse(page.content) : []);

    const [currentElement, setCurrentElement] = useState({});

    const [hideMenu, setHideMenu] = useState(false);

    const [device, setDevice] = useState("desktop")

    const components = [
        defaultComponents.defaultTitle(intl),
        defaultComponents.defaultText(intl),
        defaultComponents.defaultImage(intl),
        {
            tag: '<button>',
            label: intl.formatMessage({id: 'button', defaultMessage: 'Button'}),
            color: 'brown',
            type: 'bouton',
            defaultValue: '<button>Mon bouton</button>',
        },
    ];

    /**
     * Allows you to add a layout
     */
    const layoutAdd = function () {
        const layout = {};
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
                    setCurrentElement({id: 'empty'});
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

    /**
     *
     * @param result
     */
    const onDragEnd = (result) => {
        const {source, destination} = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        if (destination.droppableId === 'components') {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            const column = getcolumnListeById(destination.droppableId);
            const elements = reorder(column.elements, source.index, destination.index);
            columnUpdate(column, elements);
        } else {
            let result = [];
            const columnDestination = getcolumnListeById(destination.droppableId);
            if (source.droppableId === 'components') {
                result = move(components, columnDestination.elements, source, destination);
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
                if (column.id.toString() === id) {
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
        let layout = {};
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
        const result = {};
        if (droppableSource.droppableId !== 'components') {
            const sourceClone = Array.from(source);
            const destClone = Array.from(destination);
            const [removed] = sourceClone.splice(droppableSource.index, 1);
            destClone.splice(droppableDestination.index, 0, removed);
            result[droppableSource.droppableId] = sourceClone;
            result[droppableDestination.droppableId] = destClone;
        } else {
            const sourceClone = Array.from(source);
            const destClone = Array.from(destination);
            const [composant] = sourceClone.splice(droppableSource.index, 1);
            const element = {};
            element.id = new Date().getTime();
            element.content = composant.defaultValue;
            element.type = composant.type;
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
                    }
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
                    }
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
                    }
                },
            };
            setCurrentElement(element);
            destClone.splice(droppableDestination.index, 0, element);
            result[droppableDestination.droppableId] = destClone;
        }
        return result;
    };

    /**
     *
     * @param element
     */
    const elementUpdate = function (element) {
        let column = {};
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
     * @return {*}
     */
    const getClassName = function () {
        return hideMenu ? styles.builder + ' ' + styles.hide : styles.builder;
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
            <div className={hideMenu ? styles.builder + ' ' + styles.hide : styles.builder}>
                <DragDropContext onDragEnd={onDragEnd} className={styles.dnd}>
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
                    />
                </DragDropContext>
            </div>
        </>
    );
}
