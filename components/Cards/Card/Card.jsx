import React from 'react';
import styles from 'components/Cards/Card/Card.module.scss'
import ActionButton from 'components/Button/ActionButton/ActionButton';

export default function Card({title, buttonLabel, buttonAction, buttonIcon, children}) {

    return (
        <div className={styles.card}>
            <div className={styles.card_header}>
                <h3>{title}</h3>
                {buttonLabel && <ActionButton label={buttonLabel} action={buttonAction} icon={buttonIcon} />}
            </div>
            <div className={styles.card_body}>
                {children}
            </div>
        </div>
    );
}
