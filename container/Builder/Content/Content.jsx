import React from 'react';
import styled from '@emotion/styled';
import AddLayout from 'container/Builder/Content/Layout/AddLayout/AddLayout';
import Layout from 'container/Builder/Content/Layout/Layout';
import { useBuilder } from 'context/builder';
import PropTypes from 'prop-types';
import styles from './Content.module.scss';
import Footer from './Templates/Footer';
import Header from './Templates/Header';
import HeaderArticle from 'components/Posts/Articles/Header/Header';

function Content({ templates }) {
    const { layouts,
        params,
        device,
        type,
        form,
        addLayout } = useBuilder();

    const Div = styled.div`
        background: ${params.background};
    `;
    return (
        <>
            <Div
                className={`${styles.content} ${device === 'tablet' ? styles.tablet__preview : ''} ${device === 'mobile' ? styles.mobile__preview : ''}`}
            >
                {type === 'PAGE' || type === 'ARTICLE'
                    ? (
                        <>
                            <Header
                                key='headerPreview'
                                template={templates.header}
                            />
                            {type === 'ARTICLE' && <HeaderArticle post={form} />}
                            {layouts.map((item) => (
                                <Layout
                                    key={item.id}
                                    layout={item}
                                />
                            ))}
                        </>
                    ) : (
                        <>
                            {type === 'HEADER'
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
                            {type === 'FOOTER'
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
                {(type === 'PAGE' || type === 'ARTICLE') && (
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
