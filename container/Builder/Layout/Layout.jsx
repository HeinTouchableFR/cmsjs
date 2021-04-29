import React from 'react';
import PropTypes from 'prop-types';
import { structures } from 'variables/variables';
import styles from './Layout.module.scss';
import Column from './Column/Column';

export default function Layout({ layout,
    updateLayout,
    deleteLayout,
    onElementClick,
    currentElement,
    setCurrentElement,
    device,
    handleOpenPortal,
    params,
    type }) {
    /**
     * Allows you to define the structure of the layout
     * @param structure
     */
    const defineStructure = (structure) => {
        const update = layout;
        update.nbColumns = structure.nbColumns;
        /**
         * Allows you to generate elements and a sub-element
         * Depending on the number of columns in the layout
         */
        for (let j = 1; j <= update.nbColumns; j += 1) {
            const column = {
                id: new Date().getTime() + j,
                elements: [],
            };
            update.columns.push(column);
        }
        updateLayout(update);
    };

    /**
     * Generates the button of the target structure
     * Button showing the shape of the structure
     * @param structure
     * @return {button}
     */
    const structurePreviewGenerate = (structure) => {
        const n = structure.nbColumns;
        const handleClick = () => {
            defineStructure(structure);
        };
        return (
            <button
                className={`${styles.layout__btn} ${styles.structure}`}
                onClick={handleClick}
                onKeyDown={handleClick}
                type='button'
            >
                {[...Array(n)].map((e, i) => (
                    <span
                        className={`${styles.structure__element}`}
                        key={new Date().getTime() + i}
                    >
                        <i className='far fa-plus' />
                    </span>
                ))}
            </button>
        );
    };

    /**
     * Allows you to delete a sub item
     * @param column
     */
    const updateColumn = (column) => {
        layout.columns.map((c) => (c.id === column.id ? column : c));
        updateLayout(layout);
    };

    return (
        <div
            className={`${styles.layout} ${type === 'header' && styles.header__layout} ${device === 'tablet' && styles.tablet__preview} ${device === 'mobile' && styles.mobile__preview}`}
        >
            {layout.nbColumns > 0 ? (
                <div className={`${styles.layout__container}`}>
                    {layout.columns
                    && layout.columns.map((column) => (
                        <Column
                            key={`element-${column.id}`}
                            column={column}
                            updateColumn={updateColumn}
                            onElementClick={onElementClick}
                            setCurrentElement={setCurrentElement}
                            currentElement={currentElement}
                            device={device}
                            handleOpenPortal={handleOpenPortal}
                            params={params}
                        />
                    ))}
                </div>
            ) : (
                <div className={`${styles.layout__no_columns}`}>
                    <p>Choose a structure</p>
                    <ul>
                        {structures() && structures().map((structure) => (
                            <li
                                key={structure.id}
                            >
                                {structurePreviewGenerate(structure)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <button
                className={`${styles.layout__remove_btn}`}
                onClick={() => deleteLayout(layout)}
                onKeyDown={() => deleteLayout(layout)}
                type='button'
            >
                <i className='far fa-times' />
            </button>
        </div>
    );
}

Layout.propTypes = {
    layout: PropTypes.shape({
        nbColumns: PropTypes.number.isRequired,
        columns: PropTypes.arrayOf(PropTypes.shape({
        })).isRequired,
    }).isRequired,
    updateLayout: PropTypes.func.isRequired,
    deleteLayout: PropTypes.func.isRequired,
    onElementClick: PropTypes.func.isRequired,
    setCurrentElement: PropTypes.func.isRequired,
    handleOpenPortal: PropTypes.func.isRequired,
    type: PropTypes.string,
    device: PropTypes.string,
    currentElement: PropTypes.shape({
    }).isRequired,
};

Layout.defaultProps = {
    type: 'page',
    device: 'desktop',
};
