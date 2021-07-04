import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import Layout from 'container/RenderPost/Layout';

export default function Footer({ template }) {
    const Foot = styled.footer({
        background: template.params.background,
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
                    {template.content.map((layout) => (
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
        content: PropTypes.arrayOf(PropTypes.shape({
        })),
        params: PropTypes.shape({
        }),
    }).isRequired,
};
