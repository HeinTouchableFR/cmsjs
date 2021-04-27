import React from 'react';
import ColorPicker from 'components/ColorPicker/ColorPicker';
import Accordion from 'components/Accordion/Accordion';
import {borderOptions} from 'variables/options';
import {useIntl} from 'react-intl';
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

export default function Border({
                                   item,
                                   device,
                                   setItem,
                                   onChange
                               }) {
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
                    <div className='field'>
                        <div>
                            {intl.formatMessage({
                                id: 'builder.border.weight',
                                defaultMessage: 'Border weight',
                            })}
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
                                defaultValue={
                                    item.content[device].styles.border.normal.width.top
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}
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
                                defaultValue={
                                    item.content[device].styles.border.normal.width.right
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}
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
                                defaultValue={
                                    item.content[device].styles.border.normal.width.bottom
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}
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
                                defaultValue={
                                    item.content[device].styles.border.normal.width.left
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'normal')}
                            />
                        </div>
                    </div>
                    <div className='field'>
                        <div className='form__inline_item'>
                            <div>
                                {intl.formatMessage({
                                    id: 'builder.border.radius',
                                    defaultMessage: 'Border radius',
                                })}
                            </div>
                            <div className='field-group'>
                                <span
                                    className={`${item.content[device].styles.border.normal.radius.unit === 'px' && 'selected'}`}
                                    onClick={() => handleChangeBorderRadiusUnit('px', 'normal')}
                                    onKeyDown={() => handleChangeBorderRadiusUnit('px', 'normal')}
                                    role='button'
                                    tabIndex='0'
                                >
                                    PX
                                </span>
                                <span
                                    className={`${item.content[device].styles.border.normal.radius.unit === '%' && 'selected'}`}
                                    onClick={() => handleChangeBorderRadiusUnit('%', 'normal')}
                                    onKeyDown={() => handleChangeBorderRadiusUnit('%', 'normal')}
                                    role='button'
                                    tabIndex='0'
                                >
                                    %
                                </span>
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
                                defaultValue={
                                    item.content[device].styles.border.normal.radius.top
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'normal')}
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
                                defaultValue={
                                    item.content[device].styles.border.normal.radius.right
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'normal')}
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
                                defaultValue={
                                    item.content[device].styles.border.normal.radius.bottom
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'normal')}
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
                                defaultValue={
                                    item.content[device].styles.border.normal.radius.left
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'normal')}
                            />
                        </div>
                    </div>
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
                    <div className='field'>
                        <div>
                            {intl.formatMessage({
                                id: 'builder.border.weight',
                                defaultMessage: 'Border weight',
                            })}
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
                                defaultValue={
                                    item.content[device].styles.border.hover.width.top
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}
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
                                defaultValue={
                                    item.content[device].styles.border.hover.width.right
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}
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
                                defaultValue={
                                    item.content[device].styles.border.hover.width.bottom
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}
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
                                defaultValue={
                                    item.content[device].styles.border.hover.width.left
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'width', 'hover')}
                            />
                        </div>
                    </div>
                    <div className='field'>
                        <div className='form__inline_item'>
                            <div>
                                {intl.formatMessage({
                                    id: 'builder.border.radius',
                                    defaultMessage: 'Border radius',
                                })}
                            </div>
                            <div className='field-group'>
                                <span
                                    className={`${item.content[device].styles.border.hover.radius.unit === 'px' && 'selected'}`}
                                    onClick={() => handleChangeBorderRadiusUnit('px', 'hover')}
                                    onKeyDown={() => handleChangeBorderRadiusUnit('px', 'hover')}
                                    role='button'
                                    tabIndex='0'
                                >
                                    PX
                                </span>
                                <span
                                    className={`${item.content[device].styles.border.hover.radius.unit === '%' && 'selected'}`}
                                    onClick={() => handleChangeBorderRadiusUnit('%', 'hover')}
                                    onKeyDown={() => handleChangeBorderRadiusUnit('%', 'hover')}
                                    role='button'
                                    tabIndex='0'
                                >
                                    %
                                </span>
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
                                defaultValue={
                                    item.content[device].styles.border.hover.radius.top
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'hover')}
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
                                defaultValue={
                                    item.content[device].styles.border.hover.radius.right
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'hover')}
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
                                defaultValue={
                                    item.content[device].styles.border.hover.radius.bottom
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'hover')}
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
                                defaultValue={
                                    item.content[device].styles.border.hover.radius.left
                                }
                                onChange={(e, data) => handleChangeBorder(e, data, 'radius', 'hover')}
                            />
                        </div>
                    </div>
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
        content: PropTypes.shape({}).isRequired,
    }).isRequired,
    device: PropTypes.string.isRequired,
    setItem: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};
