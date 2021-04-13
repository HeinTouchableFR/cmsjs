import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import parse from 'html-react-parser';

export default function LinkPreview({ element, device }) {
    const concatValueUnit = (value, unit = 'px') => {
        return value + (value && unit);
    };

    const generateRuleFromValues = (values = [], unit = 'px') => {
        if (!values.every((item) => item === 0)) {
            let string = '';
            values.map((value) => (string += concatValueUnit(value ? value : 0, unit) + ' '));
            return string;
        }
    };

    const typoStyle = (device) => {
        let decorationString = '';
        Array.from(element.content[device].typo.decoration).map((item) => {
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

    const marginPaddingStyle = (device) => {
        return {
            margin: generateRuleFromValues(
                [
                    element.styles[device].margin.top,
                    element.styles[device].margin.right,
                    element.styles[device].margin.bottom,
                    element.styles[device].margin.left,
                ],
                element.styles[device].margin.unit
            ),
            padding: generateRuleFromValues(
                [
                    element.styles[device].padding.top,
                    element.styles[device].padding.right,
                    element.styles[device].padding.bottom,
                    element.styles[device].padding.left,
                ],
                element.styles[device].padding.unit
            ),
        };
    };

    const colorStyle = (device, mode) => {
        return {
            color: element.content[device].typo.color[mode],
        };
    };

    const backgroundStyle = (device, mode) => {
        return {
            background: element.content[device].styles.background[mode],
        };
    };

    const borderStyle = (device, mode) => {
        return {
            borderStyle: element.content[device].styles.border[mode].type !== 'none' && element.content[device].styles.border[mode].type,
            borderWidth:
                element.content[device].styles.border[mode].type !== 'none' &&
                generateRuleFromValues([
                    element.content[device].styles.border[mode].width.top,
                    element.content[device].styles.border[mode].width.right,
                    element.content[device].styles.border[mode].width.bottom,
                    element.content[device].styles.border[mode].width.left,
                ]),
            borderColor: element.content[device].styles.border[mode].type !== 'none' && element.content[device].styles.border[mode].color,
            borderRadius: generateRuleFromValues(
                [
                    element.content[device].styles.border[mode].radius.top,
                    element.content[device].styles.border[mode].radius.right,
                    element.content[device].styles.border[mode].radius.bottom,
                    element.content[device].styles.border[mode].radius.left,
                ],
                element.content[device].styles.border[mode].radius.unit
            ),
        };
    };

    const animationStyle = (device) => {
        return {
            animationDuration: element.content[device].animation.duration && element.content[device].animation.duration,
            animationDelay: `${element.content[device].animation.delay && element.content[device].animation.delay}ms`,
            animationName: `${element.content[device].animation.name}`,
        };
    };

    const linkStyle = function (device) {
        return {
            ...colorStyle(device, 'normal'),
            ...typoStyle(device),
        };
    };
    const linkStyleHover = function (device) {
        return {
            ...colorStyle(device, 'hover'),
        };
    };

    const LinkComp = styled.div`
        text-align: ${element.content.alignment};
        transition: 'color .2s';
        ${linkStyle('desktop')}
        ${(device === 'tablet' || device === 'mobile') && linkStyle('tablet')}
            ${device === 'mobile' && linkStyle('mobile')}
            &:hover {
            ${linkStyleHover('desktop')}
            ${(device === 'tablet' || device === 'mobile') && linkStyleHover('tablet')}
                ${device === 'mobile' && linkStyleHover('mobile')}
        } ;
    `;

    const containerStyle = function (device) {
        return {
            ...marginPaddingStyle(device),
            ...backgroundStyle(device, 'normal'),
            ...borderStyle(device, 'normal'),
            ...animationStyle(device),
        };
    };
    const containerStyleHover = function (device) {
        return {
            ...backgroundStyle(device, 'hover'),
            ...borderStyle(device, 'hover'),
        };
    };

    const styleDiv = css`
        ${containerStyle('desktop')}
        ${(device === 'tablet' || device === 'mobile') && containerStyle('tablet')}
            ${device === 'mobile' && containerStyle('mobile')}
            &:hover {
            ${containerStyleHover('desktop')}
            ${(device === 'tablet' || device === 'mobile') && containerStyleHover('tablet')}
                ${device === 'mobile' && containerStyleHover('mobile')}
        } ;
    `;

    return (
        <>
            <div css={styleDiv}>
                <LinkComp>{parse(element.content.text)}</LinkComp>
            </div>
        </>
    );
}
