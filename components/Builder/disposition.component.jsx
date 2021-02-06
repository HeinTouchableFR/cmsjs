import React from "react";
import styles from './builder.module.scss'
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";


export default function Disposition({disposition, modifierDisposition, supprimerDisposition}) {


    const structures = []
    for (let i = 1; i < 7; i++) {
        const structure = {}
        structure.id = new Date().getTime() + i
        structure.nbColumns = i
        structures.push(structure)
    }

    /**
     * Permet de générer le bouton de la structure cible
     * Bouton qui montre la forme de la structure
     * @param structure
     * @return {button}
     */
    const genererStructurePreview = function (structure) {
        const n = structure.nbColumns; // Or something else

        const handleClick = function () {
            definirStructureDisposition(structure)
        }

        return <button className={`${styles.disposition__btn} ${styles.structure}`}
                       onClick={handleClick}>
            {
                [...Array(n)].map((e, i) => <span className={`${styles.structure__element}`}
                                                  key={new Date().getTime() + i}>+</span>)
            }
        </button>
    }

    /**
     * Permet de définir la structure de la disposition
     * @param structure
     */
    const definirStructureDisposition = function (structure) {
        disposition.nbColumns = structure.nbColumns

        /**
         * Permet de générer des éléments et un sous élément
         * En fonction du nombre de colonnes de la disposition
         */
        for (let j = 1; j <= disposition.nbColumns; j++) {
            const element = {}
            element.id = new Date().getTime() + j
            element.subs = []

            const sub = {}
            sub.id = new Date().getTime() + j * 10
            sub.content = null
            sub.item = {}

            element.subs.push(sub)
            disposition.elements.push(element)

        }

        modifierDisposition(disposition)
    }

    /**
     * Permet d'ajouter un élément
     * @param element
     */
    const ajouterSousElement = function (element) {
        const sub = {}
        sub.id = new Date().getTime() + 10
        sub.content = null
        sub.item = {}

        element.subs.push(sub)
        disposition.elements.filter(e => e.id === element.id ? element : e)

        modifierDisposition(disposition)
    }

    /**
     * Permet de supprimer un sous élément
     * @param element
     * @param sousElement
     */
    const supprimerSousElement = function (element, sousElement) {
        element.subs = element.subs.filter(e => e.id !== sousElement.id)
        modifierDisposition(disposition)
    }

    const modifierElement = function (element, items) {
        element.subs = items
        modifierDisposition(disposition)
    }

    return (
        <div className={`${styles.disposition}`}>

            {disposition.nbColumns > 0 ?
                <div className={`${styles.disposition__container}`}>
                    {
                        disposition.elements && disposition.elements.map(element =>
                            <Elements key={"element-" + element.id} disposition={disposition} element={element}
                                      ajouterSousElement={ajouterSousElement}
                                      supprimerSousElement={supprimerSousElement} modifierElement={modifierElement}/>
                        )
                    }
                </div>
                :
                <div className={`${styles.disposition__no_columns}`}>
                    <p>Choissez une structure</p>
                    <ul>
                        {structures && structures.map(structure => <li key={structure.id}>
                            {genererStructurePreview(structure)}
                        </li>)}
                    </ul>
                </div>
            }
            <button className={`${styles.disposition__remove_btn}`}
                    onClick={() => supprimerDisposition(disposition)}>X
            </button>
        </div>
    )
}


function Elements({element, onClick, ajouterSousElement, supprimerSousElement, modifierElement}) {

    /**
     * Permet de supprimer un sous élément
     * @param e
     */
    const handleSupprimerSousElement = function (e) {
        supprimerSousElement(element, e)
    }

    /**
     * Permet de réorganiser la lise des sous élément via drag and drop
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
     * Permet de sauvegarder les positions des sous éléments lorsque que le drag est terminé
     * @param result
     */
    const onDragEnd = function (result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            element.subs,
            result.source.index,
            result.destination.index
        );
        modifierElement(element, items)
    }

    /**
     * Permet de définir le style de l'élément qui se déplace
     * @param isDragging
     * @param draggableStyle
     * @return {{padding: number, margin: string, background: string, userSelect: string}}
     */
    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",

        // change border if dragging
        border: isDragging ? "dashed 1px dodgerblue" : "",

        // styles we need to apply on draggables
        ...draggableStyle
    });

    return <>
        <div className={styles.element}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={"draggable"}
                        >
                            {element.subs.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                    {(provided, snapshot) => (
                                        item.content ?
                                            <div
                                                ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                className={`${styles.disposition__plein}`} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                                <div dangerouslySetInnerHTML={{__html: item.content}}/>
                                                <button key={"btn-full" + item.id}
                                                        onClick={() => supprimerSousElement(item)}
                                                        className={styles.disposition__remove_sub}>X
                                                </button>
                                            </div>
                                            :
                                            <div className={styles.disposition__empty}
                                                 ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                                +
                                                <button key={"btn-empty" + item.id}
                                                        onClick={() => handleSupprimerSousElement(item)}
                                                        className={styles.disposition__remove_sub}>X
                                                </button>
                                            </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <button key={"btn-elements" + element.id} className={styles.disposition__ajouter_element}
                    onClick={() => ajouterSousElement(element)}>+
            </button>
        </div>
    </>
}
