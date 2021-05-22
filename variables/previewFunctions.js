import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
    animationStyle,
    backgroundStyle,
    borderStyle, colorStyle,
    marginPaddingStyle, typoStyle,
} from './renderFunctions';

export const containerStyle = (screen, element) => ({
    ...marginPaddingStyle(screen, element),
    ...backgroundStyle(screen, 'normal', element),
    ...borderStyle(screen, 'normal', element),
    ...animationStyle(screen, element, true),
});

export const containerStyleHover = (screen, element) => ({
    ...backgroundStyle(screen, 'hover', element),
    ...borderStyle(screen, 'hover', element),
});

export const typoColorStyle = (screen, element) => ({
    ...colorStyle(screen, 'normal', element),
    ...typoStyle(screen, element),
});

export const typoColorStyleHover = (screen, element) => ({
    ...colorStyle(screen, 'hover', element),
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

export const styleDivPreview = (device, element) => css`
        ${containerStyle('desktop', element)}
        ${(device === 'tablet' || device === 'mobile') && containerStyle('tablet', element)}
        ${device === 'mobile' && containerStyle('mobile', element)}
        &:hover {
            ${containerStyleHover('desktop', element)}
            ${(device === 'tablet' || device === 'mobile') && containerStyleHover('tablet', element)}
            ${device === 'mobile' && containerStyleHover('mobile', element)}
        };
    `;

export const styleDivImagePreview = (device, element) => css`
            text-align: ${element.content.alignment};
            ${containerStyle('desktop', element)}
            ${(device === 'tablet' || device === 'mobile') && containerStyle('tablet', element)}
            ${device === 'mobile' && containerStyle('mobile', element)}
            &:hover {
                ${containerStyleHover('desktop', element)}
                ${(device === 'tablet' || device === 'mobile') && containerStyleHover('tablet', element)}
                ${device === 'mobile' && containerStyleHover('mobile', element)}
            };
        `;

export const styleImagePreview = (device, element) => {
    const Image = styled.img`
            transition: width .2s;
            ${imageStyle('desktop', element)}
            ${(device === 'tablet' || device === 'mobile') && imageStyle('tablet', element)}
            ${device === 'mobile' && imageStyle('mobile', element)}
            &:hover {
                ${imageStyleHover('desktop', element)}
                ${(device === 'tablet' || device === 'mobile') && imageStyleHover('tablet', element)}
                ${device === 'mobile' && imageStyleHover('mobile', element)}
            };
        `;
    return Image;
};
