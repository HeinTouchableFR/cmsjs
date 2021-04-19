import React from 'react';
import ColorPicker from 'components/ColorPicker/ColorPicker';
import Accordion from 'components/Accordion/Accordion';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { colorChange } from 'variables/functions';
import Tab from 'components/Tab/Tab';

export default function Background({ item, device, setItem, onChange }) {
    const intl = useIntl();

    const handleColorChange = (color, key, mode, location) => {
        colorChange(item, device, setItem, onChange, color, key, mode, location);
    }

    const backgroundPanes = [
        {
            label: intl.formatMessage({
                id: 'builder.normal',
                defaultMessage: 'Normal',
            }),
            render: () => (
                <Tab.Pane>
                    <ColorPicker
                        defaultColor={item.content[device].styles.background.normal}
                        onColorChange={(color) => handleColorChange(color, 'background', 'normal', 'styles')}
                    />
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
                    <ColorPicker
                        defaultColor={item.content[device].styles.background.hover}
                        onColorChange={(color) => handleColorChange(color, 'background', 'hover', 'styles')}
                    />
                </Tab.Pane>
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
