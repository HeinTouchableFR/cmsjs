import React, {
    useEffect, useState,
} from 'react';
import {
    FormattedPlural, useIntl,
} from 'react-intl';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import styles from './fileManager.module.scss';
import Single from './Button/Single/Single';
import Multiple from './Button/Multiple/Multiple';
import Button from '../Button/Button';
import File from './File';

// eslint-disable-next-line no-unused-expressions
typeof window === 'object' ? require('./drop-files-element') : () => false;

export default function FileManager({ multiple,
    currentFiles,
    setCurrentFiles,
    files = [],
    acceptFiles,
    setFiles }) {
    const intl = useIntl();

    const [open, setOpen] = useState(false);
    const [secondOpen, setSecondOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [selectedFiles, setSelectedFiles] = useState(currentFiles || []);

    useEffect(async () => {
        setSelectedFiles(currentFiles);
    },
    [currentFiles]);

    const handleSelectFiles = (items) => {
        setSelectedFiles([...selectedFiles, ...items]);
    };

    const handleSelectFile = (file) => {
        if (selectedFiles.some((f) => f.id === file.id)) {
            setSelectedFiles(selectedFiles.filter((f) => f.id !== file.id));
        } else {
            setSelectedFiles(multiple ? [...selectedFiles, file] : [file]);
        }
    };

    const create = async (data) => {
        try {
            const res = await fetch(`${process.env.SERVER}/api/files/uploads`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: data,
            });
            const { data: items } = await res.json();
            setFiles([...items, ...files]);
            if (multiple) {
                handleSelectFiles(items);
            } else {
                handleSelectFile(items);
            }
        } catch (error) {
            alert(error);
        }
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
            await create(f);
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
            label={(
                <FormattedPlural
                    one={intl.formatMessage({
                        id: 'file.insertSingle', defaultMessage: 'Insert file',
                    })}
                    other={intl.formatMessage({
                        id: 'file.insertMany', defaultMessage: 'Insert files',
                    })}
                    value={selectedFiles.length}
                />
              )}
            disabled={selectedFiles.length === 0}
            onClick={handleInsertClick}
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
                    icon='fa-file-alt'
                />
                <Modal.Content>
                    <div className={`${styles.filemanager}`}>
                        <div className={`${styles.filemanager__container}`}>
                            {files.map((file, index) => (
                                <File
                                    file={file}
                                    index={index}
                                    onClick={handleSelectFile}
                                    isSelected={selectedFiles.some((f) => f.id === file.id)}
                                />
                            ))}
                        </div>
                    </div>
                </Modal.Content>
                <Modal.Footer>
                    <Button
                        label={intl.formatMessage({
                            id: 'file.upload', defaultMessage: 'Upload file',
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
                                    accept={acceptFiles}
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
    files: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    setFiles: PropTypes.func,
    acceptFiles: PropTypes.string,
};

FileManager.defaultProps = {
    multiple: false,
    setCurrentFiles: null,
    setFiles: null,
    acceptFiles: 'all',
};
