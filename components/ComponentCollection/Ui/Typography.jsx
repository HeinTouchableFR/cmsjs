import React from 'react';
import ColorPicker from 'components/ColorPicker/ColorPicker';
import Accordion from 'components/Accordion/Accordion';
import {
    decorationsOptions,
    fontsOptions,
    stylesOptions,
    transformsOptions,
    weightsOptions,
} from 'variables/options';
import {useIntl} from 'react-intl';
import Input from 'components/Form/Input/Input';
import Dropdown from 'components/Form/Dropdown/Dropdown';
import PropTypes from 'prop-types';
import {
    colorChange,
    changeTypo,
    changeTypoUnit,
    changeTypoWithKey,
} from 'variables/functions';

export default function Typography({item, device, setItem, onChange}) {
    const intl = useIntl();

    const handleColorChange = (color, mode) => {
        colorChange(item, device, setItem, onChange, color, 'color', mode, 'typo');
    };

    const handleChangeTypo = (_e, data) => {
        changeTypo(_e, data, item, device, setItem, onChange);
    };

    const handleChangeTypoWithKey = (_e, data, key) => {
        changeTypoWithKey(_e, data, key, item, device, setItem, onChange);
    };

    const handleChangeTypoUnit = (unit, key) => {
        changeTypoUnit(unit, key, item, device, setItem, onChange);
    };

    return (
        <>
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
                            onColorChange={(color) => handleColorChange(color, 'normal')}
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
                            onColorChange={(color) => handleColorChange(color, 'hover')}
                        />
                    </div>
                </div>
                <div className='form__inline_item'>
                    <Input
                        label={intl.formatMessage({
                            id: 'builder.font.size',
                            defaultMessage: 'Font size',
                        })}
                        placeholder='16'
                        name='value'
                        type='number'
                        min='1'
                        max={item.content[device].typo.size.unit === 'px' ? '200' : '10'}
                        step={item.content[device].typo.size.unit === 'px' ? '1' : '0.1'}
                        defaultValue={item.content[device].typo.size.value}
                        onChange={(e, data) => handleChangeTypoWithKey(e, data, 'size')}
                    />
                    <div className='field-group'>
                        <span
                            className={`${item.content[device].typo.size.unit === 'px' && 'selected'}`}
                            onClick={() => handleChangeTypoUnit('px', 'size')}
                            onKeyDown={() => handleChangeTypoUnit('px', 'size')}
                            role='button'
                            tabIndex='0'
                        >
                            PX
                        </span>
                        <span
                            className={`${item.content[device].typo.size.unit === 'em' && 'selected'}`}
                            onClick={() => handleChangeTypoUnit('em', 'size')}
                            onKeyDown={() => handleChangeTypoUnit('em', 'size')}
                            role='button'
                            tabIndex='0'
                        >
                            EM
                        </span>
                        <span
                            className={`${item.content[device].typo.size.unit === 'rem' && 'selected'}`}
                            onClick={() => handleChangeTypoUnit('rem', 'size')}
                            onKeyDown={() => handleChangeTypoUnit('rem', 'size')}
                            role='button'
                            tabIndex='0'
                        >
                            REM
                        </span>
                        <span
                            className={`${item.content[device].typo.size.unit === 'vw' && 'selected'}`}
                            onClick={() => handleChangeTypoUnit('vw', 'size')}
                            onKeyDown={() => handleChangeTypoUnit('vw', 'size')}
                            role='button'
                            tabIndex='0'
                        >
                            VW
                        </span>
                    </div>
                </div>
                <Dropdown
                    name='family'
                    defaultValue={item.content[device].typo.family}
                    options={fontsOptions}
                    onChange={handleChangeTypo}
                    label={intl.formatMessage({
                        id: 'builder.font.family',
                        defaultMessage: 'Font family',
                    })}
                    searchable
                />
                <Dropdown
                    name='weight'
                    defaultValue={item.content[device].typo.weight}
                    options={weightsOptions}
                    onChange={handleChangeTypo}
                    label={intl.formatMessage({
                        id: 'builder.font.weight',
                        defaultMessage: 'Font weight',
                    })}
                    searchable
                />
                <Dropdown
                    name='transform'
                    defaultValue={item.content[device].typo.transform}
                    options={transformsOptions}
                    onChange={handleChangeTypo}
                    label={intl.formatMessage({
                        id: 'builder.transform',
                        defaultMessage: 'Transform',
                    })}
                    searchable
                />
                <Dropdown
                    name='style'
                    defaultValue={item.content[device].typo.style}
                    options={stylesOptions}
                    onChange={handleChangeTypo}
                    label={intl.formatMessage({
                        id: 'builder.style',
                        defaultMessage: 'Style',
                    })}
                    searchable
                />
                <Dropdown
                    name='decoration'
                    defaultValue={Array.from(item.content[device].typo.decoration)}
                    options={decorationsOptions}
                    onChange={handleChangeTypo}
                    multiple
                    label={intl.formatMessage({
                        id: 'builder.decoration',
                        defaultMessage: 'Decoration',
                    })}
                    searchable
                />
                <div className='form__inline_item'>
                    <Input
                        label={intl.formatMessage({
                            id: 'builder.lineHeight',
                            defaultMessage: 'Line height',
                        })}
                        placeholder='1'
                        name='value'
                        type='number'
                        min='1'
                        max={item.content[device].typo.lineHeight.unit === 'px' ? '100' : '10'}
                        step={item.content[device].typo.lineHeight.unit === 'px' ? '1' : '0.1'}
                        defaultValue={item.content[device].typo.lineHeight.value}
                        onChange={(e, data) => handleChangeTypoWithKey(e, data, 'lineHeight')}
                    />
                    <div className='field-group'>
                        <span
                            className={`${item.content[device].typo.lineHeight.unit === 'px' && 'selected'}`}
                            onClick={() => handleChangeTypoUnit('px', 'lineHeight')}
                            onKeyDown={() => handleChangeTypoUnit('px', 'lineHeight')}
                            role='button'
                            tabIndex='0'
                        >
                            PX
                        </span>
                        <span
                            className={`${item.content[device].typo.lineHeight.unit === 'em' && 'selected'}`}
                            onClick={() => handleChangeTypoUnit('em', 'lineHeight')}
                            onKeyDown={() => handleChangeTypoUnit('em', 'lineHeight')}
                            role='button'
                            tabIndex='0'
                        >
                            EM
                        </span>
                    </div>
                </div>
                <Input
                    label={intl.formatMessage({
                        id: 'builder.letterSpacing',
                        defaultMessage: 'Letter spacing',
                    })}
                    placeholder='0'
                    name='letterSpacing'
                    type='number'
                    defaultValue={item.content[device].typo.letterSpacing}
                    onChange={handleChangeTypo}
                />
            </Accordion>
        </>
    );
}

Typography.propTypes = {
    item: PropTypes.shape({
        content: PropTypes.shape({}).isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
    device: PropTypes.string.isRequired,
    setItem: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};
