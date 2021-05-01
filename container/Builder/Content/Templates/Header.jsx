import React, {
    useEffect, useState,
} from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useTemplates } from 'context/template';
import Layout from './Layout';

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
                        <Layout
                            layout={layout}
                            device={device}
                            key={layout.id}
                        />
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
