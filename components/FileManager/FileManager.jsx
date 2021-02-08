import styles from './filemanager.module.scss'
import React, {useEffect, useState} from "react";
import {Button, Header, Icon, Modal} from 'semantic-ui-react'
import axios from 'axios';
import useTranslation from '../../intl/useTranslation';


export default function FileManager({multiple = true, currentFiles, setCurrentFiles, trigger}) {
    const {t} = useTranslation();
    const [open, setOpen] = React.useState(false)

    const [images, setImages] = useState([])

    const [selectedFiles, setSelectedFiles] = useState(currentFiles)

    useEffect(async function () {
        await axios.get(process.env.URL + '/api/images')
            .then(res => {
                setImages(res.data.data)
            })

        setSelectedFiles(currentFiles)
    }, [currentFiles])

    const handleSelectFile = function (file) {
        if(multiple){
            selectedFiles.some(f => f._id === file._id) ? setSelectedFiles(selectedFiles.filter((f) => f._id !== file._id)) : setSelectedFiles([...selectedFiles, file])
        }else{
            selectedFiles.some(f => f._id === file._id) ? setSelectedFiles(selectedFiles.filter((f) => f._id !== file._id)) : setSelectedFiles([file])
        }
    }

    const handleInsertClick = function () {
        setCurrentFiles(selectedFiles)
        setOpen(false)
    }

    return (
        <>
            <Modal
                closeIcon
                open={open}
                trigger={trigger}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            >
                <Header icon='picture' content={t('insertMedia')}/>
                <Modal.Content scrolling>
                    <div className={`${styles.filemanager__container}`} >
                        {images.map(image=>
                            <div key={image._id} className={`${styles.element} ${selectedFiles.some(f => f._id === image._id) ? styles.selected : ''}`} onClick={() => handleSelectFile(image)}>
                                <img src={`${image.url}`} alt=""/>
                            </div>
                        )}
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <div className={`${styles.filemanager__files}`}>
                        <span>
                            {selectedFiles.length <= 1 ? selectedFiles.length + ' ' + t('selectedImage') : selectedFiles.length + ' ' + t('selectedImages')}
                        </span>
                        {selectedFiles.map(image => <img key={`preview-${image._id}`} src={image.url} />)}
                    </div>
                    <Button disabled={selectedFiles.length === 0} color='green' onClick={() => handleInsertClick()}>
                        <Icon name='checkmark'/> Insérez un média
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}


export async function getServerSideProps() {

    let images = []

    await axios.get(process.env.URL + '/api/images')
        .then(res => {
            images = res.data.data
        })
        .catch((error) => {
        })


    return {
        props: {images}
    }
}
