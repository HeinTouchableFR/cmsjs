import React from 'react';
import styles from './Single.module.scss';
import {useIntl} from 'react-intl';


export default function Single({url = "/placeholder.png", onClick}) {
    const intl = useIntl();

    const handleClick = () => {
        onClick(true)
    }

    return (
        <div className={`${styles.fileManager_btn}`} onClick={handleClick}>
            <div className={`${styles.preview}`} style={{background: `url(${url ? url : '/placeholder.png'})`}} />
            <div className={`${styles.preview__action}`}>
                {intl.formatMessage({id: 'image.choose', defaultMessage: 'Choose an image'})}
            </div>
        </div>
    );
}
