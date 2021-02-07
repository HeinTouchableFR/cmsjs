import React, {useState} from 'react';
import Content from './content.component';
import Navigation from './navigation.component';
import styles from './builder.module.scss';
import {DragDropContext} from 'react-beautiful-dnd';
import useTranslation from '../../intl/useTranslation';

export default function Builder({page}) {
    // Utilisation de la traduction
    const {t} = useTranslation();
    const [dispositions, setDispositions] = useState(page.contenu.dispositions);

    const [currentElement, setCurrentElement] = useState({});

    const composants = [
        {
            balise: '<h1/>',
            label: t('titleLabel'),
            tooltip: t('titleTooltip'),
            color: 'orange',
            type: 'titre',
            valeurDefaut: '<h2>Mon super titre</h2>',
        },
        {
            balise: '<p/>',
            label: t('textEditorLabel'),
            tooltip: t('textEditorTooltip'),
            color: 'purple',
            type: 'texte',
            valeurDefaut: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>',
        },
        {
            balise: '<img/>',
            label: t('imageLabel'),
            tooltip: t('imageTooltip'),
            color: 'yellow',
            type: 'image',
            valeurDefaut: '<img src="/placeholder.png"/>',
        },
        {
            balise: '<button/>',
            label: t('buttonLabel'),
            tooltip: t('buttonTooltip'),
            color: 'teal',
            type: 'bouton',
            valeurDefaut: '<button>Mon bouton</button>',
        },
    ];

    /**
     * Permet d'ajouter une disposition
     */
    const ajouterDisposition = function () {
        const disposition = {};
        disposition.id = new Date().getTime();
        disposition.nbColumns = 0;
        disposition.colonnes = [];

        setDispositions([...dispositions, disposition]);
    };

    /**
     * Permet de mettre à jour une disposition
     * @param disposition
     */
    const modifierDisposition = function (disposition) {
        setDispositions(dispositions.map((d) => (d.id === disposition.id ? disposition : d)));
    };

    /**
     * Permet de supprimer une disposition
     * @param disposition
     */
    const supprimerDisposition = function (disposition) {
        setDispositions(dispositions.filter((d) => d !== disposition));
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result) => {
        const {source, destination} = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        if(destination.droppableId === 'composants'){
          return;
        }

        if (source.droppableId === destination.droppableId) {
            const colonne = getColonneListeById(destination.droppableId);
            const elements = reorder(colonne.elements, source.index, destination.index);

            modifierColonne(colonne, elements);
        } else {
            let result = [];
            const colonneDestination = getColonneListeById(destination.droppableId);
            if (source.droppableId === 'composants') {
                result = move(composants, colonneDestination.elements, source, destination);
            } else {
                const colonneSource = getColonneListeById(source.droppableId);
                result = move(colonneSource.elements, colonneDestination.elements, source, destination);
                modifierColonne(colonneSource, result[source.droppableId]);
            }

            modifierColonne(colonneDestination, result[destination.droppableId]);
        }
    };

    /**
     * Permet de récupérer la liste des éléments d'une colonne
     * @param id
     * @return {[]}
     */
    const getColonneListeById = function (id) {
        let c = [];
        dispositions.map((disposition) => {
            disposition.colonnes.map((colonne) => {
                if (colonne.id.toString() === id) {
                    c = colonne;
                }
            });
        });
        return c;
    };

    /**
     * Permet de modifier les éléments d'une colonne et de mettre à jour la disposition
     * @param colonne
     * @param elements
     */
    const modifierColonne = function (colonne, elements) {
        let disposition = {};
        colonne.elements = elements;

        dispositions.map((d) => {
            d.colonnes.map((c) => {
                if (c.id === colonne.id) {
                    disposition = d;
                }
            });
        });
        if (disposition.id) {
            disposition.colonnes.map((c) => (c.id === colonne.id ? colonne : c));
        }
        modifierDisposition(disposition);
    };

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
        if (droppableSource.droppableId !== 'composants') {
            const sourceClone = Array.from(source);
            const destClone = Array.from(destination);
            const [removed] = sourceClone.splice(droppableSource.index, 1);
            destClone.splice(droppableDestination.index, 0, removed);
            result[droppableSource.droppableId] = sourceClone;
            result[droppableDestination.droppableId] = destClone;
        } else {
            const sourceClone = Array.from(source);
            const destClone = Array.from(destination);
            const [composant] = sourceClone.splice(droppableSource.index, 1);
            const element = {};
            element.id = new Date().getTime();
            element.contenu = composant.valeurDefaut;
            element.type = composant.type;

            destClone.splice(droppableDestination.index, 0, element);
            result[droppableDestination.droppableId] = destClone;
        }

        return result;
    };

    const modifierElement = function (element, contenu) {

        let colonne = {}
        let elements = []
        element.contenu = contenu;
        if (element.id === currentElement.id) {
            dispositions.map((disposition) => {
                disposition.colonnes.map((c) => {
                    c.elements.map((e) => {
                        if (e.id === element.contenu) {
                            colonne = c
                            elements = colonne.elements
                        }
                    });
                });
            });
        }

        elements = elements.map((e) => (e.id === element.id ? [...element, contenu] : e))
        modifierColonne(colonne, elements)
    };

    return (
        <>
            <div className={styles.builder}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Navigation composants={composants} currentItem={currentElement}
                                onElementValeurChange={modifierElement}/>
                    <Content
                        dispositions={dispositions}
                        setDispositions={setDispositions}
                        ajouterDisposition={ajouterDisposition}
                        modifierDisposition={modifierDisposition}
                        supprimerDisposition={supprimerDisposition}
                        onElementClick={setCurrentElement}
                    />
                </DragDropContext>
            </div>
        </>
    );
}
