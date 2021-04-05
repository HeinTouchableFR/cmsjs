import React from 'react';
import Head from 'next/head';
import styles from './refonte.module.scss'
import {useSiteName} from '../../context/siteName';

export default function Refonte() {
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
                                <a href="/" className={styles.active}>
                                    <span className="las la-igloo"/>
                                    <span>Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <span className="las la-igloo"/>
                                    <span>Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <span className="las la-igloo"/>
                                    <span>Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <span className="las la-igloo"/>
                                    <span>Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <span className="las la-igloo"/>
                                    <span>Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <span className="las la-igloo"/>
                                    <span>Dashboard</span>
                                </a>
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
                            Dashboard
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
                        <div className={styles.cards}>
                            <div className={styles.card_single}>
                                <div>
                                    <h2>54</h2>
                                    <span>Customers</span>
                                </div>
                                <div>
                                    <span className="las la-users"/>
                                </div>
                            </div>
                            <div className={styles.card_single}>
                                <div>
                                    <h2>79</h2>
                                    <span>Projects</span>
                                </div>
                                <div>
                                    <span className="las la-clipboard"/>
                                </div>
                            </div>
                            <div className={styles.card_single}>
                                <div>
                                    <h2>124</h2>
                                    <span>Orders</span>
                                </div>
                                <div>
                                    <span className="las la-shopping-bag"/>
                                </div>
                            </div>
                            <div className={styles.card_single}>
                                <div>
                                    <h2>6k€</h2>
                                    <span>Income</span>
                                </div>
                                <div>
                                    <span className="lab la-google-wallet"/>
                                </div>
                            </div>
                        </div>
                        <div className={styles.recent_grid}>
                            <div className={styles.orders}>
                                <div className={styles.card}>
                                    <div className={styles.card_header}>
                                        <h3>Recent Orders</h3>
                                        <button>See all <span className="las la-arrow-right"/></button>
                                    </div>
                                    <div className={styles.card_body}>
                                        <div className={styles.table_responsive}>
                                            <table className={styles.table}>
                                                <thead className={styles.thead}>
                                                <tr className={styles.tr}>
                                                    <td className={styles.td}>Customer</td>
                                                    <td className={styles.td}>Date</td>
                                                    <td className={styles.td}>Status</td>
                                                </tr>
                                                </thead>
                                                <tbody className={styles.tbody}>
                                                <tr className={styles.tr}>
                                                    <td className={styles.td}>Chevalier Théo</td>
                                                    <td className={styles.td}>05/04/2021</td>
                                                    <td className={styles.td}>
                                                        <span className={`${styles.status} ${styles.orange}`}/>
                                                        pending
                                                    </td>
                                                </tr>
                                                <tr className={styles.tr}>
                                                    <td className={styles.td}>Chevalier Théo</td>
                                                    <td className={styles.td}>05/04/2021</td>
                                                    <td className={styles.td}>
                                                        <span className={`${styles.status} ${styles.orange}`}/>
                                                        pending
                                                    </td>
                                                </tr>
                                                <tr className={styles.tr}>
                                                    <td className={styles.td}>Chevalier Théo</td>
                                                    <td className={styles.td}>05/04/2021</td>
                                                    <td className={styles.td}>
                                                        <span className={`${styles.status} ${styles.orange}`}/>
                                                        pending
                                                    </td>
                                                </tr>
                                                <tr className={styles.tr}>
                                                    <td className={styles.td}>Chevalier Théo</td>
                                                    <td className={styles.td}>05/04/2021</td>
                                                    <td className={styles.td}>
                                                        <span className={`${styles.status} ${styles.green}`}/>
                                                        delivred
                                                    </td>
                                                </tr>
                                                <tr className={styles.tr}>
                                                    <td className={styles.td}>Chevalier Théo</td>
                                                    <td className={styles.td}>05/04/2021</td>
                                                    <td className={styles.td}>
                                                        <span className={`${styles.status} ${styles.red}`}/>
                                                        back
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.customers}>
                                <div className={styles.card}>
                                    <div className={styles.card_header}>
                                        <h3>New customer</h3>
                                        <button>See all <span className="las la-arrow-right"/></button>
                                    </div>
                                    <div className={styles.card_body}>
                                        <div className={styles.customer}>
                                            <div className={styles.info}>
                                                <img src="/placeholder.png" alt=""/>
                                                <div>
                                                    <h4>Lhomme Aymeric</h4>
                                                    <small>Super admin</small>
                                                </div>
                                            </div>
                                            <div className={styles.contact}>
                                                <span className="las la-user-circle"/>
                                                <span className="las la-comment"/>
                                                <span className="las la-phone"/>
                                            </div>
                                        </div>
                                        <div className={styles.customer}>
                                            <div className={styles.info}>
                                                <img src="/placeholder.png" alt=""/>
                                                <div>
                                                    <h4>Lhomme Aymeric</h4>
                                                    <small>Super admin</small>
                                                </div>
                                            </div>
                                            <div className={styles.contact}>
                                                <span className="las la-user-circle"/>
                                                <span className="las la-comment"/>
                                                <span className="las la-phone"/>
                                            </div>
                                        </div>
                                        <div className={styles.customer}>
                                            <div className={styles.info}>
                                                <img src="/placeholder.png" alt=""/>
                                                <div>
                                                    <h4>Lhomme Aymeric</h4>
                                                    <small>Super admin</small>
                                                </div>
                                            </div>
                                            <div className={styles.contact}>
                                                <span className="las la-user-circle"/>
                                                <span className="las la-comment"/>
                                                <span className="las la-phone"/>
                                            </div>
                                        </div>
                                        <div className={styles.customer}>
                                            <div className={styles.info}>
                                                <img src="/placeholder.png" alt=""/>
                                                <div>
                                                    <h4>Lhomme Aymeric</h4>
                                                    <small>Super admin</small>
                                                </div>
                                            </div>
                                            <div className={styles.contact}>
                                                <span className="las la-user-circle"/>
                                                <span className="las la-comment"/>
                                                <span className="las la-phone"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
