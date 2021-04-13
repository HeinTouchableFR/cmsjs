import React, {
    useEffect, useState,
} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { alignmentsOptions } from 'variables/options';
import Accordion from 'components/Accordion/Accordion';
import { useIntl } from 'react-intl';
import Dropdown from 'components/Form/Dropdown/Dropdown';
import Typography from 'components/ComponentCollection/Ui/Typography';
import PropTypes from 'prop-types';
import { change } from 'variables/functions';
import Advanced from '../Ui/Advanced';
import Background from '../Ui/Background';
import Border from '../Ui/Border';
import Animations from '../Ui/Animations';

export default function Text({ element, onElementValueChange, device }) {
    const intl = useIntl();
    const [item, setItem] = useState(element);

    useEffect(() => {
        if (element.content.text && element.type === 'text') {
            setItem(element);
        }
    },
    [element]);

    const handleChange = (_e, data) => {
        change(_e, data, item, setItem, onElementValueChange);
    };

    const handleChangeText = (value) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                text: value,
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };

    return (
        <>
            <Accordion
                active
                title={intl.formatMessage({
                    id: item.type, defaultMessage: item.type,
                })}
            >
                <Editor
                    value={item.content.text}
                    apiKey='01vj2ci2rp4w85rw2pa64fg88pw784bf67k0rskfg4ybks3z'
                    textareaName='text'
                    init={{
                        language: 'fr_FR',
                        height: 500,
                        menubar: true,
                        toolbar1: 'undo redo | cut copy paste | selectallreplace | code',
                        toolbar2: 'bold italic underline strikethrough forecolor backcolor | help',
                        toolbar3: 'fontselect fontsizeselect  formatselect',
                        toolbar4: 'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent lineheight | removeformat',
                    }}
                    onEditorChange={handleChangeText}
                />
                <div className='field'>
                    <label>
                        {intl.formatMessage({
                            id: 'builder.alignment', defaultMessage: 'Alignment',
                        })}
                    </label>
                    <Dropdown
                        name='alignment'
                        value={item.content.alignment}
                        options={alignmentsOptions}
                        onChange={handleChange}
                    />
                </div>
            </Accordion>
            <Typography
                item={item}
                setItem={setItem}
                device={device}
                onChange={onElementValueChange}
            />
            <Advanced
                item={item}
                setItem={setItem}
                device={device}
                onChange={onElementValueChange}
            />
            <Background
                item={item}
                setItem={setItem}
                device={device}
                onChange={onElementValueChange}
            />
            <Border
                item={item}
                setItem={setItem}
                device={device}
                onChange={onElementValueChange}
            />
            <Animations
                item={item}
                setItem={setItem}
                device={device}
                onChange={onElementValueChange}
            />
        </>
    );
}

Text.propTypes = {
    device: PropTypes.string.isRequired,
    element: PropTypes.shape({
        content: PropTypes.shape({
            text: PropTypes.string.isRequired,
        }).isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
    onElementValueChange: PropTypes.func.isRequired,
};
