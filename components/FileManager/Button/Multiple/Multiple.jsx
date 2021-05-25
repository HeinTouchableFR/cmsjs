import React from 'react';
import styles from './Multiple.module.scss';
import {useIntl} from 'react-intl';


export default function Multiple({files = [], onClick}) {
    const intl = useIntl();

    const handleClick = () => {
        onClick(true)
    }

    return (
        <div className={`${styles.fileManager_btn}`} onClick={handleClick}>
            {files.length > 0 ? (
                <div className={`${styles.preview__gallery}`}>
                    {files.map((image) => (
                        <img src={`${image.url}`} alt={`${image.name}`} key={image.id} />
                    ))}
                </div>
            ) : (
                <div className={`${styles.preview}`} style={{ background: `url(/placeholder.png)` }} />
            )}
            <div className={`${styles.preview__action}`}>
                {intl.formatMessage({ id: 'image.choose', defaultMessage: 'Choose an image' })}
            </div>
        </div>
    );
}
