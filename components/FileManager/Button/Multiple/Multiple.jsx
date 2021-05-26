import React from 'react';
import { useIntl } from 'react-intl';
import styles from './Multiple.module.scss';

export default function Multiple({ files = [], onClick }) {
    const intl = useIntl();

    const handleClick = () => {
        onClick(true);
    };

    return (
        <div
            className={`${styles.fileManager_btn}`}
            onClick={handleClick}
        >
            {files.length > 0 ? (
                <div className={`${styles.preview__gallery}`}>
                    {files.map((file) => (
                        <img
                            src={`${process.env.MEDIA_SERVER}/${file.name}`}
                            alt={`${file.name}`}
                            key={file.id}
                        />
                    ))}
                </div>
            ) : (
                <div
                    className={`${styles.preview}`}
                    style={{
                        background: 'url(/placeholder.png)',
                    }}
                />
            )}
            <div className={`${styles.preview__action}`}>
                {intl.formatMessage({
                    id: 'image.choose', defaultMessage: 'Choose an image',
                })}
            </div>
        </div>
    );
}
