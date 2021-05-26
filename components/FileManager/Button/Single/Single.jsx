import React from 'react';
import { useIntl } from 'react-intl';
import styles from './Single.module.scss';

export default function Single({ file = '/placeholder.png', onClick }) {
    const intl = useIntl();

    const handleClick = () => {
        onClick(true);
    };

    return (
        <div
            className={`${styles.fileManager_btn}`}
            onClick={handleClick}
        >
            <div
                className={`${styles.preview}`}
                style={{
                    background: `url(${file ? `${process.env.MEDIA_SERVER}/${file.name}` : '/placeholder.png'})`,
                }}
            />
            <div className={`${styles.preview__action}`}>
                {intl.formatMessage({
                    id: 'image.choose', defaultMessage: 'Choose an image',
                })}
            </div>
        </div>
    );
}
