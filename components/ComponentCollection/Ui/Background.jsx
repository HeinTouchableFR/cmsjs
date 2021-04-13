import React from 'react';
import ColorPicker from 'components/ColorPicker/ColorPicker';
import Accordion from 'components/Accordion/Accordion';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { colorChange } from 'variables/functions';
import { Tab } from 'semantic-ui-react';

export default function Background({ item, device, setItem, onChange }) {
    const intl = useIntl();

    const handleColorChange = (color, key, mode, location) => {
        colorChange(item, device, setItem, onChange, color, key, mode, location);
    }

    const backgroundPanes = [
        {
            menuItem: intl.formatMessage({
                id: 'builder.normal',
                defaultMessage: 'Normal',
            }),
            render: () => (
                <div className='accordion__pane'>
                    <ColorPicker
                        defaultColor={item.content[device].styles.background.normal}
                        onColorChange={(color) => handleColorChange(color, 'background', 'normal', 'styles')}
                    />
                </div>
            ),
        },
        {
            menuItem: intl.formatMessage({
                id: 'builder.hover',
                defaultMessage: 'Hover',
            }),
            render: () => (
                <div className='accordion__pane'>
                    <ColorPicker
                        defaultColor={item.content[device].styles.background.hover}
                        onColorChange={(color) => handleColorChange(color, 'background', 'hover', 'styles')}
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            <Accordion
                active={false}
                title={intl.formatMessage({
                    id: 'builder.background',
                    defaultMessage: 'Background',
                })}
            >
                <Tab
                    menu={{
                        secondary: true,
                        pointing: true,
                    }}
                    panes={backgroundPanes}
                />
            </Accordion>
        </>
    );
}

Background.propTypes = {
    item: PropTypes.shape({
        content: PropTypes.shape({
        }).isRequired,
    }).isRequired,
    device: PropTypes.string.isRequired,
    setItem: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};
