import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DarkModeButton from 'components/Button/DarkModeButton/DarkModeButton';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import styles from './Docs.module.scss';
import Search from '../Admin/Search';

export default function Docs({ menu, backUrl, children }) {
    const router = useRouter();
    const intl = useIntl();

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
                            Documentation
                        </h2>
                    </div>
                    <div className={styles.sidebar_menu}>
                        <ul>
                            {backUrl && (
                                <li key='back'>
                                    <Link href={`${backUrl}`}>
                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                        <a>
                                            <span className='fas fa-arrow-circle-left' />
                                            <span>
                                                {intl.formatMessage({
                                                    id: 'docs.back', defaultMessage: 'Back',
                                                })}
                                            </span>
                                        </a>
                                    </Link>
                                </li>
                            )}
                            {/* eslint-disable-next-line react/prop-types */}
                            {menu && menu.map((item) => (
                                <li key={item.id}>
                                    <Link href={`${process.env.SERVER}/docs/${item.id}`}>
                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                        <a
                                            className={router.pathname.includes(item.id)
                                                ? styles.active
                                                : undefined}
                                        >
                                            <span>
                                                {item.label}
                                            </span>
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
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
                            endPoint='docs'
                        />
                        <DarkModeButton />
                    </header>
                    <main className={styles.main}>{children}</main>
                </div>
            </div>
        </>
    );
}

Docs.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    children: PropTypes.any,
    menu: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    backUrl: PropTypes.string,
};

Docs.defaultProps = {
    children: [],
    backUrl: '',
};
