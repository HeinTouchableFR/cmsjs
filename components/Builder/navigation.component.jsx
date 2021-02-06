import React from "react";
import styles from './builder.module.scss'
import {Droppable, Draggable} from 'react-beautiful-dnd';
import {Tab} from 'semantic-ui-react'
import Component, {ComponentEditor} from "../Component/Component";

export default function Navigation({composants, currentItem, onElementValeurChange}) {

    const panes = [
        {
            menuItem: 'Réglages',
            render: () => <Tab.Pane attached={true}>Tab 1 Content</Tab.Pane>,
        },
        {
            menuItem: 'Composants',
            render: () =>
                <Tab.Pane attached={true}>
                    <Droppable droppableId="composants">
                        {(provided, snapshot) => (
                            <div className={"dropable"} ref={provided.innerRef}>
                                {composants.map((item, index) =><Draggable
                                    key={item.type}
                                    draggableId={item.type}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            <Component balise={item.balise} label={item.label} color={item.color}
                                                       tooltip={item.tooltip}/>
                                        </div>
                                    )}
                                </Draggable>)}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </Tab.Pane>

        },
        currentItem.id && {
            menuItem: 'Modifier ' + currentItem.type,
            render: () =>
                <Tab.Pane attached={true}>
                   <ComponentEditor element={currentItem} onElementValeurChange={onElementValeurChange}/>
                </Tab.Pane>
        }
    ]

    return (<>
            <div className={styles.navigation}>
                <Tab panes={panes}/>
                <div>
                    <button>test</button>
                </div>
            </div>
        </>
    )
}
