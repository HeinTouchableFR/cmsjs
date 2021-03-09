import React, {useEffect, useState} from 'react';
import {Dropdown, Form, Tab, Button} from 'semantic-ui-react';
import ColorPicker from 'components/ColorPicker/ColorPicker';
import Accordion from 'components/Accordion/Accordion';
import {
    alignmentsOptions, borderOptions, decorationsOptions,
    fontsOptions, stylesOptions,
    tagsOptions,
    transformsOptions,
    weightsOptions
} from 'variables/title';

export default function Title({element, onElementValueChange}) {
    const [item, setItem] = useState(element);
    const [device, setDevice] = useState('mobile')

    useEffect(
        function () {
            if (element.content.text && element.type === 'title') {
                setItem(element);
            }
        },
        [element]
    );

    const handleChange = function (e, data) {
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
    const handleChangeGeneralStyle = (e, data, key) => {
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
                }
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
                        left: 0
                    },
                }
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    }
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
                }
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };
    const handleChangeTypo = (e, data) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                [device]: {
                    ...item.content[device],
                    typo: {
                        ...item.content[device].typo,
                        [data.name]: data.value,
                    }
                }
            }
        };
        setItem(updated);
        onElementValueChange(updated);
    };
    const handleChangeTypoSizeLh = (e, data, key) => {
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
                            [data.name]: data.value
                        },
                    }
                }
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    }
    const handleChangeTypoSizeLineHeightUnit = (unit, key) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                typo: {
                    ...item.content.typo,
                    [key]: {
                        unit: unit,
                        value: unit === 'px' ? (key === 'size' ? '42' : '') : (key === 'size' ? '3' : '1')
                    },
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    }
    const handleChangeBorder = (e, data, key, mode) => {
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
                                }
                            }
                        }
                    },
                }
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
                                }
                            }
                        }
                    },
                }
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    }
    const handleChangeBorderType = (e, data, mode) => {
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
                                [data.name]: data.value
                            },
                        },
                    },
                }
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
                                color: color
                            },
                        },
                    },
                }
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };


    const borderPanes = [
        {
            menuItem: 'Normal',
            render: () => <div className={'accordion__pane'}>
                <div className='field'>
                    <label>Border Type</label>
                    <Dropdown fluid name='type' selection value={item.content[device].styles.border.normal.type}
                              options={borderOptions}
                              onChange={(e, data) => handleChangeBorderType(e, data, 'normal')}/>
                </div>
                <div className='field'>
                    <label>Border color</label>
                    <ColorPicker defaultColor={item.content[device].styles.border.normal.color}
                                 onColorChange={(color) => handleBorderColorChange(color, 'normal')}/>
                </div>
                <div className="field">
                    <label>Width</label>
                    <div className='form__inline_item bottom'>
                        <Form.Input fluid label='Top' placeholder='Top' name='top' type='number'
                                    value={item.content[device].styles.border.normal.width.top}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}/>
                        <Form.Input fluid label='Right' placeholder='Right' name='right' type='number'
                                    value={item.content[device].styles.border.normal.width.right}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}/>
                        <Form.Input fluid label='Bottom' placeholder='Bottom' name='bottom' type='number'
                                    value={item.content[device].styles.border.normal.width.bottom}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}/>
                        <Form.Input fluid label='Left' placeholder='Left' name='left' type='number'
                                    value={item.content[device].styles.border.normal.width.left}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}/>
                    </div>
                </div>
                <div className="field">
                    <div className="form__inline_item">
                        <label>Border Radius</label>
                        <div className="field-group">
                            <label className={item.content[device].styles.border.normal.radius.unit === 'px' ? 'selected' : undefined}
                                   onClick={() => handleChangeBorderRadiusUnit('px', 'normal')}>PX</label>
                            <label className={item.content[device].styles.border.normal.radius.unit === '%' ? 'selected' : undefined}
                                   onClick={() => handleChangeBorderRadiusUnit('%', 'normal')}>%</label>
                        </div>
                    </div>
                    <div className='form__inline_item bottom'>
                        <Form.Input fluid label='Top' placeholder='Top' name='top' type='number'
                                    value={item.content[device].styles.border.normal.radius.top}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'normal')}/>
                        <Form.Input fluid label='Right' placeholder='Right' name='right' type='number'
                                    value={item.content[device].styles.border.normal.radius.right}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'normal')}/>
                        <Form.Input fluid label='Bottom' placeholder='Bottom' name='bottom' type='number'
                                    value={item.content[device].styles.border.normal.radius.bottom}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'normal')}/>
                        <Form.Input fluid label='Left' placeholder='Left' name='left' type='number'
                                    value={item.content[device].styles.border.normal.radius.left}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'normal')}/>
                    </div>
                </div>
            </div>,
        },
        {
            menuItem: 'Hover',
            render: () => <div className={'accordion__pane'}>
                <div className='field'>
                    <label>Border Type</label>
                    <Dropdown fluid name='type' selection value={item.content[device].styles.border.hover.type}
                              options={borderOptions}
                              onChange={(e, data) => handleChangeBorderType(e, data, 'hover')}/>
                </div>
                <div className='field'>
                    <label>Border color</label>
                    <ColorPicker defaultColor={item.content[device].styles.border.hover.color}
                                 onColorChange={(color) => handleBorderColorChange(color, 'hover')}/>
                </div>
                <div className="field">
                    <label>Width</label>
                    <div className='form__inline_item bottom'>
                        <Form.Input fluid label='Top' placeholder='Top' name='top' type='number'
                                    value={item.content[device].styles.border.hover.width.top}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}/>
                        <Form.Input fluid label='Right' placeholder='Right' name='right' type='number'
                                    value={item.content[device].styles.border.hover.width.right}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}/>
                        <Form.Input fluid label='Bottom' placeholder='Bottom' name='bottom' type='number'
                                    value={item.content[device].styles.border.hover.width.bottom}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}/>
                        <Form.Input fluid label='Left' placeholder='Left' name='left' type='number'
                                    value={item.content[device].styles.border.hover.width.left}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}/>
                    </div>
                </div>
                <div className="field">
                    <div className="form__inline_item">
                        <label>Border Radius</label>
                        <div className="field-group">
                            <label className={item.content[device].styles.border.hover.radius.unit === 'px' ? 'selected' : undefined}
                                   onClick={() => handleChangeBorderRadiusUnit('px', 'hover')}>PX</label>
                            <label className={item.content[device].styles.border.hover.radius.unit === '%' ? 'selected' : undefined}
                                   onClick={() => handleChangeBorderRadiusUnit('%', 'hover')}>%</label>
                        </div>
                    </div>
                    <div className='form__inline_item bottom'>
                        <Form.Input fluid label='Top' placeholder='Top' name='top' type='number'
                                    value={item.content[device].styles.border.hover.radius.top}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'hover')}/>
                        <Form.Input fluid label='Right' placeholder='Right' name='right' type='number'
                                    value={item.content[device].styles.border.hover.radius.right}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'hover')}/>
                        <Form.Input fluid label='Bottom' placeholder='Bottom' name='bottom' type='number'
                                    value={item.content[device].styles.border.hover.radius.bottom}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'hover')}/>
                        <Form.Input fluid label='Left' placeholder='Left' name='left' type='number'
                                    value={item.content[device].styles.border.hover.radius.left}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'hover')}/>
                    </div>
                </div>
            </div>,
        },
    ]

    const backgroundPanes = [
        {
            menuItem: 'Normal',
            render: () => <div className={'accordion__pane'}>
                <ColorPicker defaultColor={item.content[device].styles.background.normal}
                             onColorChange={(color) => handleColorChange(color, 'background', 'normal', 'styles')}/>
            </div>,
        },
        {
            menuItem: 'Hover',
            render: () => <div className={'accordion__pane'}>
                <ColorPicker defaultColor={item.content[device].styles.background.hover}
                             onColorChange={(color) => handleColorChange(color, 'background', 'hover', 'styles')}/>
            </div>,
        },
    ]

    return (
        <>
            <Accordion active={true} title={'Title'}>
                <Form.Input fluid label='Title' placeholder='Title' name='text' type='text' value={item.content.text}
                            onChange={handleChange}/>
                <div className='field'>
                    <label>HTML Tag</label>
                    <Dropdown fluid name='tag' selection value={item.content.tag} options={tagsOptions}
                              onChange={handleChange}/>
                </div>
                <div className='field'>
                    <label>Alignment</label>
                    <Dropdown fluid name='alignment' selection value={item.content.alignment}
                              options={alignmentsOptions} onChange={handleChange}/>
                </div>
            </Accordion>
            <Accordion active={false} title={'Typography'}>
                <div className='form__inline_item'>
                    <div className='field'>
                        <label>Color</label>
                        <ColorPicker defaultColor={item.content[device].typo.color.normal}
                                     onColorChange={(color) => handleColorChange(color, 'color', 'normal', 'typo')}/>
                    </div>
                    <div className='field'>
                        <label>Color on Hover</label>
                        <ColorPicker defaultColor={item.content[device].typo.color.hover}
                                     onColorChange={(color) => handleColorChange(color, 'color', 'hover', 'typo')}/>
                    </div>
                </div>
                <div className="form__inline_item">
                    <div className='field'>
                        <Form.Input fluid label='Font Size' placeholder='16' name='value' type='number' min="1"
                                    max={item.content[device].typo.size.unit === 'px' ? 200 : 10}
                                    step={item.content[device].typo.size.unit === 'px' ? 1 : 0.1}
                                    value={item.content[device].typo.size.value}
                                    onChange={(e, data) => handleChangeTypoSizeLh(e, data, 'size')}/>
                    </div>
                    <div className="field-group">
                        <label className={item.content[device].typo.size.unit === 'px' ? 'selected' : undefined}
                               onClick={() => handleChangeTypoSizeLineHeightUnit('px', 'size')}>PX</label>
                        <label className={item.content[device].typo.size.unit === 'em' ? 'selected' : undefined}
                               onClick={() => handleChangeTypoSizeLineHeightUnit('em', 'size')}>EM</label>
                        <label className={item.content[device].typo.size.unit === 'rem' ? 'selected' : undefined}
                               onClick={() => handleChangeTypoSizeLineHeightUnit('rem', 'size')}>REM</label>
                        <label className={item.content[device].typo.size.unit === 'vw' ? 'selected' : undefined}
                               onClick={() => handleChangeTypoSizeLineHeightUnit('vw', 'size')}>VW</label>
                    </div>
                </div>
                <div className='form__inline_item'>
                    <div className='field'>
                        <label>Font Family</label>
                        <Dropdown fluid name='family' selection value={item.content[device].typo.family} options={fontsOptions}
                                  onChange={handleChangeTypo}/>
                    </div>

                    <div className='field'>
                        <label>Font Weight</label>
                        <Dropdown fluid name='weight' selection value={item.content[device].typo.weight}
                                  options={weightsOptions} onChange={handleChangeTypo}/>
                    </div>
                </div>
                <div className='form__inline_item'>
                    <div className='field'>
                        <label>Transform</label>
                        <Dropdown fluid name='transform' selection value={item.content[device].typo.transform}
                                  options={transformsOptions} onChange={handleChangeTypo}/>
                    </div>
                    <div className='field'>
                        <label>Style</label>
                        <Dropdown fluid name='style' selection value={item.content[device].typo.style} options={stylesOptions}
                                  onChange={handleChangeTypo}/>
                    </div>
                    <div className='field'>
                        <label>Decoration</label>
                        <Dropdown fluid name='decoration' selection value={item.content[device].typo.decoration}
                                  options={decorationsOptions} onChange={handleChangeTypo}/>
                    </div>
                </div>
                <div className="form__inline_item">
                    <div className='field'>
                        <Form.Input fluid label='Line Height' placeholder='1' name='value' type='number' min="1"
                                    max={item.content[device].typo.lineHeight.unit === 'px' ? 100 : 10}
                                    step={item.content[device].typo.lineHeight.unit === 'px' ? 1 : 0.1}
                                    value={item.content[device].typo.lineHeight.value}
                                    onChange={(e, data) => handleChangeTypoSizeLh(e, data, 'lineHeight')}/>
                    </div>
                    <div className="field-group">
                        <label className={item.content[device].typo.lineHeight.unit === 'px' ? 'selected' : undefined}
                               onClick={() => handleChangeTypoSizeLineHeightUnit('px', 'lineHeight')}>PX</label>
                        <label className={item.content[device].typo.lineHeight.unit === 'em' ? 'selected' : undefined}
                               onClick={() => handleChangeTypoSizeLineHeightUnit('em', 'lineHeight')}>EM</label>
                    </div>
                </div>
                <div className='field'>
                    <Form.Input fluid label='Letter Spacing' placeholder='0' name='letterSpacing' type='number'
                                value={item.content[device].typo.letterSpacing} onChange={handleChangeTypo}/>
                </div>
            </Accordion>
            <Accordion active={false} title={'Advanced'}>
                <div className='field'>
                    <div className="form__inline_item">
                        <label>Margin</label>
                        <div className="field-group">
                            <label className={item.styles[device].margin.unit === 'px' ? 'selected' : undefined}
                                   onClick={() => handleChangeGeneralStyleUnit('px', 'margin')}>PX</label>
                            <label className={item.styles[device].margin.unit === 'em' ? 'selected' : undefined}
                                   onClick={() => handleChangeGeneralStyleUnit('em', 'margin')}>EM</label>
                            <label className={item.styles[device].margin.unit === '%' ? 'selected' : undefined}
                                   onClick={() => handleChangeGeneralStyleUnit('%', 'margin')}>%</label>
                            <label className={item.styles[device].margin.unit === 'rem' ? 'selected' : undefined}
                                   onClick={() => handleChangeGeneralStyleUnit('rem', 'margin')}>REM</label>
                        </div>
                    </div>
                    <div className='form__inline_item bottom'>
                        <Form.Input fluid label='Top' placeholder='Top' name='top' type='number'
                                    value={item.styles[device].margin.top}
                                    onChange={(e, data) => handleChangeGeneralStyle(e, data, 'margin')}/>
                        <Form.Input fluid label='Right' placeholder='Right' name='right' type='number'
                                    value={item.styles[device].margin.right}
                                    onChange={(e, data) => handleChangeGeneralStyle(e, data, 'margin')}/>
                        <Form.Input fluid label='Bottom' placeholder='Bottom' name='bottom' type='number'
                                    value={item.styles[device].margin.bottom}
                                    onChange={(e, data) => handleChangeGeneralStyle(e, data, 'margin')}/>
                        <Form.Input fluid label='Left' placeholder='Left' name='left' type='number'
                                    value={item.styles[device].margin.left}
                                    onChange={(e, data) => handleChangeGeneralStyle(e, data, 'margin')}/>
                    </div>
                </div>
                <div className='field'>
                    <div className="form__inline_item">
                        <label>Padding</label>
                        <div className="field-group">
                            <label className={item.styles[device].padding.unit === 'px' ? 'selected' : undefined}
                                   onClick={() => handleChangeGeneralStyleUnit('px', 'padding')}>PX</label>
                            <label className={item.styles[device].padding.unit === 'em' ? 'selected' : undefined}
                                   onClick={() => handleChangeGeneralStyleUnit('em', 'padding')}>EM</label>
                            <label className={item.styles[device].padding.unit === '%' ? 'selected' : undefined}
                                   onClick={() => handleChangeGeneralStyleUnit('%', 'padding')}>%</label>
                            <label className={item.styles[device].padding.unit === 'rem' ? 'selected' : undefined}
                                   onClick={() => handleChangeGeneralStyleUnit('rem', 'padding')}>REM</label>
                        </div>
                    </div>
                    <div className='form__inline_item bottom'>
                        <Form.Input fluid label='Top' placeholder='Top' name='top' type='number'
                                    value={item.styles[device].padding.top}
                                    onChange={(e, data) => handleChangeGeneralStyle(e, data, 'padding')}/>
                        <Form.Input fluid label='Right' placeholder='Right' name='right' type='number'
                                    value={item.styles[device].padding.right}
                                    onChange={(e, data) => handleChangeGeneralStyle(e, data, 'padding')}/>
                        <Form.Input fluid label='Bottom' placeholder='Bottom' name='bottom' type='number'
                                    value={item.styles[device].padding.bottom}
                                    onChange={(e, data) => handleChangeGeneralStyle(e, data, 'padding')}/>
                        <Form.Input fluid label='Left' placeholder='Left' name='left' type='number'
                                    value={item.styles[device].padding.left}
                                    onChange={(e, data) => handleChangeGeneralStyle(e, data, 'padding')}/>
                    </div>
                </div>
            </Accordion>
            <Accordion active={false} title={'Background'}>
                <Tab menu={{secondary: true, pointing: true}} panes={backgroundPanes}/>
            </Accordion>
            <Accordion active={false} title={'Border'}>
                <Tab menu={{secondary: true, pointing: true}} panes={borderPanes}/>
            </Accordion>
        </>
    );
}
