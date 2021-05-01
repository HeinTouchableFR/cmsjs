import React from 'react';
import PropTypes from 'prop-types';
import styles from 'container/Builder/Layout/Layout.module.scss';
import ComponentDispatcher from 'components/ComponentCollection/ComponentDispatcher';
import styled from '@emotion/styled';

export default function Layout({ layout, device }) {
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
        align-items: center
    `;

    return (
        <>
            <LayoutContainer
                className={`${styles.layout} ${styles.header__layout} ${device === 'tablet' && styles.tablet__preview} ${device === 'mobile' && styles.mobile__preview}`}
                key={layout.id}
            >
                <Container>
                    {layout.nbColumns > 0 && (
                        <>
                            {layout.columns
                            && layout.columns.map((column, index) => (
                                <div
                                    className={`${styles.column}`}
                                    key={index}
                                >
                                    {column.elements.length > 0 && (
                                        <div className={styles.column__populated}>
                                            {column.elements.map((item) => (
                                                <div
                                                    className={styles.element__widget}
                                                    key={item.id}
                                                >
                                                    <ComponentDispatcher
                                                        element={item}
                                                        device={device}
                                                        mode='preview'
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </>
                    )}
                </Container>
            </LayoutContainer>
        </>
    );
}

Layout.propTypes = {
    layout: PropTypes.shape({
        id: PropTypes.number.isRequired,
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
    device: PropTypes.string.isRequired,
};

Layout.defaultProps = {
};
