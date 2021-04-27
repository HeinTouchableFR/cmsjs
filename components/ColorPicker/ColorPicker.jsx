import React, {
    useEffect, useState,
} from 'react';
import { SketchPicker } from 'react-color';
import Tooltip from 'components/Form/Tooltip/Tooltip';
import { css } from '@emotion/react';
import styles from './ColorPicker.module.scss';

export default function ColorPicker({ defaultColor = '#FF0000', onColorChange, name, label,
    iconTip,
    tip }) {
    const [state, setState] = useState({
        displayColorPicker: false,
        color: defaultColor,
    });

    useEffect(() => {
        setState({
            ...state,
            color: defaultColor,
        });
    }, [defaultColor]);

    const handleClick = () => {
        setState({
            ...state, displayColorPicker: !state.displayColorPicker,
        });
    };

    const handleClose = () => {
        setState({
            ...state, displayColorPicker: false,
        });
    };

    const handleChange = (color) => {
        onColorChange(color.hex);
        setState({
            ...state, color: color.hex,
        });
    };

    const color = css({
        background: `${state.color}`,
    });

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
                <div
                    className={styles.swatch}
                    onClick={handleClick}
                    onKeyDown={handleClick}
                    role='button'
                    tabIndex={0}
                >
                    <div
                        className={styles.color}
                        css={color}
                    />
                </div>
                {state.displayColorPicker ? (
                    <div className={styles.popover}>
                        <div
                            className={styles.cover}
                            onClick={handleClose}
                            onKeyDown={handleClose}
                            role='button'
                            tabIndex={0}
                        />
                        <SketchPicker
                            color={state.color}
                            onChange={handleChange}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
}
