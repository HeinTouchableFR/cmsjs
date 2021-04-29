import PropTypes from 'prop-types';
import React, {
    useEffect, useState,
} from 'react';
import { useTemplates } from 'context/template';
import styled from '@emotion/styled';
import ComponentDispatcher from 'components/ComponentCollection/ComponentDispatcher';
import styles from '../../Builder/Layout/Layout.module.scss';

export default function Footer({ setShowRender, showRender, mode }) {
    const { templates } = useTemplates();

    const [content, setContent] = useState([]);
    const [params, setParams] = useState({
    });
    const [nav, setNav] = useState([]);
    useEffect(() => {
        if (templates.footer) {
            setShowRender(true);
        } else {
            setShowRender(false);
        }
    }, [templates]);

    useEffect(() => {
        if (templates.footer) {
            if (templates.footer.template) {
                setContent(JSON.parse(templates.footer.template.content));
                setParams(JSON.parse(templates.footer.template.params));
            }
            setNav(templates.footer.nav);
        }
    }, [templates]);

    const Foot = styled.footer({
        background: params.background && params.background[mode],
    });

    const Container = styled.div({
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
                <Foot>
                    <Container>
                        {content.map((layout) => (
                            <div
                                className={`${styles.render} ${styles.layout}`}
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
                                                        nav={nav}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </Container>
                </Foot>
            )}
        </>
    );
}

Footer.propTypes = {
    mode: PropTypes.string.isRequired,
    setShowRender: PropTypes.func.isRequired,
    showRender: PropTypes.bool.isRequired,
};
