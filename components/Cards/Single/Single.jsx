import React from 'react';
import styles from 'components/Cards/Single/Single.module.scss'

export default function Single({number, label, icon}) {

    return (
        <div className={styles.card_single}>
            <div>
                <h2>{number}</h2>
                <span>{label}</span>
            </div>
            <div>
                <span className={`${icon}`}/>
            </div>
        </div>
    );
}
