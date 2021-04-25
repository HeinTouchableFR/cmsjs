import { useState } from 'react';

export function useLayout(layouts, setLayouts) {
    /**
     * Allows you to add a layout
     */
    const addLayout = () => {
        const layout = {
            id: new Date().getTime(),
            nbColumns: 0,
            columns: [],
        };
        setLayouts([...layouts, layout]);
    };

    /**
     * Allows you to update a layout
     * @param layout
     */
    const updateLayout = (layout) => {
        setLayouts(layouts.map((d) => (d.id === layout.id ? layout : d)));
    };

    /**
     * Allows you to delete a layout
     * @param layout
     */
    const deleteLayout = (layout) => {
        setLayouts(layouts.filter((item) => item !== layout));
    };

    return {
        addLayout,
        updateLayout,
        deleteLayout,
    };
}

export function useDnd(components, layouts, currentElement, updateLayout, setCurrentElement) {
    const [portal, setPortal] = useState({
        open: false,
    });
    const rightComponents = components.filter((item, index) => index % 2 && item);
    const leftComponents = components.filter((item, index) => !(index % 2) && item);

    /**
     * Allow you opens the tool pallet
     * @param e
     */
    const handleOpenPortal = (e) => {
        setPortal({
            x: e.clientX, y: e.clientY, open: true,
        });
    };

    /**
     * Allow you close the tool pallet
     */
    const handleClosePortal = () => setPortal(() => ({
        open: false,
    }));

    /**
     * Allows you to retrieve a column
     * @param id
     * @return {[]}
     */
    const getColumn = (id) => {
        let column = [];
        layouts.forEach((layout) => {
            layout.columns.forEach((item) => {
                if (item.id.toString() === id.toString()) {
                    column = item;
                }
            });
        });
        return column;
    };

    /**
     * Allows you to retrieve a layout
     * @param id
     * @return {{}}
     */
    const getLayout = (id) => {
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
    };

    /**
     * Allows you to update a column
     * @param column
     */
    const updateColumn = (column) => {
        const layout = getLayout(column.id);
        if (layout.id) {
            layout.columns.map((c) => (c.id === column.id ? column : c));
        }
        updateLayout(layout);
    };

    /**
     *
     * @param element
     */
    const updateElement = (element) => {
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
    };

    /**
     *
     * @param component
     * @return {{}}
     */
    const generateElement = (component) => ({
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
    });

    /**
     * Allows you to add a component from the tool pallet
     * @param component
     */
    const addComponentFromPortal = (component) => {
        const column = getColumn(currentElement.column);
        const element = generateElement(component);
        setCurrentElement(element);
        column.elements = [element];
        updateColumn(column);
        handleClosePortal();
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
     * @param result
     */
    const onDragEnd = (result) => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        // dropped inside components list
        if (destination.droppableId === 'componentsLeft' || destination.droppableId === 'componentsRight') {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            const column = getColumn(destination.droppableId);
            column.elements = reorder(column.elements, source.index, destination.index);
            updateColumn(column);
        } else {
            let data = [];
            const columnDestination = getColumn(destination.droppableId);
            if (source.droppableId === 'componentsLeft' || source.droppableId === 'componentsRight') {
                data = move(source.droppableId === 'componentsLeft' ? leftComponents : rightComponents, columnDestination.elements, source, destination);
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
    };

    return {
        onDragEnd,
        portal,
        handleOpenPortal,
        handleClosePortal,
        addComponentFromPortal,
        updateElement,
        rightComponents,
        leftComponents,
    };
}
