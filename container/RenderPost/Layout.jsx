import React from 'react';
import PropTypes from 'prop-types';
import styles from 'container/Builder/Content/Layout/Layout.module.scss';
import ComponentDispatcher from 'components/ComponentCollection/ComponentDispatcher';
import styled from '@emotion/styled';
import { useInView } from 'react-intersection-observer';
import { styleDiv } from 'variables/renderFunctions';

const Layout = React.memo(({ layout, alignCenter }) => {
    const { inView } = useInView();

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
        <>
            <LayoutContainer
                className={`${styles.layout} ${styles.header__layout}`}
                css={styleDiv(layout, inView)}
            >
                <Container>
                    {layout.columns && layout.columns.map((column) => (
                        <div
                            className={`${styles.column}`}
                            key={column.id}
                        >
                            {column.elements.map((item) => (
                                <div
                                    className={styles.element__widget}
                                    key={item.id}
                                >
                                    <ComponentDispatcher
                                        element={item}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </Container>
            </LayoutContainer>
        </>
    );
});

export default Layout;

Layout.propTypes = {
    layout: PropTypes.shape({
        id: PropTypes.number,
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
