import React from 'react';
import styled from '@emotion/styled';
import AddLayout from 'container/Builder/Content/Layout/AddLayout/AddLayout';
import Layout from 'container/Builder/Content/Layout/Layout';
import { useBuilder } from 'context/builder';
import PropTypes from 'prop-types';
import styles from './Content.module.scss';
import Footer from './Templates/Footer';
import Header from './Templates/Header';

function Content({ templates }) {
    const { layouts,
        params,
        device,
        mode,
        type,
        addLayout } = useBuilder();

    const Div = styled.div`
        background: ${params.background};
    `;

    return (
        <>
            <Div
                className={`${styles.content} ${device === 'tablet' ? styles.tablet__preview : ''} ${device === 'mobile' ? styles.mobile__preview : ''}`}
            >
                {mode === 'page'
                    ? (
                        <>
                            <Header
                                key='headerPreview'
                                template={templates.header}
                            />
                            {layouts.map((item) => (
                                <Layout
                                    key={item.id}
                                    layout={item}
                                />
                            ))}
                        </>
                    ) : (
                        <>
                            {type === 'header'
                            && (
                                <header>
                                    {layouts.map((item) => (
                                        <Layout
                                            key={item.id}
                                            layout={item}
                                        />
                                    ))}
                                </header>
                            )}
                            {type === 'footer'
                            && (
                                <footer>
                                    {layouts.map((item) => (
                                        <Layout
                                            key={item.id}
                                            layout={item}
                                        />
                                    ))}
                                </footer>
                            )}
                        </>

                    )}
                <AddLayout handleAddLayout={addLayout} />
                {mode === 'page' && (
                    <Footer
                        key='footerPreview'
                        template={templates.footer}
                    />
                )}
            </Div>
        </>
    );
}

export default React.memo(Content);

Content.propTypes = {
    templates: PropTypes.shape([
    ]).isRequired,
};

Content.defaultProps = {
};
