import React from 'react';
import styled from '@emotion/styled';
import parse from 'html-react-parser';
import {
    styleDivPreview,
    typoColorStyle,
    typoColorStyleHover,
} from 'variables/previewFunctions';
import PropTypes from 'prop-types';

export default function LinkPreview({ element, device, theme }) {
    const LinkComp = styled.a`
        display: block;
        text-align: ${element.content.alignment};
        transition: 'color .2s';
        ${typoColorStyle('desktop', element)}
        ${(device === 'tablet' || device === 'mobile') && typoColorStyle('tablet', element)}
            ${device === 'mobile' && typoColorStyle('mobile', element)}
            &:hover {
            ${typoColorStyleHover('desktop', element)}
            ${(device === 'tablet' || device === 'mobile') && typoColorStyleHover('tablet', element)}
                ${device === 'mobile' && typoColorStyleHover('mobile', element)}
        } ;
    `;

    return (
        <>
            <div css={styleDivPreview(device, element, theme)}>
                <LinkComp>{parse(element.content.text)}</LinkComp>
            </div>
        </>
    );
}

LinkPreview.propTypes = {
    device: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    element: PropTypes.shape({
        content: PropTypes.shape({
            alignment: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
        }).isRequired,
        styles: PropTypes.shape({
        }).isRequired,
    }).isRequired,
};
