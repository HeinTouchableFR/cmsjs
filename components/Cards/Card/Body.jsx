import React from 'react';
import styles from 'components/Cards/Card/Card.module.scss';

export default function Body({ children }) {
    return (
        <div className={styles.card_body}>
            {children}
        </div>
    );
}
