import React, {
    useEffect, useState,
} from 'react';
import Head from 'next/head';
import { useTemplates } from 'context/template';
import RenderHeader from '../../RenderHeader/RenderHeader';

export default function Header({ children, title, settings, setShowRender, showRender }) {
    const { templates } = useTemplates();
    const [header, setHeader] = useState([]);
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
            setHeader(templates.header);
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
            <RenderHeader
                showRender={showRender}
                nav={nav}
                template={header.template ? JSON.parse(header.template.content) : []}
            />
        </>
    );
}
