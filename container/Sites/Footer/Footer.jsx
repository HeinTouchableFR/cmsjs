import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import Layout from 'container/RenderPage/Layout';

export default function Footer({ template }) {
    const [content] = useState(template.content ? JSON.parse(template.content) : []);
    const [params] = useState(template.params ? JSON.parse(template.params) : []);

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
            <Foot>
                <Container>
                    {content.map((layout) => (
                        <Layout
                            layout={layout}
                            key={layout.id}
                        />
                    ))}
                </Container>
            </Foot>
        </>
    );
}

Footer.propTypes = {
    template: PropTypes.shape({
        content: PropTypes.string,
        params: PropTypes.string,
    }).isRequired,
};
