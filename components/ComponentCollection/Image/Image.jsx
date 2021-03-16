import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';

//Style
import styles from './Image.module.scss';
//Components
import FileManager from 'components/FileManager/FileManager';
import {Dropdown, Form, Tab} from 'semantic-ui-react';
import {
    alignmentsOptions,
    animationsOptions,
    borderOptions,
    durationsOptions
} from '../../../variables/options';
import Accordion from '../../Accordion/Accordion';
import ColorPicker from '../../ColorPicker/ColorPicker';

export default function Image({element, device, onElementValueChange}) {
    // Use translation
    const intl = useIntl();
    const [item, setItem] = useState(element);

    useEffect(
        function () {
            if (element.content.image && element.type === 'image') {
                setItem(element);
            }
        },
        [element]
    );

    const handleChangeImage = function (file) {
        const updated = {
            ...item,
            content: {
                ...item.content,
                image: file,
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    };
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
    const handleChangeAnimation = (e, data) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                [device]: {
                    ...item.content[device],
                    animation: {
                        ...item.content[device].animation,
                        [data.name]: data.value,
                    }
                }
            }
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
    const handleChangeImageValue = (e, data, key, value) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                [device]: {
                    ...item.content[device],
                    image: {
                        ...item.content[device].image,
                        [key]: {
                            ...item.content[device].image[key],
                            [value]: {
                                ...item.content[device].image[key][value],
                                [data.name]: data.value
                            }
                        },
                    }
                }
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    }
    const handleChangeImageValueUnit = (unit, key, value) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                [device]: {
                    ...item.content[device],
                    image: {
                        ...item.content[device].image,
                        [key]: {
                            ...item.content[device].image[key],
                            [value]: {
                                ...item.content[device].image[key][value],
                                unit: unit,
                                value: unit === 'px' ? (value === 'height' ? 'auto' : '300') : "100"
                            }
                        },
                    },
                }
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    }
    const handleChangeOpacity = (e, data, key, mode) => {
        const updated = {
            ...item,
            content: {
                ...item.content,
                [device]: {
                    ...item.content[device],
                    image: {
                        ...item.content[device].image,
                        [key]: {
                            ...item.content[device].image[key],
                            [mode]: data.value
                        },
                    }
                }
            },
        };
        setItem(updated);
        onElementValueChange(updated);
    }

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

    const opacityPanes = [
        {
            menuItem: 'Normal',
            render: () => <div className={'accordion__pane'}>
                <Form.Input fluid type="number" label="Opacity" name="opacity" min={0} max={1} step={0.01} onChange={(e, data) => handleChangeOpacity(e, data, 'opacity', 'normal')} value={item.content[device].image.opacity.normal} />
            </div>,
        },
        {
            menuItem: 'Hover',
            render: () => <div className={'accordion__pane'}>
                <Form.Input fluid type="number" label="Opacity" name="opacity" min={0} max={1} step={0.01} onChange={(e, data) => handleChangeOpacity(e, data, 'opacity', 'hover')} value={item.content[device].image.opacity.hover} />
            </div>,
        },
    ]

    return (
        <>
            <Accordion active={true} title={'Image'}>
                <FileManager
                    currentFiles={item.content.image.url !== '/placeholder.png' ? [item.content.image] : []}
                    setCurrentFiles={handleChangeImage}
                    multiple={false}
                    trigger={
                        <div className={`${styles.filemanager_btn}`}>
                            {item.content.image && item.content.image.url ? (
                                <div className={`${styles.preview}`}
                                     style={{background: `url(${item.content.image.url})`}}></div>
                            ) : (
                                <div className={`${styles.preview}`} style={{background: `url(/placeholder.png)`}}></div>
                            )}
                            <div className={`${styles.preview__action}`}>
                                {intl.formatMessage({id: 'image.choose', defaultMessage: 'Choose an image'})}
                            </div>
                        </div>
                    }
                />
                <div className="form__inline_item">
                    <div className='field'>
                        <Form.Input fluid label='Width' placeholder='100' name='value' type='number' min="1"
                                    max={item.content[device].image.size.width.unit === 'px' ? 1000 : 100}
                                    step={1}
                                    value={item.content[device].image.size.width.value}
                                    onChange={(e, data) => handleChangeImageValue(e, data, 'size', 'width')}/>
                    </div>
                    <div className="field-group">
                        <label className={item.content[device].image.size.width.unit === '%' ? 'selected' : undefined}
                               onClick={() => handleChangeImageValueUnit('%', 'size', 'width')}>%</label>
                        <label className={item.content[device].image.size.width.unit === 'px' ? 'selected' : undefined}
                               onClick={() => handleChangeImageValueUnit('px', 'size', 'width')}>PX</label>
                        <label className={item.content[device].image.size.width.unit === 'vw' ? 'selected' : undefined}
                               onClick={() => handleChangeImageValueUnit('vw', 'size', 'width')}>VW</label>
                    </div>
                </div>
                <div className="form__inline_item">
                    <div className='field'>
                        <Form.Input fluid label='Max Width' placeholder='100' name='value' type='number' min="1"
                                    max={item.content[device].image.size.maxWidth.unit === 'px' ? 1000 : 100}
                                    step={1}
                                    value={item.content[device].image.size.maxWidth.value}
                                    onChange={(e, data) => handleChangeImageValue(e, data, 'size', 'maxWidth')}/>
                    </div>
                    <div className="field-group">
                        <label className={item.content[device].image.size.maxWidth.unit === '%' ? 'selected' : undefined}
                               onClick={() => handleChangeImageValueUnit('%', 'size', 'maxWidth')}>%</label>
                        <label className={item.content[device].image.size.maxWidth.unit === 'px' ? 'selected' : undefined}
                               onClick={() => handleChangeImageValueUnit('px', 'size', 'maxWidth')}>PX</label>
                        <label className={item.content[device].image.size.maxWidth.unit === 'vw' ? 'selected' : undefined}
                               onClick={() => handleChangeImageValueUnit('vw', 'size', 'maxWidth')}>VW</label>
                    </div>
                </div>
                <div className="form__inline_item">
                    <div className='field'>
                        <Form.Input fluid label='Height' placeholder='Value (blank for auto)' name='value' type='number' min="1"
                                    max={item.content[device].image.size.height.unit === 'px' ? 500 : 100}
                                    step={1}
                                    value={item.content[device].image.size.height.value !== 'auto' ? item.content[device].image.size.height.value : ''}
                                    onChange={(e, data) => handleChangeImageValue(e, data, 'size', 'height')}/>
                    </div>
                    <div className="field-group">
                        <label className={item.content[device].image.size.height.unit === 'px' ? 'selected' : undefined}
                               onClick={() => handleChangeImageValueUnit('px', 'size', 'height')}>PX</label>
                        <label className={item.content[device].image.size.height.unit === 'vh' ? 'selected' : undefined}
                               onClick={() => handleChangeImageValueUnit('vh', 'size', 'height')}>VH</label>
                    </div>
                </div>
                <Tab menu={{secondary: true, pointing: true}} panes={opacityPanes}/>
                <div className='field'>
                    <label>Alignment</label>
                    <Dropdown fluid name='alignment' selection value={item.content.alignment}
                              options={alignmentsOptions} onChange={handleChange}/>
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
            <Accordion active={false} title={"Animation"}>
                <div className='field'>
                    <label>Entrance Animation</label>
                    <Dropdown fluid name='name' selection search value={item.content[device].animation.name}
                              options={animationsOptions} onChange={handleChangeAnimation}/>
                </div>
                <div className='field'>
                    <label>Animation Duration</label>
                    <Dropdown fluid name='duration' selection value={item.content[device].animation.duration}
                              options={durationsOptions} onChange={handleChangeAnimation}/>
                </div>
                <Form.Input fluid label='Animation Delay (ms)' placeholder='0' name='delay' type='number'
                            value={item.content[device].animation.delay}
                            onChange={handleChangeAnimation}/>
            </Accordion>
        </>
    );
}
