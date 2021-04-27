import React from 'react';
import Accordion from 'components/Accordion/Accordion';
import { useIntl } from 'react-intl';
import Input from 'components/Form/Input/Input';
import PropTypes from 'prop-types';
import {
    changeStyle,
    changeStyleUnit,
} from 'variables/functions';
import Grid from 'container/Grid/Grid';
import Field from 'components/Form/Field/Field';

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
                <Field
                    label={intl.formatMessage({
                        id: 'builder.margin',
                        defaultMessage: 'Margin',
                    })}
                    name='margin'
                    subLabel={(
                        <>
                            <span
                                data-selected={`${item.styles[device].margin.unit === 'px'}`}
                                onClick={() => handleChangeStyleUnit('px', 'margin')}
                                onKeyDown={() => handleChangeStyleUnit('px', 'margin')}
                                role='button'
                                tabIndex='0'
                            >
                                PX
                            </span>
                            <span
                                data-selected={`${item.styles[device].margin.unit === 'em'}`}
                                onKeyDown={() => handleChangeStyleUnit('em', 'margin')}
                                role='button'
                                tabIndex='0'
                            >
                                EM
                            </span>
                            <span
                                data-selected={`${item.styles[device].margin.unit === '%'}`}
                                onKeyDown={() => handleChangeStyleUnit('%', 'margin')}
                                role='button'
                                tabIndex='0'
                            >
                                %
                            </span>
                            <span
                                data-selected={`${item.styles[device].margin.unit === 'rem'}`}
                                onKeyDown={() => handleChangeStyleUnit('rem', 'margin')}
                                role='button'
                                tabIndex='0'
                            >
                                REM
                            </span>
                        </>
                    )}
                >
                    <Grid columns={2}>
                        <Grid.Column>
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
                                defaultValue={item.styles[device].margin.top}
                                onChange={(e, data) => handleChangeStyle(e, data, 'margin')}
                            />
                        </Grid.Column>
                        <Grid.Column>
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
                                defaultValue={item.styles[device].margin.right}
                                onChange={(e, data) => handleChangeStyle(e, data, 'margin')}
                            />
                        </Grid.Column>
                        <Grid.Column>
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
                                defaultValue={item.styles[device].margin.bottom}
                                onChange={(e, data) => handleChangeStyle(e, data, 'margin')}
                            />
                        </Grid.Column>
                        <Grid.Column>
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
                                defaultValue={item.styles[device].margin.left}
                                onChange={(e, data) => handleChangeStyle(e, data, 'margin')}
                            />
                        </Grid.Column>
                    </Grid>
                </Field>
                <Field
                    label={intl.formatMessage({
                        id: 'builder.padding',
                        defaultMessage: 'Padding',
                    })}
                    name='padding'
                    subLabel={(
                        <>
                            <span
                                data-selected={`${item.styles[device].padding.unit === 'px'}`}
                                onClick={() => handleChangeStyleUnit('px', 'padding')}
                                onKeyDown={() => handleChangeStyleUnit('px', 'padding')}
                                role='button'
                                tabIndex='0'
                            >
                                PX
                            </span>
                            <span
                                data-selected={`${item.styles[device].padding.unit === 'em'}`}
                                onClick={() => handleChangeStyleUnit('em', 'padding')}
                                onKeyDown={() => handleChangeStyleUnit('em', 'padding')}
                                role='button'
                                tabIndex='0'
                            >
                                EM
                            </span>
                            <span
                                data-selected={`${item.styles[device].padding.unit === '%'}`}
                                onClick={() => handleChangeStyleUnit('%', 'padding')}
                                onKeyDown={() => handleChangeStyleUnit('%', 'padding')}
                                role='button'
                                tabIndex='0'
                            >
                                %
                            </span>
                            <span
                                data-selected={`${item.styles[device].padding.unit === 'rem'}`}
                                onClick={() => handleChangeStyleUnit('rem', 'padding')}
                                onKeyDown={() => handleChangeStyleUnit('rem', 'padding')}
                                role='button'
                                tabIndex='0'
                            >
                                REM
                            </span>
                        </>
                      )}
                >
                    <Grid columns={2}>
                        <Grid.Column>
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
                                defaultValue={item.styles[device].padding.top}
                                onChange={(e, data) => handleChangeStyle(e, data, 'padding')}
                            />
                        </Grid.Column>
                        <Grid.Column>
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
                                defaultValue={item.styles[device].padding.right}
                                onChange={(e, data) => handleChangeStyle(e, data, 'padding')}
                            />
                        </Grid.Column>
                        <Grid.Column>
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
                                defaultValue={item.styles[device].padding.bottom}
                                onChange={(e, data) => handleChangeStyle(e, data, 'padding')}
                            />
                        </Grid.Column>
                        <Grid.Column>
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
                                defaultValue={item.styles[device].padding.left}
                                onChange={(e, data) => handleChangeStyle(e, data, 'padding')}
                            />
                        </Grid.Column>
                    </Grid>
                </Field>
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
