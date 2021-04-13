import React, {
    useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';
// Style
// Components
import { Tab } from 'semantic-ui-react';
import { alignmentsOptions } from 'variables/options';
import Accordion from 'components/Accordion/Accordion';
import Input from 'components/Form/Input/Input';
import Dropdown from 'components/Form/Dropdown/Dropdown';
import PropTypes from 'prop-types';
import {
    changeImageValue,
    changeOpacity,
    changeImageValueUnit, change,
} from 'variables/functions';
import Advanced from '../Ui/Advanced';
import Background from '../Ui/Background';
import Border from '../Ui/Border';
import Animations from '../Ui/Animations';

export default function Logo({ element, device, onElementValueChange }) {
    const intl = useIntl();
    const [item, setItem] = useState(element);

    useEffect(() => {
        if (element.content.image && element.type === 'logo') {
            setItem(element);
        }
    },
    [element]);

    const handleChange = (_e, data) => {
        change(_e, data, item, setItem, onElementValueChange);
    };

    const handleChangeImageValue = (e, data, key, value) => {
        changeImageValue(e, data, key, value, item, device, setItem, onElementValueChange);
    };

    const handleChangeImageValueUnit = (unit, key, value) => {
        changeImageValueUnit(unit, key, value, item, device, setItem, onElementValueChange);
    };

    const handleChangeOpacity = (e, data, key, mode) => {
        changeOpacity(e, data, key, mode, item, device, setItem, onElementValueChange);
    };

    const opacityPanes = [
        {
            menuItem: intl.formatMessage({
                id: 'builder.normal', defaultMessage: 'Normal',
            }),
            render: () => (
                <div className='accordion__pane'>
                    <Input
                        type='number'
                        label={intl.formatMessage({
                            id: 'builder.opacity', defaultMessage: 'Opacity',
                        })}
                        name='opacity'
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={(e, data) => handleChangeOpacity(e, data, 'opacity', 'normal')}
                        value={item.content[device].image.opacity.normal}
                    />
                </div>
            ),
        },
        {
            menuItem: intl.formatMessage({
                id: 'builder.hover', defaultMessage: 'Hover',
            }),
            render: () => (
                <div className='accordion__pane'>
                    <Input
                        type='number'
                        label={intl.formatMessage({
                            id: 'builder.opacity', defaultMessage: 'Opacity',
                        })}
                        name='opacity'
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={(e, data) => handleChangeOpacity(e, data, 'opacity', 'hover')}
                        value={item.content[device].image.opacity.hover}
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            <Accordion
                active
                title='Image'
            >
                <div className='form__inline_item'>
                    <Input
                        label={intl.formatMessage({
                            id: 'builder.width', defaultMessage: 'Width',
                        })}
                        placeholder='100'
                        name='value'
                        type='number'
                        min='1'
                        max={item.content[device].image.size.width.unit === 'px' ? 1000 : 100}
                        step={1}
                        value={item.content[device].image.size.width.value}
                        onChange={(e, data) => handleChangeImageValue(e, data, 'size', 'width')}
                    />
                    <div className='field-group'>
                        <label
                            className={item.content[device].image.size.width.unit === '%' ? 'selected' : undefined}
                            onClick={() => handleChangeImageValueUnit('%', 'size', 'width')}
                        >
                            %
                        </label>
                        <label
                            className={item.content[device].image.size.width.unit === 'px' ? 'selected' : undefined}
                            onClick={() => handleChangeImageValueUnit('px', 'size', 'width')}
                        >
                            PX
                        </label>
                        <label
                            className={item.content[device].image.size.width.unit === 'vw' ? 'selected' : undefined}
                            onClick={() => handleChangeImageValueUnit('vw', 'size', 'width')}
                        >
                            VW
                        </label>
                    </div>
                </div>
                <div className='form__inline_item'>
                    <Input
                        label={intl.formatMessage({
                            id: 'builder.width.max', defaultMessage: 'Max width',
                        })}
                        placeholder='100'
                        name='value'
                        type='number'
                        min='1'
                        max={item.content[device].image.size.maxWidth.unit === 'px' ? 1000 : 100}
                        step={1}
                        value={item.content[device].image.size.maxWidth.value}
                        onChange={(e, data) => handleChangeImageValue(e, data, 'size', 'maxWidth')}
                    />
                    <div className='field-group'>
                        <label
                            className={item.content[device].image.size.maxWidth.unit === '%' ? 'selected' : undefined}
                            onClick={() => handleChangeImageValueUnit('%', 'size', 'maxWidth')}
                        >
                            %
                        </label>
                        <label
                            className={item.content[device].image.size.maxWidth.unit === 'px' ? 'selected' : undefined}
                            onClick={() => handleChangeImageValueUnit('px', 'size', 'maxWidth')}
                        >
                            PX
                        </label>
                        <label
                            className={item.content[device].image.size.maxWidth.unit === 'vw' ? 'selected' : undefined}
                            onClick={() => handleChangeImageValueUnit('vw', 'size', 'maxWidth')}
                        >
                            VW
                        </label>
                    </div>
                </div>
                <div className='form__inline_item'>
                    <Input
                        label={intl.formatMessage({
                            id: 'builder.height', defaultMessage: 'Height',
                        })}
                        placeholder='Value (blank for auto)'
                        name='value'
                        type='number'
                        min='1'
                        max={item.content[device].image.size.height.unit === 'px' ? 500 : 100}
                        step={1}
                        value={item.content[device].image.size.height.value !== 'auto' ? item.content[device].image.size.height.value : ''}
                        onChange={(e, data) => handleChangeImageValue(e, data, 'size', 'height')}
                    />
                    <div className='field-group'>
                        <label
                            className={item.content[device].image.size.height.unit === 'px' ? 'selected' : undefined}
                            onClick={() => handleChangeImageValueUnit('px', 'size', 'height')}
                        >
                            PX
                        </label>
                        <label
                            className={item.content[device].image.size.height.unit === 'vh' ? 'selected' : undefined}
                            onClick={() => handleChangeImageValueUnit('vh', 'size', 'height')}
                        >
                            VH
                        </label>
                    </div>
                </div>
                <Tab
                    menu={{
                        secondary: true, pointing: true,
                    }}
                    panes={opacityPanes}
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

Logo.propTypes = {
    device: PropTypes.shape({
    }).isRequired,
    element: PropTypes.shape({
        content: PropTypes.shape({
            image: PropTypes.shape({
            }).isRequired,
        }).isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
    onElementValueChange: PropTypes.func.isRequired,
};
