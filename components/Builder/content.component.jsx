import React, {useState} from "react";
import Link from "next/link";
import styles from './builder.module.scss'
import AjouterDisposition from "./ajouterDisposition.component";
import Disposition from "./disposition.component";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

export default function Content({dispositions, ajouterDisposition, modifierDisposition, supprimerDisposition}) {

    return (<>
            <div className={`${styles.content} ${styles.container}`}>
                {dispositions && dispositions.map(item => <Disposition key={item.id} disposition={item}
                                                                       modifierDisposition={modifierDisposition}
                                                                       supprimerDisposition={supprimerDisposition}/>)}
                <AjouterDisposition handleAddDisposition={ajouterDisposition}/>
            </div>
        </>
    )
}
