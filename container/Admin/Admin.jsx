import React, {
    useEffect, useState,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import DarkModeButton from 'components/Button/DarkModeButton/DarkModeButton';
import { useSettings } from 'context/settings';
import { useSession } from 'next-auth/client';
import PropTypes from 'prop-types';
import { version } from 'package';
import styles from './Admin.module.scss';
import Search from './Search';

export default function Admin({ children }) {
    const router = useRouter();
    const { value: settings } = useSettings();
    const [siteName, setSiteName] = useState('');
    const [session] = useSession();

    useEffect(() => {
        if (settings.settings) {
            const sitenameObject = settings.settings.find((x) => x.data === 'sitename');
            setSiteName(sitenameObject?.value);
        }
    },
    [settings]);

    return (
        <>
            <div className={styles.admin}>
                <input
                    type='checkbox'
                    id='nav-toggle'
                    className={styles.nav_toggle}
                />
                <div className={styles.sidebar}>
                    <div className={styles.sidebar_brand}>
                        <h2>
                            <span className='fab fa-accusoft' />
                            {' '}
                            <span>{siteName}</span>
                        </h2>
                    </div>
                    <div className={styles.sidebar_menu}>
                        <ul>
                            <li>
                                <Link href={`${process.env.SERVER}/admin/dashboard`}>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a className={router.pathname.includes('dashboard') ? styles.active : undefined}>
                                        <span className='fas fa-igloo' />
                                        <span>
                                            <FormattedMessage
                                                id='dashboard'
                                                defaultMessage='Dashboard'
                                            />
                                        </span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href={`${process.env.SERVER}/admin/pages`}>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a className={router.pathname.includes('pages') ? styles.active : undefined}>
                                        <span className='fas fa-file-alt' />
                                        <span>
                                            <FormattedMessage
                                                id='pages'
                                                defaultMessage='Pages'
                                            />
                                        </span>
                                    </a>
                                </Link>
                            </li>
                            {/* <li>
                                <Link href={'/admin/categories'}>
                                    <a className={router.pathname.includes('categories') ? styles.active : undefined}>
                                        <span className='fas fa-folder' />
                                        <span>
                                            <FormattedMessage id='categories' defaultMessage='Categories' />
                                        </span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/admin/products'}>
                                    <a className={router.pathname.includes('products') ? styles.active : undefined}>
                                        <span className='fas fa-cube' />
                                        <span>
                                            <FormattedMessage id='products' defaultMessage='Products' />
                                        </span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/admin/attributes'}>
                                    <a className={router.pathname.includes('attributes') ? styles.active : undefined}>
                                        <span className='fas fa-cubes' />
                                        <span>
                                            <FormattedMessage id='attributes' defaultMessage='Attributes' />
                                        </span>
                                    </a>
                                </Link>
                            </li> */}
                            <li>
                                <Link href={`${process.env.SERVER}/admin/menus`}>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a className={router.pathname.includes('menus') ? styles.active : undefined}>
                                        <span className='fas fa-bars' />
                                        <span>
                                            <FormattedMessage
                                                id='menus'
                                                defaultMessage='Menus'
                                            />
                                        </span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href={`${process.env.SERVER}/admin/templates`}>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a className={router.pathname.includes('templates') ? styles.active : undefined}>
                                        <span className='fas fa-project-diagram' />
                                        <span>
                                            <FormattedMessage
                                                id='templates'
                                                defaultMessage='Templates'
                                            />
                                        </span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href={`${process.env.SERVER}/admin/settings`}>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a className={router.pathname.includes('settings') ? styles.active : undefined}>
                                        <span className='fas fa-cogs' />
                                        <span>
                                            <FormattedMessage
                                                id='settings'
                                                defaultMessage='Settings'
                                            />
                                        </span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.sidebar_footer}>
                        <Link href={`${process.env.SERVER}/docs`}>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a>
                                <span className='far fa-question-circle' />
                                <span>
                                    <FormattedMessage
                                        id='docs'
                                        defaultMessage='Documentation'
                                    />
                                </span>
                            </a>
                        </Link>
                        <span className={styles.sidebar_version}>
                            v
                            {version}
                        </span>
                    </div>
                </div>
                <div className={styles.main_content}>
                    <header className={styles.header}>
                        <h2>
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                            <label htmlFor='nav-toggle'>
                                <span className='fas fa-bars' />
                            </label>
                        </h2>
                        <Search
                            endPoint='admin'
                        />
                        <DarkModeButton />
                        <div className={styles.user_wrapper}>
                            <img
                                src={session.user.image ? session.user.image : `${process.env.SERVER}/placeholder.png`}
                                alt='User'
                            />
                            <div>
                                <h4>{session.user.name}</h4>
                                <small>{session.user.email}</small>
                            </div>
                        </div>
                    </header>
                    <main className={styles.main}>{children}</main>
                </div>
            </div>
        </>
    );
}

Admin.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    children: PropTypes.any,
};

Admin.defaultProps = {
    children: [],
};
