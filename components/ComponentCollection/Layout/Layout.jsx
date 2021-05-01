import React, {
    useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Input from 'components/Form/Input/Input';
import Dropdown from 'components/Form/Dropdown/Dropdown';
import { contentWidthOptions } from 'variables/options';
import {
    changeStretchSection, changeContentWidth,
} from 'variables/functions';
import Accordion from 'components/Accordion/Accordion';
import Checkbox from 'components/Form/Checkbox/Checkbox';
import Advanced from '../Ui/Advanced';
import Background from '../Ui/Background';
import Border from '../Ui/Border';
import Animations from '../Ui/Animations';

export default function Layout({ element, onElementValueChange, device }) {
    const intl = useIntl();
    const [item, setItem] = useState(element);

    useEffect(() => {
        if (element.type === 'layout') {
            setItem(element);
        }
    },
    [element]);

    const handleChangeStretchSection = (_e, data) => {
        changeStretchSection(_e, data, item, setItem, onElementValueChange);
    };

    const handleChangeContentWidth = (_e, data, key) => {
        changeContentWidth(_e, data, key, item, setItem, onElementValueChange);
    };

    return (
        <>
            <Accordion
                active
                title={intl.formatMessage({
                    id: 'layout', defaultMessage: 'Layout',
                })}
            >
                <Dropdown
                    name='contentWidth'
                    defaultValue={item.content.params.layout.contentWidth.type}
                    options={contentWidthOptions}
                    onChange={(e, data) => handleChangeContentWidth(e, data, 'type')}
                    label={intl.formatMessage({
                        id: 'builder.layout.contentWidth', defaultMessage: 'Content width',
                    })}
                />
                {
                    item.content.params.layout.contentWidth.type === 'box'
                        && (
                        <Input
                            label={intl.formatMessage({
                                id: 'builder.layout.maxWidth',
                                defaultMessage: 'Max width',
                            })}
                            name='maxWidth'
                            type='number'
                            min='500'
                            max='1600'
                            defaultValue={item.content.params.layout.contentWidth.maxWidth}
                            onChange={(e, data) => handleChangeContentWidth(e, data, 'maxWidth')}
                        />
)
                }
                <Checkbox
                    name='stretchSection'
                    defaultChecked={item.content.params.layout.stretchSection}
                    label={intl.formatMessage({
                        id: 'builder.layout.stretchSection', defaultMessage: 'Stretch section',
                    })}
                    onChange={handleChangeStretchSection}
                />
            </Accordion>
            <Advanced
                item={item}
                setItem={setItem}
                device={device}
                onChange={onElementValueChange}
                disableMarginLeftRight
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

Layout.propTypes = {
    device: PropTypes.string.isRequired,
    element: PropTypes.shape({
        content: PropTypes.shape({
        }).isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
    onElementValueChange: PropTypes.func.isRequired,
};
