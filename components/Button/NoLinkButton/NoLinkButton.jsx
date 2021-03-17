import styles from '../Button.module.scss';
import React from 'react';

export function NoLinkButton({ icon, style, onClick, type }) {
    let color;

    switch (style) {
        case 'show':
            color = styles.show;
            break;
        case 'edit':
            color = styles.edit;
            break;
        case 'delete':
            color = styles.delete;
            break;
        default:
            color = styles.base;
            break;
    }

    return (
        <button onClick={onClick} type={type} className={styles.button + ' ' + color}>
            <i className={'fas ' + icon} />
        </button>
    );
}
