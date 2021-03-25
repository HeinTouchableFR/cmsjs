import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import Image from 'next/image';
import {Button, Header, Icon, Modal} from 'semantic-ui-react';

import styles from './fileManager.module.scss';
import Single from './Button/Single/Single';
import Multiple from './Button/Multiple/Multiple';

typeof window === 'object' ? require('@grafikart/drop-files-element') : () => false;

export default function FileManager({multiple = false, currentFiles, setCurrentFiles, images = [], setImages}) {
    const intl = useIntl();

    const [open, setOpen] = useState(false);
    const [secondOpen, setSecondOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [selectedFiles, setSelectedFiles] = useState(currentFiles || []);

    useEffect(
        async function () {
            setSelectedFiles(currentFiles);
        },
        [currentFiles]
    );

    const handleSelectFile = function (file) {
        selectedFiles.some((f) => f._id === file._id)
            ? setSelectedFiles(selectedFiles.filter((f) => f._id !== file._id))
            : setSelectedFiles(multiple ? [...selectedFiles, file] : [file]);

    };

    const handleSelectFiles = function (files) {
        setSelectedFiles([...selectedFiles, ...files]);
    };

    const handleInsertClick = function () {
        setCurrentFiles(multiple ? selectedFiles : selectedFiles[0]);
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let f = new FormData(e.target);
        const items = await create(f);
        setImages([...items, ...images]);
        multiple ? handleSelectFiles(items) : handleSelectFiles([items[0]]);
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
            const {data: newItem} = await res.json();
            return newItem;
        } catch (error) {
            console.log(error);
        }
    };

    const trigger = multiple ?
        <Multiple files={currentFiles} onClick={() => setOpen(true)}/> :
        <Single url={currentFiles[0] ? currentFiles[0].url : null} onClick={setOpen}/>

    return (
        <>
            <Modal closeIcon open={open} trigger={trigger} onClose={() => setOpen(false)} onOpen={() => setOpen(true)}>
                <Header icon='picture' content={intl.formatMessage({id: 'insertMedia'})}/>
                <Modal.Content scrolling>
                    <div className={`${styles.filemanager__container}`}>
                        {images.map((image) => (
                            <div
                                key={image._id}
                                className={`${styles.element} ${selectedFiles.length > 0 && selectedFiles.some((f) => f._id === image._id) ? styles.selected : ''}`}
                                onClick={() => handleSelectFile(image)}
                            >
                                <Image loading='lazy' src={`${image.url}`} alt='' width={125} height={125}/>
                            </div>
                        ))}
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <div className={`${styles.filemanager__files}`}>
                        <span>
                            {selectedFiles.length <= 1
                                ? selectedFiles.length + ' ' + intl.formatMessage({
                                id: 'image.selected',
                                defaultMessage: 'Selected image'
                            })
                                : selectedFiles.length + ' ' + intl.formatMessage({
                                id: 'images.selected',
                                defaultMessage: 'Selected images'
                            })}
                        </span>
                        {selectedFiles.length > 0 && selectedFiles.map((image) => (
                            <img key={`preview-${image._id}`} src={image.url}/>
                        ))}
                    </div>
                    <Button onClick={() => setSecondOpen(true)} primary>
                        {intl.formatMessage({id: 'image.addNew', defaultMessage: 'Add a new image'})} <Icon
                        name='right chevron'/>
                    </Button>
                    <Button disabled={selectedFiles.length === 0} color='green' onClick={() => handleInsertClick()}>
                        <Icon name='checkmark'/> Insérez un média
                    </Button>
                </Modal.Actions>
                <Modal closeIcon onClose={() => setSecondOpen(false)} open={secondOpen}
                       className={styles.filemanager__upload__container}>
                    <Modal.Header>{intl.formatMessage({
                        id: 'image.addNew',
                        defaultMessage: 'Add a new image'
                    })}</Modal.Header>
                    <Modal.Content>
                        <form onSubmit={handleSubmit}>
                            {multiple ? (
                                <input
                                    type='file'
                                    name='files'
                                    label={intl.formatMessage({
                                        id: 'fileManager.uploadLabel',
                                        defaultMessage: 'Drop files here or click to upload.',
                                    })}
                                    help={intl.formatMessage({
                                        id: 'fileManager.uploadHelp',
                                        defaultMessage: "Upload files here and they won't be sent immediately",
                                    })}
                                    is='drop-files'
                                    multiple
                                />
                            ) : (
                                <input
                                    type='file'
                                    name='files'
                                    label={intl.formatMessage({
                                        id: 'fileManager.uploadLabel',
                                        defaultMessage: 'Drop files here or click to upload.',
                                    })}
                                    help={intl.formatMessage({
                                        id: 'fileManager.uploadHelp',
                                        defaultMessage: "Upload files here and they won't be sent immediately",
                                    })}
                                    is='drop-files'
                                />
                            )}
                            <Button
                                icon='check'
                                color='green'
                                type='submit'
                                loading={loading}
                                disabled={loading}
                                content={intl.formatMessage({id: 'send', defaultMessage: 'Send'})}
                            />
                        </form>
                    </Modal.Content>
                </Modal>
            </Modal>
        </>
    );
}
