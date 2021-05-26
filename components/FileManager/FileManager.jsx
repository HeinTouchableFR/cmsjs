import React, {
    useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';
import Image from 'next/image';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import styles from './fileManager.module.scss';
import Single from './Button/Single/Single';
import Multiple from './Button/Multiple/Multiple';
import Button from '../Button/Button';

// eslint-disable-next-line no-unused-expressions
typeof window === 'object' ? require('@grafikart/drop-files-element') : () => false;

export default function FileManager({ multiple = false,
    currentFiles,
    setCurrentFiles,
    images = [],
    setImages }) {
    const intl = useIntl();

    const [open, setOpen] = useState(false);
    const [secondOpen, setSecondOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [selectedFiles, setSelectedFiles] = useState(currentFiles || []);

    useEffect(async () => {
        setSelectedFiles(currentFiles);
    },
    [currentFiles]);

    const create = async (data) => {
        try {
            const res = await fetch(`${process.env.SERVER}/api/images/uploads`, {
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

    const handleSelectFile = (file) => {
        selectedFiles.some((f) => f.id === file.id)
            ? setSelectedFiles(selectedFiles.filter((f) => f.id !== file.id))
            : setSelectedFiles(multiple ? [...selectedFiles, file] : [file]);
    };

    const handleSelectFiles = (files) => {
        setSelectedFiles([...selectedFiles, ...files]);
    };

    const handleInsertClick = () => {
        setCurrentFiles(multiple ? selectedFiles : selectedFiles[0]);
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const f = new FormData(e.target);
        if (f.get('files').name !== '') {
            const items = await create(f);
            setImages([...items, ...images]);
            multiple ? handleSelectFiles(items) : handleSelectFiles([items[0]]);
            setSecondOpen(false);
        }
        setLoading(false);
    };

    const trigger = multiple
        ? (
            <Multiple
                files={currentFiles}
                onClick={() => setOpen(true)}
            />
        )
        : (
            <Single
                file={currentFiles[0] ? currentFiles[0] : null}
                onClick={setOpen}
            />
        );

    const insertMediaTrigger = (
        <Button
            label={intl.formatMessage({
                id: 'fileManager.insertMedia',
                defaultMessage: 'Insert media',
            })}
            disabled={selectedFiles.length === 0}
            color='green'
            onClick={() => handleInsertClick()}
            icon='far fa-check'
        />
    );

    return (
        <>
            <Modal
                closeIcon
                open={open}
                trigger={trigger}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                name='modal'
            >
                <Modal.Header
                    title={intl.formatMessage({
                        id: 'insertMedia',
                    })}
                    icon='fa-image'
                />
                <Modal.Content>
                    <div className={`${styles.filemanager__container}`}>
                        {images.map((image, index) => (
                            <div
                                key={image.id}
                                className={`${styles.element} ${selectedFiles.length > 0 && selectedFiles.some((f) => f.id === image.id) && styles.selected}`}
                                onClick={() => handleSelectFile(image)}
                                onKeyDown={() => handleSelectFile(image)}
                                tabIndex={index}
                                role='button'
                            >
                                <Image
                                    loading='lazy'
                                    src={`${process.env.MEDIA_SERVER}/${image.name}`}
                                    alt=''
                                    width={125}
                                    height={125}
                                />
                            </div>
                        ))}
                    </div>
                </Modal.Content>
                <Modal.Footer>
                    <div className={`${styles.filemanager__files}`}>
                        <span>
                            {selectedFiles.length <= 1
                                ? `${selectedFiles.length} ${intl.formatMessage({
                                    id: 'image.selected',
                                    defaultMessage: 'Selected image',
                                })}`
                                : `${selectedFiles.length} ${intl.formatMessage({
                                    id: 'images.selected',
                                    defaultMessage: 'Selected images',
                                })}`}
                        </span>
                        {selectedFiles.length > 0 && selectedFiles.map((image) => (
                            <img
                                key={`preview-${image.id}`}
                                src={`${process.env.MEDIA_SERVER}/${image.name}`}
                                alt=''
                            />
                        ))}
                    </div>
                    <Button
                        label={intl.formatMessage({
                            id: 'image.addNew', defaultMessage: 'Add a new image',
                        })}
                        onClick={() => setSecondOpen(true)}
                        icon='fas fa-chevron-circle-right'
                    />
                    <Modal
                        closeIcon
                        onClose={() => setSecondOpen(false)}
                        open={secondOpen}
                        trigger={insertMediaTrigger}
                        name='addNewFile'
                    >
                        <Modal.Header
                            title={intl.formatMessage({
                                id: 'image.addNew',
                                defaultMessage: 'Add a new image',
                            })}
                        />
                        <Modal.Content>
                            <form
                                className={styles.filemanager__upload__container}
                                onSubmit={handleSubmit}
                                id='fileForm'
                                name='fileForm'
                            >
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
                                <Button
                                    icon='check'
                                    color='green'
                                    type='submit'
                                    loading={loading}
                                    disabled={loading}
                                    label={intl.formatMessage({
                                        id: 'send', defaultMessage: 'Send',
                                    })}
                                    form='fileForm'
                                    name='fileButton'
                                    id='fileButton'
                                />
                            </form>
                        </Modal.Content>
                    </Modal>
                </Modal.Footer>
            </Modal>
        </>
    );
}

FileManager.propTypes = {
    multiple: PropTypes.bool,
    currentFiles: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    setCurrentFiles: PropTypes.func,
    images: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    setImages: PropTypes.func,
};

FileManager.defaultProps = {
    multiple: false,
    setCurrentFiles: () => {},
    setImages: () => {},
};
