import React, {
    useState, useEffect,
} from 'react';
import Tooltip from 'components/Form/Tooltip/Tooltip';
import Popover from '@xkit/popover';
import { parseColor } from 'utils/color';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import styles from './ColorPicker.module.scss';
import Picker from './Picker';

export default function ColorPicker({ defaultColor,
    onColorChange,
    name,
    label,
    iconTip,
    tip,
    placement }) {
    const [color, setColor] = useState(parseColor(defaultColor));

    const changeColor = (c) => {
        if (onColorChange) {
            setColor(c);
            onColorChange(c.hex);
        }
    };

    const handleRemove = () => {
        changeColor('');
    };

    useEffect(() => {
        changeColor(parseColor(defaultColor));
    }, [defaultColor]);

    return (
        <div className={`${styles.field}`}>
            <label htmlFor={name}>
                {label}
                {' '}
                {tip && (
                    <Tooltip
                        tip={tip}
                        iconTip={iconTip}
                    />
                )}
            </label>
            <div className={`${styles.ui}`}>
                <Popover
                    placement={placement}
                    body={(
                        <Picker
                            color={color}
                            onChange={changeColor}
                        />
                    )}
                >
                    <span
                        css={css`
                            display: grid;
                            user-select: none;
                        `}
                    >
                        <span
                            css={css`
                                cursor: pointer;
                             `}
                            style={{
                                backgroundColor: color.rgba,
                            }}
                        />
                    </span>
                </Popover>
                <span
                    onClick={handleRemove}
                    onKeyDown={handleRemove}
                    role='button'
                    tabIndex={0}
                    css={css`
                         cursor: pointer;
                         text-align: center;
                         font-size: 12px;
                         font-weight: bold;
                    `}
                >
                    x
                </span>
            </div>
        </div>
    );
}

ColorPicker.propTypes = {
    defaultColor: PropTypes.string,
    onColorChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    label: PropTypes.string,
    iconTip: PropTypes.string,
    tip: PropTypes.string,
    placement: PropTypes.string,
};

ColorPicker.defaultProps = {
    defaultColor: '',
    name: '',
    label: '',
    iconTip: '',
    tip: '',
    placement: 'right',
};
