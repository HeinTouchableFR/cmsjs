import React from 'react';
import { useIntl } from 'react-intl';
import Link from 'next/link';

import styles from './content.module.scss';

import LinkButton from 'components/Button/LinkButton/LinkButton';

export default function Content({ title, icon, url, action, children }) {
    const intl = useIntl();

    return (
        <>
            <div className={styles.contentHeader}>
                <div className={styles.contentHeaderColumn}>
                    <h1 className={styles.contentHeaderTitle}>
                        <i className={'fad' + ' ' + icon + ' ' + styles.circular} />
                        <div className={styles.content}>
                            {title}
                            {!action && (
                                <div className={styles.contentHeaderTitleSub}>
                                    {intl.formatMessage({ id: 'manage', defaultMessage: 'Manage' })}: {title}
                                </div>
                            )}
                        </div>
                    </h1>
                    {!action && <LinkButton url={'/admin/' + url + '/add'} icon={'fa-plus'} />}
                </div>
                <div className={styles.adminTree}>
                    <div className={styles.adminTreeSection}>
                        <Link href={'/admin'}>
                            <a className={styles.adminTreeSection}>Administration</a>
                        </Link>
                        <i className={'fas fa-chevron-right ' + styles.adminTreeChevron} />
                        <Link href={'/admin/' + url}>
                            <a className={styles.adminTreeSection}>{title}</a>
                        </Link>
                        {action && (
                            <>
                                <i className={'fas fa-chevron-right ' + styles.adminTreeChevron} />
                                <Link href={'/admin/' + url + '/' + action}>
                                    <a className={styles.adminTreeSection}>{action}</a>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <div className={styles.adminContent}>{children}</div>
            </div>
        </>
    );
}
