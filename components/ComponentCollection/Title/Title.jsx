import React, {
    useEffect,
    useState,
} from 'react';
import Accordion from 'components/Accordion/Accordion';
import {
    alignmentsOptions,
    tagsOptions,
} from 'variables/options';
import { useIntl } from 'react-intl';
import Input from 'components/Form/Input/Input';
import Dropdown from 'components/Form/Dropdown/Dropdown';
import Typography from 'components/ComponentCollection/Ui/Typography';
import PropTypes from 'prop-types';
import { change } from 'variables/functions';
import Advanced from '../Ui/Advanced';
import Background from '../Ui/Background';
import Border from '../Ui/Border';
import Animations from '../Ui/Animations';

export default function Title({ element, onElementValueChange, device }) {
    const intl = useIntl();
    const [item, setItem] = useState(element);

    useEffect(() => {
        if (element.content.text && element.type === 'title') {
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
                    id: item.type, defaultMessage: item.type,
                })}
            >
                <Input
                    label={intl.formatMessage({
                        id: item.type, defaultMessage: item.type,
                    })}
                    placeholder={intl.formatMessage({
                        id: item.type, defaultMessage: item.type,
                    })}
                    name='text'
                    type='text'
                    value={item.content.text}
                    onChange={handleChange}
                />
                <div className='field'>
                    <label>
                        {intl.formatMessage({
                            id: 'builder.htmlTag', defaultMessage: 'HTML Tag',
                        })}
                    </label>
                    <Dropdown
                        name='tag'
                        value={item.content.tag}
                        options={tagsOptions}
                        onChange={handleChange}
                    />
                </div>
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

Title.propTypes = {
    device: PropTypes.string.isRequired,
    element: PropTypes.shape({
        content: PropTypes.shape({
            text: PropTypes.string.isRequired,
        }).isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
    onElementValueChange: PropTypes.func.isRequired,
};
