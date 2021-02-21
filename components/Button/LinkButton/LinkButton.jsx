import styles from './LinkButton.module.scss';
import React from 'react';
import Link from 'next/link';

export default function LinkButton({ label, icon, url, children }) {
    return (
        <Link href={url}>
            <a className={styles.LinkButton}>
                {icon && <i className={'fad ' + icon}></i>}
                {label}
            </a>
        </Link>
    );
}
