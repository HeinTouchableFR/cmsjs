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

export default function TextPreview({ element, device }) {
    const { showAnimation } = useBuilder();

    const Text = styled.div`
            text-align: ${element.content.alignment};
            transition: 'color .2s';
            ${typoColorStyle('desktop', element)}
            ${(device === 'tablet' || device === 'mobile') && typoColorStyle('tablet', element)}
            ${device === 'mobile' && typoColorStyle('mobile', element)}
            &:hover {
                ${typoColorStyleHover('desktop', element)}
                ${(device === 'tablet' || device === 'mobile') && typoColorStyleHover('tablet', element)}
                ${device === 'mobile' && typoColorStyleHover('mobile', element)}
            };
        `;

    return (
        <>
            <div css={styleDivPreview(device, element, showAnimation(element))}>
                <Text>
                    {parse(element.content.text)}
                </Text>
            </div>
        </>
    );
}

TextPreview.propTypes = {
    device: PropTypes.string.isRequired,
    element: PropTypes.shape({
        id: PropTypes.id,
        content: PropTypes.shape({
            alignment: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
        }).isRequired,
        styles: PropTypes.shape({
        }).isRequired,
    }).isRequired,
};
