import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import parse from 'html-react-parser';
import {
    typoColorStyle,
    typoColorStyleHover,
    styleDivPreview,
} from 'variables/previewFunctions';

export default function ButtonPreview({ element, device }) {
    const Button = styled.button`
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
