import React from 'react';
import styles from 'components/Status/Status.module.scss'

export default function Status({state}) {

    return (
        <>
            <span className={`${styles.status} ${styles.orange}`}/>
            {state}
        </>
    );
}
