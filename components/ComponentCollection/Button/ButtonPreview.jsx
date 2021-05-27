import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import parse from 'html-react-parser';
import {
    typoColorStyle,
    typoColorStyleHover,
    styleDivPreview,
} from 'variables/previewFunctions';
import {
    borderButtonStyle,
    buttonBackgroundStyle,
    paddingMarginStyle,
} from 'variables/renderFunctions';
import { css } from '@emotion/react';
import { useBuilder } from 'context/builder';

export default function ButtonPreview({ element, device }) {
    const { showAnimation } = useBuilder();
    const Button = styled.a`
        display: inline-block;
        transition: 'color .2s';
        ${typoColorStyle('desktop', element)}
        ${(device === 'tablet' || device === 'mobile') && typoColorStyle('tablet', element)}
        ${device === 'mobile' && typoColorStyle('mobile', element)}
        ${borderButtonStyle('normal', element)}
        ${buttonBackgroundStyle('normal', element)}
        ${paddingMarginStyle(element)}
            &:hover {
            ${typoColorStyleHover('desktop', element)}
            ${(device === 'tablet' || device === 'mobile') && typoColorStyleHover('tablet', element)}
            ${device === 'mobile' && typoColorStyleHover('mobile', element)}
            ${borderButtonStyle('hover', element)}
            ${buttonBackgroundStyle('hover', element)}
        } ;
    `;

    const align = css({
        textAlign: element.content.alignment,
    });

    return (
        <>
            <div
                css={{
                    ...styleDivPreview(device, element, showAnimation(element)), ...align,
                }}
            >
                <Button>{parse(element.content.text)}</Button>
            </div>
        </>
    );
}

ButtonPreview.propTypes = {
    device: PropTypes.string.isRequired,
    element: PropTypes.shape({
        id: PropTypes.number,
        content: PropTypes.shape({
            alignment: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
        }).isRequired,
        styles: PropTypes.shape({
        }).isRequired,
    }).isRequired,
};
