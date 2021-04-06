import styles from './ActionButton.module.scss';
import React from 'react';
import Link from 'next/link';

export function ActionButton({ label, action = "#", icon }) {

    return (
        <Link href={action} >
            <a className={styles.button}>
                {label}
                <span className={icon}/>
            </a>
        </Link>
    );
}
