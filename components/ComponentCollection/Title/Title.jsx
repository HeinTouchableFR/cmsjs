import React, {useEffect, useState} from 'react';
import {Dropdown, Form} from 'semantic-ui-react';
import ColorPicker from 'components/ColorPicker/ColorPicker';
import {css} from '@emotion/react';

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
        onElementValueChange(updated);
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
        onElementValueChange(updated);
    };

    const handleChangeBorder = (e, data) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                styles: {
                    ...item.content.styles,
                    border: {
                        ...item.content.styles.border,
                        normal: {
                            ...item.content.styles.border.normal,
                            width: {
                                ...item.content.styles.border.normal.width,
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

    const handleChangeBorderHover = (e, data) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                styles: {
                    ...item.content.styles,
                    border: {
                        ...item.content.styles.border,
                        hover: {
                            ...item.content.styles.border.hover,
                            width: {
                                ...item.content.styles.border.hover.width,
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
        onElementValueChange(updated);
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
        onElementValueChange(updated);
    };
    const handleBackgroundChange = (color) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                styles: {
                    ...item.content.styles,
                    background: {
                        ...item.content.styles.background,
                        normal: color,
                    },
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };
    const handleBackgroundHoverChange = (color) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                styles: {
                    ...item.content.styles,
                    background: {
                        ...item.content.styles.background,
                        hover: color,
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
    const handleBorderChange = (e, data) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                styles: {
                    ...item.content.styles,
                    border: {
                        ...item.content.styles.border,
                        normal: {
                            ...item.content.styles.border.normal,
                            [data.name]: data.value
                        },
                    },
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };
    const handleBorderHoverChange = (e, data) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                styles: {
                    ...item.content.styles,
                    border: {
                        ...item.content.styles.border,
                        hover: {
                            ...item.content.styles.border.hover,
                            [data.name]: data.value
                        },
                    },
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };

    const handleChangeRadius = (e, data) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                styles: {
                    ...item.content.styles,
                    border: {
                        ...item.content.styles.border,
                        normal: {
                            ...item.content.styles.border.normal,
                            radius: {
                                ...item.content.styles.border.normal.radius,
                                [data.name]: data.value
                            }
                        },
                    },
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };
    const handleChangeRadiusHover = (e, data) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                styles: {
                    ...item.content.styles,
                    border: {
                        ...item.content.styles.border,
                        hover: {
                            ...item.content.styles.border.hover,
                            radius: {
                                ...item.content.styles.border.hover.radius,
                                [data.name]: data.value
                            }
                        },
                    },
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };

    const handleBorderColorChange = (color) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                styles: {
                    ...item.content.styles,
                    border: {
                        ...item.content.styles.border,
                        normal: {
                            ...item.content.styles.border.normal,
                            color: color
                        },
                    },
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };

    const handleBorderColorHoverChange = (color) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                styles: {
                    ...item.content.styles,
                    border: {
                        ...item.content.styles.border,
                        hover: {
                            ...item.content.styles.border.hover,
                            color: color
                        },
                    },
                },
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };

    const tagsOptions = [
        {key: 'H1', text: 'H1', value: 'h1'},
        {key: 'H2', text: 'H2', value: 'h2'},
        {key: 'H3', text: 'H3', value: 'h3'},
        {key: 'H4', text: 'H4', value: 'h4'},
        {key: 'H5', text: 'H5', value: 'h5'},
        {
            key: 'H6',
            text: 'H6',
            value: 'h6',
        },
    ];

    const alignmentsOptions = [
        {key: 'Left', text: 'Left', value: 'left'},
        {key: 'Center', text: 'Center', value: 'center'},
        {key: 'Right', text: 'Right', value: 'right'},
        {key: 'Justified', text: 'Justified', value: 'justify'},
    ];

    const fontsOptions = [
        {
            key: 'Abril Fatface',
            text: 'Abril Fatface',
            value: 'Abril Fatface',
            content: (
                <span
                    css={css`
                        font-family: Abril Fatface;
                        font-weight: normal;
                    `}
                >
                    Abril Fatface
                </span>
            ),
        },
        {
            key: 'Alegreya',
            text: 'Alegreya',
            value: 'Alegreya',
            content: (
                <span
                    css={css`
                        font-family: Alegreya;
                        font-weight: normal;
                    `}
                >
                    Alegreya
                </span>
            ),
        },
        {
            key: 'Archivo',
            text: 'Archivo',
            value: 'Archivo',
            content: (
                <span
                    css={css`
                        font-family: Archivo;
                        font-weight: normal;
                    `}
                >
                    Archivo
                </span>
            ),
        },
        {
            key: 'B612',
            text: 'B612',
            value: 'B612',
            content: (
                <span
                    css={css`
                        font-family: B612;
                        font-weight: normal;
                    `}
                >
                    B612
                </span>
            ),
        },
        {
            key: 'BioRhyme',
            text: 'BioRhyme',
            value: 'BioRhyme',
            content: (
                <span
                    css={css`
                        font-family: BioRhyme;
                        font-weight: normal;
                    `}
                >
                    BioRhyme
                </span>
            ),
        },
        {
            key: 'Cairo',
            text: 'Cairo',
            value: 'Cairo',
            content: (
                <span
                    css={css`
                        font-family: Cairo;
                        font-weight: normal;
                    `}
                >
                    Cairo
                </span>
            ),
        },
        {
            key: 'Coiny',
            text: 'Coiny',
            value: 'Coiny',
            content: (
                <span
                    css={css`
                        font-family: Coiny;
                        font-weight: normal;
                    `}
                >
                    Coiny
                </span>
            ),
        },
        {
            key: 'Cormorant',
            text: 'Cormorant',
            value: 'Cormorant',
            content: (
                <span
                    css={css`
                        font-family: Cormorant;
                        font-weight: normal;
                    `}
                >
                    Cormorant
                </span>
            ),
        },
        {
            key: 'Crimson Text',
            text: 'Crimson Text',
            value: 'Crimson Text',
            content: (
                <span
                    css={css`
                        font-family: Crimson Text;
                        font-weight: normal;
                    `}
                >
                    Crimson Text
                </span>
            ),
        },
        {
            key: 'Frank Ruhl Libre',
            text: 'Frank Ruhl Libre',
            value: 'Frank Ruhl Libre',
            content: (
                <span
                    css={css`
                        font-family: Frank Ruhl Libre;
                        font-weight: normal;
                    `}
                >
                    Frank Ruhl Libre
                </span>
            ),
        },
        {
            key: 'IBM Plex Serif',
            text: 'IBM Plex Serif',
            value: 'IBM Plex Serif',
            content: (
                <span
                    css={css`
                        font-family: IBM Plex Serif;
                        font-weight: normal;
                    `}
                >
                    IBM Plex Serif
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
        {
            key: 'Karla',
            text: 'Karla',
            value: 'Karla',
            content: (
                <span
                    css={css`
                        font-family: Karla;
                        font-weight: normal;
                    `}
                >
                    Karla
                </span>
            ),
        },
        {
            key: 'Lora',
            text: 'Lora',
            value: 'Lora',
            content: (
                <span
                    css={css`
                        font-family: Lora;
                        font-weight: normal;
                    `}
                >
                    Lora
                </span>
            ),
        },
        {
            key: 'Montserrat',
            text: 'Montserrat',
            value: 'Montserrat',
            content: (
                <span
                    css={css`
                        font-family: Montserrat;
                        font-weight: normal;
                    `}
                >
                    Montserrat
                </span>
            ),
        },
        {
            key: 'Muli',
            text: 'Muli',
            value: 'Muli',
            content: (
                <span
                    css={css`
                        font-family: Muli;
                        font-weight: normal;
                    `}
                >
                    Muli
                </span>
            ),
        },
        {
            key: 'Playfair Display',
            text: 'Playfair Display',
            value: 'Playfair Display',
            content: (
                <span
                    css={css`
                        font-family: Playfair Display;
                        font-weight: normal;
                    `}
                >
                    Playfair Display
                </span>
            ),
        },
        {
            key: 'PT Banana Split',
            text: 'PT Banana Split',
            value: 'PT Banana Split',
            content: (
                <span
                    css={css`
                        font-family: PT Banana Split;
                        font-weight: normal;
                    `}
                >
                    PT Banana Split
                </span>
            ),
        },
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
            key: 'Spectral',
            text: 'Spectral',
            value: 'Spectral',
            content: (
                <span
                    css={css`
                        font-family: Spectral;
                        font-weight: normal;
                    `}
                >
                    Spectral
                </span>
            ),
        },
        {
            key: 'Titillium Web',
            text: 'Titillium Web',
            value: 'Titillium Web',
            content: (
                <span
                    css={css`
                        font-family: Titillium Web;
                        font-weight: normal;
                    `}
                >
                    Titillium Web
                </span>
            ),
        },
        {
            key: 'TrashHand',
            text: 'TrashHand',
            value: 'TrashHand',
            content: (
                <span
                    css={css`
                        font-family: TrashHand;
                        font-weight: normal;
                    `}
                >
                    TrashHand
                </span>
            ),
        },
        {
            key: 'Ubuntu',
            text: 'Ubuntu',
            value: 'Ubuntu',
            content: (
                <span
                    css={css`
                        font-family: Ubuntu;
                        font-weight: normal;
                    `}
                >
                    Ubuntu
                </span>
            ),
        },
        {
            key: 'Varela',
            text: 'Varela',
            value: 'Varela',
            content: (
                <span
                    css={css`
                        font-family: Varela;
                        font-weight: normal;
                    `}
                >
                    Varela
                </span>
            ),
        },
        {
            key: 'Vollkorn',
            text: 'Vollkorn',
            value: 'Vollkorn',
            content: (
                <span
                    css={css`
                        font-family: Vollkorn;
                        font-weight: normal;
                    `}
                >
                    Vollkorn
                </span>
            ),
        },
    ];

    const transformsOptions = [
        {key: 'Default', text: 'Default', value: 'initial'},
        {key: 'Uppercase', text: 'Uppercase', value: 'uppercase'},
        {key: 'Lowercase', text: 'Lowercase', value: 'lowercase'},
        {key: 'Capitalize', text: 'Capitalize', value: 'capitalize'},
        {key: 'Normal', text: 'Normal', value: 'normal'},
    ];

    const stylesOptions = [
        {key: 'Normal', text: 'Normal', value: 'normal'},
        {key: 'Italic', text: 'Italic', value: 'italic'},
        {key: 'Oblique', text: 'Oblique', value: 'oblique'},
    ];

    const decorationsOptions = [
        {key: 'None', text: 'None', value: 'none'},
        {key: 'Underline', text: 'Underline', value: 'underline'},
        {key: 'Overline', text: 'Overline', value: 'overline'},
        {key: 'Line Through', text: 'Line Through', value: 'line-through'},
    ];

    const weightsOptions = [
        {key: '100', text: '100', value: '100'},
        {key: '200', text: '200', value: '200'},
        {key: '300', text: '300', value: '300'},
        {key: '400', text: '400', value: '400'},
        {key: '500', text: '500', value: '500'},
        {key: '600', text: '600', value: '600'},
        {key: '700', text: '700', value: '700'},
        {key: '800', text: '800', value: '800'},
        {key: '900', text: '900', value: '900'},
        {key: 'Normal', text: 'Normal', value: 'normal'},
        {key: 'Bold', text: 'Bold', value: 'bold'},
    ];

    const borderOptions = [
        {key: 'None', text: 'None', value: 'none'},
        {key: 'Solid', text: 'Solid', value: 'solid'},
        {key: 'Double', text: 'Double', value: 'double'},
        {key: 'Dotted', text: 'Dotted', value: 'dotted'},
        {key: 'Dashed', text: 'Dashed', value: 'dashed'},
        {key: 'Groove', text: 'Groove', value: 'groove'},
    ];

    return (
        <>
            <Form.Input fluid label='Title' placeholder='Title' name='text' type='text' value={item.content.text}
                        onChange={handleChange}/>
            <div className='field'>
                <label>HTML Tag</label>
                <Dropdown fluid name='tag' selection value={item.content.tag} options={tagsOptions}
                          onChange={handleChange}/>
            </div>
            <div className='field'>
                <label>Alignment</label>
                <Dropdown fluid name='alignment' selection value={item.content.alignment} options={alignmentsOptions}
                          onChange={handleChange}/>
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
                                <ColorPicker defaultColor={item.content.styles.color.normal}
                                             onColorChange={handleColorChange}/>
                            </div>
                            <div className='field'>
                                <label>Color on Hover</label>
                                <ColorPicker defaultColor={item.content.styles.color.hover}
                                             onColorChange={handleColorHoverChange}/>
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
                        <div className='form__inline_item'>
                            <div className='field'>
                                <label>Background</label>
                                <ColorPicker defaultColor={item.content.styles.background.normal}
                                             onColorChange={handleBackgroundChange}/>
                            </div>
                            <div className='field'>
                                <label>Background on Hover</label>
                                <ColorPicker defaultColor={item.content.styles.background.hover}
                                             onColorChange={handleBackgroundHoverChange}/>
                            </div>
                        </div>
                        <div className='form__style_item'>
                            <div className='field'>
                                <h6 className='style__element'>Border</h6>
                            </div>
                            <div className='form__inline_item'>
                                <div className='field'>
                                    <label>Border Type</label>
                                    <Dropdown fluid name='type' selection value={item.content.styles.border.normal.type} options={borderOptions} onChange={handleBorderChange}/>
                                </div>
                                <div className='field'>
                                    <label>Border color</label>
                                    <ColorPicker defaultColor={item.content.styles.border.normal.color}
                                                 onColorChange={handleBorderColorChange}/>
                                </div>
                            </div>
                            <div className='form__inline_item'>
                                <Form.Input
                                    fluid
                                    label='Top'
                                    placeholder='Top'
                                    name='top'
                                    type='number'
                                    value={item.content.styles.border.normal.width.top}
                                    onChange={handleChangeBorder}
                                />
                                <Form.Input
                                    fluid
                                    label='Right'
                                    placeholder='Right'
                                    name='right'
                                    type='number'
                                    value={item.content.styles.border.normal.width.right}
                                    onChange={handleChangeBorder}
                                />
                                <Form.Input
                                    fluid
                                    label='Bottom'
                                    placeholder='Bottom'
                                    name='bottom'
                                    type='number'
                                    value={item.content.styles.border.normal.width.bottom}
                                    onChange={handleChangeBorder}
                                />
                                <Form.Input
                                    fluid
                                    label='Left'
                                    placeholder='Left'
                                    name='left'
                                    type='number'
                                    value={item.content.styles.border.normal.width.left}
                                    onChange={handleChangeBorder}
                                />
                            </div>
                            <label>Border Radius</label>
                            <div className='form__inline_item'>
                                <Form.Input
                                    fluid
                                    label='Top'
                                    placeholder='Top'
                                    name='top'
                                    type='number'
                                    value={item.content.styles.border.normal.radius.top}
                                    onChange={handleChangeRadius}
                                />
                                <Form.Input
                                    fluid
                                    label='Right'
                                    placeholder='Right'
                                    name='right'
                                    type='number'
                                    value={item.content.styles.border.normal.radius.right}
                                    onChange={handleChangeRadius}
                                />
                                <Form.Input
                                    fluid
                                    label='Bottom'
                                    placeholder='Bottom'
                                    name='bottom'
                                    type='number'
                                    value={item.content.styles.border.normal.radius.bottom}
                                    onChange={handleChangeRadius}
                                />
                                <Form.Input
                                    fluid
                                    label='Left'
                                    placeholder='Left'
                                    name='left'
                                    type='number'
                                    value={item.content.styles.border.normal.radius.left}
                                    onChange={handleChangeRadius}
                                />
                            </div>
                        </div>
                        <div className='form__style_item'>
                            <div className='field'>
                                <h6 className='style__element'>Border on Hover</h6>
                            </div>
                            <div className='form__inline_item'>
                                <div className='field'>
                                    <label>Border Type</label>
                                    <Dropdown fluid name='type' selection value={item.content.styles.border.hover.type} options={borderOptions} onChange={handleBorderHoverChange}/>
                                </div>
                                <div className='field'>
                                    <label>Border color</label>
                                    <ColorPicker defaultColor={item.content.styles.border.hover.color}
                                                 onColorChange={handleBorderColorHoverChange}/>
                                </div>
                            </div>
                            <div className='form__inline_item'>
                                <Form.Input
                                    fluid
                                    label='Top'
                                    placeholder='Top'
                                    name='top'
                                    type='number'
                                    value={item.content.styles.border.hover.width.top}
                                    onChange={handleChangeBorderHover}
                                />
                                <Form.Input
                                    fluid
                                    label='Right'
                                    placeholder='Right'
                                    name='right'
                                    type='number'
                                    value={item.content.styles.border.hover.width.right}
                                    onChange={handleChangeBorderHover}
                                />
                                <Form.Input
                                    fluid
                                    label='Bottom'
                                    placeholder='Bottom'
                                    name='bottom'
                                    type='number'
                                    value={item.content.styles.border.hover.width.bottom}
                                    onChange={handleChangeBorderHover}
                                />
                                <Form.Input
                                    fluid
                                    label='Left'
                                    placeholder='Left'
                                    name='left'
                                    type='number'
                                    value={item.content.styles.border.hover.width.left}
                                    onChange={handleChangeBorderHover}
                                />
                            </div>
                            <label>Border Radius</label>
                            <div className='form__inline_item'>
                                <Form.Input
                                    fluid
                                    label='Top'
                                    placeholder='Top'
                                    name='top'
                                    type='number'
                                    value={item.content.styles.border.hover.radius.top}
                                    onChange={handleChangeRadiusHover}
                                />
                                <Form.Input
                                    fluid
                                    label='Right'
                                    placeholder='Right'
                                    name='right'
                                    type='number'
                                    value={item.content.styles.border.hover.radius.right}
                                    onChange={handleChangeRadiusHover}
                                />
                                <Form.Input
                                    fluid
                                    label='Bottom'
                                    placeholder='Bottom'
                                    name='bottom'
                                    type='number'
                                    value={item.content.styles.border.hover.radius.bottom}
                                    onChange={handleChangeRadiusHover}
                                />
                                <Form.Input
                                    fluid
                                    label='Left'
                                    placeholder='Left'
                                    name='left'
                                    type='number'
                                    value={item.content.styles.border.hover.radius.left}
                                    onChange={handleChangeRadiusHover}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    );
}
