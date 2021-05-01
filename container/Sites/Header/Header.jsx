import PropTypes from 'prop-types';
import React, {
    useEffect, useState,
} from 'react';
import Head from 'next/head';
import { useTemplates } from 'context/template';
import styled from '@emotion/styled';
import Layout from 'container/RenderPage/Layout';

export default function Header({ children, title, settings, setShowRender, showRender }) {
    const { value: dataTemplates } = useTemplates();
    const [content, setContent] = useState([]);
    const [params, setParams] = useState({
    });
    const [siteName, setSiteName] = useState('');

    useEffect(() => {
        if (dataTemplates.templates.header) {
            setShowRender(true);
        } else {
            setShowRender(false);
        }
    }, [dataTemplates]);

    useEffect(() => {
        if (dataTemplates.templates.header) {
            if (dataTemplates.templates.header.template) {
                setContent(JSON.parse(dataTemplates.templates.header.template.content));
                setParams(JSON.parse(dataTemplates.templates.header.template.params));
            }
        }
    }, [dataTemplates]);

    useEffect(() => {
        if (settings.settings) {
            const generalSettings = settings.settings.find((x) => x.id === 'general');
            if (generalSettings) {
                setSiteName(generalSettings.sitename);
            }
        }
    }, [settings]);

    const Sticky = styled.div({
        position: 'sticky',
        width: '100%',
        zIndex: '1000',
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
            <Head>
                <link
                    rel='stylesheet'
                    href='https://pro.fontawesome.com/releases/v5.10.0/css/all.css'
                    integrity='sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p'
                    crossOrigin='anonymous'
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0,  user-scalable=no'
                />
                <title>
                    {title}
                    {' '}
                    |
                    {' '}
                    {siteName}
                </title>
                {children}
            </Head>
            {showRender
            && (
                <Sticky>
                    <HeaderComponent>
                        {content.map((layout) => (
                            <Layout
                                layout={layout}
                                alignCenter
                                key={layout.id}
                            />
                        ))}
                    </HeaderComponent>
                </Sticky>
            )}
        </>
    );
}

Header.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.shape({
        }),
        PropTypes.arrayOf(PropTypes.shape({
        })),
    ]),
    setShowRender: PropTypes.func.isRequired,
    settings: PropTypes.shape({
        settings: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
        })])),
    }).isRequired,
    showRender: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
};

Header.defaultProps = {
    children: [],
};
