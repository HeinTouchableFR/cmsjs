import React from "react";
import styles from './builder.module.scss'
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import parse from 'html-react-parser';

export default function Disposition({disposition, modifierDisposition, supprimerDisposition, onElementClick, currentElement, setCurrentElement}) {

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
            const colonne = {}
            colonne.id = new Date().getTime() + j
            colonne.elements = []

            disposition.colonnes.push(colonne)
        }

        modifierDisposition(disposition)
    }

    /**
     * Permet d'ajouter un sous élément
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
     * Permet de modifier un sous élément
     * @param element
     * @param sousElement
     */
    const modifierSousElement = function (element, sousElement) {
        element.subs.filter(e => e.id === sousElement.id ? sousElement : e)
        disposition.elements.filter(e => e.id === element.id ? element : e)

        modifierDisposition(disposition)
    }

    /**
     * Permet de supprimer un sous élément
     * @param colonne
     * @param element
     */
    const supprimerElement = function (colonne, element) {
        colonne.elements = colonne.elements.filter(c => c.id !== element.id)
        modifierDisposition(disposition)
    }

    const modifierElement = function (element, items) {
        element.subs = items
        modifierDisposition(disposition)
    }

    /**
     *
     * @param isDragging
     * @param draggableStyle
     * @return {{border: string, userSelect: string}}
     */
    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',

        // change background colour if dragging
        border: isDragging ? "dashed 1px dodgerblue" : "",

        // styles we need to apply on draggables
        ...draggableStyle,
    });

    return (
        <div className={`${styles.disposition}`}>

            {disposition.nbColumns > 0 ?
                <div className={`${styles.disposition__container}`}>
                    {
                        disposition.colonnes && disposition.colonnes.map(colonne =>
                            <Colonne key={"element-" + colonne.id} disposition={disposition} colonne={colonne}
                                     ajouterSousElement={ajouterSousElement}
                                     supprimerElement={supprimerElement} modifierElement={modifierElement}
                                     modifierSousElement={modifierSousElement}
                                     onElementClick={onElementClick}
                                     setCurrentElement={setCurrentElement}
                                     currentElement={currentElement}
                            />
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
function Colonne({colonne, onElementClick, supprimerElement, currentElement, setCurrentElement}) {
    /**
     * Permet de supprimer un sous élément
     * @param e
     */
    const handleSupprimerElement = function (e) {
        supprimerElement(colonne, e)
        if(currentElement.id === e.id){
            setCurrentElement({id: "empty"})
        }
    }

    const handleElementClick = function (e) {
        onElementClick(e)
    }


    /**
     * Permet de définir le style de l'élément qui se déplace
     * @param isDragging
     * @param draggableStyle
     * @return {{border: string, userSelect: string}}
     */
    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",

        // change border if dragging
        border: isDragging ? "dashed 1px dodgerblue" : "",

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        backgroundColor: isDraggingOver && "rgba(0, 191, 255, 0.2)"
    });


    return <>
        <div className={`${styles.colonne}`}>
            <Droppable droppableId={`${colonne.id}`}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`${styles.element__wrap}`}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {colonne.elements.length > 0 ?
                            <div className={styles.colonne__populated}>
                                {colonne.elements.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                        {(provided, snapshot) => (
                                            <div className={styles.element__widget}
                                                 ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}
                                                 style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                                <div className={"content"} onClick={() => handleElementClick(item)}>
                                                    {parse(item.contenu)}
                                                </div>
                                                <button key={"btn-empty" + item.id}
                                                        onClick={() => handleSupprimerElement(item)}
                                                        className={styles.element__widget__remove}>X
                                                </button>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </div> :
                            <div className={styles.colonne__empty} onClick={() => handleElementClick({id: "empty"})}>
                                <div className={styles.element__first__add}>
                                    <div className={styles.element__first__icon}/>
                                </div>
                            </div>
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    </>
}
