import styles from './header.module.scss'
import Head from "next/head";
import Link from "next/link";
import {useRouter} from 'next/router'
import React from "react";

export default function Header({title, children}) {
    const router = useRouter()

    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
                      integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
                      crossOrigin="anonymous"/>
                {children}
            </Head>
            <Head>
                <title>{title}</title>
            </Head>
            <header className={styles.nav}>
                <Link href="/">
                    <a className={styles.nav__logo} title="Page d'accueil">
                        <img src="/logo.png" alt="Logo"/>
                    </a>
                </Link>
                <ul className={styles.nav__menu}>
                    <li>
                        <Link href="/">
                            <a>Vêtements</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <a>Accessoires</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <a>Art</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <a>Ma première page</a>
                        </Link>
                    </li>
                </ul>
                <button className={styles.nav__burger}>
                    <span></span>
                </button>
            </header>
        </>
    )
}
