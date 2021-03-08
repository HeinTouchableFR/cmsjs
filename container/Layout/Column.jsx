import styles from './Layout.module.scss';
import {Draggable, Droppable} from 'react-beautiful-dnd';
import TitleRender from '../../components/ComponentCollection/Title/TitleRender';
import parse from 'html-react-parser';
import React from 'react';

export default function Column({ column, onElementClick, elementDelete, currentElement, setCurrentElement }) {
    /**
     * Allows you to delete a sub item
     * @param e
     */
    const handleElementDelete = function (e) {
        elementDelete(column, e);
        if (currentElement.id === e.id) {
            setCurrentElement({ id: 'empty' });
        }
    };

    const handleElementClick = function (e) {
        onElementClick(e);
    };

    /**
     * Allows you to set the style of the moving element
     * @param isDragging
     * @param draggableStyle
     * @return {{border: string, userSelect: string}}
     */
    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',

        // change border if dragging
        border: isDragging ? 'dashed 1px dodgerblue' : '',

        // styles we need to apply on draggables
        ...draggableStyle,
    });

    const getListStyle = (isDraggingOver) => ({
        backgroundColor: isDraggingOver && 'rgba(0, 191, 255, 0.2)',
    });

    return (
        <>
            <div className={`${styles.column}`}>
                <Droppable droppableId={`${column.id}`}>
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`${styles.element__wrap}`}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {column.elements.length > 0 ? (
                                <div className={styles.column__populated}>
                                    {column.elements.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    className={styles.element__widget}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                                >
                                                    <div className={'content'} onClick={() => handleElementClick(item)}>
                                                        {item.type === 'title' ? <TitleRender element={item} /> : parse(item.content)}
                                                    </div>
                                                    <button
                                                        key={'btn-empty' + item.id}
                                                        onClick={() => handleElementDelete(item)}
                                                        className={styles.element__widget__remove}
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.column__empty} onClick={() => handleElementClick({ id: 'empty' })}>
                                    <div className={styles.element__first__add}>
                                        <div className={styles.element__first__icon} />
                                    </div>
                                </div>
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </>
    );
}
