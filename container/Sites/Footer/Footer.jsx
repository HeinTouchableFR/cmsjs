import PropTypes from 'prop-types';
import React, {
    useEffect, useState,
} from 'react';
import {useTemplates} from 'context/template';
import styled from '@emotion/styled';
import ComponentDispatcher from 'components/ComponentCollection/ComponentDispatcher';
import styles from '../../Builder/Layout/Layout.module.scss';

export default function Footer({setShowRender, showRender}) {
    const {value: dataTemplates} = useTemplates();

    const [content, setContent] = useState([]);
    const [params, setParams] = useState({});
    useEffect(() => {
        if (dataTemplates.templates.footer) {
            setShowRender(true);
        } else {
            setShowRender(false);
        }
    }, [dataTemplates]);

    useEffect(() => {
        if (dataTemplates.templates.footer) {
            if (dataTemplates.templates.footer.template) {
                setContent(JSON.parse(dataTemplates.templates.footer.template.content));
                setParams(JSON.parse(dataTemplates.templates.footer.template.params));
            }
        }
    }, [dataTemplates]);

    const Foot = styled.footer({
        background: params.background,
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
                                className={`${styles.layout}`}
                                key={layout.id}
                            >
                                {layout.columns && layout.columns.map((column) => (
                                    <div
                                        className={`${styles.column}`}
                                        key={column.id}
                                    >
                                        {column.elements.map((item) => (
                                            <ComponentDispatcher
                                                key={item.id}
                                                element={item}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </Container>
                </Foot>
            )}
        </>
    );
}

Footer.propTypes = {
    setShowRender: PropTypes.func.isRequired,
    showRender: PropTypes.bool.isRequired,
};
