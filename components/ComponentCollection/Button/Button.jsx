import PropTypes from 'prop-types';
import React, {
    useEffect, useState,
} from 'react';
import Accordion from 'components/Accordion/Accordion';
import { alignmentsOptions } from 'variables/options';
import { useIntl } from 'react-intl';
import Input from 'components/Form/Input/Input';
import Dropdown from 'components/Form/Dropdown/Dropdown';
import { change } from 'variables/functions';
import Typography from '../Ui/Typography';
import Animations from '../Ui/Animations';
import Advanced from '../Ui/Advanced';
import Border from '../Ui/Border';
import Background from '../Ui/Background';

export default function Button({ element, onElementValueChange, device }) {
    const intl = useIntl();
    const [item, setItem] = useState(element);

    useEffect(() => {
        if (element.content.text && element.type === 'button') {
            setItem(element);
        }
    },
    [element]);

    const handleChange = (_e, data) => {
        change(_e, data, item, setItem, onElementValueChange);
    };

    return (
        <>
            <Accordion
                active
                title={intl.formatMessage({
                    id: item.type,
                    defaultMessage: item.type,
                })}
            >
                <Input
                    label={intl.formatMessage({
                    id: item.type,
                    defaultMessage: item.type,
                })}
                    placeholder={intl.formatMessage({
                    id: item.type,
                    defaultMessage: item.type,
                })}
                    name='text'
                    type='text'
                    value={item.content.text}
                    onChange={handleChange}
                />
                <Input
                    label={intl.formatMessage({
                    id: 'url',
                    defaultMessage: 'url',
                })}
                    placeholder={intl.formatMessage({
                    id: 'url',
                    defaultMessage: 'url',
                })}
                    name='url'
                    type='url'
                    value={item.content.url}
                    onChange={handleChange}
                />
                <Dropdown
                    name='alignment'
                    value={item.content.alignment}
                    options={alignmentsOptions}
                    onChange={handleChange}
                    label={intl.formatMessage({
                        id: 'builder.alignment',
                        defaultMessage: 'Alignment',
                    })}
                />
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

Button.propTypes = {
    device: PropTypes.string.isRequired,
    element: PropTypes.shape({
        content: PropTypes.shape({
            text: PropTypes.string.isRequired,
        }).isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
    onElementValueChange: PropTypes.func.isRequired,
};
