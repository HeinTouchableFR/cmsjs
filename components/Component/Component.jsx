import React, {useEffect, useState} from "react";
import {Editor} from '@tinymce/tinymce-react';
import FileManager from '../FileManager/FileManager';
import {Button} from 'semantic-ui-react';
import styles from './component.module.scss'

export default function Component({balise, label, tooltip, color}) {
    return (
        <>
            <div
                className="ui labeled circular button menu-button"
                data-tooltip={tooltip}
                data-position="right center"
                data-variation="inverted"
            >
                <div className={`ui button ${color}`}>{balise}</div>
                <a className={`ui basic left pointing label ${color}`}>{label}</a>
            </div>
            <br/>
        </>
    );
}

export function ComponentEditor({element, onElementValeurChange}) {

    const [type, setType] = useState()

    useEffect(function () {
        setType(null)
        setType(element.type)
    }, [element])

    return (
        <>
            {type === "titre" &&
            <>
                <Titre element={element} onElementValeurChange={onElementValeurChange}/>
            </>
            }
            {type === "texte" &&
            <>
                <Texte element={element} onElementValeurChange={onElementValeurChange}/>
            </>
            }
            {type === "image" &&
            <>
                <Image element={element} onElementValeurChange={onElementValeurChange}/>
            </>
            }
        </>
    );
}

function Titre({element, onElementValeurChange}) {

    const [content, setContent] = useState(element.contenu)

    useEffect(function () {
        if (element.contenu) {
            setContent(element.contenu)
        } else {
            onElementValeurChange(element, content)
        }

    }, [element])

    const handleChange = function (c) {
        setContent(c)
        onElementValeurChange(element, c)
    }
    return (<>
        <Editor
            value={content}
            apiKey="01vj2ci2rp4w85rw2pa64fg88pw784bf67k0rskfg4ybks3z"
            init={{
                language: "fr_FR",
                height: 500,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar1: 'undo redo | formatselect | help',
                toolbar2: 'bold italic underline strikethrough forecolor backcolor fontselect fontsizeselect lineheight',
                toolbar3: 'alignleft aligncenter alignright alignjustify | removeformat',
                block_formats: 'Titre 1=h1; Titre 2=h2; Titre 3=h3; Titre 4=h4; Titre 5=h5; Titre 6=h6'
            }}
            onEditorChange={handleChange}
        />
    </>)
}

function Texte({element, onElementValeurChange}) {

    const [content, setContent] = useState(element.contenu)

    useEffect(function () {
        if (element.contenu) {
            setContent(element.contenu)
        }
    }, [element])

    const handleChange = function (c) {
        setContent(c)
        onElementValeurChange(element, c)
    }


    return (<>
        <Editor
            value={content}
            apiKey="01vj2ci2rp4w85rw2pa64fg88pw784bf67k0rskfg4ybks3z"
            init={{
                language: "fr_FR",
                height: 500,
                menubar: true,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar1: 'undo redo | cut copy paste | selectall searchreplace | formatselect | code | help',
                toolbar2: 'bold italic underline strikethrough forecolor backcolor fontselect fontsizeselect lineheight',
                toolbar3: 'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent removeformat',
            }}
            onEditorChange={handleChange}
        />
    </>)
}

function Image({element, onElementValeurChange}) {
    const [content, setContent] = useState(element.contenu)

    const [currentFiles, setCurrentFiles] = useState([])

    useEffect(async function () {
        if (element.contenu) {
            setContent(element.contenu)

            var xmlString = element.contenu;
            var doc = new DOMParser().parseFromString(xmlString, "text/xml");
            const image = doc.querySelector('img')
            if(image.getAttribute("data-image")){
                const res = await fetch(process.env.URL + "/api/images/" + image.getAttribute("data-image"))
                const data = await res.json()
                setCurrentFiles(data.data)
            }
        } else {
            onElementValeurChange(element, content)
        }
    }, [element])

    const handleChangeSrc = function (file) {
        const img = `<img data-image="${file._id}" src="${file.url}" />`
        setContent(img)
        onElementValeurChange(element, img)
    }

    const handleSetCurrentFiles = function (files) {
        setCurrentFiles(files)
        if (files.length > 0) {
            handleChangeSrc(files[0])
        }
    }


    return (<>
        <FileManager currentFiles={currentFiles} setCurrentFiles={handleSetCurrentFiles} trigger={<div className={`${styles.filemanager_btn}`}>
            {currentFiles.length > 0 ? <div className={`${styles.preview}`} style={{background: `url(${currentFiles[0].url})`}}></div> : <div className={`${styles.preview}`} style={{background: `url(/placeholder.png)`}}></div>}
            <div className={`${styles.preview__action}`}>Choisir une image</div>
        </div>}/>
    </>)
}
