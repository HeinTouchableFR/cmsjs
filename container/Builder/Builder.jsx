import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { useIntl } from 'react-intl';

import styles from './Builder.module.scss';

import Content from 'container/Content/Content';
import Navigation from 'container/Navigation/Navigation';

var FormData = require('form-data');

export default function Builder({ page = {}, onSubmit, pages, loading }) {
    // Use translation
    const intl = useIntl();

    const [dispositions, setDispositions] = useState(page.content ? JSON.parse(page.content) : []);

    const [currentElement, setCurrentElement] = useState({});

    const [hideMenu, setHideMenu] = useState(false);

    const composants = [
        {
            tag: '<h1>',
            label: intl.formatMessage({ id: 'title', defaultMessage: 'Title' }),
            tooltip: intl.formatMessage({ id: 'title.tooltip', defaultMessage: 'To create wonderful title' }),
            color: 'orange',
            type: 'title',
            valeurDefaut: `<h2>${intl.formatMessage({ id: 'title.default', defaultMessage: 'My great title' })}</h2>`,
        },
        {
            tag: '<p>',
            label: intl.formatMessage({ id: 'textEditor', defaultMessage: 'Text Editor' }),
            tooltip: intl.formatMessage({ id: 'textEditor.tooltip', defaultMessage: 'To create all your texts' }),
            color: 'purple',
            type: 'text',
            valeurDefaut:
                '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>',
        },
        {
            tag: '<img/>',
            label: intl.formatMessage({ id: 'image', defaultMessage: 'Image' }),
            tooltip: intl.formatMessage({ id: 'image.tooltip', defaultMessage: 'Insert an image to show your products and creations!' }),
            color: 'yellow',
            type: 'image',
            valeurDefaut: '<img src="/placeholder.png"/>',
        },
        {
            tag: '<button>',
            label: intl.formatMessage({ id: 'button', defaultMessage: 'Button' }),
            tooltip: intl.formatMessage({
                id: 'button.tooltip',
                defaultMessage: 'A button allow you multiple possibility: Create link, event, submit...',
            }),
            color: 'teal',
            type: 'bouton',
            valeurDefaut: '<button>Mon bouton</button>',
        },
    ];

    /**
     * Permet d'ajouter une disposition
     */
    const dispositionAdd = function () {
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
    const dispositionUpdate = function (disposition) {
        setDispositions(dispositions.map((d) => (d.id === disposition.id ? disposition : d)));
    };

    /**
     * Permet de supprimer une disposition
     * @param disposition
     */
    const dispositionDelete = function (disposition) {
        disposition.colonnes.map((colonne) => {
            colonne.elements.map((element) => {
                if (element.id === currentElement.id) {
                    setCurrentElement({ id: 'empty' });
                }
            });
        });
        setDispositions(dispositions.filter((d) => d !== disposition));
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        if (destination.droppableId === 'composants') {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const colonne = getColonneListeById(destination.droppableId);
            const elements = reorder(colonne.elements, source.index, destination.index);

            columnUpdate(colonne, elements);
        } else {
            let result = [];
            const colonneDestination = getColonneListeById(destination.droppableId);
            if (source.droppableId === 'composants') {
                result = move(composants, colonneDestination.elements, source, destination);
            } else {
                const colonneSource = getColonneListeById(source.droppableId);
                result = move(colonneSource.elements, colonneDestination.elements, source, destination);
                columnUpdate(colonneSource, result[source.droppableId]);
            }

            columnUpdate(colonneDestination, result[destination.droppableId]);
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
    const columnUpdate = function (colonne, elements) {
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
        dispositionUpdate(disposition);
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
            element.content = composant.valeurDefaut;
            element.type = composant.type;
            element.styles = {
                margin: {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                },
                padding: {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }
            }

            setCurrentElement(element);

            destClone.splice(droppableDestination.index, 0, element);
            result[droppableDestination.droppableId] = destClone;
        }

        return result;
    };

    const elementUpdate = function (element) {
        let colonne = {};
        let elements = [];
        if (element.id === currentElement.id) {
            dispositions.map((disposition) => {
                disposition.colonnes.map((c) => {
                    c.elements.map((e) => {
                        if (e.id === element.id) {
                            colonne = c;
                            elements = colonne.elements;
                        }
                    });
                });
            });
        }

        elements = elements.map((e) => (e.id === element.id ? element : e));
        columnUpdate(colonne, elements);
    };

    const getClassName = function () {
        return hideMenu ? styles.builder + ' ' + styles.hide : styles.builder;
    };

    const handleHideMenu = function () {
        setHideMenu(!hideMenu);
    };

    const handleSubmit = function (e) {
        onSubmit(e, dispositions);
    };

    return (
        <>
            <div className={getClassName()}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Navigation
                        composants={composants}
                        currentItem={currentElement}
                        onElementValeurChange={elementUpdate}
                        setCurrentElement={setCurrentElement}
                        hideMenu={handleHideMenu}
                        onSubmit={handleSubmit}
                        page={page}
                        pages={pages}
                        loading={loading}
                    />

                    <Content
                        dispositions={dispositions}
                        setDispositions={setDispositions}
                        dispositionAdd={dispositionAdd}
                        dispositionUpdate={dispositionUpdate}
                        dispositionDelete={dispositionDelete}
                        onElementClick={setCurrentElement}
                        currentElement={currentElement}
                        setCurrentElement={setCurrentElement}
                    />
                </DragDropContext>
                <div className={styles.hideMenuBtn} onClick={() => handleHideMenu()} />
            </div>
        </>
    );
}
