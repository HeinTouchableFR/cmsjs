import React from 'react';
import {
    styleImagePreview,
    styleDivImagePreview,
} from 'variables/previewFunctions';
import PropTypes from 'prop-types';

export default function ImagePreview({ element, device, theme }) {
    const Image = styleImagePreview(device, element);

    return (
        <>
            <div css={styleDivImagePreview(device, element, theme)}>
                <Image
                    src={element.content.image.url}
                    alt={element.content.image.name}
                />
            </div>
        </>
    );
}

ImagePreview.propTypes = {
    device: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    element: PropTypes.shape({
        content: PropTypes.shape({
            alignment: PropTypes.string.isRequired,
            image: PropTypes.shape({
                url: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
        styles: PropTypes.shape({
        }).isRequired,
    }).isRequired,
};
