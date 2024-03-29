import {
    Draggable, Droppable,
} from 'react-beautiful-dnd';
import React from 'react';
import ComponentDispatcher from 'components/ComponentCollection/ComponentDispatcher';
import PropTypes from 'prop-types';
import { useBuilder } from 'context/builder';
import styles from '../Layout.module.scss';

const Column = ({ column,
    updateColumn }) => {
    const { currentElement,
        setCurrentElement,
        handleOpenPortal,
        device } = useBuilder();
    /**
     * Allows you to delete a sub item
     * @param e
     */
    const handleUpdateColumn = (e) => {
        const update = column;
        update.elements = column.elements.filter((c) => c.id !== e.id);
        updateColumn(update);
        if (currentElement.id === e.id) {
            setCurrentElement({
                id: 'empty',
            });
        }
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
            <Droppable droppableId={`${column.id}`}>
                {(provided, snapshot) => (
                    <div
                        className={`${styles.column}`}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {column.elements.length > 0 ? (
                            <div className={styles.column__populated}>
                                {column.elements.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id.toString()}
                                        index={index}
                                    >
                                        {(supplied, _snapshot) => (
                                            <div
                                                className={styles.element__widget}
                                                ref={supplied.innerRef}
                                                {...supplied.draggableProps}
                                                {...supplied.dragHandleProps}
                                                style={getItemStyle(_snapshot.isDragging,
                                                    supplied.draggableProps.style)}
                                            >
                                                <div
                                                    onClick={() => setCurrentElement(item)}
                                                    onKeyDown={() => setCurrentElement(item)}
                                                    role='button'
                                                    tabIndex={0}
                                                >
                                                    <ComponentDispatcher
                                                        element={item}
                                                        device={device}
                                                        mode='preview'
                                                    />
                                                </div>
                                                <button
                                                    key={`btn-empty${item.id}`}
                                                    onClick={() => handleUpdateColumn(item)}
                                                    onKeyDown={() => handleUpdateColumn(item)}
                                                    type='button'
                                                    className={styles.element__widget__remove}
                                                >
                                                    <i className='far fa-times' />
                                                </button>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </div>
                        ) : (
                            <div
                                className={styles.column__empty}
                                onClick={() => setCurrentElement({
                                    id: 'empty', column: column.id,
                                })}
                                onKeyDown={() => setCurrentElement({
                                    id: 'empty', column: column.id,
                                })}
                                role='button'
                                tabIndex={0}
                            >
                                <div
                                    className={styles.element__first__add}
                                    onClick={(e) => handleOpenPortal(e)}
                                    onKeyDown={(e) => handleOpenPortal(e)}
                                    role='button'
                                    tabIndex={0}
                                >
                                    <i className='fal fa-plus' />
                                </div>
                            </div>
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </>
    );
};

export default React.memo(Column);

Column.propTypes = {
    column: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        elements: PropTypes.arrayOf(PropTypes.shape({
        })).isRequired,
    }).isRequired,
    updateColumn: PropTypes.func.isRequired,
};

Column.defaultProps = {
};
