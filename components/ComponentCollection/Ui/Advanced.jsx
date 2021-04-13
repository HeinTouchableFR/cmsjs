import React from 'react';
import Accordion from 'components/Accordion/Accordion';
import { useIntl } from 'react-intl';
import Input from 'components/Form/Input/Input';
import PropTypes from 'prop-types';
import {
    changeStyle,
    changeStyleUnit
} from 'variables/functions';

export default function Advanced({ item, device, setItem, onChange }) {
    const intl = useIntl();

    const handleChangeStyle = (_e, data, key) => {
        changeStyle(_e, data, key, item, device, setItem, onChange);
    };

    const handleChangeStyleUnit = (unit, key) => {
        changeStyleUnit(unit, key, item, device, setItem, onChange);
    };

    return (
        <>
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
                                onClick={() => handleChangeStyleUnit('px', 'margin')}
                                type='button'
                            >
                                PX
                            </button>
                            <button
                                className={item.styles[device].margin.unit === 'em' && 'selected'}
                                onClick={() => handleChangeStyleUnit('em', 'margin')}
                                type='button'
                            >
                                EM
                            </button>
                            <button
                                className={item.styles[device].margin.unit === '%' && 'selected'}
                                onClick={() => handleChangeStyleUnit('%', 'margin')}
                                type='button'
                            >
                                %
                            </button>
                            <button
                                className={item.styles[device].margin.unit === 'rem' && 'selected'}
                                onClick={() => handleChangeStyleUnit('rem', 'margin')}
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
                            onChange={(e, data) => handleChangeStyle(e, data, 'margin')}
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
                            onChange={(e, data) => handleChangeStyle(e, data, 'margin')}
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
                            onChange={(e, data) => handleChangeStyle(e, data, 'margin')}
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
                            onChange={(e, data) => handleChangeStyle(e, data, 'margin')}
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
                                onClick={() => handleChangeStyleUnit('px', 'padding')}
                                type='button'
                            >
                                PX
                            </button>
                            <button
                                className={item.styles[device].padding.unit === 'em' && 'selected'}
                                onClick={() => handleChangeStyleUnit('em', 'padding')}
                                type='button'
                            >
                                EM
                            </button>
                            <button
                                className={item.styles[device].padding.unit === '%' && 'selected'}
                                onClick={() => handleChangeStyleUnit('%', 'padding')}
                                type='button'
                            >
                                %
                            </button>
                            <button
                                className={item.styles[device].padding.unit === 'rem' && 'selected'}
                                onClick={() => handleChangeStyleUnit('rem', 'padding')}
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
                            value={item.styles[device].padding.right}
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
                            value={item.styles[device].padding.bottom}
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
                            value={item.styles[device].padding.left}
                            onChange={(e, data) => handleChangeStyle(e, data, 'padding')}
                        />
                    </div>
                </div>
            </Accordion>
        </>
    );
}

Advanced.propTypes = {
    item: PropTypes.shape({
        styles: PropTypes.shape({
        }).isRequired,
    }).isRequired,
    device: PropTypes.string.isRequired,
    setItem: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};
