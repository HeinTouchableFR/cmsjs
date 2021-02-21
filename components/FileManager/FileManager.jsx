import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

import styles from './filemanager.module.scss';

import useTranslation from 'intl/UseTranslation';

typeof window === 'object' ? require('@grafikart/drop-files-element') : () => false;

export default function FileManager({ multiple = false, currentFiles, setCurrentFiles, trigger }) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [secondOpen, setSecondOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [images, setImages] = useState([]);

    const [selectedFiles, setSelectedFiles] = useState(currentFiles);

    useEffect(
        async function () {
            await axios.get(process.env.URL + '/api/images').then((res) => {
                setImages(res.data.data);
            });

            setSelectedFiles(currentFiles);
        },
        [currentFiles]
    );

    const handleSelectFile = function (file) {
        if (multiple) {
            selectedFiles.some((f) => f._id === file._id)
                ? setSelectedFiles(selectedFiles.filter((f) => f._id !== file._id))
                : setSelectedFiles([...selectedFiles, file]);
        } else {
            selectedFiles.some((f) => f._id === file._id)
                ? setSelectedFiles(selectedFiles.filter((f) => f._id !== file._id))
                : setSelectedFiles([file]);
        }
    };

    const handleInsertClick = function () {
        setCurrentFiles(selectedFiles);
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let f = new FormData(e.target);
        const item = await create(f);
        setImages([item, ...images]);
        handleSelectFile(item);
        setLoading(false);
        setSecondOpen(false);
    };

    const create = async (data) => {
        try {
            const res = await fetch(`${process.env.URL}/api/images/uploads`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: data,
            });
            const { data: newItem } = await res.json();
            return newItem;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Modal closeIcon open={open} trigger={trigger} onClose={() => setOpen(false)} onOpen={() => setOpen(true)}>
                <Header icon='picture' content={t('insertMedia')} />
                <Modal.Content scrolling>
                    <div className={`${styles.filemanager__container}`}>
                        {images.map((image) => (
                            <div
                                key={image._id}
                                className={`${styles.element} ${selectedFiles.some((f) => f._id === image._id) ? styles.selected : ''}`}
                                onClick={() => handleSelectFile(image)}
                            >
                                <Image loading='lazy' src={`${image.url}`} alt='' width={125} height={125} />
                            </div>
                        ))}
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <div className={`${styles.filemanager__files}`}>
                        <span>
                            {selectedFiles.length <= 1
                                ? selectedFiles.length + ' ' + t('selectedImage')
                                : selectedFiles.length + ' ' + t('selectedImages')}
                        </span>
                        {selectedFiles.map((image) => (
                            <img key={`preview-${image._id}`} src={image.url} />
                        ))}
                    </div>
                    <Button onClick={() => setSecondOpen(true)} primary>
                        {t('fileManagerUploadAddNew')} <Icon name='right chevron' />
                    </Button>
                    <Button disabled={selectedFiles.length === 0} color='green' onClick={() => handleInsertClick()}>
                        <Icon name='checkmark' /> Insérez un média
                    </Button>
                </Modal.Actions>
                <Modal closeIcon onClose={() => setSecondOpen(false)} open={secondOpen} className={styles.filemanager__upload__container}>
                    <Modal.Header>{t('fileManagerUploadAddNew')}</Modal.Header>
                    <Modal.Content>
                        <form onSubmit={handleSubmit}>
                            <input type='file' name='files' label={t('fileManagerUploadLabel')} help={t('fileManagerUploadHelp')} is='drop-files' />
                            <Button
                                icon='check'
                                color='green'
                                type='submit'
                                loading={loading}
                                disabled={loading}
                                content={t('fileManagerUploadSend')}
                            />
                        </form>
                    </Modal.Content>
                </Modal>
            </Modal>
        </>
    );
}

export async function getServerSideProps() {
    let images = [];

    await axios
        .get(process.env.URL + '/api/images')
        .then((res) => {
            images = res.data.data;
        })
        .catch(() => {});

    return {
        props: { images },
    };
}
