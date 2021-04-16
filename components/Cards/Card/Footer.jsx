import React from 'react';
import styles from 'components/Cards/Card/Card.module.scss';

export default function Footer({ children }) {
    return (
        <div className={`${styles.card_footer}`}>
            {children}
        </div>
    );
}
