import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Layout from './Layout';

function Header({ template }) {
    const Sticky = styled.div({
        position: 'sticky',
        width: '100%',
        backgroundColor: template.post.params.background,
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
                    {template.post.content.map((layout) => (
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
    template: PropTypes.shape({
        content: PropTypes.string,
        params: PropTypes.string,
    }).isRequired,
};

Header.defaultProps = {
};
