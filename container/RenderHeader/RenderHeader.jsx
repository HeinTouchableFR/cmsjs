import React, {useEffect, useState} from 'react';
import styles from 'container/Layout/Layout.module.scss';
import ComponentDispatcher from 'components/ComponentCollection/ComponentDispatcher';
import styled from '@emotion/styled'

export default function RenderHeader({nav, template, showRender = false}) {
    const [content, setContent] = useState(nav);

    useEffect(function () {
        setContent(nav)
    }, [nav])

    const Fixed = styled.div({
        position: "fixed",
        margin: "auto",
        width: "100%",
        zIndex: "1000",
        backgroundColor: "#FFF",
    })

    const Header = styled.header({
        maxWidth: "1370px",
        paddingLeft: "20px",
        paddingRight: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        alignItems: "center",
        marginTop: "8px",
    })

    return (
        <>
            {showRender &&
            <Fixed>
                <Header>
                    {template.map((layout) => (
                        <div className={`${styles.render} ${styles.layout} ${styles.header__layout}`} key={layout.id}>
                            <div className={`${styles.layout__container}`}>
                                {layout.columns && layout.columns.map((column) =>
                                    <div className={`${styles.column}`} key={column.id}>
                                        <div className={`${styles.element__wrap}`}>
                                            {column.elements.map((item) => (
                                                <ComponentDispatcher key={item.id} element={item} nav={content}/>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </Header>
            </Fixed>
            }
        </>
    );
}
