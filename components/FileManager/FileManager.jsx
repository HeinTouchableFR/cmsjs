import styles from './filemanager.module.scss'
import React, {useEffect, useState} from "react";
import {Button, Header, Icon, Modal} from 'semantic-ui-react'
import axios from 'axios';


export default function FileManager({multiple = false, currentFiles, setCurrentFiles, trigger}) {
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
                <Header icon='picture' content='Insérez un média'/>
                <Modal.Content>
                    <div className={`${styles.filemanager_container}`} >
                        {images.map(image=>
                            <div key={image._id} className={`${styles.element} ${selectedFiles.some(f => f._id === image._id) ? styles.selected : ''}`} onClick={() => handleSelectFile(image)}>
                                <img src={`${image.url}`} alt=""/>
                            </div>
                        )}
                    </div>
                </Modal.Content>
                <Modal.Actions>
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
