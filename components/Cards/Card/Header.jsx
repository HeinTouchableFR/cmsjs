import React from 'react';
import styles from 'components/Cards/Card/Card.module.scss';
import ActionButton from 'components/Button/ActionButton/ActionButton';

export default function Header({title, meta, buttonLabel, buttonAction, buttonIcon}) {
    return (
        <div className={styles.card_header}>
            <div className={`${styles.content}`}>
                {title && <h3 className={styles.title}>{title}</h3>}
                {buttonLabel && (
                    <ActionButton
                        label={buttonLabel}
                        action={buttonAction}
                        icon={buttonIcon}
                    />
                )}
            </div>
            <div className={`${styles.meta}`}>{meta}</div>
        </div>
    );
}
