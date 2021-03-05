import React, {useEffect, useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {Form} from 'semantic-ui-react';

export default function Title({element, onElementValeurChange}) {
    const [content, setContent] = useState(element.content);
    const [item, setItem] = useState(element)

    useEffect(
        function () {
            if (item.content && item.type === 'title') {
                setContent(item.content);
            }
        },
        [item]
    );

    const handleChange = function (c) {
        setContent(c);
        item.content = c
        onElementValeurChange(item);
    };

    const handleChangeMargin = (e, data) => {
        const updated = {
            ...item,
            styles: {
                ...item.styles,
                margin: {
                    ...item.styles.margin,
                    [data.name]: data.value
                }
            }
        }
        setItem(updated)
        onElementValeurChange(updated);
    };

    const handleChangePadding = (e, data) => {
        const updated = {
            ...item,
            styles: {
                ...item.styles,
                padding: {
                    ...item.styles.padding,
                    [data.name]: data.value
                }
            }
        }
        setItem(updated)
        onElementValeurChange(updated);
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
            <Form>
                <div className="form__style_container">
                    <div className="field">
                        <h4 className="title">Style</h4>
                    </div>
                    <div className="form__style_item">
                        <div className="field">
                            <h6 className="style__element">Margin</h6>
                        </div>
                        <div className="form__inline_item">
                            <Form.Input fluid label='Top' placeholder='Top' name='top' type="number" defaultValue={item.styles.margin.top} onChange={handleChangeMargin}/>
                            <Form.Input fluid label='Right' placeholder='Right' name='right' type="number" defaultValue={item.styles.margin.right} onChange={handleChangeMargin}/>
                            <Form.Input fluid label='Bottom' placeholder='Bottom' name='bottom' type="number" defaultValue={item.styles.margin.bottom} onChange={handleChangeMargin}/>
                            <Form.Input fluid label='Left' placeholder='Left' name='left' type="number" defaultValue={item.styles.margin.left} onChange={handleChangeMargin}/>
                        </div>
                    </div>
                    <div className="form__style_item">
                        <div className="field">
                            <h6 className="style__element">Padding</h6>
                        </div>
                        <div className="form__inline_item">
                            <Form.Input fluid label='Top' placeholder='Top' name='top' type="number" defaultValue={item.styles.padding.top} onChange={handleChangePadding}/>
                            <Form.Input fluid label='Right' placeholder='Right' name='right' type="number" defaultValue={item.styles.padding.right} onChange={handleChangePadding}/>
                            <Form.Input fluid label='Bottom' placeholder='Bottom' name='bottom' type="number" defaultValue={item.styles.padding.bottom} onChange={handleChangePadding}/>
                            <Form.Input fluid label='Left' placeholder='Left' name='left' type="number" defaultValue={item.styles.padding.left} onChange={handleChangePadding}/>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    );
}
