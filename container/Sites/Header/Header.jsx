import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import RenderHeader from '../../RenderHeader/RenderHeader';
import {useLogo} from 'context/logo';
import {useTemplates} from 'context/template';

export default function Header({children, title, setShowRender, showRender}) {
    const {logo} = useLogo()
    const {templates} = useTemplates()

    const [header, setHeader] = useState([])
    useEffect(function () {
        if(templates.header && logo.image){
            setShowRender(true)
        }else{
            setShowRender(false)
        }
    }, [templates, logo])

    useEffect(function () {
        if(templates.header){
            setHeader(templates.header)
        }
    }, [templates])


    return (
        <>
            <Head>
                <link
                    rel='stylesheet'
                    href='https://pro.fontawesome.com/releases/v5.10.0/css/all.css'
                    integrity='sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p'
                    crossOrigin='anonymous'
                />
                <meta name="viewport" content="width=device-width, initial-scale=1.0,  user-scalable=no" />
                <title>{title}</title>
                {children}
            </Head>
            <header className={"nav"}>
                <RenderHeader showRender={showRender} nav={header.nav ?? []} template={header.template ? JSON.parse(header.template.content) : []} />
            </header>
        </>
    );
}
