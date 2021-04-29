import React from 'react';
import ColorPicker from 'components/ColorPicker/ColorPicker';
import Accordion from 'components/Accordion/Accordion';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { colorChange } from 'variables/functions';
import Tab from 'components/Tab/Tab';
import Grid from 'container/Grid/Grid';

export default function Background({ item, device, setItem, onChange, isDarkModeEnable }) {
    const intl = useIntl();

    const handleColorChange = (color, key, mode, location, theme) => {
        colorChange(item, device, setItem, onChange, color, key, mode, location, theme);
    };

    const backgroundPanes = [
        {
            label: intl.formatMessage({
                id: 'builder.normal',
                defaultMessage: 'Normal',
            }),
            render: () => (
                <Tab.Pane>
                    <Grid columns={2}>
                        <Grid.Column>
                            <ColorPicker
                                defaultColor={
                                    item.content[device].styles.background.light.normal
                                }
                                onColorChange={(color) => handleColorChange(color, 'background', 'normal', 'styles', 'light')}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            {isDarkModeEnable
                            && (
                                <ColorPicker
                                    defaultColor={
                                        item.content[device].styles.background.dark.normal
                                    }
                                    onColorChange={(color) => handleColorChange(color, 'background', 'normal', 'styles', 'dark')}
                                />
                            )}
                        </Grid.Column>
                    </Grid>
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
                    <Grid columns={2}>
                        <Grid.Column>
                            <ColorPicker
                                defaultColor={
                                    item.content[device].styles.background.light.hover
                                }
                                onColorChange={(color) => handleColorChange(color, 'background', 'hover', 'styles', 'light')}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <ColorPicker
                                defaultColor={
                                    item.content[device].styles.background.dark.hover
                                }
                                onColorChange={(color) => handleColorChange(color, 'background', 'hover', 'styles', 'dark')}
                            />
                        </Grid.Column>
                    </Grid>
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
    isDarkModeEnable: PropTypes.bool.isRequired,
};
