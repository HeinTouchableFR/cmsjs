import React from 'react';
import styled from '@emotion/styled';
import parse from 'html-react-parser';
import {
    styleDivPreview,
    typoColorStyle,
    typoColorStyleHover,
} from 'variables/previewFunctions';
import PropTypes from 'prop-types';

export default function TitlePreview({ element, device }) {
    const Title = styled[element.content.tag]`
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
            <div css={styleDivPreview(device, element)}>
                <Title>{parse(element.content.text)}</Title>
            </div>
        </>
    );
}

TitlePreview.propTypes = {
    device: PropTypes.string.isRequired,
    element: PropTypes.shape({
        content: PropTypes.shape({
            alignment: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            tag: PropTypes.string.isRequired,
        }).isRequired,
        styles: PropTypes.shape({
        }).isRequired,
    }).isRequired,
};
