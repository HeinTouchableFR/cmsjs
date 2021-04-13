import React from 'react';
import Accordion from 'components/Accordion/Accordion';
import {
    animationsOptions,
    durationsOptions,
} from 'variables/options';
import { useIntl } from 'react-intl';
import Input from 'components/Form/Input/Input';
import Dropdown from 'components/Form/Dropdown/Dropdown';
import PropTypes from 'prop-types';
import { changeAnimation } from 'variables/functions';

export default function Animations({ item, device, setItem, onChange }) {
    const intl = useIntl();

    const handleChangeAnimation = (_e, data) => {
        changeAnimation(_e, data, item, device, setItem, onChange);
    };

    return (
        <>
            <Accordion
                active={false}
                title={intl.formatMessage({
                    id: 'builder.animation',
                    defaultMessage: 'Animation',
                })}
            >
                <div className='field'>
                    <div>
                        {intl.formatMessage({
                            id: 'builder.animation.entrance',
                            defaultMessage: 'Entrance Animation',
                        })}
                    </div>
                    <Dropdown
                        name='name'
                        value={item.content[device].animation.name}
                        options={animationsOptions}
                        onChange={handleChangeAnimation}
                    />
                </div>
                <div className='field'>
                    <div>
                        {intl.formatMessage({
                            id: 'builder.duration',
                            defaultMessage: 'Duration',
                        })}
                    </div>
                    <Dropdown
                        name='duration'
                        value={item.content[device].animation.duration}
                        options={durationsOptions}
                        onChange={handleChangeAnimation}
                    />
                </div>
                <Input
                    label={
                        intl.formatMessage({
                            id: 'builder.animation.delay',
                            defaultMessage: 'Animation Delay (ms)',
                        })
                    }
                    placeholder='0'
                    name='delay'
                    type='number'
                    value={item.content[device].animation.delay}
                    onChange={handleChangeAnimation}
                />
            </Accordion>
        </>
    );
}

Animations.propTypes = {
    item: PropTypes.shape({
        content: PropTypes.shape({
        }).isRequired,
    }).isRequired,
    device: PropTypes.string.isRequired,
    setItem: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};
