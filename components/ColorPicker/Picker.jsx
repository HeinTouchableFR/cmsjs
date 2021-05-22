import InputSlider from 'react-input-slider';
import InputNumber from 'react-input-number';
import {
    rgb2hsv,
    hsv2hex,
    rgb2hex,
    hex2rgb,
    rgba,
    hsv2rgb,
} from '@swiftcarrot/color-fns';
import { rgba2hex } from 'utils/color';
import PropTypes from 'prop-types';
import React from 'react';

const styles = {
    picker: {
        fontFamily: '\'Helvetica Neue\',Helvetica,Arial,sans-serif',
        width: 230,

        '*': {
            userSelect: 'none',
        },
    },

    selector: {
        position: 'relative',
        width: 230,
        height: 230,
    },

    gradientWhite: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
            'linear-gradient(to right, #ffffff 0%, rgba(255, 255, 255, 0) 100%)',
    },

    gradientDark: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, transparent 0%, #000000 100%)',
    },

    inputs: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },

    input: {
        textAlign: 'center',
        fontSize: 13,
        fontWeight: 'normal',
        color: '#000',

        input: {
            width: 30,
            textAlign: 'center',
        },

        div: {
            marginTop: 4,
        },
    },
};

const Picker = ({ color, onChange }) => {
    const { red, green, blue, alpha, hue, saturation, value } = color;

    function changeColor(newColor) {
        if (onChange) {
            onChange({
                ...newColor,
                rgba: rgba(newColor.red, newColor.green, newColor.blue, newColor.alpha),
                hex: rgba2hex(newColor.red, newColor.green, newColor.blue, newColor.alpha),
            });
        }
    }

    function changeHSV(h, s, v) {
        const { r, g, b } = hsv2rgb(h, s, v);
        const hex = rgb2hex(r, g, b);
        changeColor({
            ...color, hue: h, saturation: s, value: v, red: r, green: g, blue: b, hex,
        });
    }

    function changeRGB(r, g, b) {
        const hex = rgb2hex(r, g, b);
        const { h, s, v } = rgb2hsv(r, g, b);
        changeColor({
            ...color, r, g, b, h, s, v, hex,
        });
    }

    function changeAlpha(a) {
        changeColor({
            ...color, alpha: a,
        });
    }

    function changeHex(hex) {
        const { r, g, b } = hex2rgb(hex);
        const { h, s, v } = rgb2hsv(r, g, b);
        changeColor({
            ...color, r, g, b, h, s, v, hex,
        });
    }

    function handleClick(e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    const rgbaBackground = rgba(red, green, blue, alpha);
    const rgba0 = rgba(red, green, blue, 0);
    const rgba100 = rgba(red, green, blue, 100);
    const opacityGradient = `linear-gradient(to right, ${rgba0}, ${rgba100})`;
    const hueBackground = hsv2hex(hue, 100, 100);

    return (
        <div
            css={styles.picker}
            onClick={handleClick}
            onKeyDown={handleClick}
            role='button'
            tabIndex={0}
        >
            <div
                css={styles.selector}
                style={{
                    backgroundColor: hueBackground,
                }}
            >
                <div css={styles.gradientWhite} />
                <div css={styles.gradientDark} />
                <InputSlider
                    axis='xy'
                    x={saturation}
                    xmax={100}
                    y={100 - value}
                    ymax={100}
                    onChange={({ x, y }) => changeHSV(hue, x, 100 - y)}
                    styles={{
                        track: {
                            width: '100%', height: '100%', background: 'none',
                        },
                        thumb: {
                            width: 12,
                            height: 12,
                            backgroundColor: 'rgba(0,0,0,0)',
                            border: '2px solid #fff',
                            borderRadius: '50%',
                        },
                    }}
                />
            </div>
            <div
                css={{
                    width: '100%',
                    marginTop: 10,
                    marginBottom: 10,
                    display: 'flex',
                }}
            >
                <div
                    css={{
                        flex: 1, marginRight: 10,
                    }}
                >
                    <InputSlider
                        axis='x'
                        x={hue}
                        xmax={359}
                        onChange={({ x }) => changeHSV(x, saturation, value)}
                        styles={{
                            track: {
                                width: '100%',
                                height: 12,
                                borderRadius: 0,
                                background:
                                    'linear-gradient(to left, #FF0000 0%, #FF0099 10%, #CD00FF 20%, #3200FF 30%, #0066FF 40%, #00FFFD 50%, #00FF66 60%, #35FF00 70%, #CDFF00 80%, #FF9900 90%, #FF0000 100%)',
                            },
                            active: {
                                background: 'none',
                            },
                            thumb: {
                                width: 5,
                                height: 14,
                                borderRadius: 0,
                                backgroundColor: '#eee',
                            },
                        }}
                    />
                    <InputSlider
                        axis='x'
                        x={alpha}
                        xmax={100}
                        styles={{
                            track: {
                                width: '100%',
                                height: 12,
                                borderRadius: 0,
                                background: opacityGradient,
                            },
                            active: {
                                background: 'none',
                            },
                            thumb: {
                                width: 5,
                                height: 14,
                                borderRadius: 0,
                                backgroundColor: '#eee',
                            },
                        }}
                        onChange={({ x }) => changeAlpha(x)}
                    />
                </div>
                <div
                    style={{
                        backgroundColor: rgbaBackground, width: 30, height: 30,
                    }}
                />
            </div>

            <div css={styles.inputs}>
                <div css={styles.input}>
                    <input
                        style={{
                            width: 70, textAlign: 'left',
                        }}
                        type='text'
                        value={color.hex}
                        onChange={(e) => changeHex(e.target.value)}
                    />
                    <div>Hex</div>
                </div>

                <div css={styles.input}>
                    <InputNumber
                        min={0}
                        max={255}
                        value={red}
                        onChange={(r) => changeRGB(r, green, blue)}
                    />
                    <div>R</div>
                </div>
                <div css={styles.input}>
                    <InputNumber
                        min={0}
                        max={255}
                        value={green}
                        onChange={(g) => changeRGB(red, g, blue)}
                    />
                    <div>G</div>
                </div>
                <div css={styles.input}>
                    <InputNumber
                        min={0}
                        max={255}
                        value={blue}
                        onChange={(b) => changeRGB(red, green, b)}
                    />
                    <div>B</div>
                </div>

                <div css={styles.input}>
                    <InputNumber
                        min={0}
                        max={100}
                        value={alpha}
                        onChange={(a) => changeAlpha(a)}
                    />
                    <div>A</div>
                </div>
            </div>
        </div>
    );
};

Picker.propTypes = {
    color: PropTypes.shape({
        red: PropTypes.number,
        blue: PropTypes.number,
        green: PropTypes.number,
        hue: PropTypes.number,
        saturation: PropTypes.number,
        value: PropTypes.number,
        alpha: PropTypes.number,
        hex: PropTypes.string,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
};

Picker.defaultProps = {
};

export default Picker;
