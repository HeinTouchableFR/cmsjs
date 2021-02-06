import React, {useState} from "react";
import Content from "./content.component";
import Navigation from "./navigation.component";
import styles from './builder.module.scss'
import {DragDropContext} from "react-beautiful-dnd";


export default function Builder({page}) {
    const [dispositions, setDispositions] = useState(page.contenu.dispositions)

    /**
     * Permet d'ajouter une disposition
     */
    const ajouterDisposition = function () {
        const disposition = {}
        disposition.id = new Date().getTime()
        disposition.nbColumns = 0
        disposition.colonnes = []

        setDispositions([...dispositions, disposition])
    }

    /**
     * Permet de mettre à jour une disposition
     * @param disposition
     */
    const modifierDisposition = function (disposition) {
        setDispositions(dispositions.map(d => d.id === disposition.id ? disposition : d))
    }

    /**
     * Permet de supprimer une disposition
     * @param disposition
     */
    const supprimerDisposition = function (disposition) {
        setDispositions(dispositions.filter(d => d !== disposition))
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = result => {
        const { source, destination } = result;
        console.log(result)

        // dropped outside the list
       if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const colonne = getColonneListeById(destination.droppableId)
            const elements = reorder(
                colonne.elements,
                source.index,
                destination.index
            );

            modifierColonne(colonne, elements)
        } else {
            let result = []
            const colonneDestination = getColonneListeById(destination.droppableId)
            if(source.droppableId === "composants"){
                result = move(
                    [],
                    colonneDestination.elements,
                    source,
                    destination
                );
            }else{
                const colonneSource = getColonneListeById(source.droppableId)
                result = move(
                    colonneSource.elements,
                    colonneDestination.elements,
                    source,
                    destination
                );
                modifierColonne(colonneSource, result[source.droppableId])
            }

            modifierColonne(colonneDestination, result[destination.droppableId])
        }

    };

    /**
     * Permet de récupérer la liste des éléments d'une colonne
     * @param id
     * @return {[]}
     */
    const getColonneListeById = function (id) {
        let c = []
        dispositions.map(disposition => {
            disposition.colonnes.map(colonne => {
                if (colonne.id.toString() === id){
                    c = colonne
                }
            })
        })
        return c
    }

    /**
     * Permet de modifier les éléments d'une colonne et de mettre à jour la disposition
     * @param colonne
     * @param elements
     */
    const modifierColonne = function (colonne, elements) {
        let disposition = {}
        colonne.elements = elements

        dispositions.map(d => {
            d.colonnes.map(c => {
                if (c.id === colonne.id){
                    disposition = d
                }
            })
        })
        if(disposition.id){
            disposition.colonnes.map(c => c.id === colonne.id ? colonne : c)
        }
        console.log(disposition)
        modifierDisposition(disposition)
    }

    /**
     * Permet de déplacer/ajouter un élément dans une liste
     * @param source
     * @param destination
     * @param droppableSource
     * @param droppableDestination
     * @return {{}}
     */
    const move = (source, destination, droppableSource, droppableDestination) => {
        const result = {};
        if(source.length > 0){
            const sourceClone = Array.from(source);
            const destClone = Array.from(destination);
            const [removed] = sourceClone.splice(droppableSource.index, 1)
            destClone.splice(droppableDestination.index, 0, removed);
            result[droppableSource.droppableId] = sourceClone;
            result[droppableDestination.droppableId] = destClone;
        }else{
            const destClone = Array.from(destination);

            const element = {}
            element.id = new Date().getTime()
            element.contenu = `<h1>Mon super titre</h1>`

            destClone.splice(droppableDestination.index, 0, element);
            result[droppableDestination.droppableId] = destClone;
        }

        return result;
    };

    return (
        <>
            <div className={styles.builder}>
                <DragDropContext onDragEnd={onDragEnd} >
                    <Navigation />
                    <Content dispositions={dispositions} setDispositions={setDispositions} ajouterDisposition={ajouterDisposition} modifierDisposition={modifierDisposition} supprimerDisposition={supprimerDisposition} />
                </DragDropContext>
            </div>
            </>
    )
}
