import React from 'react';
import ColorPicker from 'components/ColorPicker/ColorPicker';
import Accordion from 'components/Accordion/Accordion';
import { borderOptions } from 'variables/options';
import { useIntl } from 'react-intl';
import Input from 'components/Form/Input/Input';
import Dropdown from 'components/Form/Dropdown/Dropdown';
import PropTypes from 'prop-types';
import {
    changeBorder,
    changeBorderRadiusUnit,
    changeBorderType,
    changeBorderColor,
} from 'variables/functions';
import Tab from 'components/Tab/Tab';
import Grid from 'container/Grid/Grid';
import Field from 'components/Form/Field/Field';

export default function Border({ item,
    device,
    setItem,
    onChange }) {
    const intl = useIntl();

    const handleChangeBorder = (_e, data, key, mode) => {
        changeBorder(_e, data, key, mode, item, device, setItem, onChange);
    };

    const handleChangeBorderType = (_e, data, mode) => {
        changeBorderType(_e, data, mode, item, device, setItem, onChange);
    };

    const handleChangeBorderColor = (color, mode) => {
        changeBorderColor(color, mode, item, device, setItem, onChange);
    };

    const handleChangeBorderRadiusUnit = (unit, mode) => {
        changeBorderRadiusUnit(unit, mode, item, device, setItem, onChange);
    };

    const borderPanes = [
        {
            label: intl.formatMessage({
                id: 'builder.normal',
                defaultMessage: 'Normal',
            }),
            render: () => (
                <Tab.Pane>
                    <Dropdown
                        name='type'
                        defaultValue={
                            item.content[device].styles.border.normal.type
                        }
                        options={borderOptions}
                        onChange={(e, data) => handleChangeBorderType(e, data, 'normal')}
                        label={intl.formatMessage({
                            id: 'builder.border.type',
                            defaultMessage: 'Border type',
                        })}
                        searchable
                        notClearable
                    />
                    <ColorPicker
                        defaultColor={item.content[device].styles.border.normal.color}
                        onColorChange={(color) => handleChangeBorderColor(color, 'normal')}
                        label={intl.formatMessage({
                            id: 'builder.color',
                            defaultMessage: 'Color',
                        })}
                        name='normalColor'
                    />
                    <Field
                        label={intl.formatMessage({
                            id: 'builder.border.weight',
                            defaultMessage: 'Border weight',
                        })}
                        name='borderWeight'
                    >
                        <Grid columns={2}>
                            <Grid.Column>
                                <Input
                                    label={intl.formatMessage({
                                        id: 'builder.top',
                                        defaultMessage: 'Top',
                                    })}
                                    name='top'
                                    type='number'
                                    defaultValue={
                                        item.content[device].styles.border.normal.width.top
                                    }
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Input
                                    label={intl.formatMessage({
                                        id: 'builder.right',
                                        defaultMessage: 'Right',
                                    })}
                                    name='right'
                                    type='number'
                                    defaultValue={
                                        item.content[device].styles.border.normal.width.right
                                    }
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Input
                                    label={intl.formatMessage({
                                        id: 'builder.bottom',
                                        defaultMessage: 'Bottom',
                                    })}
                                    name='bottom'
                                    type='number'
                                    defaultValue={
                                        item.content[device].styles.border.normal.width.bottom
                                    }
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Input
                                    label={intl.formatMessage({
                                        id: 'builder.left',
                                        defaultMessage: 'Left',
                                    })}
                                    name='left'
                                    type='number'
                                    defaultValue={
                                        item.content[device].styles.border.normal.width.left
                                    }
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}
                                />
                            </Grid.Column>
                        </Grid>
                    </Field>
                    <Field
                        label={intl.formatMessage({
                            id: 'builder.border.radius',
                            defaultMessage: 'Border radius',
                        })}
                        name='borderRadius'
                        subLabel={(
                            <>
                                <span
                                    data-selected={`${item.content[device].styles.border.normal.radius.unit === 'px'}`}
                                    onClick={() => handleChangeBorderRadiusUnit('px', 'normal')}
                                    onKeyDown={() => handleChangeBorderRadiusUnit('px', 'normal')}
                                    role='button'
                                    tabIndex='0'
                                >
                                    PX
                                </span>
                                <span
                                    data-selected={`${item.content[device].styles.border.normal.radius.unit === '%'}`}
                                    onClick={() => handleChangeBorderRadiusUnit('%', 'normal')}
                                    onKeyDown={() => handleChangeBorderRadiusUnit('%', 'normal')}
                                    role='button'
                                    tabIndex='0'
                                >
                                    %
                                </span>
                            </>
                          )}
                    >
                        <Grid columns={2}>
                            <Grid.Column>
                                <Input
                                    label={intl.formatMessage({
                                        id: 'builder.top.left',
                                        defaultMessage: 'Top left',
                                    })}
                                    name='top'
                                    type='number'
                                    defaultValue={
                                        item.content[device].styles.border.normal.radius.top
                                    }
                                    onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'normal')}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Input
                                    label={intl.formatMessage({
                                        id: 'builder.top.right',
                                        defaultMessage: 'Top right',
                                    })}
                                    name='right'
                                    type='number'
                                    defaultValue={
                                        item.content[device].styles.border.normal.radius.right
                                    }
                                    onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'normal')}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Input
                                    label={intl.formatMessage({
                                        id: 'builder.bottom.left',
                                        defaultMessage: 'Bottom Left',
                                    })}
                                    name='left'
                                    type='number'
                                    defaultValue={
                                        item.content[device].styles.border.normal.radius.left
                                    }
                                    onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'normal')}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Input
                                    label={intl.formatMessage({
                                        id: 'builder.bottom.right',
                                        defaultMessage: 'Bottom right',
                                    })}
                                    name='bottom'
                                    type='number'
                                    defaultValue={
                                        item.content[device].styles.border.normal.radius.bottom
                                    }
                                    onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'normal')}
                                />
                            </Grid.Column>
                        </Grid>
                    </Field>
                </Tab.Pane>
            ),
        },
        {
            label: intl.formatMessage({
                id: 'builder.hover',
                defaultMessage: 'Hover',
            }),
            render: () => (
                <Tab.Pane>
                    <Dropdown
                        name='type'
                        defaultValue={
                            item.content[device].styles.border.hover.type
                        }
                        options={borderOptions}
                        onChange={(e, data) => handleChangeBorderType(e, data, 'hover')}
                        label={intl.formatMessage({
                            id: 'builder.border.type',
                            defaultMessage: 'Border type',
                        })}
                        searchable
                        notClearable
                    />
                    <ColorPicker
                        defaultColor={item.content[device].styles.border.hover.color}
                        onColorChange={(color) => handleChangeBorderColor(color, 'hover')}
                        label={intl.formatMessage({
                            id: 'builder.color',
                            defaultMessage: 'Color',
                        })}
                        name='hoverColor'
                    />
                    <Field
                        label={intl.formatMessage({
                            id: 'builder.border.weight',
                            defaultMessage: 'Border weight',
                        })}
                        name='borderWeightHover'
                    >
                        <Grid columns={2}>
                            <Grid.Column>
                                <Input
                                    label={intl.formatMessage({
                                        id: 'builder.top',
                                        defaultMessage: 'Top',
                                    })}
                                    name='top'
                                    type='number'
                                    defaultValue={
                                        item.content[device].styles.border.hover.width.top
                                    }
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Input
                                    label={intl.formatMessage({
                                        id: 'builder.right',
                                        defaultMessage: 'Right',
                                    })}
                                    name='right'
                                    type='number'
                                    defaultValue={
                                        item.content[device].styles.border.hover.width.right
                                    }
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Input
                                    label={intl.formatMessage({
                                        id: 'builder.bottom',
                                        defaultMessage: 'Bottom',
                                    })}
                                    name='bottom'
                                    type='number'
                                    defaultValue={
                                        item.content[device].styles.border.hover.width.bottom
                                    }
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Input
                                    label={intl.formatMessage({
                                        id: 'builder.left',
                                        defaultMessage: 'Left',
                                    })}
                                    name='left'
                                    type='number'
                                    defaultValue={
                                        item.content[device].styles.border.hover.width.left
                                    }
                                    onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}
                                />
                            </Grid.Column>
                        </Grid>
                    </Field>
                    <Field
                        label={intl.formatMessage({
                            id: 'builder.border.radius',
                            defaultMessage: 'Border radius',
                        })}
                        name='borderRadiusHover'
                        subLabel={(
                            <>
                                <span
                                    data-selected={`${item.content[device].styles.border.hover.radius.unit === 'px'}`}
                                    onClick={() => handleChangeBorderRadiusUnit('px', 'hover')}
                                    onKeyDown={() => handleChangeBorderRadiusUnit('px', 'hover')}
                                    role='button'
                                    tabIndex='0'
                                >
                                    PX
                                </span>
                                <span
                                    data-selected={`${item.content[device].styles.border.hover.radius.unit === '%'}`}
                                    onClick={() => handleChangeBorderRadiusUnit('%', 'hover')}
                                    onKeyDown={() => handleChangeBorderRadiusUnit('%', 'hover')}
                                    role='button'
                                    tabIndex='0'
                                >
                                    %
                                </span>
                            </>
                          )}
                    >
                        <Grid columns={2}>
                            <Grid.Column>
                                <Input
                                    label={intl.formatMessage({
                                        id: 'builder.top.left',
                                        defaultMessage: 'Top left',
                                    })}
                                    name='top'
                                    type='number'
                                    defaultValue={
                                        item.content[device].styles.border.hover.radius.top
                                    }
                                    onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'hover')}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Input
                                    label={intl.formatMessage({
                                        id: 'builder.top.right',
                                        defaultMessage: 'Top right',
                                    })}
                                    name='right'
                                    type='number'
                                    defaultValue={
                                        item.content[device].styles.border.hover.radius.right
                                    }
                                    onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'hover')}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Input
                                    label={intl.formatMessage({
                                        id: 'builder.bottom.left',
                                        defaultMessage: 'Bottom left',
                                    })}
                                    name='left'
                                    type='number'
                                    defaultValue={
                                        item.content[device].styles.border.hover.radius.left
                                    }
                                    onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'hover')}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Input
                                    label={intl.formatMessage({
                                        id: 'builder.bottom.right',
                                        defaultMessage: 'Bottom right',
                                    })}
                                    name='bottom'
                                    type='number'
                                    defaultValue={
                                        item.content[device].styles.border.hover.radius.bottom
                                    }
                                    onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'hover')}
                                />
                            </Grid.Column>
                        </Grid>
                    </Field>
                </Tab.Pane>
            ),
        },
    ];

    return (
        <>
            <Accordion
                active={false}
                title={intl.formatMessage({
                    id: 'builder.border',
                    defaultMessage: 'Border',
                })}
            >
                <Tab
                    panes={borderPanes}
                />
            </Accordion>
        </>
    );
}

Border.propTypes = {
    item: PropTypes.shape({
        content: PropTypes.shape({
        }).isRequired,
    }).isRequired,
    device: PropTypes.string.isRequired,
    setItem: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};
