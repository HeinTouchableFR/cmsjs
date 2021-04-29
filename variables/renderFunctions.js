import { css } from '@emotion/react';

export const concatValueUnit = (value, unit = 'px') => value + (value && unit);

export const generateRuleFromValues = (values = [], unit = 'px') => {
    let string = '';
    if (!values.every((item) => item === '' || item === 0)) {
        values.map((value) => (string += `${concatValueUnit(value || 0, unit)} `));
    }
    return string;
};

export const typoStyle = (device, element) => {
    let decorationString = '';
    Array.from(element.content[device].typo.decoration).forEach((item) => {
        decorationString += `${item} `;
    });
    return {
        fontSize: `${concatValueUnit(element.content[device].typo.size.value, element.content[device].typo.size.unit)}`,
        fontFamily: element.content[device].typo.family,
        fontWeight: element.content[device].typo.weight,
        textTransform: element.content[device].typo.transform,
        fontStyle: element.content[device].typo.style,
        textDecoration: decorationString,
        lineHeight: `${concatValueUnit(element.content[device].typo.lineHeight.value, element.content[device].typo.lineHeight.unit)}`,
        letterSpacing: `${concatValueUnit(element.content[device].typo.letterSpacing)}`,
    };
};

export const marginPaddingStyle = (device, element) => ({
    margin: generateRuleFromValues([
        element.styles[device].margin.top,
        element.styles[device].margin.right,
        element.styles[device].margin.bottom,
        element.styles[device].margin.left,
    ],
    element.styles[device].margin.unit),
    padding: generateRuleFromValues([
        element.styles[device].padding.top,
        element.styles[device].padding.right,
        element.styles[device].padding.bottom,
        element.styles[device].padding.left,
    ],
    element.styles[device].padding.unit),
});

export const paddingMarginStyle = (element) => ({
    padding: generateRuleFromValues([
        element.content.button.padding.top,
        element.content.button.padding.right,
        element.content.button.padding.bottom,
        element.content.button.padding.left,
    ],
    element.content.button.padding.unit),
});

export const colorStyle = (device, mode, element) => ({
    color: element.content[device].typo.color[mode],
});

export const backgroundStyle = (device, mode, element, theme) => ({
    background: element.content[device].styles.background[theme][mode],
});

export const buttonBackgroundStyle = (mode, element) => ({
    background: element.content.button.background[mode],
});

export const borderStyle = (device, mode, element) => ({
    borderStyle: element.content[device].styles.border[mode].type !== 'none' && element.content[device].styles.border[mode].type,
    borderWidth:
        element.content[device].styles.border[mode].type !== 'none'
        && generateRuleFromValues([
            element.content[device].styles.border[mode].width.top,
            element.content[device].styles.border[mode].width.right,
            element.content[device].styles.border[mode].width.bottom,
            element.content[device].styles.border[mode].width.left,
        ]),
    borderColor: element.content[device].styles.border[mode].type !== 'none' && element.content[device].styles.border[mode].color,
    borderRadius: generateRuleFromValues([
        element.content[device].styles.border[mode].radius.top,
        element.content[device].styles.border[mode].radius.right,
        element.content[device].styles.border[mode].radius.bottom,
        element.content[device].styles.border[mode].radius.left,
    ],
    element.content[device].styles.border[mode].radius.unit),
});

export const borderButtonStyle = (mode, element) => ({
    borderStyle: element.content.button.border[mode].type !== 'none' && element.content.button.border[mode].type,
    borderWidth:
        element.content.button.border[mode].type !== 'none'
        && generateRuleFromValues([
            element.content.button.border[mode].width.top,
            element.content.button.border[mode].width.right,
            element.content.button.border[mode].width.bottom,
            element.content.button.border[mode].width.left,
        ]),
    borderColor: element.content.button.border[mode].type !== 'none' && element.content.button.border[mode].color,
    borderRadius: generateRuleFromValues([
        element.content.button.border[mode].radius.top,
        element.content.button.border[mode].radius.right,
        element.content.button.border[mode].radius.bottom,
        element.content.button.border[mode].radius.left,
    ],
    element.content.button.border[mode].radius.unit),
});

export const animationStyle = (device, element, inView) => ({
    animationDuration: inView
        && element.content[device].animation.duration
        && element.content[device].animation.duration,
    animationDelay: `${inView && element.content[device].animation.delay && element.content[device].animation.delay}ms`,
    animationName: `${inView && element.content[device].animation.name}`,
});

export const imageStyle = (device, element) => ({
    width: `${element.content[device].image.size.width.value}${element.content[device].image.size.width.unit}`,
    maxWidth: `${element.content[device].image.size.maxWidth.value}${element.content[device].image.size.maxWidth.unit}`,
    height: `${element.content[device].image.size.height.value}${element.content[device].image.size.height.value !== 'auto' ? element.content[device].image.size.height.unit : ''}`,
    opacity: `${element.content[device].image.opacity.normal}`,
});

export const imageStyleHover = (device, element) => ({
    opacity: `${element.content[device].image.opacity.hover}`,
});

export const styleDiv = (element, inView, theme) => ({
    ...marginPaddingStyle('desktop', element),
    ...backgroundStyle('desktop', 'normal', element, theme),
    ...borderStyle('desktop', 'normal', element),
    ...animationStyle('desktop', element, inView),
    '&:hover': {
        ...backgroundStyle('desktop', 'hover', element, theme),
        ...borderStyle('desktop', 'hover', element),
    },
    '@media (max-width: 1024px)': css({
        ...marginPaddingStyle('tablet', element),
        ...backgroundStyle('tablet', 'normal', element, theme),
        ...borderStyle('tablet', 'normal', element),
        ...animationStyle('tablet', element, inView),
        '&:hover': {
            ...backgroundStyle('tablet', 'hover', element, theme),
            ...borderStyle('tablet', 'hover', element),
        },
    }),
    '@media (max-width: 768px)': css({
        ...marginPaddingStyle('mobile', element),
        ...backgroundStyle('mobile', 'normal', element, theme),
        ...borderStyle('mobile', 'normal', element),
        ...animationStyle('mobile', element, inView),
        '&:hover': {
            ...backgroundStyle('mobile', 'hover', element, theme),
            ...borderStyle('mobile', 'hover', element),
        },
    }),
});
