import {
    useCallback,
    useReducer, useState,
} from 'react';

export function useLayout(content) {
    function reducer(state, action) {
        switch (action.type) {
        case 'ADD':
            return {
                ...state, items: [...state.items, action.payload],
            };
        case 'UPDATE':
            return {
                ...state,
                items: state.items.map((r) => (r.id === action.payload.id ? action.payload : r)),
            };
        case 'DELETE':
            return {
                ...state, items: state.items.filter((r) => r !== action.payload),
            };
        default:
            throw new Error(`Action inconnue ${action.type}`);
        }
    }

    const [layouts, dispatch] = useReducer(reducer, {
        items: JSON.parse(content),
    });

    /**
     * Allows you to add a layout
     */
    const addLayout = useCallback(() => {
        const layout = {
            id: new Date().getTime(),
            nbColumns: 0,
            columns: [],
            type: 'layout',
            content: {
                params: {
                    layout: {
                        stretchSection: true,
                        contentWidth: {
                            type: 'box',
                            maxWidth: '1330',
                        },
                    },
                    responsive: {
                        reverseTabletColumn: false,
                        reverseMobileColumn: false,
                        visibility: {
                            desktop: true,
                            tablet: true,
                            mobile: true,
                        },
                    },
                },
                desktop: {
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: 'none',
                                width: {
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                radius: {
                                    unit: 'px',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                color: 'inherit',
                            },
                            hover: {
                                type: 'none',
                                width: {
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                radius: {
                                    unit: 'px',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                },
                                color: 'inherit',
                            },
                        },
                    },
                    animation: {
                        name: 'none',
                        duration: '1s',
                        delay: '0',
                    },
                },
                tablet: {
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                            hover: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                        },
                    },
                    animation: {
                        name: '',
                        duration: '',
                        delay: '',
                    },
                },
                mobile: {
                    styles: {
                        background: {
                            normal: '',
                            hover: '',
                        },
                        border: {
                            normal: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                            hover: {
                                type: '',
                                width: {
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                radius: {
                                    unit: '',
                                    top: '',
                                    right: '',
                                    bottom: '',
                                    left: '',
                                },
                                color: '',
                            },
                        },
                    },
                    animation: {
                        name: '',
                        duration: '',
                        delay: '',
                    },
                },
            },
            styles: {
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
            },
        };
        dispatch({
            type: 'ADD', payload: layout,
        });
    });

    /**
     * Allows you to update a layout
     * @param layout
     */
    const updateLayout = useCallback((layout) => {
        dispatch({
            type: 'UPDATE', payload: layout,
        });
        // setLayouts(layouts.map((d) => (d.id === layout.id ? layout : d)));
    });

    /**
     * Allows you to delete a layout
     * @param layout
     */
    const deleteLayout = useCallback((layout) => {
        dispatch({
            type: 'DELETE', payload: layout,
        });
        // setLayouts(layouts.filter((item) => item !== layout));
    });

    return {
        layouts: layouts.items,
        addLayout,
        updateLayout,
        deleteLayout,
    };
}

export function useDnd(components, layouts, currentElement, updateLayout, setCurrentElement) {
    const [portal, setPortal] = useState({
        x: '',
        y: '',
        open: false,
    });

    /**
     * Allow you opens the tool pallet
     * @param e
     */
    const handleOpenPortal = useCallback((e) => {
        const portalWidth = 350;
        const width = window.innerWidth;
        setPortal({
            x: e.clientX < (width - portalWidth) ? e.clientX : (width - portalWidth),
            y: e.clientY,
            open: true,
        });
    });

    /**
     * Allow you close the tool pallet
     */
    const handleClosePortal = useCallback(() => setPortal(() => ({
        open: false,
    })));

    /**
     * Allows you to retrieve a column
     * @param id
     * @return {[]}
     */
    const getColumn = useCallback((id) => {
        let column = [];
        layouts.forEach((layout) => {
            layout.columns.forEach((item) => {
                if (item.id.toString() === id.toString()) {
                    column = item;
                }
            });
        });
        return column;
    });

    /**
     * Allows you to retrieve a layout
     * @param id
     * @return {{}}
     */
    const getLayout = useCallback((id) => {
        let layout = {
        };
        layouts.forEach((item) => {
            item.columns.forEach((column) => {
                if (column.id === id) {
                    layout = item;
                }
            });
        });
        return layout;
    });

    /**
     * Allows you to update a column
     * @param column
     */
    const updateColumn = useCallback((column) => {
        const layout = getLayout(column.id);
        if (layout.id) {
            layout.columns.map((c) => (c.id === column.id ? column : c));
        }
        updateLayout(layout);
    });

    /**
     *
     * @param element
     */
    const updateElement = useCallback((element) => {
        let column = {
        };
        let elements = [];
        if (element.id === currentElement.id) {
            layouts.forEach((layout) => {
                layout.columns.forEach((c) => {
                    c.elements.forEach((e) => {
                        if (e.id === element.id) {
                            column = c;
                            elements = column.elements;
                        }
                    });
                });
            });
        }
        elements = elements.map((e) => (e.id === element.id ? element : e));
        column.elements = elements;
        updateColumn(column);
    });

    /**
     *
     * @param component
     * @return {{}}
     */
    const generateElement = useCallback((component) => ({
        id: new Date().getTime(),
        content: component.defaultValue,
        type: component.type,
        styles: {
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
        },
    }));

    /**
     * Allows you to add a component from the tool pallet
     * @param component
     */
    const addComponentFromPortal = useCallback((component) => {
        const column = getColumn(currentElement.column);
        const element = generateElement(component);
        setCurrentElement(element);
        column.elements = [element];
        updateColumn(column);
        handleClosePortal();
    });

    /**
     *
     * @param list
     * @param startIndex
     * @param endIndex
     * @return {unknown[]}
     */
    const reorder = useCallback((list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    });

    /**
     * Allows you to move/add an item in a list.
     * @param source
     * @param destination
     * @param droppableSource
     * @param droppableDestination
     * @return {{}}
     */
    const move = useCallback((source, destination, droppableSource, droppableDestination) => {
        const result = {
        };
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
            const [component] = sourceClone.splice(droppableSource.index, 1);
            const element = generateElement(component);
            setCurrentElement(element);
            destClone.splice(droppableDestination.index, 0, element);
            result[droppableDestination.droppableId] = destClone;
            handleClosePortal();
        }
        return result;
    });

    /**
     *
     * @param result
     */
    const onDragEnd = useCallback((result) => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        // dropped inside components list
        if (destination.droppableId === 'components') {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            const column = getColumn(destination.droppableId);
            column.elements = reorder(column.elements, source.index, destination.index);
            updateColumn(column);
        } else {
            let data;
            const columnDestination = getColumn(destination.droppableId);
            if (source.droppableId === 'components') {
                data = move(components, columnDestination.elements, source, destination);
            } else {
                const columnSource = getColumn(source.droppableId);
                data = move(columnSource.elements,
                    columnDestination.elements,
                    source,
                    destination);
                columnSource.elements = data[source.droppableId];
                updateColumn(columnSource);
            }
            columnDestination.elements = data[destination.droppableId];
            updateColumn(columnDestination);
        }
    });

    return {
        onDragEnd,
        portal,
        handleOpenPortal,
        handleClosePortal,
        addComponentFromPortal,
        updateElement,
    };
}
