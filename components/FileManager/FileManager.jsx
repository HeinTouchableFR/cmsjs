import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { useIntl } from 'react-intl';

import styles from './fileManager.module.scss';

typeof window === 'object' ? require('@grafikart/drop-files-element') : () => false;

export default function FileManager({ multiple = false, currentFiles, setCurrentFiles, trigger }) {
    const intl = useIntl();

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

    const handleSelectFiles = function (files) {
        setSelectedFiles([...selectedFiles, ...files]);
    };

    const handleInsertClick = function () {
        setCurrentFiles(selectedFiles);
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let f = new FormData(e.target);
        const items = await create(f);
        setImages([...items, ...images]);
        multiple ? handleSelectFiles(items) : handleSelectFile(items[0]);
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
                <Header icon='picture' content={intl.formatMessage({ id: 'insertMedia' })} />
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
                                ? selectedFiles.length + ' ' + intl.formatMessage({ id: 'selectedImage' })
                                : selectedFiles.length + ' ' + intl.formatMessage({ id: 'selectedImages' })}
                        </span>
                        {selectedFiles.map((image) => (
                            <img key={`preview-${image._id}`} src={image.url} />
                        ))}
                    </div>
                    <Button onClick={() => setSecondOpen(true)} primary>
                        {intl.formatMessage({ id: 'fileManagerUploadAddNew' })} <Icon name='right chevron' />
                    </Button>
                    <Button disabled={selectedFiles.length === 0} color='green' onClick={() => handleInsertClick()}>
                        <Icon name='checkmark' /> Insérez un média
                    </Button>
                </Modal.Actions>
                <Modal closeIcon onClose={() => setSecondOpen(false)} open={secondOpen} className={styles.filemanager__upload__container}>
                    <Modal.Header>{intl.formatMessage({ id: 'fileManagerUploadAddNew' })}</Modal.Header>
                    <Modal.Content>
                        <form onSubmit={handleSubmit}>
                            {multiple ? (
                                <input
                                    type='file'
                                    multiple
                                    name='files'
                                    label={intl.formatMessage({ id: 'fileManagerUploadLabel' })}
                                    help={intl.formatMessage({ id: 'fileManagerUploadHelp' })}
                                    is='drop-files'
                                />
                            ) : (
                                <input
                                    type='file'
                                    name='files'
                                    label={intl.formatMessage({ id: 'fileManagerUploadLabel' })}
                                    help={intl.formatMessage({ id: 'fileManagerUploadHelp' })}
                                    is='drop-files'
                                />
                            )}
                            <Button
                                icon='check'
                                color='green'
                                type='submit'
                                loading={loading}
                                disabled={loading}
                                content={intl.formatMessage({ id: 'fileManagerUploadSend' })}
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
