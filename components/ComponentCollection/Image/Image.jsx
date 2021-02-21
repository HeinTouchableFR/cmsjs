import React, { useEffect, useState } from 'react';
//Style
import styles from './Image.module.scss';
//Utils
import useTranslation from 'intl/UseTranslation';
//Components
import FileManager from 'components/FileManager/FileManager';

export default function Image({ element, onElementValeurChange }) {
    const { t } = useTranslation();

    const [currentFiles, setCurrentFiles] = useState([]);

    useEffect(
        async function () {
            if (element.content && element.type === 'image') {
                var xmlString = element.content;
                var doc = new DOMParser().parseFromString(xmlString, 'text/xml');
                const image = doc.querySelector('img');
                if (image.getAttribute('data-image')) {
                    const res = await fetch(process.env.URL + '/api/images/' + image.getAttribute('data-image'));
                    const data = await res.json();
                    setCurrentFiles(data.data);
                } else {
                    setCurrentFiles([]);
                }
            }
        },
        [element]
    );

    const handleChangeSrc = function (file) {
        const img = `<img data-image="${file._id}" src="${file.url}" />`;
        onElementValeurChange(element, img);
    };

    const handleSetCurrentFiles = function (files) {
        setCurrentFiles(files);
        if (files.length > 0) {
            handleChangeSrc(files[0]);
        }
    };

    return (
        <>
            <FileManager
                currentFiles={currentFiles}
                setCurrentFiles={handleSetCurrentFiles}
                trigger={
                    <div className={`${styles.filemanager_btn}`}>
                        {currentFiles.length > 0 && currentFiles[0].url ? (
                            <div className={`${styles.preview}`} style={{ background: `url(${currentFiles[0].url})` }}></div>
                        ) : (
                            <div className={`${styles.preview}`} style={{ background: `url(/placeholder.png)` }}></div>
                        )}
                        <div className={`${styles.preview__action}`}>{t('choosePicture')}</div>
                    </div>
                }
            />
        </>
    );
}
