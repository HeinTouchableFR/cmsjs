import React, {useState} from "react";
import Link from "next/link";
import styles from './builder.module.scss'
import AjouterDisposition from "./ajouterDisposition.component";
import Disposition from "./disposition.component";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import { Tab } from 'semantic-ui-react'
import Component from "../Component/Component";

export default function Navigation({}) {

    const panes = [
        {
            menuItem: 'Réglages',
            render: () => <Tab.Pane attached={true}>Tab 1 Content</Tab.Pane>,
        },
        {
            menuItem: 'Composants',
            render: () => <Tab.Pane attached={true}>
                <Component balise={"<h1 />"} label={"Titre"} color={"orange"} tooltip={"Pour créer des super titres"} />
                <Component balise={"<img />"} label={"Image"} color={"yellow"} tooltip={"Pour créer des super images"} />
                <Component balise={"<button />"} label={"Bouton"} color={"teal"} tooltip={"Pour créer des super boutons"} />
                <Component balise={"<table />"} label={"Tableau"} color={"purple"} tooltip={"Pour créer des super tableaux"} />
            </Tab.Pane>,
        }
    ]

    return (<>
            <div className={styles.navigation}>
                <Tab panes={panes} />
                <div>
                    <button>test</button>
                </div>
            </div>
        </>
    )
}
