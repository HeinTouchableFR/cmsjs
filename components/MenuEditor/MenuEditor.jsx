import React, {useState} from 'react';
import styles from './MenuEditor.module.scss';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import Accordion from 'components/Accordion/Accordion';
import {createPortal} from 'react-dom';
import nookies from 'nookies';

export default function MenuEditor({content, onChange}) {
    const items = JSON.parse(content)

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
        const result = {};
        if (droppableSource.droppableId !== 'menu' && droppableDestination.droppableId !== 'menu') {
            const sourceClone = Array.from(source.child);
            const destClone = Array.from(destination.child);
            const [removed] = sourceClone.splice(droppableSource.index, 1);
            destClone.splice(droppableDestination.index, 0, removed);
            result[droppableSource.droppableId] = sourceClone;
            result[droppableDestination.droppableId] = destClone;
        } else if (droppableDestination.droppableId === 'menu') {
            const sourceClone = Array.from(source.child);
            const destClone = Array.from(destination);
            const [removed] = sourceClone.splice(droppableSource.index, 1);
            destClone.splice(droppableDestination.index, 0, removed);
            result[droppableSource.droppableId] = sourceClone;
            result[droppableDestination.droppableId] = destClone;
        } else {
            const sourceClone = Array.from(source);
            const destClone = Array.from(destination.child);
            const [removed] = sourceClone.splice(droppableSource.index, 1);
            destClone.splice(droppableDestination.index, 0, removed);
            result[droppableSource.droppableId] = sourceClone;
            result[droppableDestination.droppableId] = destClone;
        }
        return result;
    };

    /**
     *
     * @param result
     */
    const onDragEnd = (result) => {
        setIsDisabled(false)
        const {source, destination} = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            const elements = reorder(items, source.index, destination.index);
            handleChange(elements)
        } else if (source.droppableId === "menu") {
            let result = [];
            const destinationList = getDroppableById(destination.droppableId);
            result = move(items, destinationList, source, destination);
            updateChildren(destination.droppableId, result[destination.droppableId]);
            handleChange(result[source.droppableId]);
        } else if (source.droppableId !== "menu" && destination.droppableId === "menu") {
            let result = [];
            const sourceList = getDroppableById(source.droppableId);
            result = move(sourceList, items, source, destination);
            updateChildren(source.droppableId, result[source.droppableId]);
            handleChange(result[destination.droppableId]);
        } else {
            let result = [];
            const destinationList = getDroppableById(destination.droppableId);
            const sourceList = getDroppableById(source.droppableId);
            result = move(sourceList, destinationList, source, destination);
            updateChildren(source.droppableId, result[source.droppableId]);
            updateChildren(destination.droppableId, result[destination.droppableId]);
        }
    };

    const getDroppableById = (id, array = items) => {
        let i = {}
        array.map((item) => {
            if (item.id === id) {
                i = item;
                return
            }else if(item.child.length > 0) {
                item.child.forEach(child => {
                    const response = getDroppableById(child.id, item.child)
                    if(response.id){
                        i = response
                    }
                })
            }
        });
        return i
    }

    const updateChildren = (id, childrens, array = items) => {
        let d = [];
        array.map((item) => {
            if (item.id === id) {
                d = item;
            }else if(item.child.length > 0){
                const response = updateChildren(id, childrens, item.child)
                if(response){
                    d = response
                }
            }
        });
        if (d) {
            d.child = childrens
            handleChange(items.map(i => i.id === d.id ? d : i))
        }
        return d;
    }


    const handleChange = (items) => {
        onChange(items)
    }

    const getListStyle = (isDraggingOver) => ({
        backgroundColor: isDraggingOver && 'rgba(0, 191, 255, 0.2)',
    });

    const [isDisabled, setIsDisabled] = useState(false)

    const onDragStart = (result) =>{
        setIsDisabled(true );
    }


    return (
        <>
            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                <Droppable droppableId={`menu`}>
                    {(provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}
                             style={getListStyle(snapshot.isDraggingOver)}>
                            {items.length > 0 && (
                                <div className={"menu__container"}>
                                    {items.map((item, index) => (
                                        <Item key={item.id} item={item} index={index} isDisabled={isDisabled}/>
                                    ))}
                                </div>
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
}

function Item({item, isChild = false, index, isDisabled, parentIsDragging = false}) {
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
        border: isDraggingOver ? 'dashed 1px gray' : '',
        padding: '0 20px',
        marginLeft: '20px',
    });

    return <>
            <Draggable key={item.id} draggableId={item.id} index={index} shouldRespectForcePress={true}>
                {(provided, snapshot) => (
                    <>
                        <div ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}
                             style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                            <Accordion title={item.label} active={false}>
                                <p>test</p>
                            </Accordion>
                            <Droppable droppableId={`${item.id}`} isDropDisabled={(parentIsDragging ? parentIsDragging : (snapshot.isDragging ? isDisabled : false)) ? isDisabled : false}>
                                {(provided, _snapshot) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}
                                         style={getListStyle(_snapshot.isDraggingOver)}>
                                        {item.child.map((i, index) => <Item key={i.id} item={i} isChild={true} index={index} isDisabled={isDisabled} parentIsDragging={snapshot.isDragging}/>)}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </>
                )}
            </Draggable>
    </>
}
