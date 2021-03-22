import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';

import styles from './Header.module.scss';
import {useHeader} from 'context/header';

export default function Header({children, title, setShowRender}) {
    const {header} = useHeader()

    const [content, setContent] = useState(null);
    const [logo, setLogo] = useState({});

    useEffect(function () {
        if(header){
            setContent(JSON.parse(header.content))
        }
    }, [header])

    useEffect(function () {
        if(header){
            setLogo(header.logo)
        }
    }, [header])

    useEffect(function () {
        if(content && logo.url){
            setShowRender(true)
        }
    }, [content, logo])

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
            <header className={styles.nav}>
                <Link href='/'>
                    <a className={styles.nav__logo} title="Page d'accueil">
                        {logo.url && <img src={`${logo.url}`} alt='Logo' />}
                    </a>
                </Link>
                <ul className={styles.nav__menu}>
                    {content && content.map(item => <Item key={item.slug} item={item} />)}
                </ul>
                <button className={styles.nav__burger}>
                    <span></span>
                </button>
            </header>
        </>
    );
}

const Item = function ({item}) {
    return <li>
        <Link href={`${item.slug}`}>
            <a>{item.label}</a>
        </Link>
        {item.child.length > 0 &&
            <ul className={styles.sub}>
                {item.child.map(item => <Item key={item.slug} item={item}/>)}
            </ul>
        }
    </li>
}
