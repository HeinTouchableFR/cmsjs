import React from 'react';
import styled from '@emotion/styled';
import AddLayout from 'container/Builder/Content/Layout/AddLayout/AddLayout';
import Layout from 'container/Builder/Content/Layout/Layout';
import {useBuilder} from 'context/builder';
import PropTypes from 'prop-types';
import HeaderArticle from 'components/Posts/Articles/Header/Header';
import Comments from 'components/Posts/Articles/Comments/Comments';
import {useSession} from 'next-auth/client';
import styles from './Content.module.scss';
import Footer from './Templates/Footer';
import Header from './Templates/Header';

function Content({templates}) {
    const {
        layouts,
        params,
        device,
        type,
        form,
        post,
        addLayout
    } = useBuilder();

    const Div = styled.div`
        background: ${params.background};
    `;
    const [session] = useSession();

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
                            {type === 'ARTICLE' && <HeaderArticle post={form}/>}
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
                                            alignCenter
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
                <AddLayout handleAddLayout={addLayout}/>
                {params.enableComments && (
                    <Comments
                        post={post}
                        user={session.user}
                        disableForm
                    />
                )}
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
    templates: PropTypes.shape([]).isRequired,
};

Content.defaultProps = {};
