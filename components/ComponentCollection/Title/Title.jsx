import React, {useEffect, useState} from 'react';
import {Dropdown, Form, Tab} from 'semantic-ui-react';
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
                [key]: {
                    ...item.styles[key],
                    [data.name]: data.value,
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };
    const handleColorChange = (color, key, mode) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                styles: {
                    ...item.content.styles,
                    [key]: {
                        ...item.content.styles[key],
                        [mode]: color,
                    },
                },
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
                typo: {
                    ...item.content.typo,
                    [data.name]: data.value,
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };
    const handleChangeBorder = (e, data, key, mode) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                styles: {
                    ...item.content.styles,
                    border: {
                        ...item.content.styles.border,
                        [mode]: {
                            ...item.content.styles.border[mode],
                            [key]: {
                                ...item.content.styles.border[mode][key],
                                [data.name]: data.value,
                            }
                        }
                    }
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };
    const handleChangeBorderType = (e, data, mode) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                styles: {
                    ...item.content.styles,
                    border: {
                        ...item.content.styles.border,
                        [mode]: {
                            ...item.content.styles.border[mode],
                            [data.name]: data.value
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
                styles: {
                    ...item.content.styles,
                    border: {
                        ...item.content.styles.border,
                        [mode]: {
                            ...item.content.styles.border[mode],
                            color: color
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
            menuItem: 'Normal',
            render: () => <div className={'accordion__pane'}>
                <div className='field'>
                    <label>Border Type</label>
                    <Dropdown fluid name='type' selection value={item.content.styles.border.normal.type}
                              options={borderOptions}
                              onChange={(e, data) => handleChangeBorderType(e, data, 'normal')}/>
                </div>
                <div className='field'>
                    <label>Border color</label>
                    <ColorPicker defaultColor={item.content.styles.border.normal.color}
                                 onColorChange={(color) => handleBorderColorChange(color, 'normal')}/>
                </div>
                <div className="field">
                    <label>Width</label>
                    <div className='form__inline_item bottom'>
                        <Form.Input fluid label='Top' placeholder='Top' name='top' type='number'
                                    value={item.content.styles.border.normal.width.top}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}/>
                        <Form.Input fluid label='Right' placeholder='Right' name='right' type='number'
                                    value={item.content.styles.border.normal.width.right}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}/>
                        <Form.Input fluid label='Bottom' placeholder='Bottom' name='bottom' type='number'
                                    value={item.content.styles.border.normal.width.bottom}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}/>
                        <Form.Input fluid label='Left' placeholder='Left' name='left' type='number'
                                    value={item.content.styles.border.normal.width.left}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}/>
                    </div>
                </div>
                <div className="field">
                    <label>Border Radius</label>
                    <div className='form__inline_item bottom'>
                        <Form.Input fluid label='Top' placeholder='Top' name='top' type='number'
                                    value={item.content.styles.border.normal.radius.top}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'normal')}/>
                        <Form.Input fluid label='Right' placeholder='Right' name='right' type='number'
                                    value={item.content.styles.border.normal.radius.right}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'normal')}/>
                        <Form.Input fluid label='Bottom' placeholder='Bottom' name='bottom' type='number'
                                    value={item.content.styles.border.normal.radius.bottom}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'normal')}/>
                        <Form.Input fluid label='Left' placeholder='Left' name='left' type='number'
                                    value={item.content.styles.border.normal.radius.left}
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
                    <Dropdown fluid name='type' selection value={item.content.styles.border.hover.type}
                              options={borderOptions}
                              onChange={(e, data) => handleChangeBorderType(e, data, 'hover')}/>
                </div>
                <div className='field'>
                    <label>Border color</label>
                    <ColorPicker defaultColor={item.content.styles.border.hover.color}
                                 onColorChange={(color) => handleBorderColorChange(color, 'hover')}/>
                </div>
                <div className="field">
                    <label>Width</label>
                    <div className='form__inline_item bottom'>
                        <Form.Input fluid label='Top' placeholder='Top' name='top' type='number'
                                    value={item.content.styles.border.hover.width.top}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}/>
                        <Form.Input fluid label='Right' placeholder='Right' name='right' type='number'
                                    value={item.content.styles.border.hover.width.right}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}/>
                        <Form.Input fluid label='Bottom' placeholder='Bottom' name='bottom' type='number'
                                    value={item.content.styles.border.hover.width.bottom}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}/>
                        <Form.Input fluid label='Left' placeholder='Left' name='left' type='number'
                                    value={item.content.styles.border.hover.width.left}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}/>
                    </div>
                </div>
                <div className="field">
                    <label>Border Radius</label>
                    <div className='form__inline_item bottom'>
                        <Form.Input fluid label='Top' placeholder='Top' name='top' type='number'
                                    value={item.content.styles.border.hover.radius.top}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'hover')}/>
                        <Form.Input fluid label='Right' placeholder='Right' name='right' type='number'
                                    value={item.content.styles.border.hover.radius.right}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'hover')}/>
                        <Form.Input fluid label='Bottom' placeholder='Bottom' name='bottom' type='number'
                                    value={item.content.styles.border.hover.radius.bottom}
                                    onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'hover')}/>
                        <Form.Input fluid label='Left' placeholder='Left' name='left' type='number'
                                    value={item.content.styles.border.hover.radius.left}
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
                <ColorPicker defaultColor={item.content.styles.background.normal}
                             onColorChange={(color) => handleColorChange(color, 'background', 'normal')}/>
            </div>,
        },
        {
            menuItem: 'Hover',
            render: () => <div className={'accordion__pane'}>
                <ColorPicker defaultColor={item.content.styles.background.hover}
                             onColorChange={(color) => handleColorChange(color, 'background', 'hover')}/>
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
                        <ColorPicker defaultColor={item.content.styles.color.normal}
                                     onColorChange={(color) => handleColorChange(color, 'color', 'normal')}/>
                    </div>
                    <div className='field'>
                        <label>Color on Hover</label>
                        <ColorPicker defaultColor={item.content.styles.color.hover}
                                     onColorChange={(color) => handleColorChange(color, 'color', 'hover')}/>
                    </div>
                </div>
                <div className='form__inline_item'>
                    <div className='field'>
                        <label>Font Family</label>
                        <Dropdown fluid name='family' selection value={item.content.typo.family} options={fontsOptions}
                                  onChange={handleChangeTypo}/>
                    </div>
                    <div className='field'>
                        <Form.Input fluid label='Font Size' placeholder='16' name='size' type='number'
                                    value={item.content.typo.size} onChange={handleChangeTypo}/>
                    </div>
                    <div className='field'>
                        <label>Font Weight</label>
                        <Dropdown fluid name='weight' selection value={item.content.typo.weight}
                                  options={weightsOptions} onChange={handleChangeTypo}/>
                    </div>
                </div>
                <div className='form__inline_item'>
                    <div className='field'>
                        <label>Transform</label>
                        <Dropdown fluid name='transform' selection value={item.content.typo.transform}
                                  options={transformsOptions} onChange={handleChangeTypo}/>
                    </div>
                    <div className='field'>
                        <label>Style</label>
                        <Dropdown fluid name='style' selection value={item.content.typo.style} options={stylesOptions}
                                  onChange={handleChangeTypo}/>
                    </div>
                    <div className='field'>
                        <label>Decoration</label>
                        <Dropdown fluid name='decoration' selection value={item.content.typo.decoration}
                                  options={decorationsOptions} onChange={handleChangeTypo}/>
                    </div>
                </div>
                <div className='form__inline_item'>
                    <div className='field'>
                        <Form.Input fluid label='Line Height' placeholder='1' name='lineHeight' type='number'
                                    value={item.content.typo.lineHeight} onChange={handleChangeTypo}/>
                    </div>
                    <div className='field'>
                        <Form.Input fluid label='Letter Spacing' placeholder='0' name='letterSpacing' type='number'
                                    value={item.content.typo.letterSpacing} onChange={handleChangeTypo}/>
                    </div>
                </div>
            </Accordion>
            <Accordion active={false} title={'Advanced'}>
                <div className='field'>
                    <label>Margin</label>
                    <div className='form__inline_item bottom'>
                        <Form.Input fluid label='Top' placeholder='Top' name='top' type='number'
                                    value={item.styles.margin.top}
                                    onChange={(e, data) => handleChangeGeneralStyle(e, data, 'margin')}/>
                        <Form.Input fluid label='Right' placeholder='Right' name='right' type='number'
                                    value={item.styles.margin.right}
                                    onChange={(e, data) => handleChangeGeneralStyle(e, data, 'margin')}/>
                        <Form.Input fluid label='Bottom' placeholder='Bottom' name='bottom' type='number'
                                    value={item.styles.margin.bottom}
                                    onChange={(e, data) => handleChangeGeneralStyle(e, data, 'margin')}/>
                        <Form.Input fluid label='Left' placeholder='Left' name='left' type='number'
                                    value={item.styles.margin.left}
                                    onChange={(e, data) => handleChangeGeneralStyle(e, data, 'margin')}/>
                    </div>
                </div>
                <div className='field'>
                    <label>Padding</label>
                    <div className='form__inline_item bottom'>
                        <Form.Input fluid label='Top' placeholder='Top' name='top' type='number'
                                    value={item.styles.padding.top}
                                    onChange={(e, data) => handleChangeGeneralStyle(e, data, 'padding')}/>
                        <Form.Input fluid label='Right' placeholder='Right' name='right' type='number'
                                    value={item.styles.padding.right}
                                    onChange={(e, data) => handleChangeGeneralStyle(e, data, 'padding')}/>
                        <Form.Input fluid label='Bottom' placeholder='Bottom' name='bottom' type='number'
                                    value={item.styles.padding.bottom}
                                    onChange={(e, data) => handleChangeGeneralStyle(e, data, 'padding')}/>
                        <Form.Input fluid label='Left' placeholder='Left' name='left' type='number'
                                    value={item.styles.padding.left}
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
