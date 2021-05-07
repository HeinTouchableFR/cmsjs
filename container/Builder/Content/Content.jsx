import React from 'react';
import styled from '@emotion/styled';
import AddLayout from 'container/Builder/Content/Layout/AddLayout/AddLayout';
import Layout from 'container/Builder/Content/Layout/Layout';
import { useBuilder } from 'context/builder';
import styles from './Content.module.scss';
import Footer from './Templates/Footer';
import Header from './Templates/Header';

function Content() {
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
                                device={device}
                                key='headerPreview'
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
                        device={device}
                    />
                )}
            </Div>
        </>
    );
}

export default React.memo(Content);

Content.propTypes = {
};

Content.defaultProps = {
};
