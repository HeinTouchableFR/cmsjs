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
import { useIntl } from 'react-intl';
import Input from 'components/Form/Input/Input';
import Dropdown from 'components/Form/Dropdown/Dropdown';
import PropTypes from 'prop-types';
import {
    colorChange,
    changeTypo,
    changeTypoUnit,
    changeTypoWithKey,
} from 'variables/functions';

export default function Typography({ item, device, setItem, onChange }) {
    const intl = useIntl();

    const handleColorChange = (color, key, mode, location) => {
        colorChange(item, device, setItem, onChange, color, key, mode, location);
    }

    const handleChangeTypo = (_e, data) => {
        changeTypo(_e, data, item, device, setItem, onChange);
    }

    const handleChangeTypoWithKey = (_e, data, key) => {
        changeTypoWithKey(_e, data, key, item, device, setItem, onChange);
    }

    const handleChangeTypoUnit = (unit, key) => {
        changeTypoUnit(unit, key, item, device, setItem, onChange);
    }

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
                            onChange={(e, data) => handleChangeTypoWithKey(e, data, 'size')}
                        />
                    </div>
                    <div className='field-group'>
                        <button
                            className={item.content[device].typo.size.unit === 'px' && 'selected'}
                            onClick={() => handleChangeTypoUnit('px', 'size')}
                            type='button'
                        >
                            PX
                        </button>
                        <button
                            className={item.content[device].typo.size.unit === 'em' && 'selected'}
                            onClick={() => handleChangeTypoUnit('em', 'size')}
                            type='button'
                        >
                            EM
                        </button>
                        <button
                            className={item.content[device].typo.size.unit === 'rem' && 'selected'}
                            onClick={() => handleChangeTypoUnit('rem', 'size')}
                            type='button'
                        >
                            REM
                        </button>
                        <button
                            className={item.content[device].typo.size.unit === 'vw' && 'selected'}
                            onClick={() => handleChangeTypoUnit('vw', 'size')}
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
                            onChange={(e, data) => handleChangeTypoWithKey(e, data, 'lineHeight')}
                        />
                    </div>
                    <div className='field-group'>
                        <button
                            className={item.content[device].typo.lineHeight.unit === 'px' && 'selected'}
                            onClick={() => handleChangeTypoUnit('px', 'lineHeight')}
                            type='button'
                        >
                            PX
                        </button>
                        <button
                            className={item.content[device].typo.lineHeight.unit === 'em' && 'selected'}
                            onClick={() => handleChangeTypoUnit('em', 'lineHeight')}
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
        </>
    );
}

Typography.propTypes = {
    item: PropTypes.shape({
        content: PropTypes.shape({
            text: PropTypes.string.isRequired,
        }).isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
    device: PropTypes.string.isRequired,
    setItem: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};
