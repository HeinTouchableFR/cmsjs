import React from 'react';
import styles from 'components/Cards/Cards.module.scss'

export default function Cards({children}) {

    return (
        <div className={styles.cards}>
            {children}
        </div>
    );
}
