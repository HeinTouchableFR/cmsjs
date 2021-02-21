import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function Text({ element, onElementValeurChange }) {
    const [content, setContent] = useState(element.content);

    useEffect(
        function () {
            if (element.content && element.type === 'text') {
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
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount',
                    ],
                    toolbar1: 'undo redo | cut copy paste | selectall searchreplace | formatselect | code | help',
                    toolbar2: 'bold italic underline strikethrough forecolor backcolor fontselect fontsizeselect lineheight',
                    toolbar3: 'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent removeformat',
                }}
                onEditorChange={handleChange}
            />
        </>
    );
}
