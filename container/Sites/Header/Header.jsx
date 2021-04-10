import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import RenderHeader from '../../RenderHeader/RenderHeader';
import {useTemplates} from 'context/template';

export default function Header({children, title, settings, setShowRender, showRender}) {
    const {templates} = useTemplates()

    const [header, setHeader] = useState([])
    const [siteName, setSiteName] = useState("")
    useEffect(function () {
        if(templates.header){
            setShowRender(true)
        }else{
            setShowRender(false)
        }
    }, [templates])

    useEffect(function () {
        if(templates.header){
            setHeader(templates.header)
        }
    }, [templates])

    useEffect(function () {
        if(settings.sitename){
            setSiteName(settings.sitename.value)
        }
    }, [settings])


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
                <title>{title} | {siteName}</title>
                {children}
            </Head>
            <RenderHeader showRender={showRender} nav={header.nav ?? []} template={header.template ? JSON.parse(header.template.content) : []} />
        </>
    );
}
