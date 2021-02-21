import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function Title({ element, onElementValeurChange }) {
    const [content, setContent] = useState(element.content);

    useEffect(
        function () {
            if (element.content && element.type === 'title') {
                setContent(element.content);
            }
        },
        [element]
    );

    const handleChange = function (c) {
        setContent(c);
        onElementValeurChange(element, c);
    };
    return (
        <>
            <Editor
                value={content}
                apiKey='01vj2ci2rp4w85rw2pa64fg88pw784bf67k0rskfg4ybks3z'
                init={{
                    language: 'fr_FR',
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount',
                    ],
                    toolbar1: 'undo redo | formatselect | help',
                    toolbar2: 'bold italic underline strikethrough forecolor backcolor fontselect fontsizeselect lineheight',
                    toolbar3: 'alignleft aligncenter alignright alignjustify | removeformat',
                    block_formats: 'Titre 1=h1; Titre 2=h2; Titre 3=h3; Titre 4=h4; Titre 5=h5; Titre 6=h6',
                }}
                onEditorChange={handleChange}
            />
        </>
    );
}
