import React from 'react';
import Head from 'next/head';
import styles from './Admin.module.scss'
import {useSiteName} from 'context/siteName';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {FormattedMessage} from 'react-intl';

export default function Admin({children}) {
    const router = useRouter();
    const {siteName} = useSiteName()

    return (
        <>
            <Head>
                <link
                    rel='stylesheet'
                    href='https://pro.fontawesome.com/releases/v5.10.0/css/all.css'
                    integrity='sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p'
                    crossOrigin='anonymous'
                />
                <link rel="stylesheet"
                      href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"/>
            </Head>
            <div className={styles.admin}>
                <input type="checkbox" id="nav-toggle" className={styles.nav_toggle}/>
                <div className={styles.sidebar}>
                    <div className={styles.sidebar_brand}>
                        <h2><span className="lab la-accusoft"/> <span>{siteName}</span></h2>
                    </div>
                    <div className={styles.sidebar_menu}>
                        <ul>
                            <li>
                                <Link href={"/admin/dashboard"}>
                                    <a className={router.pathname.includes('dashboard') ? styles.active : undefined}>
                                        <span className="las la-igloo"/>
                                        <span><FormattedMessage id='dashboard' defaultMessage='Dashboard'/></span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/admin/pages"}>
                                    <a className={router.pathname.includes('pages') ? styles.active : undefined}>
                                        <span className="las la-file-alt"/>
                                        <span><FormattedMessage id='pages' defaultMessage='Pages' /></span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/admin/categories"}>
                                    <a className={router.pathname.includes('categories') ? styles.active : undefined}>
                                        <span className="las la-folder"/>
                                        <span><FormattedMessage id='categories' defaultMessage='Categories' /></span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/admin/products"}>
                                    <a className={router.pathname.includes('products') ? styles.active : undefined}>
                                        <span className="las la-cube"/>
                                        <span><FormattedMessage id='products' defaultMessage='Products' /></span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/admin/attributes"}>
                                    <a className={router.pathname.includes('attributes') ? styles.active : undefined}>
                                        <span className="las la-cubes"/>
                                        <span><FormattedMessage id='attributes' defaultMessage='Attributes' /></span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/admin/menus"}>
                                    <a className={router.pathname.includes('menus') ? styles.active : undefined}>
                                        <span className="las la-bars"/>
                                        <span><FormattedMessage id='menus' defaultMessage='Menus' /></span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/admin/templates"}>
                                    <a className={router.pathname.includes('templates') ? styles.active : undefined}>
                                        <span className="las la-project-diagram"/>
                                        <span><FormattedMessage id='templates' defaultMessage='Templates' /></span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.main_content}>
                    <header className={styles.header}>
                        <h2>
                            <label htmlFor="nav-toggle">
                                <span className="las la-bars"/>
                            </label>
                            <FormattedMessage id='dashboard' defaultMessage='Dashboard'/>
                        </h2>
                        <div className={styles.search_wrapper}>
                            <span className="las la-search"/>
                            <input type="search" placeholder="Search here"/>
                        </div>
                        <div className={styles.user_wrapper}>
                            <img src="/placeholder.png" alt=""/>
                            <div>
                                <h4>John Doe</h4>
                                <small>Super admin</small>
                            </div>
                        </div>
                    </header>
                    <main className={styles.main}>
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
