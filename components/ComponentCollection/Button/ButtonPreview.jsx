import PropTypes from 'prop-types';
import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import parse from 'html-react-parser';

export default function ButtonPreview({ element,
    device }) {
    const concatValueUnit = (value, unit = 'px') => value + (value && unit);

    const generateRuleFromValues = (values = [], unit = 'px') => {
        let string = '';
        if (!values.every((item) => item === 0)) {
            values.map((value) => (string += `${concatValueUnit(value || 0, unit)} `));
        }
        return string;
    };

    const typoStyle = (screen) => {
        let decorationString = '';
        Array.from(element.content[screen].typo.decoration).forEach((item) => {
            decorationString += `${item} `;
        });
        return {
            fontSize: `${concatValueUnit(element.content[screen].typo.size.value, element.content[screen].typo.size.unit)}`,
            fontFamily: element.content[screen].typo.family,
            fontWeight: element.content[screen].typo.weight,
            textTransform: element.content[screen].typo.transform,
            fontStyle: element.content[screen].typo.style,
            textDecoration: decorationString,
            lineHeight: `${concatValueUnit(element.content[screen].typo.lineHeight.value, element.content[screen].typo.lineHeight.unit)}`,
            letterSpacing: `${concatValueUnit(element.content[screen].typo.letterSpacing)}`,
        };
    };

    const marginPaddingStyle = (screen) => ({
        margin: generateRuleFromValues([
            element.styles[screen].margin.top,
            element.styles[screen].margin.right,
            element.styles[screen].margin.bottom,
            element.styles[screen].margin.left,
        ],
        element.styles[screen].margin.unit),
        padding: generateRuleFromValues([
            element.styles[screen].padding.top,
            element.styles[screen].padding.right,
            element.styles[screen].padding.bottom,
            element.styles[screen].padding.left,
        ],
        element.styles[screen].padding.unit),
    });

    const colorStyle = (screen, mode) => ({
        color: element.content[screen].typo.color[mode],
    });

    const backgroundStyle = (screen, mode) => ({
        background: element.content[screen].styles.background[mode],
    });

    const borderStyle = (screen, mode) => ({
        borderStyle: element.content[screen].styles.border[mode].type !== 'none' && element.content[screen].styles.border[mode].type,
        borderWidth:
                element.content[screen].styles.border[mode].type !== 'none'
                && generateRuleFromValues([
                    element.content[screen].styles.border[mode].width.top,
                    element.content[screen].styles.border[mode].width.right,
                    element.content[screen].styles.border[mode].width.bottom,
                    element.content[screen].styles.border[mode].width.left,
                ]),
        borderColor: element.content[screen].styles.border[mode].type !== 'none' && element.content[screen].styles.border[mode].color,
        borderRadius: generateRuleFromValues([
            element.content[screen].styles.border[mode].radius.top,
            element.content[screen].styles.border[mode].radius.right,
            element.content[screen].styles.border[mode].radius.bottom,
            element.content[screen].styles.border[mode].radius.left,
        ],
        element.content[screen].styles.border[mode].radius.unit),
    });

    const animationStyle = (screen) => ({
        animationDuration: element.content[screen].animation.duration,
        animationDelay: `${element.content[screen].animation.delay && element.content[screen].animation.delay}ms`,
        animationName: `${element.content[screen].animation.name}`,
    });

    const linkStyle = (screen) => ({
        ...colorStyle(screen, 'normal'),
        ...typoStyle(screen),
    });
    const linkStyleHover = (screen) => ({
        ...colorStyle(screen, 'hover'),
    });

    const Button = styled.button`
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

    const containerStyle = (screen) => ({
        ...marginPaddingStyle(screen),
        ...backgroundStyle(screen, 'normal'),
        ...borderStyle(screen, 'normal'),
        ...animationStyle(screen),
    });
    const containerStyleHover = (screen) => ({
        ...backgroundStyle(screen, 'hover'),
        ...borderStyle(screen, 'hover'),
    });

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
                <Button>{parse(element.content.text)}</Button>
            </div>
        </>
    );
}

ButtonPreview.propTypes = {
    device: PropTypes.string.isRequired,
    element: PropTypes.shape({
        content: PropTypes.shape({
            alignment: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
        }).isRequired,
        styles: PropTypes.shape({
        }).isRequired,
    }).isRequired,
};
