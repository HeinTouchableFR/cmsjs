import {
    hex2rgb, rgb2hsv, rgba, rgb2hex,
} from '@swiftcarrot/color-fns';

export function hex2alpha(aa) {
    return Math.round((parseInt(`0x${aa}`, 16) / 255) * 100);
}

export function alpha2hex(a) {
    return (Math.round((a / 100) * 255) + 0x10000).toString(16).substr(-2);
}

export function parseColor(hexColor) {
    const hex = hexColor.toLowerCase();
    const rgb = hex2rgb(hex);
    const { r, g, b } = rgb;
    const { h, s, v } = rgb2hsv(r, g, b);
    const a = hexColor.length > 7 ? hex2alpha(hex.substr(7)) : 100;

    return {
        hue: h,
        saturation: s,
        value: v,
        red: r,
        green: g,
        blue: b,
        alpha: a,
        hex,
        rgba: rgba(r, g, b, a),
    };
}

export function rgba2hex(r, g, b, a) {
    const hex = rgb2hex(r, g, b);
    return hex + alpha2hex(a);
}

export { rgb2hsv,
    hsv2hex,
    hex2rgb,
    rgba,
    hsv2rgb } from '@swiftcarrot/color-fns';
