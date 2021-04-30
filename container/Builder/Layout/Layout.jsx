import React from 'react';
import PropTypes from 'prop-types';
import { presets } from 'variables/variables';
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
    type }) {
    /**
     * Allows you to define the preset of the layout
     * @param preset
     */
    const definePreset = (preset) => {
        const update = layout;
        update.nbColumns = preset.nbColumns;
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
     * Generates the button of the target preset
     * Button showing the shape of the preset
     * @param preset
     * @return {button}
     */
    const presetPreviewGenerate = (preset) => {
        const n = preset.nbColumns;
        const handleClick = () => {
            definePreset(preset);
        };
        return (
            <button
                className={`${styles.preset}`}
                onClick={handleClick}
                onKeyDown={handleClick}
                type='button'
            >
                {[...Array(n)].map((e, i) => (
                    <span
                        className={`${styles.preset__element}`}
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
        <div className={`${styles.builder}`}>
            <div
                className={`${styles.layout} ${type === 'header' && styles.header__layout} ${device === 'tablet' && styles.tablet__preview} ${device === 'mobile' && styles.mobile__preview}`}
            >
                {layout.nbColumns > 0 ? (
                    <>
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
                            />
                        ))}
                    </>
                ) : (
                    <div className={`${styles.layout__add_section}`}>
                        <p>Choose a structure</p>
                        <ul>
                            {presets() && presets().map((preset) => (
                                <li
                                    key={preset.id}
                                >
                                    {presetPreviewGenerate(preset)}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>
            <div className={`${styles.layout__settings}`}>
                <button
                    className={`${styles.layout__settings_element}`}
                    onClick={() => console.log('TODO')}
                    onKeyDown={() => console.log('TODO')}
                    type='button'
                >
                    <i className='far fa-pen' />
                </button>
                <button
                    className={`${styles.layout__settings_element}`}
                    onClick={() => deleteLayout(layout)}
                    onKeyDown={() => deleteLayout(layout)}
                    type='button'
                >
                    <i className='far fa-times' />
                </button>
            </div>
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
