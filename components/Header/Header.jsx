import styles from './header.module.scss';
import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {firebase} from '../../utils/firebaseClient';
import {useAuth} from '../../authentication/authContext';
import {useEffect, useState} from 'react';

export default function Header({children}) {
    const router = useRouter();
    const {user} = useAuth();


    const hideMenu = function (e) {
        e.preventDefault();
        document.querySelector('#sidebar').classList.toggle(styles.hide);
    };

    return (
        <>
            <Head>
                <link
                    rel='stylesheet'
                    href='https://pro.fontawesome.com/releases/v5.10.0/css/all.css'
                    integrity='sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p'
                    crossOrigin='anonymous'
                />
            </Head>
            <div className={styles.sidebar} id='sidebar'>
                <Link href='/admin'>
                    <a className={styles.item}>admin</a>
                </Link>
                <div className={styles.item + ' ' + styles.first}>
                    <div className={styles.menu}>
                        <Link href='/admin/dashboard'>
                            <a className={styles.item + ' ' + (router.pathname.includes('/admin/dashboard') && styles.active)}>
                                <i className='fad fa-tachometer-slowest'></i>
                                Tableau de bord
                            </a>
                        </Link>
                        <Link href='/admin/document-comptable'>
                            <a className={styles.item + ' ' + (router.pathname.includes('/admin/document-comptable') && styles.active)}>
                                <i className='fad fa-file-chart-line'></i>
                                Document Comptable
                            </a>
                        </Link>
                        <Link href='/admin/pages'>
                            <a className={styles.item + ' ' + (router.pathname.includes('/admin/pages') && styles.active)}>
                                <i className='fad fa-file-word'></i>
                                Pages
                            </a>
                        </Link>
                    </div>
                </div>
                <div className={styles.item + ' ' + styles.first}>
                    <div className={styles.header}>Catalogue</div>
                    <div className={styles.menu}>
                        <Link href='/admin/categories'>
                            <a className={styles.item + ' ' + (router.pathname.includes('/admin/categories') && styles.active)}>
                                <i className='fad fa-folder'/>
                                Categories
                            </a>
                        </Link>
                        <Link href='/admin/products'>
                            <a className={styles.item + ' ' + (router.pathname.includes('/admin/products') && styles.active)}>
                                <i className='fad fa-cube'/>
                                Products
                            </a>
                        </Link>
                        <Link href='/admin/attributes'>
                            <a className={styles.item + ' ' + (router.pathname.includes('/admin/attributes') && styles.active)}>
                                <i className='fad fa-cubes'/>
                                Attributes
                            </a>
                        </Link>
                    </div>
                </div>
                <div className={styles.item + ' ' + styles.first}>
                    <div className={styles.header}>Réglages</div>
                    <div className={styles.menu}></div>
                </div>
            </div>
            <div className={styles.menu + ' ' + styles.fixed}>
                <a className={styles.item + ' ' + styles.icon} id='sidebar-toggle'
                   title='Afficher/Masquer la barre latérale' onClick={hideMenu}>
                    <i className='far fa-bars'/>
                </a>
                <a href={'/'} target='_blank' className={styles.item} rel='noopener noreferrer'>
                    Voir votre site en ligne
                </a>
                <div className={styles.item + ' ' + styles.dropdown} tabIndex='0'>
                    <span>{user && user.email}</span>
                    <i className='far fa-caret-down' tabIndex='0'>
                        <div className='menu' tabIndex='-1'/>
                    </i>
                    <div className={styles.menu} tabIndex='-1'>
                        <span className={styles.item}>
                            <i className='fal fa-user-ninja'/>
                            Mon compte
                        </span>
                        <span id='sylius-logout-button' className={styles.item} onClick={async () => {
                            await firebase
                                .auth()
                                .signOut()
                                .then(() => {
                                    router.push("/admin/login");
                                });
                        }}>
                            <i className='far fa-sign-out-alt'/>
                            Déconnexion
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.pusher}>
                <div className={styles.full + ' ' + styles.height} id='wrapper'>
                    <div className={styles.content} id='content'>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
