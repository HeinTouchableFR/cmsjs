import React, {
    useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';

// Style
// Components
import FileManager from 'components/FileManager/FileManager';
import { alignmentsOptions } from 'variables/options';
import Accordion from 'components/Accordion/Accordion';
import Input from 'components/Form/Input/Input';
import Dropdown from 'components/Form/Dropdown/Dropdown';
import PropTypes from 'prop-types';
import {
    change,
    changeImageValue,
    changeImageValueUnit,
    changeImage,
} from 'variables/functions';
import Advanced from '../Ui/Advanced';
import Background from '../Ui/Background';
import Border from '../Ui/Border';
import Animations from '../Ui/Animations';

export default function Gallery({ element, device, onElementValueChange, files, setFiles }) {
    const intl = useIntl();
    const [item, setItem] = useState(element);

    useEffect(() => {
        if (element.content.image && element.type === 'image') {
            setItem(element);
        }
    },
    [element]);

    const handleChangeImage = (file) => {
        changeImage(file, item, setItem, onElementValueChange);
    };

    const handleChange = (_e, data) => {
        change(_e, data, item, setItem, onElementValueChange);
    };

    const handleChangeGalleryValue = (e, data, key, value) => {
        changeImageValue(e, data, key, value, item, device, setItem, onElementValueChange);
    };

    const handleChangeImageValueUnit = (unit, key, value) => {
        changeImageValueUnit(unit, key, value, item, device, setItem, onElementValueChange);
    };

    return (
        <>
            <Accordion
                active
                title='Gallery'
            >
                <Input
                    label={intl.formatMessage({
                        id: 'builder.nbwidth', defaultMessage: 'Number of images (horizontal)',
                    })}
                    placeholder='2'
                    name='value'
                    type='number'
                    min='1'
                    max='10'
                    step='1'
                    defaultValue={item.content[device].gallery.nbImage.width}
                    onChange={(e, data) => handleChangeGalleryValue(e, data, 'number', 'width')}
                />
                <Input
                    label={intl.formatMessage({
                        id: 'builder.nbheight', defaultMessage: 'Number of images (vertical)',
                    })}
                    placeholder='2'
                    name='value'
                    type='number'
                    min='1'
                    max='10'
                    step='1'
                    defaultValue={item.content[device].gallery.nbImage.height.value}
                    onChange={(e, data) => handleChangeGalleryValue(e, data, 'number', 'height')}
                />
                <FileManager
                    files={files}
                    setFiles={setFiles}
                    currentFiles={item.content.gallery.url !== '/placeholder.png' ? [item.content.image] : []}
                    setCurrentFiles={handleChangeImage}
                    multiple={false}
                />
                <Input
                    label={intl.formatMessage({
                        id: 'builder.width', defaultMessage: 'Width',
                    })}
                    placeholder='100'
                    name='value'
                    type='number'
                    min='1'
                    max={item.content[device].gallery.size.width.unit === 'px' ? '1000' : '100'}
                    step='1'
                    defaultValue={item.content[device].gallery.size.width.value}
                    onChange={(e, data) => handleChangeGalleryValue(e, data, 'size', 'width')}
                    subLabel={(
                        <>
                            <span
                                data-selected={`${item.content[device].gallery.size.width.unit === '%'}`}
                                onClick={() => handleChangeImageValueUnit('%', 'size', 'width')}
                                onKeyDown={() => handleChangeImageValueUnit('%', 'size', 'width')}
                                role='button'
                                tabIndex='0'
                            >
                                %
                            </span>
                            <span
                                data-selected={`${item.content[device].gallery.size.width.unit === 'px'}`}
                                onClick={() => handleChangeImageValueUnit('px', 'size', 'width')}
                                onKeyDown={() => handleChangeImageValueUnit('px', 'size', 'width')}
                                role='button'
                                tabIndex='0'
                            >
                                PX
                            </span>
                            <span
                                data-selected={`${item.content[device].gallery.size.width.unit === 'vw'}`}
                                onClick={() => handleChangeImageValueUnit('vw', 'size', 'width')}
                                onKeyDown={() => handleChangeImageValueUnit('vw', 'size', 'width')}
                                role='button'
                                tabIndex='0'
                            >
                                VW
                            </span>
                        </>
                    )}
                />
                <Input
                    label={intl.formatMessage({
                        id: 'builder.width.max', defaultMessage: 'Max width',
                    })}
                    placeholder='100'
                    name='value'
                    type='number'
                    min='1'
                    max={item.content[device].gallery.size.maxWidth.unit === 'px' ? '1000' : '100'}
                    step='1'
                    defaultValue={item.content[device].gallery.size.maxWidth.value}
                    onChange={(e, data) => handleChangeGalleryValue(e, data, 'size', 'maxWidth')}
                    subLabel={(
                        <>
                            <span
                                data-selected={`${item.content[device].gallery.size.maxWidth.unit === '%'}`}
                                onClick={() => handleChangeImageValueUnit('%', 'size', 'maxWidth')}
                                onKeyDown={() => handleChangeImageValueUnit('%', 'size', 'maxWidth')}
                                role='button'
                                tabIndex='0'
                            >
                                %
                            </span>
                            <span
                                data-selected={`${item.content[device].gallery.size.maxWidth.unit === 'px'}`}
                                onClick={() => handleChangeImageValueUnit('px', 'size', 'maxWidth')}
                                onKeyDown={() => handleChangeImageValueUnit('px', 'size', 'maxWidth')}
                                role='button'
                                tabIndex='0'
                            >
                                PX
                            </span>
                            <span
                                data-selected={`${item.content[device].gallery.size.maxWidth.unit === 'vw'}`}
                                onClick={() => handleChangeImageValueUnit('vw', 'size', 'maxWidth')}
                                onKeyDown={() => handleChangeImageValueUnit('vw', 'size', 'maxWidth')}
                                role='button'
                                tabIndex='0'
                            >
                                VW
                            </span>
                        </>
                    )}
                />
                <Input
                    label={intl.formatMessage({
                        id: 'builder.height', defaultMessage: 'Height',
                    })}
                    placeholder='Value (blank for auto)'
                    name='value'
                    type='number'
                    min='1'
                    max={item.content[device].gallery.size.height.unit === 'px' ? '500' : '100'}
                    step='1'
                    defaultValue={item.content[device].gallery.size.height.value !== 'auto' ? item.content[device].gallery.size.height.value : ''}
                    onChange={(e, data) => handleChangeGalleryValue(e, data, 'size', 'height')}
                    subLabel={(
                        <>
                            <span
                                data-selected={`${item.content[device].gallery.size.height.unit === 'px'}`}
                                onClick={() => handleChangeImageValueUnit('px', 'size', 'height')}
                                onKeyDown={() => handleChangeImageValueUnit('px', 'size', 'height')}
                                role='button'
                                tabIndex='0'
                            >
                                PX
                            </span>
                            <span
                                data-selected={`${item.content[device].gallery.size.height.unit === 'vh'}`}
                                onClick={() => handleChangeImageValueUnit('vh', 'size', 'height')}
                                onKeyDown={() => handleChangeImageValueUnit('vh', 'size', 'height')}
                                role='button'
                                tabIndex='0'
                            >
                                VH
                            </span>
                        </>
                    )}
                />
                <Dropdown
                    name='alignment'
                    defaultValue={item.content.alignment}
                    options={alignmentsOptions}
                    onChange={handleChange}
                    label={intl.formatMessage({
                        id: 'builder.alignment', defaultMessage: 'Alignment',
                    })}
                    searchable
                />
            </Accordion>
            <Advanced
                item={item}
                setItem={setItem}
                device={device}
                onChange={onElementValueChange}
            />
            <Background
                item={item}
                setItem={setItem}
                device={device}
                onChange={onElementValueChange}
            />
            <Border
                item={item}
                setItem={setItem}
                device={device}
                onChange={onElementValueChange}
            />
            <Animations
                item={item}
                setItem={setItem}
                device={device}
                onChange={onElementValueChange}
            />
        </>
    );
}

Gallery.propTypes = {
    device: PropTypes.string.isRequired,
    element: PropTypes.shape({
        content: PropTypes.shape({
            image: PropTypes.shape({
            }).isRequired,
        }).isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
    onElementValueChange: PropTypes.func.isRequired,
    files: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    setFiles: PropTypes.func.isRequired,
};
