import React, {
    useEffect, useState,
} from 'react';
import Head from 'next/head';
import { useTemplates } from 'context/template';
import styled from '@emotion/styled';
import styles from '../../Builder/Layout/Layout.module.scss';
import ComponentDispatcher from '../../../components/ComponentCollection/ComponentDispatcher';

export default function Header({ children, title, settings, setShowRender, showRender, mode }) {
    const { templates } = useTemplates();
    const [content, setContent] = useState([]);
    const [params, setParams] = useState({});
    const [nav, setNav] = useState([]);
    const [siteName, setSiteName] = useState('');

    useEffect(() => {
        if (templates.header) {
            setShowRender(true);
        } else {
            setShowRender(false);
        }
    }, [templates]);

    useEffect(() => {
        if (templates.header) {
            if (templates.header.template) {
                setContent(JSON.parse(templates.header.template.content));
                setParams(JSON.parse(templates.header.template.params));
            }
            setNav(templates.header.nav);
        }
    }, [templates]);

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
        margin: 'auto',
        width: '100%',
        zIndex: '1000',
        backgroundColor: params.background && params.background[mode],
        top: '0',
    });

    const Header = styled.header({
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
                    <Header>
                        {content.map((layout) => (
                            <div
                                className={`${styles.render} ${styles.layout} ${styles.header__layout}`}
                                key={layout.id}
                            >
                                <div className={`${styles.layout__container}`}>
                                    {layout.columns && layout.columns.map((column) => (
                                        <div
                                            className={`${styles.column}`}
                                            key={column.id}
                                        >
                                            <div className={`${styles.element__wrap}`}>
                                                {column.elements.map((item) => (
                                                    <ComponentDispatcher
                                                        key={item.id}
                                                        element={item}
                                                        nav={nav}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </Header>
                </Sticky>
            )}
        </>
    );
}
