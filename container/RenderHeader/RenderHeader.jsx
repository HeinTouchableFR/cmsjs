import React, {
    useEffect, useState,
} from 'react';
import styles from 'container/Builder/Layout/Layout.module.scss';
import ComponentDispatcher from 'components/ComponentCollection/ComponentDispatcher';
import styled from '@emotion/styled';

export default function RenderHeader({ nav, template, showRender = false }) {
    const [content, setContent] = useState(nav);

    useEffect(() => {
        setContent(nav);
    }, [nav]);

    const Sticky = styled.div({
        position: 'sticky',
        margin: 'auto',
        width: '100%',
        zIndex: '1000',
        backgroundColor: '#FFF',
        top: '0',
    });

    const Header = styled.header({
        maxWidth: '1370px',
        paddingLeft: '20px',
        paddingRight: '20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center',
    });

    return (
        <>
            {showRender
            && (
            <Sticky>
                <Header>
                    {template.map((layout) => (
                        <div
                            className={`${styles.render} ${styles.layout} ${styles.header__layout}`}
                            key={layout.id}
                        >
                            <div className={`${styles.layout__container}`}>
                                {layout.columns && layout.columns.map((column) => (
                                    <div
                                        className={`${styles.column}`}
                                        key={column.id}
                                    >
                                        <div className={`${styles.element__wrap}`}>
                                {column.elements.map((item) => (
                                                <ComponentDispatcher
                                                    key={item.id}
                                                    element={item}
                                                    nav={content}
                                                />
                                            ))}
                            </div>
                                    </div>
                                  ))}
                            </div>
                        </div>
                    ))}
                </Header>
            </Sticky>
            )}
        </>
    );
}
