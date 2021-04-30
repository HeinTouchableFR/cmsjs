import React, {
    useEffect, useState,
} from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import styles from 'container/Builder/Layout/Layout.module.scss';
import { useTemplates } from 'context/template';
import ComponentDispatcher from 'components/ComponentCollection/ComponentDispatcher';

export default function Header({ device }) {
    const { value: dataTemplates } = useTemplates();

    const [content, setContent] = useState([]);
    const [params, setParams] = useState({
    });

    useEffect(() => {
        if (dataTemplates.templates.header) {
            if (dataTemplates.templates.header.template) {
                setContent(JSON.parse(dataTemplates.templates.header.template.content));
                setParams(JSON.parse(dataTemplates.templates.header.template.params));
            }
        }
    }, [dataTemplates]);

    const Sticky = styled.div({
        position: 'sticky',
        width: '100%',
        backgroundColor: params.background,
        top: '0',
    });

    const HeaderComponent = styled.header({
        maxWidth: '1370px',
        paddingLeft: '20px',
        paddingRight: '20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center',
    });

    return (
        <>
            <Sticky>
                <HeaderComponent>
                    {content.map((layout) => (
                        <div
                            className={`${styles.layout} ${styles.header__layout} ${device === 'tablet' && styles.tablet__preview} ${device === 'mobile' && styles.mobile__preview}`}
                        >
                            {layout.nbColumns > 0 && (
                                <>
                                    {layout.columns
                                    && layout.columns.map((column) => (
                                        <div
                                            className={`${styles.column}`}
                                        >
                                            {column.elements.length > 0 && (
                                                <div className={styles.column__populated}>
                                                    {column.elements.map((item) => (
                                                        <div
                                                            className={styles.element__widget}
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
                        </div>
                    ))}
                </HeaderComponent>
            </Sticky>
        </>
    );
}

Header.propTypes = {
    device: PropTypes.string.isRequired,
};

Header.defaultProps = {
};
