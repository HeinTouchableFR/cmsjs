import React, {
    useEffect, useState,
} from 'react';
import styled from '@emotion/styled';
import { useTemplates } from 'context/template';
import Layout from './Layout';

function Header() {
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
        zIndex: '10',
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
                            key={layout.id}
                        />
                    ))}
                </HeaderComponent>
            </Sticky>
        </>
    );
}

export default React.memo(Header);

Header.propTypes = {
};

Header.defaultProps = {
};
