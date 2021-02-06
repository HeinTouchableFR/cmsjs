import React, {useState} from "react";
import Link from "next/link";
import styles from './builder.module.scss'
import AjouterDisposition from "./ajouterDisposition.component";
import Disposition from "./disposition.component";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

export default function Content({dispositions, setDispositions, ajouterDisposition, modifierDisposition, supprimerDisposition, onElementClick}) {

    /**
     * Permet de réorganiser la lise des dispositions via drag and drop
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
     * Permet de sauvegarder les positions des dispositions lorsque que le drag est terminé
     * @param result
     */
    const onDragEnd = function (result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            dispositions,
            result.source.index,
            result.destination.index
        );

        setDispositions(items)
    }

    return (<>
            <div className={`${styles.content} ${styles.container}`}>
                {dispositions.map((item) => (
                    <Disposition key={item.id} disposition={item}
                                 modifierDisposition={modifierDisposition}
                                 supprimerDisposition={supprimerDisposition}
                                 onElementClick={onElementClick}/>
                ))}
                <AjouterDisposition handleAddDisposition={ajouterDisposition}/>
            </div>
        </>
    )
}
