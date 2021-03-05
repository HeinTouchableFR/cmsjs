import React, { useEffect, useState } from 'react';
import { Dropdown, Form } from 'semantic-ui-react';
import ColorPicker from 'components/ColorPicker/ColorPicker';
import { css } from '@emotion/react';

export default function Title({ element, onElementValeurChange }) {
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
        onElementValeurChange(updated);
    };

    const handleChangeMargin = (e, data) => {
        const updated = {
            ...item,
            styles: {
                ...item.styles,
                margin: {
                    ...item.styles.margin,
                    [data.name]: data.value,
                },
            },
        };
        setItem(updated);
        onElementValeurChange(updated);
    };

    const handleChangePadding = (e, data) => {
        const updated = {
            ...item,
            styles: {
                ...item.styles,
                padding: {
                    ...item.styles.padding,
                    [data.name]: data.value,
                },
            },
        };
        setItem(updated);
        onElementValeurChange(updated);
    };

    const handleColorChange = (color) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                styles: {
                    ...item.content.styles,
                    color: {
                        ...item.content.styles.color,
                        normal: color,
                    },
                },
            },
        };
        setItem(updated);
        onElementValeurChange(updated);
    };
    const handleColorHoverChange = (color) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                styles: {
                    ...item.content.styles,
                    color: {
                        ...item.content.styles.color,
                        hover: color,
                    },
                },
            },
        };
        setItem(updated);
        onElementValeurChange(updated);
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
        onElementValeurChange(updated);
    };

    const tagsOptions = [
        { key: 'H1', text: 'H1', value: 'h1' },
        { key: 'H2', text: 'H2', value: 'h2' },
        { key: 'H3', text: 'H3', value: 'h3' },
        { key: 'H4', text: 'H4', value: 'h4' },
        { key: 'H5', text: 'H5', value: 'h5' },
        {
            key: 'H6',
            text: 'H6',
            value: 'h6',
        },
    ];

    const alignmentsOptions = [
        { key: 'Left', text: 'Left', value: 'left' },
        { key: 'Center', text: 'Center', value: 'center' },
        { key: 'Right', text: 'Right', value: 'right' },
        { key: 'Justified', text: 'Justified', value: 'justify' },
    ];

    const fontsOptions = [
        {
            key: 'Roboto',
            text: 'Roboto',
            value: 'Roboto',
            content: (
                <span
                    css={css`
                        font-family: Roboto;
                        font-weight: normal;
                    `}
                >
                    Roboto
                </span>
            ),
        },
        {
            key: 'Impact',
            text: 'Impact',
            value: 'Impact',
            content: (
                <span
                    css={css`
                        font-family: Impact;
                        font-weight: normal;
                    `}
                >
                    Impact
                </span>
            ),
        },
    ];

    const transformsOptions = [
        { key: 'Default', text: 'Default', value: 'initial' },
        { key: 'Uppercase', text: 'Uppercase', value: 'uppercase' },
        { key: 'Lowercase', text: 'Lowercase', value: 'lowercase' },
        { key: 'Capitalize', text: 'Capitalize', value: 'capitalize' },
        { key: 'Normal', text: 'Normal', value: 'normal' },
    ];

    const stylesOptions = [
        { key: 'Normal', text: 'Normal', value: 'normal' },
        { key: 'Italic', text: 'Italic', value: 'italic' },
        { key: 'Oblique', text: 'Oblique', value: 'oblique' },
    ];

    const decorationsOptions = [
        { key: 'None', text: 'None', value: 'none' },
        { key: 'Underline', text: 'Underline', value: 'underline' },
        { key: 'Overline', text: 'Overline', value: 'overline' },
        { key: 'Line Through', text: 'Line Through', value: 'line-through' },
    ];

    const weightsOptions = [
        { key: '100', text: '100', value: '100' },
        { key: '200', text: '200', value: '200' },
        { key: '300', text: '300', value: '300' },
        { key: '400', text: '400', value: '400' },
        { key: '500', text: '500', value: '500' },
        { key: '600', text: '600', value: '600' },
        { key: '700', text: '700', value: '700' },
        { key: '800', text: '800', value: '800' },
        { key: '900', text: '900', value: '900' },
        { key: 'Normal', text: 'Normal', value: 'normal' },
        { key: 'Bold', text: 'Bold', value: 'bold' },
    ];

    return (
        <>
            <Form.Input fluid label='Title' placeholder='Title' name='text' type='text' value={item.content.text} onChange={handleChange} />
            <div className='field'>
                <label>HTML Tag</label>
                <Dropdown fluid name='tag' selection value={item.content.tag} options={tagsOptions} onChange={handleChange} />
            </div>
            <div className='field'>
                <label>Alignment</label>
                <Dropdown fluid name='alignment' selection value={item.content.alignment} options={alignmentsOptions} onChange={handleChange} />
            </div>
            <Form>
                <div className='form__style_container'>
                    <div className='field'>
                        <h4 className='title'>Typography</h4>
                    </div>
                    <div className='form__style_item'>
                        <div className='form__inline_item'>
                            <div className='field'>
                                <label>Color</label>
                                <ColorPicker defaultColor={item.content.styles.color.normal} onColorChange={handleColorChange} />
                            </div>
                            <div className='field'>
                                <label>Color on Hover</label>
                                <ColorPicker defaultColor={item.content.styles.color.hover} onColorChange={handleColorHoverChange} />
                            </div>
                        </div>
                        <div className='form__inline_item'>
                            <div className='field'>
                                <label>Font Family</label>
                                <Dropdown
                                    fluid
                                    name='family'
                                    selection
                                    value={item.content.typo.family}
                                    options={fontsOptions}
                                    onChange={handleChangeTypo}
                                />
                            </div>
                            <div className='field'>
                                <Form.Input
                                    fluid
                                    label='Font Size'
                                    placeholder='16'
                                    name='size'
                                    type='number'
                                    value={item.content.typo.size}
                                    onChange={handleChangeTypo}
                                />
                            </div>
                            <div className='field'>
                                <label>Font Weight</label>
                                <Dropdown
                                    fluid
                                    name='weight'
                                    selection
                                    value={item.content.typo.weight}
                                    options={weightsOptions}
                                    onChange={handleChangeTypo}
                                />
                            </div>
                        </div>
                        <div className='form__inline_item'>
                            <div className='field'>
                                <label>Transform</label>
                                <Dropdown
                                    fluid
                                    name='transform'
                                    selection
                                    value={item.content.typo.transform}
                                    options={transformsOptions}
                                    onChange={handleChangeTypo}
                                />
                            </div>
                            <div className='field'>
                                <label>Style</label>
                                <Dropdown
                                    fluid
                                    name='style'
                                    selection
                                    value={item.content.typo.style}
                                    options={stylesOptions}
                                    onChange={handleChangeTypo}
                                />
                            </div>
                            <div className='field'>
                                <label>Decoration</label>
                                <Dropdown
                                    fluid
                                    name='decoration'
                                    selection
                                    value={item.content.typo.decoration}
                                    options={decorationsOptions}
                                    onChange={handleChangeTypo}
                                />
                            </div>
                        </div>
                        <div className='form__inline_item'>
                            <div className='field'>
                                <Form.Input
                                    fluid
                                    label='Line Height'
                                    placeholder='1'
                                    name='lineHeight'
                                    type='number'
                                    value={item.content.typo.lineHeight}
                                    onChange={handleChangeTypo}
                                />
                            </div>
                            <div className='field'>
                                <Form.Input
                                    fluid
                                    label='Letter Spacing'
                                    placeholder='0'
                                    name='letterSpacing'
                                    type='number'
                                    value={item.content.typo.letterSpacing}
                                    onChange={handleChangeTypo}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='form__style_container'>
                    <div className='field'>
                        <h4 className='title'>Style</h4>
                    </div>
                    <div className='form__style_item'>
                        <div className='field'>
                            <h6 className='style__element'>Margin</h6>
                        </div>
                        <div className='form__inline_item'>
                            <Form.Input
                                fluid
                                label='Top'
                                placeholder='Top'
                                name='top'
                                type='number'
                                value={item.styles.margin.top}
                                onChange={handleChangeMargin}
                            />
                            <Form.Input
                                fluid
                                label='Right'
                                placeholder='Right'
                                name='right'
                                type='number'
                                value={item.styles.margin.right}
                                onChange={handleChangeMargin}
                            />
                            <Form.Input
                                fluid
                                label='Bottom'
                                placeholder='Bottom'
                                name='bottom'
                                type='number'
                                value={item.styles.margin.bottom}
                                onChange={handleChangeMargin}
                            />
                            <Form.Input
                                fluid
                                label='Left'
                                placeholder='Left'
                                name='left'
                                type='number'
                                value={item.styles.margin.left}
                                onChange={handleChangeMargin}
                            />
                        </div>
                    </div>
                    <div className='form__style_item'>
                        <div className='field'>
                            <h6 className='style__element'>Padding</h6>
                        </div>
                        <div className='form__inline_item'>
                            <Form.Input
                                fluid
                                label='Top'
                                placeholder='Top'
                                name='top'
                                type='number'
                                value={item.styles.padding.top}
                                onChange={handleChangePadding}
                            />
                            <Form.Input
                                fluid
                                label='Right'
                                placeholder='Right'
                                name='right'
                                type='number'
                                value={item.styles.padding.right}
                                onChange={handleChangePadding}
                            />
                            <Form.Input
                                fluid
                                label='Bottom'
                                placeholder='Bottom'
                                name='bottom'
                                type='number'
                                value={item.styles.padding.bottom}
                                onChange={handleChangePadding}
                            />
                            <Form.Input
                                fluid
                                label='Left'
                                placeholder='Left'
                                name='left'
                                type='number'
                                value={item.styles.padding.left}
                                onChange={handleChangePadding}
                            />
                        </div>
                    </div>
                </div>
            </Form>
        </>
    );
}
