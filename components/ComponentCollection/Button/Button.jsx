import PropTypes from 'prop-types';
import React, {
    useEffect, useState,
} from 'react';
import Accordion from 'components/Accordion/Accordion';
import ColorPicker from 'components/ColorPicker/ColorPicker';
import {
    alignmentsOptions, borderOptions,
} from 'variables/options';
import { change } from 'variables/functions';
import { useIntl } from 'react-intl';
import Input from 'components/Form/Input/Input';
import Dropdown from 'components/Form/Dropdown/Dropdown';

import Tab from 'components/Tab/Tab';
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

    const handleColorChange = (color, mode) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                button: {
                    ...item.content.button,
                    background: {
                        ...item.content.button.background,
                        [mode]: color,
                    },
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };

    const handleChange = (_e, data) => {
        change(_e, data, item, setItem, onElementValueChange);
    };

    const handleChangeBorder = (_e, data, key, mode) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                button: {
                    ...item.content.button,
                    border: {
                        ...item.content.button.border,
                        [mode]: {
                            ...item.content.button.border[mode],
                            [key]: {
                                ...item.content.button.border[mode][key],
                                [data.name]: data.value,
                            },
                        },
                    },
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };

    const handleChangeBorderType = (_e, data, mode) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                button: {
                    ...item.content.button,
                    border: {
                        ...item.content.button.border,
                        [mode]: {
                            ...item.content.button.border[mode],
                            [data.name]: data.value,
                        },
                    },
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };

    const handleChangeBorderColor = (color, mode) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                button: {
                    ...item.content.button,
                    border: {
                        ...item.content.button.border,
                        [mode]: {
                            ...item.content.button.border[mode],
                            color,
                        },
                    },
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };

    const handleChangeBorderRadiusUnit = (unit, mode) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                button: {
                    ...item.content.button,
                    border: {
                        ...item.content.button.border,
                        [mode]: {
                            ...item.content.button.border[mode],
                            radius: {
                                ...item.content.button.border[mode].radius,
                                unit,
                            },
                        },
                    },
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };

    const handleChangeStyle = (_e, data, key) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                button: {
                    ...item.content.button,
                    [key]: {
                        ...item.content.button[key],
                        [data.name]: data.value,
                    },
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };

    const handleChangeStyleUnit = (unit, key) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                button: {
                    ...item.content.button,
                    [key]: {
                        unit,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    },
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };

    const borderPanes = [
        {
            label: intl.formatMessage({
                id: 'builder.normal',
                defaultMessage: 'Normal',
            }),
            render: () => (
                <Tab.Pane>
                    <ColorPicker
                        defaultColor={item.content.button.background.normal}
                        onColorChange={(color) => handleColorChange(color, 'normal')}
                        label={intl.formatMessage({
                            id: 'builder.button.color',
                            defaultMessage: 'Background color',
                        })}
                        name='normalColorButton'
                    />
                    <Dropdown
                        name='type'
                        defaultValue={
                            item.content.button.border.normal.type
                        }
                        options={borderOptions}
                        onChange={(e, data) => handleChangeBorderType(e, data, 'normal')}
                        label={intl.formatMessage({
                            id: 'builder.border.type',
                            defaultMessage: 'Border type',
                        })}
                        searchable
                    />
                    <ColorPicker
                        defaultColor={item.content.button.border.normal.color}
                        onColorChange={(color) => handleChangeBorderColor(color, 'normal')}
                        label={intl.formatMessage({
                            id: 'builder.color',
                            defaultMessage: 'Color',
                        })}
                        name='normalBorderColor'
                    />
                    <div className='field'>
                        <div>
                            {intl.formatMessage({
                                id: 'builder.border.weight',
                                defaultMessage: 'Border weight',
                            })}
                        </div>
                        <div className='form__inline_item bottom'>
                            <Input
                                label={intl.formatMessage({
                                    id: 'builder.top',
                                    defaultMessage: 'Top',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'builder.top',
                                    defaultMessage: 'Top',
                                })}
                                name='top'
                                type='number'
                                defaultValue={
                                    item.content.button.border.normal.width.top
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}
                            />
                            <Input
                                label={intl.formatMessage({
                                    id: 'builder.right',
                                    defaultMessage: 'Right',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'builder.right',
                                    defaultMessage: 'Right',
                                })}
                                name='right'
                                type='number'
                                defaultValue={
                                    item.content.button.border.normal.width.right
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}
                            />
                            <Input
                                label={intl.formatMessage({
                                    id: 'builder.bottom',
                                    defaultMessage: 'Bottom',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'builder.bottom',
                                    defaultMessage: 'Bottom',
                                })}
                                name='bottom'
                                type='number'
                                defaultValue={
                                    item.content.button.border.normal.width.bottom
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}
                            />
                            <Input
                                label={intl.formatMessage({
                                    id: 'builder.left',
                                    defaultMessage: 'Left',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'builder.left',
                                    defaultMessage: 'Left',
                                })}
                                name='left'
                                type='number'
                                defaultValue={
                                    item.content.button.border.normal.width.left
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}
                            />
                        </div>
                    </div>
                    <div className='field'>
                        <div className='form__inline_item'>
                            <div>
                                {intl.formatMessage({
                                    id: 'builder.border.radius',
                                    defaultMessage: 'Border radius',
                                })}
                            </div>
                            <div className='field-group'>
                                <span
                                    className={`${item.content.button.border.normal.radius.unit === 'px' && 'selected'}`}
                                    onClick={() => handleChangeBorderRadiusUnit('px', 'normal')}
                                    onKeyDown={() => handleChangeBorderRadiusUnit('px', 'normal')}
                                    role='button'
                                    tabIndex='0'
                                >
                                    PX
                                </span>
                                <span
                                    className={`${item.content.button.border.normal.radius.unit === '%' && 'selected'}`}
                                    onClick={() => handleChangeBorderRadiusUnit('%', 'normal')}
                                    onKeyDown={() => handleChangeBorderRadiusUnit('%', 'normal')}
                                    role='button'
                                    tabIndex='0'
                                >
                                    %
                                </span>
                            </div>
                        </div>
                        <div className='form__inline_item bottom'>
                            <Input
                                label={intl.formatMessage({
                                    id: 'builder.top',
                                    defaultMessage: 'Top',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'builder.top',
                                    defaultMessage: 'Top',
                                })}
                                name='top'
                                type='number'
                                defaultValue={
                                    item.content.button.border.normal.radius.top
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'normal')}
                            />
                            <Input
                                label={intl.formatMessage({
                                    id: 'builder.right',
                                    defaultMessage: 'Right',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'builder.right',
                                    defaultMessage: 'Right',
                                })}
                                name='right'
                                type='number'
                                defaultValue={
                                    item.content.button.border.normal.radius.right
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'normal')}
                            />
                            <Input
                                label={intl.formatMessage({
                                    id: 'builder.bottom',
                                    defaultMessage: 'Bottom',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'builder.bottom',
                                    defaultMessage: 'Bottom',
                                })}
                                name='bottom'
                                type='number'
                                defaultValue={
                                    item.content.button.border.normal.radius.bottom
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'normal')}
                            />
                            <Input
                                label={intl.formatMessage({
                                    id: 'builder.left',
                                    defaultMessage: 'Left',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'builder.left',
                                    defaultMessage: 'Left',
                                })}
                                name='left'
                                type='number'
                                defaultValue={
                                    item.content.button.border.normal.radius.left
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'normal')}
                            />
                        </div>
                    </div>
                </Tab.Pane>
            ),
        },
        {
            label: intl.formatMessage({
                id: 'builder.hover',
                defaultMessage: 'Hover',
            }),
            render: () => (
                <Tab.Pane>
                    <ColorPicker
                        defaultColor={item.content.button.background.hover}
                        onColorChange={(color) => handleColorChange(color, 'hover')}
                        label={intl.formatMessage({
                            id: 'builder.button.color',
                            defaultMessage: 'Background color',
                        })}
                        name='hoverColorButton'
                    />
                    <Dropdown
                        name='type'
                        defaultValue={
                            item.content.button.border.hover.type
                        }
                        options={borderOptions}
                        onChange={(e, data) => handleChangeBorderType(e, data, 'hover')}
                        label={intl.formatMessage({
                            id: 'builder.border.type',
                            defaultMessage: 'Border type',
                        })}
                        searchable
                    />
                    <ColorPicker
                        defaultColor={item.content.button.border.hover.color}
                        onColorChange={(color) => handleChangeBorderColor(color, 'hover')}
                        label={intl.formatMessage({
                            id: 'builder.color',
                            defaultMessage: 'Color',
                        })}
                        name='hoverBorderColor'
                    />
                    <div className='field'>
                        <div>
                            {intl.formatMessage({
                                id: 'builder.border.weight',
                                defaultMessage: 'Border weight',
                            })}
                        </div>
                        <div className='form__inline_item bottom'>
                            <Input
                                label={intl.formatMessage({
                                    id: 'builder.top',
                                    defaultMessage: 'Top',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'builder.top',
                                    defaultMessage: 'Top',
                                })}
                                name='top'
                                type='number'
                                defaultValue={
                                    item.content.button.border.hover.width.top
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}
                            />
                            <Input
                                label={intl.formatMessage({
                                    id: 'builder.right',
                                    defaultMessage: 'Right',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'builder.right',
                                    defaultMessage: 'Right',
                                })}
                                name='right'
                                type='number'
                                defaultValue={
                                    item.content.button.border.hover.width.right
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}
                            />
                            <Input
                                label={intl.formatMessage({
                                    id: 'builder.bottom',
                                    defaultMessage: 'Bottom',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'builder.bottom',
                                    defaultMessage: 'Bottom',
                                })}
                                name='bottom'
                                type='number'
                                defaultValue={
                                    item.content.button.border.hover.width.bottom
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}
                            />
                            <Input
                                label={intl.formatMessage({
                                    id: 'builder.left',
                                    defaultMessage: 'Left',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'builder.left',
                                    defaultMessage: 'Left',
                                })}
                                name='left'
                                type='number'
                                defaultValue={
                                    item.content.button.border.hover.width.left
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}
                            />
                        </div>
                    </div>
                    <div className='field'>
                        <div className='form__inline_item'>
                            <div>
                                {intl.formatMessage({
                                    id: 'builder.border.radius',
                                    defaultMessage: 'Border radius',
                                })}
                            </div>
                            <div className='field-group'>
                                <span
                                    className={`${item.content.button.border.hover.radius.unit === 'px' && 'selected'}`}
                                    onClick={() => handleChangeBorderRadiusUnit('px', 'hover')}
                                    onKeyDown={() => handleChangeBorderRadiusUnit('px', 'hover')}
                                    role='button'
                                    tabIndex='0'
                                >
                                    PX
                                </span>
                                <span
                                    className={`${item.content.button.border.hover.radius.unit === '%' && 'selected'}`}
                                    onClick={() => handleChangeBorderRadiusUnit('%', 'hover')}
                                    onKeyDown={() => handleChangeBorderRadiusUnit('%', 'hover')}
                                    role='button'
                                    tabIndex='0'
                                >
                                    %
                                </span>
                            </div>
                        </div>
                        <div className='form__inline_item bottom'>
                            <Input
                                label={intl.formatMessage({
                                    id: 'builder.top',
                                    defaultMessage: 'Top',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'builder.top',
                                    defaultMessage: 'Top',
                                })}
                                name='top'
                                type='number'
                                defaultValue={
                                    item.content.button.border.hover.radius.top
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'hover')}
                            />
                            <Input
                                label={intl.formatMessage({
                                    id: 'builder.right',
                                    defaultMessage: 'Right',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'builder.right',
                                    defaultMessage: 'Right',
                                })}
                                name='right'
                                type='number'
                                defaultValue={
                                    item.content.button.border.hover.radius.right
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'hover')}
                            />
                            <Input
                                label={intl.formatMessage({
                                    id: 'builder.bottom',
                                    defaultMessage: 'Bottom',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'builder.bottom',
                                    defaultMessage: 'Bottom',
                                })}
                                name='bottom'
                                type='number'
                                defaultValue={
                                    item.content.button.border.hover.radius.bottom
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'hover')}
                            />
                            <Input
                                label={intl.formatMessage({
                                    id: 'builder.left',
                                    defaultMessage: 'Left',
                                })}
                                placeholder={intl.formatMessage({
                                    id: 'builder.left',
                                    defaultMessage: 'Left',
                                })}
                                name='left'
                                type='number'
                                defaultValue={
                                    item.content.button.border.hover.radius.left
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'hover')}
                            />
                        </div>
                    </div>
                </Tab.Pane>
            ),
        },
    ];

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
                    defaultValue={item.content.text}
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
                    defaultValue={item.content.url}
                    onChange={handleChange}
                />
                <Dropdown
                    label={intl.formatMessage({
                        id: 'builder.alignment',
                        defaultMessage: 'Alignment',
                    })}
                    placeholder={intl.formatMessage({
                        id: 'builder.alignment',
                        defaultMessage: 'Alignment',
                    })}
                    name='alignment'
                    defaultValue={item.content.alignment}
                    options={alignmentsOptions}
                    onChange={handleChange}
                    searchable
                />
                <div className='field'>
                    <div className='form__inline_item'>
                        <div>
                            {intl.formatMessage({
                                id: 'builder.padding',
                                defaultMessage: 'Padding',
                            })}
                        </div>
                        <div className='field-group'>
                            <span
                                className={`${item.content.button.padding.unit === 'px' && 'selected'}`}
                                onClick={() => handleChangeStyleUnit('px', 'padding')}
                                onKeyDown={() => handleChangeStyleUnit('px', 'padding')}
                                role='button'
                                tabIndex='0'
                            >
                                PX
                            </span>
                            <span
                                className={`${item.content.button.padding.unit === 'em' && 'selected'}`}
                                onClick={() => handleChangeStyleUnit('em', 'padding')}
                                onKeyDown={() => handleChangeStyleUnit('em', 'padding')}
                                role='button'
                                tabIndex='0'
                            >
                                EM
                            </span>
                            <span
                                className={`${item.content.button.padding.unit === '%' && 'selected'}`}
                                onClick={() => handleChangeStyleUnit('%', 'padding')}
                                onKeyDown={() => handleChangeStyleUnit('%', 'padding')}
                                role='button'
                                tabIndex='0'
                            >
                                %
                            </span>
                            <span
                                className={`${item.content.button.padding.unit === 'rem' && 'selected'}`}
                                onClick={() => handleChangeStyleUnit('rem', 'padding')}
                                onKeyDown={() => handleChangeStyleUnit('rem', 'padding')}
                                role='button'
                                tabIndex='0'
                            >
                                REM
                            </span>
                        </div>
                    </div>
                    <div className='form__inline_item bottom'>
                        <Input
                            label={intl.formatMessage({
                                id: 'builder.top',
                                defaultMessage: 'Top',
                            })}
                            placeholder={intl.formatMessage({
                                id: 'builder.top',
                                defaultMessage: 'Top',
                            })}
                            name='top'
                            type='number'
                            defaultValue={item.content.button.padding.top}
                            onChange={(e, data) => handleChangeStyle(e, data, 'padding')}
                        />
                        <Input
                            label={intl.formatMessage({
                                id: 'builder.right',
                                defaultMessage: 'Right',
                            })}
                            placeholder={intl.formatMessage({
                                id: 'builder.right',
                                defaultMessage: 'Right',
                            })}
                            name='right'
                            type='number'
                            defaultValue={item.content.button.padding.right}
                            onChange={(e, data) => handleChangeStyle(e, data, 'padding')}
                        />
                        <Input
                            label={intl.formatMessage({
                                id: 'builder.bottom',
                                defaultMessage: 'Bottom',
                            })}
                            placeholder={intl.formatMessage({
                                id: 'builder.bottom',
                                defaultMessage: 'Bottom',
                            })}
                            name='bottom'
                            type='number'
                            defaultValue={item.content.button.padding.bottom}
                            onChange={(e, data) => handleChangeStyle(e, data, 'padding')}
                        />
                        <Input
                            label={intl.formatMessage({
                                id: 'builder.left',
                                defaultMessage: 'Left',
                            })}
                            placeholder={intl.formatMessage({
                                id: 'builder.left',
                                defaultMessage: 'Left',
                            })}
                            name='left'
                            type='number'
                            defaultValue={item.content.button.padding.left}
                            onChange={(e, data) => handleChangeStyle(e, data, 'padding')}
                        />
                    </div>
                </div>
                <Tab
                    panes={borderPanes}
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
