import React, {
    useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';
// Components
import { flexAlignmentsOptions } from 'variables/options';
import Accordion from 'components/Accordion/Accordion';
import Dropdown from 'components/Form/Dropdown/Dropdown';
import Typography from 'components/ComponentCollection/Ui/Typography';
import PropTypes from 'prop-types';
import { change } from 'variables/functions';
import Advanced from '../Ui/Advanced';
import Background from '../Ui/Background';
import Border from '../Ui/Border';
import Animations from '../Ui/Animations';
import { useBuilder } from 'context/builder';

export default function Menu({ element, device, onElementValueChange }) {
    const intl = useIntl();
    const [item, setItem] = useState(element);
    const { menus } = useBuilder();

    useEffect(() => {
        if (element.content.menu && element.type === 'menu') {
            setItem(element);
        }
    },
    [element]);

    const handleChange = (_e, data) => {
        change(_e, data, item, setItem, onElementValueChange);
    };

    const menusOptions = [
    ];
    menus.map((menu) => menusOptions.push({
        key: menu.id,
        text: menu.name,
        value: menu.id,
    }))

    return (
        <>
            <Accordion
                active
                title='Menu'
            >
                <Dropdown
                    name='menu'
                    defaultValue={item.content.menu}
                    options={menusOptions}
                    onChange={handleChange}
                    label={intl.formatMessage({
                        id: 'builder.menu', defaultMessage: 'Menu',
                    })}
                    searchable
                />
                <Dropdown
                    name='alignment'
                    defaultValue={item.content.alignment}
                    options={flexAlignmentsOptions}
                    onChange={handleChange}
                    label={intl.formatMessage({
                        id: 'builder.alignment', defaultMessage: 'Alignment',
                    })}
                    searchable
                />
            </Accordion>
            <Typography
                item={item}
                setItem={setItem}
                device={device}
                onChange={onElementValueChange}
            />
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

Menu.propTypes = {
    device: PropTypes.string.isRequired,
    element: PropTypes.shape({
        content: PropTypes.shape({
            menu: PropTypes.shape({
            }).isRequired,
        }).isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
    onElementValueChange: PropTypes.func.isRequired,
};
