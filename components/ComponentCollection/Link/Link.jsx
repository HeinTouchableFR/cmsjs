import React, { useEffect, useState } from 'react';
import { Dropdown, Form, Tab } from 'semantic-ui-react';
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

export default function Link({ element, onElementValueChange, device }) {
    const intl = useIntl();
    const [item, setItem] = useState(element);

    useEffect(
        function () {
            if (element.content.text && element.type === 'link') {
                setItem(element);
            }
        },
        [element]
    );

    const handleChange = function (_e, data) {
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
                        unit: unit,
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
        const updated = {
            ...item,
            content: {
                ...item.content,
                [device]: {
                    ...item.content[device],
                    typo: {
                        ...item.content[device].typo,
                        [key]: {
                            unit: unit,
                            value: unit === 'px' ? (key === 'size' ? '42' : '') : key === 'size' ? '3' : '1',
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
                                    unit: unit,
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
                                color: color,
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
            menuItem: intl.formatMessage({ id: 'builder.normal', defaultMessage: 'Normal' }),
            render: () => (
                <div className={'accordion__pane'}>
                    <div className='field'>
                        <label>{intl.formatMessage({ id: 'builder.border.type', defaultMessage: 'Border type' })}</label>
                        <Dropdown
                            fluid
                            name='type'
                            selection
                            value={item.content[device].styles.border.normal.type}
                            options={borderOptions}
                            onChange={(e, data) => handleChangeBorderType(e, data, 'normal')}
                        />
                    </div>
                    <div className='field'>
                        <label>{intl.formatMessage({ id: 'builder.color', defaultMessage: 'Color' })}</label>
                        <ColorPicker
                            defaultColor={item.content[device].styles.border.normal.color}
                            onColorChange={(color) => handleBorderColorChange(color, 'normal')}
                        />
                    </div>
                    <div className='field'>
                        <label>{intl.formatMessage({ id: 'builder.border.weight', defaultMessage: 'Border weight' })}</label>
                        <div className='form__inline_item bottom'>
                            <Form.Input
                                fluid
                                label={intl.formatMessage({ id: 'builder.top', defaultMessage: 'Top' })}
                                placeholder={intl.formatMessage({ id: 'builder.top', defaultMessage: 'Top' })}
                                name='top'
                                type='number'
                                value={item.content[device].styles.border.normal.width.top}
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}
                            />
                            <Form.Input
                                fluid
                                label={intl.formatMessage({ id: 'builder.right', defaultMessage: 'Right' })}
                                placeholder={intl.formatMessage({ id: 'builder.right', defaultMessage: 'Right' })}
                                name='right'
                                type='number'
                                value={item.content[device].styles.border.normal.width.right}
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}
                            />
                            <Form.Input
                                fluid
                                label={intl.formatMessage({ id: 'builder.bottom', defaultMessage: 'Bottom' })}
                                placeholder={intl.formatMessage({ id: 'builder.bottom', defaultMessage: 'Bottom' })}
                                name='bottom'
                                type='number'
                                value={item.content[device].styles.border.normal.width.bottom}
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}
                            />
                            <Form.Input
                                fluid
                                label={intl.formatMessage({ id: 'builder.left', defaultMessage: 'Left' })}
                                placeholder={intl.formatMessage({ id: 'builder.left', defaultMessage: 'Left' })}
                                name='left'
                                type='number'
                                value={item.content[device].styles.border.normal.width.left}
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}
                            />
                        </div>
                    </div>
                    <div className='field'>
                        <div className='form__inline_item'>
                            <label>{intl.formatMessage({ id: 'builder.border.radius', defaultMessage: 'Border radius' })}</label>
                            <div className='field-group'>
                                <label
                                    className={item.content[device].styles.border.normal.radius.unit === 'px' ? 'selected' : undefined}
                                    onClick={() => handleChangeBorderRadiusUnit('px', 'normal')}
                                >
                                    PX
                                </label>
                                <label
                                    className={item.content[device].styles.border.normal.radius.unit === '%' ? 'selected' : undefined}
                                    onClick={() => handleChangeBorderRadiusUnit('%', 'normal')}
                                >
                                    %
                                </label>
                            </div>
                        </div>
                        <div className='form__inline_item bottom'>
                            <Form.Input
                                fluid
                                label={intl.formatMessage({ id: 'builder.top', defaultMessage: 'Top' })}
                                placeholder={intl.formatMessage({ id: 'builder.top', defaultMessage: 'Top' })}
                                name='top'
                                type='number'
                                value={item.content[device].styles.border.normal.radius.top}
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'normal')}
                            />
                            <Form.Input
                                fluid
                                label={intl.formatMessage({ id: 'builder.right', defaultMessage: 'Right' })}
                                placeholder={intl.formatMessage({ id: 'builder.right', defaultMessage: 'Right' })}
                                name='right'
                                type='number'
                                value={item.content[device].styles.border.normal.radius.right}
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'normal')}
                            />
                            <Form.Input
                                fluid
                                label={intl.formatMessage({ id: 'builder.bottom', defaultMessage: 'Bottom' })}
                                placeholder={intl.formatMessage({ id: 'builder.bottom', defaultMessage: 'Bottom' })}
                                name='bottom'
                                type='number'
                                value={item.content[device].styles.border.normal.radius.bottom}
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'normal')}
                            />
                            <Form.Input
                                fluid
                                label={intl.formatMessage({ id: 'builder.left', defaultMessage: 'Left' })}
                                placeholder={intl.formatMessage({ id: 'builder.left', defaultMessage: 'Left' })}
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
            menuItem: intl.formatMessage({ id: 'builder.hover', defaultMessage: 'Hover' }),
            render: () => (
                <div className={'accordion__pane'}>
                    <div className='field'>
                        <label>{intl.formatMessage({ id: 'builder.border.type', defaultMessage: 'Border type' })}</label>
                        <Dropdown
                            fluid
                            name='type'
                            selection
                            value={item.content[device].styles.border.hover.type}
                            options={borderOptions}
                            onChange={(e, data) => handleChangeBorderType(e, data, 'hover')}
                        />
                    </div>
                    <div className='field'>
                        <label>{intl.formatMessage({ id: 'builder.color', defaultMessage: 'Color' })}</label>
                        <ColorPicker
                            defaultColor={item.content[device].styles.border.hover.color}
                            onColorChange={(color) => handleBorderColorChange(color, 'hover')}
                        />
                    </div>
                    <div className='field'>
                        <label>{intl.formatMessage({ id: 'builder.border.weight', defaultMessage: 'Border weight' })}</label>
                        <div className='form__inline_item bottom'>
                            <Form.Input
                                fluid
                                label={intl.formatMessage({ id: 'builder.top', defaultMessage: 'Top' })}
                                placeholder={intl.formatMessage({ id: 'builder.top', defaultMessage: 'Top' })}
                                name='top'
                                type='number'
                                value={item.content[device].styles.border.hover.width.top}
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}
                            />
                            <Form.Input
                                fluid
                                label={intl.formatMessage({ id: 'builder.right', defaultMessage: 'Right' })}
                                placeholder={intl.formatMessage({ id: 'builder.right', defaultMessage: 'Right' })}
                                name='right'
                                type='number'
                                value={item.content[device].styles.border.hover.width.right}
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}
                            />
                            <Form.Input
                                fluid
                                label={intl.formatMessage({ id: 'builder.bottom', defaultMessage: 'Bottom' })}
                                placeholder={intl.formatMessage({ id: 'builder.bottom', defaultMessage: 'Bottom' })}
                                name='bottom'
                                type='number'
                                value={item.content[device].styles.border.hover.width.bottom}
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}
                            />
                            <Form.Input
                                fluid
                                label={intl.formatMessage({ id: 'builder.left', defaultMessage: 'Left' })}
                                placeholder={intl.formatMessage({ id: 'builder.left', defaultMessage: 'Left' })}
                                name='left'
                                type='number'
                                value={item.content[device].styles.border.hover.width.left}
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}
                            />
                        </div>
                    </div>
                    <div className='field'>
                        <div className='form__inline_item'>
                            <label>{intl.formatMessage({ id: 'builder.border.radius', defaultMessage: 'Border radius' })}</label>
                            <div className='field-group'>
                                <label
                                    className={item.content[device].styles.border.hover.radius.unit === 'px' ? 'selected' : undefined}
                                    onClick={() => handleChangeBorderRadiusUnit('px', 'hover')}
                                >
                                    PX
                                </label>
                                <label
                                    className={item.content[device].styles.border.hover.radius.unit === '%' ? 'selected' : undefined}
                                    onClick={() => handleChangeBorderRadiusUnit('%', 'hover')}
                                >
                                    %
                                </label>
                            </div>
                        </div>
                        <div className='form__inline_item bottom'>
                            <Form.Input
                                fluid
                                label={intl.formatMessage({ id: 'builder.top', defaultMessage: 'Top' })}
                                placeholder={intl.formatMessage({ id: 'builder.top', defaultMessage: 'Top' })}
                                name='top'
                                type='number'
                                value={item.content[device].styles.border.hover.radius.top}
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'hover')}
                            />
                            <Form.Input
                                fluid
                                label={intl.formatMessage({ id: 'builder.right', defaultMessage: 'Right' })}
                                placeholder={intl.formatMessage({ id: 'builder.right', defaultMessage: 'Right' })}
                                name='right'
                                type='number'
                                value={item.content[device].styles.border.hover.radius.right}
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'hover')}
                            />
                            <Form.Input
                                fluid
                                label={intl.formatMessage({ id: 'builder.bottom', defaultMessage: 'Bottom' })}
                                placeholder={intl.formatMessage({ id: 'builder.bottom', defaultMessage: 'Bottom' })}
                                name='bottom'
                                type='number'
                                value={item.content[device].styles.border.hover.radius.bottom}
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'hover')}
                            />
                            <Form.Input
                                fluid
                                label={intl.formatMessage({ id: 'builder.left', defaultMessage: 'Left' })}
                                placeholder={intl.formatMessage({ id: 'builder.left', defaultMessage: 'Left' })}
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
            menuItem: intl.formatMessage({ id: 'builder.normal', defaultMessage: 'Normal' }),
            render: () => (
                <div className={'accordion__pane'}>
                    <ColorPicker
                        defaultColor={item.content[device].styles.background.normal}
                        onColorChange={(color) => handleColorChange(color, 'background', 'normal', 'styles')}
                    />
                </div>
            ),
        },
        {
            menuItem: intl.formatMessage({ id: 'builder.hover', defaultMessage: 'Hover' }),
            render: () => (
                <div className={'accordion__pane'}>
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
            <Accordion active={true} title={intl.formatMessage({ id: item.type, defaultMessage: item.type })}>
                <Form.Input
                    fluid
                    label={intl.formatMessage({ id: item.type, defaultMessage: item.type })}
                    placeholder={intl.formatMessage({ id: item.type, defaultMessage: item.type })}
                    name='text'
                    type='text'
                    value={item.content.text}
                    onChange={handleChange}
                />
                <Form.Input
                    fluid
                    label={intl.formatMessage({ id: 'url', defaultMessage: 'url' })}
                    placeholder={intl.formatMessage({ id: 'url', defaultMessage: 'url' })}
                    name='url'
                    type='url'
                    value={item.content.url}
                    onChange={handleChange}
                />
                <div className='field'>
                    <label>{intl.formatMessage({ id: 'builder.alignment', defaultMessage: 'Alignment' })}</label>
                    <Dropdown fluid name='alignment' selection value={item.content.alignment} options={alignmentsOptions} onChange={handleChange} />
                </div>
            </Accordion>
            <Accordion active={false} title={intl.formatMessage({ id: 'builder.typography', defaultMessage: 'Typography' })}>
                <div className='form__inline_item'>
                    <div className='field'>
                        <label>{intl.formatMessage({ id: 'builder.color', defaultMessage: 'Color' })}</label>
                        <ColorPicker
                            defaultColor={item.content[device].typo.color.normal}
                            onColorChange={(color) => handleColorChange(color, 'color', 'normal', 'typo')}
                        />
                    </div>
                    <div className='field'>
                        <label>{intl.formatMessage({ id: 'builder.color.hover', defaultMessage: 'Color on hover' })}</label>
                        <ColorPicker
                            defaultColor={item.content[device].typo.color.hover}
                            onColorChange={(color) => handleColorChange(color, 'color', 'hover', 'typo')}
                        />
                    </div>
                </div>
                <div className='form__inline_item'>
                    <div className='field'>
                        <Form.Input
                            fluid
                            label={intl.formatMessage({ id: 'builder.font.size', defaultMessage: 'Font size' })}
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
                        <label
                            className={item.content[device].typo.size.unit === 'px' ? 'selected' : undefined}
                            onClick={() => handleChangeTypoSizeLineHeightUnit('px', 'size')}
                        >
                            PX
                        </label>
                        <label
                            className={item.content[device].typo.size.unit === 'em' ? 'selected' : undefined}
                            onClick={() => handleChangeTypoSizeLineHeightUnit('em', 'size')}
                        >
                            EM
                        </label>
                        <label
                            className={item.content[device].typo.size.unit === 'rem' ? 'selected' : undefined}
                            onClick={() => handleChangeTypoSizeLineHeightUnit('rem', 'size')}
                        >
                            REM
                        </label>
                        <label
                            className={item.content[device].typo.size.unit === 'vw' ? 'selected' : undefined}
                            onClick={() => handleChangeTypoSizeLineHeightUnit('vw', 'size')}
                        >
                            VW
                        </label>
                    </div>
                </div>
                <div className='form__inline_item'>
                    <div className='field'>
                        <label>{intl.formatMessage({ id: 'builder.font.family', defaultMessage: 'Font family' })}</label>
                        <Dropdown
                            fluid
                            name='family'
                            selection
                            value={item.content[device].typo.family}
                            options={fontsOptions}
                            onChange={handleChangeTypo}
                        />
                    </div>

                    <div className='field'>
                        <label>{intl.formatMessage({ id: 'builder.font.weight', defaultMessage: 'Font weight' })}</label>
                        <Dropdown
                            fluid
                            name='weight'
                            selection
                            value={item.content[device].typo.weight}
                            options={weightsOptions}
                            onChange={handleChangeTypo}
                        />
                    </div>
                </div>
                <div className='form__inline_item'>
                    <div className='field'>
                        <label>{intl.formatMessage({ id: 'builder.transform', defaultMessage: 'Transform' })}</label>
                        <Dropdown
                            fluid
                            name='transform'
                            selection
                            value={item.content[device].typo.transform}
                            options={transformsOptions}
                            onChange={handleChangeTypo}
                        />
                    </div>
                    <div className='field'>
                        <label>{intl.formatMessage({ id: 'builder.style', defaultMessage: 'Style' })}</label>
                        <Dropdown
                            fluid
                            name='style'
                            selection
                            value={item.content[device].typo.style}
                            options={stylesOptions}
                            onChange={handleChangeTypo}
                        />
                    </div>
                    <div className='field'>
                        <label>{intl.formatMessage({ id: 'builder.decoration', defaultMessage: 'Decoration' })}</label>
                        <Dropdown
                            fluid
                            name='decoration'
                            selection
                            value={Array.from(item.content[device].typo.decoration)}
                            options={decorationsOptions}
                            onChange={handleChangeTypo}
                            multiple
                        />
                    </div>
                </div>
                <div className='form__inline_item'>
                    <div className='field'>
                        <Form.Input
                            fluid
                            label={intl.formatMessage({ id: 'builder.lineHeight', defaultMessage: 'Line height' })}
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
                        <label
                            className={item.content[device].typo.lineHeight.unit === 'px' ? 'selected' : undefined}
                            onClick={() => handleChangeTypoSizeLineHeightUnit('px', 'lineHeight')}
                        >
                            PX
                        </label>
                        <label
                            className={item.content[device].typo.lineHeight.unit === 'em' ? 'selected' : undefined}
                            onClick={() => handleChangeTypoSizeLineHeightUnit('em', 'lineHeight')}
                        >
                            EM
                        </label>
                    </div>
                </div>
                <div className='field'>
                    <Form.Input
                        fluid
                        label={intl.formatMessage({ id: 'builder.letterSpacing', defaultMessage: 'Letter spacing' })}
                        placeholder='0'
                        name='letterSpacing'
                        type='number'
                        value={item.content[device].typo.letterSpacing}
                        onChange={handleChangeTypo}
                    />
                </div>
            </Accordion>
            <Accordion active={false} title={intl.formatMessage({ id: 'builder.advanced', defaultMessage: 'Advanced' })}>
                <div className='field'>
                    <div className='form__inline_item'>
                        <label>{intl.formatMessage({ id: 'builder.margin', defaultMessage: 'Margin' })}</label>
                        <div className='field-group'>
                            <label
                                className={item.styles[device].margin.unit === 'px' ? 'selected' : undefined}
                                onClick={() => handleChangeGeneralStyleUnit('px', 'margin')}
                            >
                                PX
                            </label>
                            <label
                                className={item.styles[device].margin.unit === 'em' ? 'selected' : undefined}
                                onClick={() => handleChangeGeneralStyleUnit('em', 'margin')}
                            >
                                EM
                            </label>
                            <label
                                className={item.styles[device].margin.unit === '%' ? 'selected' : undefined}
                                onClick={() => handleChangeGeneralStyleUnit('%', 'margin')}
                            >
                                %
                            </label>
                            <label
                                className={item.styles[device].margin.unit === 'rem' ? 'selected' : undefined}
                                onClick={() => handleChangeGeneralStyleUnit('rem', 'margin')}
                            >
                                REM
                            </label>
                        </div>
                    </div>
                    <div className='form__inline_item bottom'>
                        <Form.Input
                            fluid
                            label={intl.formatMessage({ id: 'builder.top', defaultMessage: 'Top' })}
                            placeholder={intl.formatMessage({ id: 'builder.top', defaultMessage: 'Top' })}
                            name='top'
                            type='number'
                            value={item.styles[device].margin.top}
                            onChange={(e, data) => handleChangeGeneralStyle(e, data, 'margin')}
                        />
                        <Form.Input
                            fluid
                            label={intl.formatMessage({ id: 'builder.right', defaultMessage: 'Right' })}
                            placeholder={intl.formatMessage({ id: 'builder.right', defaultMessage: 'Right' })}
                            name='right'
                            type='number'
                            value={item.styles[device].margin.right}
                            onChange={(e, data) => handleChangeGeneralStyle(e, data, 'margin')}
                        />
                        <Form.Input
                            fluid
                            label={intl.formatMessage({ id: 'builder.bottom', defaultMessage: 'Bottom' })}
                            placeholder={intl.formatMessage({ id: 'builder.bottom', defaultMessage: 'Bottom' })}
                            name='bottom'
                            type='number'
                            value={item.styles[device].margin.bottom}
                            onChange={(e, data) => handleChangeGeneralStyle(e, data, 'margin')}
                        />
                        <Form.Input
                            fluid
                            label={intl.formatMessage({ id: 'builder.left', defaultMessage: 'Left' })}
                            placeholder={intl.formatMessage({ id: 'builder.left', defaultMessage: 'Left' })}
                            name='left'
                            type='number'
                            value={item.styles[device].margin.left}
                            onChange={(e, data) => handleChangeGeneralStyle(e, data, 'margin')}
                        />
                    </div>
                </div>
                <div className='field'>
                    <div className='form__inline_item'>
                        <label>{intl.formatMessage({ id: 'builder.padding', defaultMessage: 'Padding' })}</label>
                        <div className='field-group'>
                            <label
                                className={item.styles[device].padding.unit === 'px' ? 'selected' : undefined}
                                onClick={() => handleChangeGeneralStyleUnit('px', 'padding')}
                            >
                                PX
                            </label>
                            <label
                                className={item.styles[device].padding.unit === 'em' ? 'selected' : undefined}
                                onClick={() => handleChangeGeneralStyleUnit('em', 'padding')}
                            >
                                EM
                            </label>
                            <label
                                className={item.styles[device].padding.unit === '%' ? 'selected' : undefined}
                                onClick={() => handleChangeGeneralStyleUnit('%', 'padding')}
                            >
                                %
                            </label>
                            <label
                                className={item.styles[device].padding.unit === 'rem' ? 'selected' : undefined}
                                onClick={() => handleChangeGeneralStyleUnit('rem', 'padding')}
                            >
                                REM
                            </label>
                        </div>
                    </div>
                    <div className='form__inline_item bottom'>
                        <Form.Input
                            fluid
                            label={intl.formatMessage({ id: 'builder.top', defaultMessage: 'Top' })}
                            placeholder={intl.formatMessage({ id: 'builder.top', defaultMessage: 'Top' })}
                            name='top'
                            type='number'
                            value={item.styles[device].padding.top}
                            onChange={(e, data) => handleChangeGeneralStyle(e, data, 'padding')}
                        />
                        <Form.Input
                            fluid
                            label={intl.formatMessage({ id: 'builder.right', defaultMessage: 'Right' })}
                            placeholder={intl.formatMessage({ id: 'builder.right', defaultMessage: 'Right' })}
                            name='right'
                            type='number'
                            value={item.styles[device].padding.right}
                            onChange={(e, data) => handleChangeGeneralStyle(e, data, 'padding')}
                        />
                        <Form.Input
                            fluid
                            label={intl.formatMessage({ id: 'builder.bottom', defaultMessage: 'Bottom' })}
                            placeholder={intl.formatMessage({ id: 'builder.bottom', defaultMessage: 'Bottom' })}
                            name='bottom'
                            type='number'
                            value={item.styles[device].padding.bottom}
                            onChange={(e, data) => handleChangeGeneralStyle(e, data, 'padding')}
                        />
                        <Form.Input
                            fluid
                            label={intl.formatMessage({ id: 'builder.left', defaultMessage: 'Left' })}
                            placeholder={intl.formatMessage({ id: 'builder.left', defaultMessage: 'Left' })}
                            name='left'
                            type='number'
                            value={item.styles[device].padding.left}
                            onChange={(e, data) => handleChangeGeneralStyle(e, data, 'padding')}
                        />
                    </div>
                </div>
            </Accordion>
            <Accordion active={false} title={intl.formatMessage({ id: 'builder.background', defaultMessage: 'Background' })}>
                <Tab menu={{ secondary: true, pointing: true }} panes={backgroundPanes} />
            </Accordion>
            <Accordion active={false} title={intl.formatMessage({ id: 'builder.border', defaultMessage: 'Border' })}>
                <Tab menu={{ secondary: true, pointing: true }} panes={borderPanes} />
            </Accordion>
            <Accordion active={false} title={intl.formatMessage({ id: 'builder.animation', defaultMessage: 'Animation' })}>
                <div className='field'>
                    <label>{intl.formatMessage({ id: 'builder.animation.entrance', defaultMessage: 'Entrance Animation' })}</label>
                    <Dropdown
                        fluid
                        name='name'
                        selection
                        search
                        value={item.content[device].animation.name}
                        options={animationsOptions}
                        onChange={handleChangeAnimation}
                    />
                </div>
                <div className='field'>
                    <label>{intl.formatMessage({ id: 'builder.duration', defaultMessage: 'Duration' })}</label>
                    <Dropdown
                        fluid
                        name='duration'
                        selection
                        value={item.content[device].animation.duration}
                        options={durationsOptions}
                        onChange={handleChangeAnimation}
                    />
                </div>
                <Form.Input
                    fluid
                    label={intl.formatMessage({ id: 'builder.animation.delay', defaultMessage: 'Animation Delay (ms)' })}
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
