import React, {useState} from "react";
import Link from "next/link";
import styles from './builder.module.scss'
import AjouterDisposition from "./ajouterDisposition.component";
import Disposition from "./disposition.component";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {Tab} from 'semantic-ui-react'
import Component from "../Component/Component";

export default function Navigation({}) {

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
                                <Draggable
                                    key={"dragable-1"}
                                    draggableId={"dragable-titre"}
                                    index={1}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            <Component balise={"<h1 />"} label={"Titre"} color={"orange"}
                                                       tooltip={"Pour créer des super titres"}/>
                                        </div>
                                    )}
                                </Draggable>
                                <Draggable
                                    key={"dragable-2"}
                                    draggableId={"dragable-image"}
                                    index={2}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            <Component balise={"<img />"} label={"Image"} color={"yellow"}
                                                       tooltip={"Pour créer des super images"}/>
                                        </div>
                                    )}
                                </Draggable>
                                <Draggable
                                    key={"dragable-3"}
                                    draggableId={"dragable-bouton"}
                                    index={3}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            <Component balise={"<button />"} label={"Bouton"} color={"teal"}
                                                       tooltip={"Pour créer des super boutons"}/>
                                        </div>
                                    )}
                                </Draggable>
                                <Draggable
                                    key={"dragable-4"}
                                    draggableId={"dragable-tableau"}
                                    index={4}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            <Component balise={"<table />"} label={"Tableau"} color={"purple"}
                                                       tooltip={"Pour créer des super tableaux"}/>
                                        </div>
                                    )}
                                </Draggable>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>,
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
