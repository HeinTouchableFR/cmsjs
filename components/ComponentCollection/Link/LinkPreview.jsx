import React from 'react';
import styled from '@emotion/styled';
import parse from 'html-react-parser';
import {
    styleDivPreview,
    typoColorStyle,
    typoColorStyleHover,
} from 'variables/previewFunctions';
import PropTypes from 'prop-types';
import { useBuilder } from 'context/builder';

export default function LinkPreview({ element, device }) {
    const { showAnimation } = useBuilder();

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
            <div css={styleDivPreview(device, element, showAnimation(element))}>
                <LinkComp>{parse(element.content.text)}</LinkComp>
            </div>
        </>
    );
}

LinkPreview.propTypes = {
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
