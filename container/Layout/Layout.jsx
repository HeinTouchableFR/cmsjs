import React from 'react';

import styles from './Layout.module.scss';
import Column from './Column/Column'
import {structures} from 'variables/variables';

export default function Layout({ layout, layoutUpdate, layoutDelete, onElementClick, currentElement, setCurrentElement, device }) {
        /**
     * Generates the button of the target structure
     * Button showing the shape of the structure
     * @param structure
     * @return {button}
     */
    const structurePreviewGenerate = function (structure) {
        const n = structure.nbColumns;
        const handleClick = function () {
            defineStructure(structure);
        };
        return (
            <button className={`${styles.layout__btn} ${styles.structure}`} onClick={handleClick}>
                {[...Array(n)].map((e, i) => (
                    <span className={`${styles.structure__element}`} key={new Date().getTime() + i}>
                        <i className="far fa-plus" />
                    </span>
                ))}
            </button>
        );
    };

    /**
     * Allows you to define the structure of the layout
     * @param structure
     */
    const defineStructure = function (structure) {
        layout.nbColumns = structure.nbColumns;
        /**
         * Allows you to generate elements and a sub-element
         * Depending on the number of columns in the layout
         */
        for (let j = 1; j <= layout.nbColumns; j++) {
            const column = {};
            column.id = new Date().getTime() + j;
            column.elements = [];

            layout.columns.push(column);
        }
        layoutUpdate(layout);
    };

    /**
     * Allows you to add a sub-element
     * @param element
     */
    const subElementAdd = function (element) {
        const sub = {};
        sub.id = new Date().getTime() + 10;
        sub.content = null;
        sub.item = {};
        element.subs.push(sub);
        layout.elements.filter((e) => (e.id === element.id ? element : e));
        layoutUpdate(layout);
    };

    /**
     * Allows you to modify a sub-element
     * @param element
     * @param subElement
     */
    const subElementUpdate = function (element, subElement) {
        element.subs.filter((e) => (e.id === subElement.id ? subElement : e));
        layout.elements.filter((e) => (e.id === element.id ? element : e));
        layoutUpdate(layout);
    };

    /**
     * Allows you to delete a sub item
     * @param column
     * @param element
     */
    const elementDelete = function (column, element) {
        column.elements = column.elements.filter((c) => c.id !== element.id);
        layoutUpdate(layout);
    };

    const elementUpdate = function (element, items) {
        element.subs = items;
        layoutUpdate(layout);
    };

    return (
        <div className={`${styles.layout} ${device === "tablet" ? styles.tablet__preview : ''} ${device === "mobile" ? styles.mobile__preview : ''}`}>
            {layout.nbColumns > 0 ? (
                <div className={`${styles.layout__container}`}>
                    {layout.columns &&
                        layout.columns.map((column) => (
                            <Column
                                key={'element-' + column.id}
                                layout={layout}
                                column={column}
                                elementDelete={elementDelete}
                                elementUpdate={elementUpdate}
                                subElementAdd={subElementAdd}
                                subElementUpdate={subElementUpdate}
                                onElementClick={onElementClick}
                                setCurrentElement={setCurrentElement}
                                currentElement={currentElement}
                                device={device}
                            />
                        ))}
                </div>
            ) : (
                <div className={`${styles.layout__no_columns}`}>
                    <p>Choose a structure</p>
                    <ul>{structures() && structures().map((structure) => <li key={structure.id}>{structurePreviewGenerate(structure)}</li>)}</ul>
                </div>
            )}
            <button className={`${styles.layout__remove_btn}`} onClick={() => layoutDelete(layout)}>
                <i className="far fa-times" />
            </button>
        </div>
    );
}
