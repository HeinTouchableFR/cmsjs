import React from 'react';
import PropTypes from 'prop-types';
import { presets } from 'variables/variables';
import { styleDivPreview } from 'variables/previewFunctions';
import styled from '@emotion/styled';
import { useBuilder } from 'context/builder';
import styles from './Layout.module.scss';
import Column from './Column/Column';

const Layout = ({ layout, alignCenter }) => {
    const { setCurrentElement,
        device,
        type,
        updateLayout,
        deleteLayout } = useBuilder();
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

    const LayoutContainer = styled.div`
        max-width: ${layout.content.params.layout.stretchSection ? '100%' : '1330px'};
        margin-left: auto!important;
        margin-right: auto!important;
    `;

    const Container = styled.div`
        max-width: ${layout.content.params.layout.contentWidth.type === 'box' ? `${layout.content.params.layout.contentWidth.maxWidth}px` : '100%'};
        margin-left: auto!important;
        margin-right: auto!important;
        width: 100%;
        position: relative;
        z-index: 1;
        display: flex;
        flex-wrap: wrap;
        ${alignCenter && 'align-items: center'}
    `;

    return (
        <div className={`${styles.builder}`}>
            <LayoutContainer
                className={`${styles.layout} ${type === 'HEADER' && styles.header__layout} ${device === 'tablet' && styles.tablet__preview} ${device === 'mobile' && styles.mobile__preview}`}
                css={styleDivPreview(device, layout)}
            >
                <Container>
                    {layout.nbColumns > 0 ? (
                        <>
                            {layout.columns
                            && layout.columns.map((column) => (
                                <Column
                                    key={`element-${column.id}`}
                                    column={column}
                                    updateColumn={updateColumn}
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
                </Container>
            </LayoutContainer>
            <div className={`${styles.layout__settings}`}>
                <button
                    className={`${styles.layout__settings_element}`}
                    onClick={() => setCurrentElement(layout)}
                    onKeyDown={() => setCurrentElement(layout)}
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
};

export default React.memo(Layout);

Layout.propTypes = {
    layout: PropTypes.shape({
        nbColumns: PropTypes.number.isRequired,
        columns: PropTypes.arrayOf(PropTypes.shape({
        })).isRequired,
        content: PropTypes.shape({
            params: PropTypes.shape({
                layout: PropTypes.shape({
                    stretchSection: PropTypes.bool,
                    contentWidth: PropTypes.shape({
                        type: PropTypes.string,
                        maxWidth: PropTypes.string,
                    }).isRequired,
                }).isRequired,
            }).isRequired,
        }).isRequired,
    }).isRequired,
    alignCenter: PropTypes.bool,
};

Layout.defaultProps = {
    alignCenter: false,
};
