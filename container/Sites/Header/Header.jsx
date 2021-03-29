import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {useHeader} from 'context/header';
import RenderHeader from '../../RenderHeader/RenderHeader';

export default function Header({children, title, setShowRender, showRender}) {
    const {header} = useHeader()

    const [template, setTemplate] = useState(null);
    const [nav, setNav] = useState(null);
    const [logo, setLogo] = useState({});

    useEffect(function () {
        if(header){
            setNav(JSON.parse(header.nav))
        }
    }, [header])

    useEffect(function () {
        if(header){
            setTemplate(JSON.parse(header.template.content))
        }
    }, [header])

    useEffect(function () {
        if(header){
            setLogo(header.logo.image)
        }
    }, [header])

    useEffect(function () {
        if(nav && logo.url){
            setShowRender(true)
        }else{
            setShowRender(false)
        }
    }, [nav, logo])


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
                <RenderHeader showRender={showRender} nav={nav} template={template} />
            </header>
        </>
    );
}

const Item = function ({item}) {
    return <li className={"nav__menu_item"}>
        <Link href={`${item.slug}`}>
            <a>{item.label}</a>
        </Link>
        {item.child.length > 0 &&
            <ul className={"sub"}>
                {item.child.map(item => <Item key={item.slug} item={item}/>)}
            </ul>
        }
    </li>
}
