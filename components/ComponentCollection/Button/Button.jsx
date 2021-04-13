import PropTypes from 'prop-types';
import React, {
    useEffect, useState,
} from 'react';
import { Tab } from 'semantic-ui-react';
import ColorPicker from 'components/ColorPicker/ColorPicker';
import Accordion from 'components/Accordion/Accordion';
import {
    alignmentsOptions,
    borderOptions,
    decorationsOptions,
    fontsOptions,
    stylesOptions,
    transformsOptions,
    weightsOptions,
    animationsOptions,
    durationsOptions,
} from 'variables/options';
import { useIntl } from 'react-intl';
import Input from 'components/Form/Input/Input';
import Dropdown from 'components/Form/Dropdown/Dropdown';

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
        const updated = {
            ...item,
            content: {
                ...item.content,
                [data.name]: data.value,
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };
    const handleChangeGeneralStyle = (_e, data, key) => {
        const updated = {
            ...item,
            styles: {
                ...item.styles,
                [device]: {
                    ...item.styles[device],
                    [key]: {
                        ...item.styles[device][key],
                        [data.name]: data.value,
                    },
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };
    const handleChangeGeneralStyleUnit = (unit, key) => {
        const updated = {
            ...item,
            styles: {
                ...item.styles,
                [device]: {
                    ...item.styles[device],
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
    const handleColorChange = (color, key, mode, location) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                [device]: {
                    ...item.content[device],
                    [location]: {
                        ...item.content[device][location],
                        [key]: {
                            ...item.content[device][location][key],
                            [mode]: color,
                        },
                    },
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };
    const handleChangeTypo = (_e, data) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                [device]: {
                    ...item.content[device],
                    typo: {
                        ...item.content[device].typo,
                        [data.name]: data.value,
                    },
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };
    const handleChangeAnimation = (_e, data) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                [device]: {
                    ...item.content[device],
                    animation: {
                        ...item.content[device].animation,
                        [data.name]: data.value,
                    },
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };
    const handleChangeTypoSizeLh = (_e, data, key) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                [device]: {
                    ...item.content[device],
                    typo: {
                        ...item.content[device].typo,
                        [key]: {
                            ...item.content[device].typo[key],
                            [data.name]: data.value,
                        },
                    },
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };
    const handleChangeTypoSizeLineHeightUnit = (unit, key) => {
        let sizeTypo = '';

        if (key === 'size') {
            if (unit === 'px') {
                sizeTypo = '42';
            } else {
                sizeTypo = '3';
            }
        } else {
            sizeTypo = '1';
        }

        const updated = {
            ...item,
            content: {
                ...item.content,
                [device]: {
                    ...item.content[device],
                    typo: {
                        ...item.content[device].typo,
                        [key]: {
                            unit,
                            value: sizeTypo,
                        },
                    },
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };
    const handleChangeBorder = (_e, data, key, mode) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                [device]: {
                    ...item.content[device],
                    styles: {
                        ...item.content[device].styles,
                        border: {
                            ...item.content[device].styles.border,
                            [mode]: {
                                ...item.content[device].styles.border[mode],
                                [key]: {
                                    ...item.content[device].styles.border[mode][key],
                                    [data.name]: data.value,
                                },
                            },
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
                [device]: {
                    ...item.content[device],
                    styles: {
                        ...item.content[device].styles,
                        border: {
                            ...item.content[device].styles.border,
                            [mode]: {
                                ...item.content[device].styles.border[mode],
                                radius: {
                                    ...item.content[device].styles.border[mode].radius,
                                    unit,
                                },
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
                [device]: {
                    ...item.content[device],
                    styles: {
                        ...item.content[device].styles,
                        border: {
                            ...item.content[device].styles.border,
                            [mode]: {
                                ...item.content[device].styles.border[mode],
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
    const handleBorderColorChange = (color, mode) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                [device]: {
                    ...item.content[device],
                    styles: {
                        ...item.content[device].styles,
                        border: {
                            ...item.content[device].styles.border,
                            [mode]: {
                                ...item.content[device].styles.border[mode],
                                color,
                            },
                        },
                    },
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };

    const borderPanes = [
        {
            menuItem: intl.formatMessage({
                id: 'builder.normal',
                defaultMessage: 'Normal',
            }),
            render: () => (
                <div className='accordion__pane'>
                    <div className='field'>
                        <div>
                            {intl.formatMessage({
                                id: 'builder.border.type',
                                defaultMessage: 'Border type',
                            })}
                        </div>
                        <Dropdown
                            name='type'
                            value={item.content[device].styles.border.normal.type}
                            options={borderOptions}
                            onChange={(e, data) => handleChangeBorderType(e, data, 'normal')}
                        />
                    </div>
                    <div className='field'>
                        <div>
                            {intl.formatMessage({
                                id: 'builder.color',
                                defaultMessage: 'Color',
                            })}
                        </div>
                        <ColorPicker
                            defaultColor={item.content[device].styles.border.normal.color}
                            onColorChange={(color) => handleBorderColorChange(color, 'normal')}
                        />
                    </div>
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
                                value={item.content[device].styles.border.normal.width.top}
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
                                value={item.content[device].styles.border.normal.width.right}
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
                                value={item.content[device].styles.border.normal.width.bottom}
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
                                value={item.content[device].styles.border.normal.width.left}
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
                                <button
                                    className={item.content[device].styles.border.normal.radius.unit === 'px' && 'selected'}
                                    onClick={() => handleChangeBorderRadiusUnit('px', 'normal')}
                                    type='button'
                                >
                                    PX
                                </button>
                                <button
                                    className={item.content[device].styles.border.normal.radius.unit === '%' && 'selected'}
                                    onClick={() => handleChangeBorderRadiusUnit('%', 'normal')}
                                    type='button'
                                >
                                    %
                                </button>
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
                                value={item.content[device].styles.border.normal.radius.top}
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
                                value={item.content[device].styles.border.normal.radius.right}
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
                                value={item.content[device].styles.border.normal.radius.bottom}
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
                                value={item.content[device].styles.border.normal.radius.left}
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'normal')}
                            />
                        </div>
                    </div>
                </div>
            ),
        },
        {
            menuItem: intl.formatMessage({
                id: 'builder.hover',
                defaultMessage: 'Hover',
            }),
            render: () => (
                <div className='accordion__pane'>
                    <div className='field'>
                        <div>
                            {intl.formatMessage({
                                id: 'builder.border.type',
                                defaultMessage: 'Border type',
                            })}
                        </div>
                        <Dropdown
                            name='type'
                            value={item.content[device].styles.border.hover.type}
                            options={borderOptions}
                            onChange={(e, data) => handleChangeBorderType(e, data, 'hover')}
                        />
                    </div>
                    <div className='field'>
                        <div>
                            {intl.formatMessage({
                                id: 'builder.color',
                                defaultMessage: 'Color',
                            })}
                        </div>
                        <ColorPicker
                            defaultColor={item.content[device].styles.border.hover.color}
                            onColorChange={(color) => handleBorderColorChange(color, 'hover')}
                        />
                    </div>
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
                                value={item.content[device].styles.border.hover.width.top}
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
                                value={item.content[device].styles.border.hover.width.right}
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
                                value={item.content[device].styles.border.hover.width.bottom}
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
                                value={item.content[device].styles.border.hover.width.left}
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
                                <button
                                    className={item.content[device].styles.border.hover.radius.unit === 'px' && 'selected'}
                                    onClick={() => handleChangeBorderRadiusUnit('px', 'hover')}
                                    type='button'
                                >
                                    PX
                                </button>
                                <button
                                    className={item.content[device].styles.border.hover.radius.unit === '%' && 'selected'}
                                    onClick={() => handleChangeBorderRadiusUnit('%', 'hover')}
                                    type='button'
                                >
                                    %
                                </button>
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
                                value={item.content[device].styles.border.hover.radius.top}
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
                                value={item.content[device].styles.border.hover.radius.right}
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
                                value={item.content[device].styles.border.hover.radius.bottom}
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
                                value={item.content[device].styles.border.hover.radius.left}
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'hover')}
                            />
                        </div>
                    </div>
                </div>
            ),
        },
    ];

    const backgroundPanes = [
        {
            menuItem: intl.formatMessage({
                id: 'builder.normal',
                defaultMessage: 'Normal',
            }),
            render: () => (
                <div className='accordion__pane'>
                    <ColorPicker
                        defaultColor={item.content[device].styles.background.normal}
                        onColorChange={(color) => handleColorChange(color, 'background', 'normal', 'styles')}
                    />
                </div>
            ),
        },
        {
            menuItem: intl.formatMessage({
                id: 'builder.hover',
                defaultMessage: 'Hover',
            }),
            render: () => (
                <div className='accordion__pane'>
                    <ColorPicker
                        defaultColor={item.content[device].styles.background.hover}
                        onColorChange={(color) => handleColorChange(color, 'background', 'hover', 'styles')}
                    />
                </div>
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
                <div className='field'>
                    <div>
                        {intl.formatMessage({
                            id: 'builder.alignment',
                            defaultMessage: 'Alignment',
                        })}
                    </div>
                    <Dropdown
                        name='alignment'
                        value={item.content.alignment}
                        options={alignmentsOptions}
                        onChange={handleChange}
                    />
                </div>
            </Accordion>
            <Accordion
                active={false}
                title={intl.formatMessage({
                    id: 'builder.typography',
                    defaultMessage: 'Typography',
                })}
            >
                <div className='form__inline_item'>
                    <div className='field'>
                        <div>
                            {intl.formatMessage({
                                id: 'builder.color',
                                defaultMessage: 'Color',
                            })}
                        </div>
                        <ColorPicker
                            defaultColor={item.content[device].typo.color.normal}
                            onColorChange={(color) => handleColorChange(color, 'color', 'normal', 'typo')}
                        />
                    </div>
                    <div className='field'>
                        <div>
                            {intl.formatMessage({
                                id: 'builder.color.hover',
                                defaultMessage: 'Color on hover',
                            })}
                        </div>
                        <ColorPicker
                            defaultColor={item.content[device].typo.color.hover}
                            onColorChange={(color) => handleColorChange(color, 'color', 'hover', 'typo')}
                        />
                    </div>
                </div>
                <div className='form__inline_item'>
                    <div className='field'>
                        <Input
                            label={intl.formatMessage({
                            id: 'builder.font.size',
                            defaultMessage: 'Font size',
                        })}
                            placeholder='16'
                            name='value'
                            type='number'
                            min='1'
                            max={item.content[device].typo.size.unit === 'px' ? 200 : 10}
                            step={item.content[device].typo.size.unit === 'px' ? 1 : 0.1}
                            value={item.content[device].typo.size.value}
                            onChange={(e, data) => handleChangeTypoSizeLh(e, data, 'size')}
                        />
                    </div>
                    <div className='field-group'>
                        <button
                            className={item.content[device].typo.size.unit === 'px' && 'selected'}
                            onClick={() => handleChangeTypoSizeLineHeightUnit('px', 'size')}
                            type='button'
                        >
                            PX
                        </button>
                        <button
                            className={item.content[device].typo.size.unit === 'em' && 'selected'}
                            onClick={() => handleChangeTypoSizeLineHeightUnit('em', 'size')}
                            type='button'
                        >
                            EM
                        </button>
                        <button
                            className={item.content[device].typo.size.unit === 'rem' && 'selected'}
                            onClick={() => handleChangeTypoSizeLineHeightUnit('rem', 'size')}
                            type='button'
                        >
                            REM
                        </button>
                        <button
                            className={item.content[device].typo.size.unit === 'vw' && 'selected'}
                            onClick={() => handleChangeTypoSizeLineHeightUnit('vw', 'size')}
                            type='button'
                        >
                            VW
                        </button>
                    </div>
                </div>
                <div className='form__inline_item'>
                    <div className='field'>
                        <div>
                            {intl.formatMessage({
                                id: 'builder.font.family',
                                defaultMessage: 'Font family',
                            })}
                        </div>
                        <Dropdown
                            name='family'
                            value={item.content[device].typo.family}
                            options={fontsOptions}
                            onChange={handleChangeTypo}
                        />
                    </div>
                    <div className='field'>
                        <div>
                            {intl.formatMessage({
                                id: 'builder.font.weight',
                                defaultMessage: 'Font weight',
                            })}
                        </div>
                        <Dropdown
                            name='weight'
                            value={item.content[device].typo.weight}
                            options={weightsOptions}
                            onChange={handleChangeTypo}
                        />
                    </div>
                </div>
                <div className='form__inline_item'>
                    <div className='field'>
                        <div>
                            {intl.formatMessage({
                                id: 'builder.transform',
                                defaultMessage: 'Transform',
                            })}
                        </div>
                        <Dropdown
                            name='transform'
                            value={item.content[device].typo.transform}
                            options={transformsOptions}
                            onChange={handleChangeTypo}
                        />
                    </div>
                    <div className='field'>
                        <div>
                            {intl.formatMessage({
                                id: 'builder.style',
                                defaultMessage: 'Style',
                            })}
                        </div>
                        <Dropdown
                            name='style'
                            value={item.content[device].typo.style}
                            options={stylesOptions}
                            onChange={handleChangeTypo}
                        />
                    </div>
                    <div className='field'>
                        <div>
                            {intl.formatMessage({
                                id: 'builder.decoration',
                                defaultMessage: 'Decoration',
                            })}
                        </div>
                        <Dropdown
                            name='decoration'
                            value={Array.from(item.content[device].typo.decoration)}
                            options={decorationsOptions}
                            onChange={handleChangeTypo}
                            multiple
                        />
                    </div>
                </div>
                <div className='form__inline_item'>
                    <div className='field'>
                        <Input
                            label={intl.formatMessage({
                            id: 'builder.lineHeight',
                            defaultMessage: 'Line height',
                        })}
                            placeholder='1'
                            name='value'
                            type='number'
                            min='1'
                            max={item.content[device].typo.lineHeight.unit === 'px' ? 100 : 10}
                            step={item.content[device].typo.lineHeight.unit === 'px' ? 1 : 0.1}
                            value={item.content[device].typo.lineHeight.value}
                            onChange={(e, data) => handleChangeTypoSizeLh(e, data, 'lineHeight')}
                        />
                    </div>
                    <div className='field-group'>
                        <button
                            className={item.content[device].typo.lineHeight.unit === 'px' && 'selected'}
                            onClick={() => handleChangeTypoSizeLineHeightUnit('px', 'lineHeight')}
                            type='button'
                        >
                            PX
                        </button>
                        <button
                            className={item.content[device].typo.lineHeight.unit === 'em' && 'selected'}
                            onClick={() => handleChangeTypoSizeLineHeightUnit('em', 'lineHeight')}
                            type='button'
                        >
                            EM
                        </button>
                    </div>
                </div>
                <div className='field'>
                    <Input
                        label={intl.formatMessage({
                        id: 'builder.letterSpacing',
                        defaultMessage: 'Letter spacing',
                    })}
                        placeholder='0'
                        name='letterSpacing'
                        type='number'
                        value={item.content[device].typo.letterSpacing}
                        onChange={handleChangeTypo}
                    />
                </div>
            </Accordion>
            <Accordion
                active={false}
                title={intl.formatMessage({
                    id: 'builder.advanced',
                    defaultMessage: 'Advanced',
                })}
            >
                <div className='field'>
                    <div className='form__inline_item'>
                        <div>
                            {intl.formatMessage({
                                id: 'builder.margin',
                                defaultMessage: 'Margin',
                            })}
                        </div>
                        <div className='field-group'>
                            <button
                                className={item.styles[device].margin.unit === 'px' && 'selected'}
                                onClick={() => handleChangeGeneralStyleUnit('px', 'margin')}
                                type='button'
                            >
                                PX
                            </button>
                            <button
                                className={item.styles[device].margin.unit === 'em' && 'selected'}
                                onClick={() => handleChangeGeneralStyleUnit('em', 'margin')}
                                type='button'
                            >
                                EM
                            </button>
                            <button
                                className={item.styles[device].margin.unit === '%' && 'selected'}
                                onClick={() => handleChangeGeneralStyleUnit('%', 'margin')}
                                type='button'
                            >
                                %
                            </button>
                            <button
                                className={item.styles[device].margin.unit === 'rem' && 'selected'}
                                onClick={() => handleChangeGeneralStyleUnit('rem', 'margin')}
                                type='button'
                            >
                                REM
                            </button>
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
                            value={item.styles[device].margin.top}
                            onChange={(e, data) => handleChangeGeneralStyle(e, data, 'margin')}
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
                            value={item.styles[device].margin.right}
                            onChange={(e, data) => handleChangeGeneralStyle(e, data, 'margin')}
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
                            value={item.styles[device].margin.bottom}
                            onChange={(e, data) => handleChangeGeneralStyle(e, data, 'margin')}
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
                            value={item.styles[device].margin.left}
                            onChange={(e, data) => handleChangeGeneralStyle(e, data, 'margin')}
                        />
                    </div>
                </div>
                <div className='field'>
                    <div className='form__inline_item'>
                        <div>
                            {intl.formatMessage({
                                id: 'builder.padding',
                                defaultMessage: 'Padding',
                            })}
                        </div>
                        <div className='field-group'>
                            <button
                                className={item.styles[device].padding.unit === 'px' && 'selected'}
                                onClick={() => handleChangeGeneralStyleUnit('px', 'padding')}
                                type='button'
                            >
                                PX
                            </button>
                            <button
                                className={item.styles[device].padding.unit === 'em' && 'selected'}
                                onClick={() => handleChangeGeneralStyleUnit('em', 'padding')}
                                type='button'
                            >
                                EM
                            </button>
                            <button
                                className={item.styles[device].padding.unit === '%' && 'selected'}
                                onClick={() => handleChangeGeneralStyleUnit('%', 'padding')}
                                type='button'
                            >
                                %
                            </button>
                            <button
                                className={item.styles[device].padding.unit === 'rem' && 'selected'}
                                onClick={() => handleChangeGeneralStyleUnit('rem', 'padding')}
                                type='button'
                            >
                                REM
                            </button>
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
                            value={item.styles[device].padding.top}
                            onChange={(e, data) => handleChangeGeneralStyle(e, data, 'padding')}
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
                            value={item.styles[device].padding.right}
                            onChange={(e, data) => handleChangeGeneralStyle(e, data, 'padding')}
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
                            value={item.styles[device].padding.bottom}
                            onChange={(e, data) => handleChangeGeneralStyle(e, data, 'padding')}
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
                            value={item.styles[device].padding.left}
                            onChange={(e, data) => handleChangeGeneralStyle(e, data, 'padding')}
                        />
                    </div>
                </div>
            </Accordion>
            <Accordion
                active={false}
                title={intl.formatMessage({
                    id: 'builder.background',
                    defaultMessage: 'Background',
                })}
            >
                <Tab
                    menu={{
                    secondary: true,
                    pointing: true,
                }}
                    panes={backgroundPanes}
                />
            </Accordion>
            <Accordion
                active={false}
                title={intl.formatMessage({
                    id: 'builder.border',
                    defaultMessage: 'Border',
                })}
            >
                <Tab
                    menu={{
                    secondary: true,
                    pointing: true,
                }}
                    panes={borderPanes}
                />
            </Accordion>
            <Accordion
                active={false}
                title={intl.formatMessage({
                    id: 'builder.animation',
                    defaultMessage: 'Animation',
                })}
            >
                <div className='field'>
                    <div>
                        {intl.formatMessage({
                            id: 'builder.animation.entrance',
                            defaultMessage: 'Entrance Animation',
                        })}
                    </div>
                    <Dropdown
                        name='name'
                        value={item.content[device].animation.name}
                        options={animationsOptions}
                        onChange={handleChangeAnimation}
                    />
                </div>
                <div className='field'>
                    <div>
                        {intl.formatMessage({
                            id: 'builder.duration',
                            defaultMessage: 'Duration',
                        })}
                    </div>
                    <Dropdown
                        name='duration'
                        value={item.content[device].animation.duration}
                        options={durationsOptions}
                        onChange={handleChangeAnimation}
                    />
                </div>
                <Input
                    label={
                    intl.formatMessage({
                        id: 'builder.animation.delay',
                        defaultMessage: 'Animation Delay (ms)',
                    })
                }
                    placeholder='0'
                    name='delay'
                    type='number'
                    value={item.content[device].animation.delay}
                    onChange={handleChangeAnimation}
                />
            </Accordion>
        </>
    );
}

Button.propTypes = {
    device: PropTypes.shape({
    }).isRequired,
    element: PropTypes.shape({
        content: PropTypes.shape({
            text: PropTypes.string.isRequired,
        }).isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
    onElementValueChange: PropTypes.func.isRequired,
};
