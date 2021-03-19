import React from 'react';
import { FormattedMessage } from 'react-intl';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './header.module.scss';

import { firebase } from 'utils/firebaseClient';
import { useAuth } from 'authentication/authContext';

export default function Header({ children }) {
    const router = useRouter();
    const { user } = useAuth();

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
                    <a className={styles.item}>
                        <FormattedMessage id='administration' defaultMessage='Administration' />
                    </a>
                </Link>
                <div className={styles.item + ' ' + styles.first}>
                    <div className={styles.menu}>
                        <Link href='/admin/dashboard'>
                            <a className={styles.item + ' ' + (router.pathname.includes('/admin/dashboard') && styles.active)}>
                                <i className='fad fa-tachometer-slowest'></i>
                                <FormattedMessage id='dashboard' defaultMessage='Dashboard' />
                            </a>
                        </Link>
                        <Link href='/admin/document-comptable'>
                            <a className={styles.item + ' ' + (router.pathname.includes('/admin/document-comptable') && styles.active)}>
                                <i className='fad fa-file-chart-line'></i>
                                <FormattedMessage id='accountingDocument' defaultMessage='Accounting document' />
                            </a>
                        </Link>
                        <Link href='/admin/pages'>
                            <a className={styles.item + ' ' + (router.pathname.includes('/admin/pages') && styles.active)}>
                                <i className='fad fa-file-word'></i>
                                <FormattedMessage id='pages' defaultMessage='Pages' />
                            </a>
                        </Link>
                    </div>
                </div>
                <div className={styles.item + ' ' + styles.first}>
                    <div className={styles.header}>
                        <FormattedMessage id='catalogue' defaultMessage='Catalogue' />
                    </div>
                    <div className={styles.menu}>
                        <Link href='/admin/categories'>
                            <a className={styles.item + ' ' + (router.pathname.includes('/admin/categories') && styles.active)}>
                                <i className='fad fa-folder' />
                                <FormattedMessage id='categories' defaultMessage='Categories' />
                            </a>
                        </Link>
                        <Link href='/admin/products'>
                            <a className={styles.item + ' ' + (router.pathname.includes('/admin/products') && styles.active)}>
                                <i className='fad fa-cube' />
                                <FormattedMessage id='products' defaultMessage='Products' />
                            </a>
                        </Link>
                        <Link href='/admin/attributes'>
                            <a className={styles.item + ' ' + (router.pathname.includes('/admin/attributes') && styles.active)}>
                                <i className='fad fa-cubes' />
                                <FormattedMessage id='attributes' defaultMessage='Attributes' />
                            </a>
                        </Link>
                    </div>
                </div>
                <div className={styles.item + ' ' + styles.first}>
                    <div className={styles.header}>
                        <FormattedMessage id='settings' defaultMessage='Settings' />
                    </div>
                    <div className={styles.menu}>
                        <Link href='/admin/menus'>
                            <a className={styles.item + ' ' + (router.pathname.includes('/admin/menus') && styles.active)}>
                                <i className='fad fa-bars' />
                                <FormattedMessage id='menus' defaultMessage='Menus' />
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.menu + ' ' + styles.fixed}>
                <a className={styles.item + ' ' + styles.icon} id='sidebar-toggle' title='Afficher/Masquer la barre latérale' onClick={hideMenu}>
                    <i className='far fa-bars' />
                </a>
                <a href={'/'} target='_blank' className={styles.item} rel='noopener noreferrer'>
                    <FormattedMessage id='website.seeOnline' defaultMessage='See my website online' />
                </a>
                <div className={styles.item + ' ' + styles.dropdown} tabIndex='0'>
                    <span>{user && user.email}</span>
                    <i className='far fa-caret-down' tabIndex='0'>
                        <div className='menu' tabIndex='-1' />
                    </i>
                    <div className={styles.menu} tabIndex='-1'>
                        <span className={styles.item}>
                            <i className='fal fa-user-ninja' />
                            <FormattedMessage id='account.my' defaultMessage='My account' />
                        </span>
                        <span
                            id='sylius-logout-button'
                            className={styles.item}
                            onClick={async () => {
                                await firebase
                                    .auth()
                                    .signOut()
                                    .then(() => {
                                        router.push('/admin/login');
                                    });
                            }}
                        >
                            <i className='far fa-sign-out-alt' />
                            <FormattedMessage id='logout' defaultMessage='Logout' />
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
