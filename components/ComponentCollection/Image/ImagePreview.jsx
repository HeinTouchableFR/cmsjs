import React from 'react';
import {
    styleImagePreview,
    styleDivImagePreview,
} from 'variables/previewFunctions';
import PropTypes from 'prop-types';

export default function ImagePreview({ element, device }) {
    const Image = styleImagePreview(device, element);

    return (
        <>
            <div css={styleDivImagePreview(device, element)}>
                <Image
                    src={element.content.image.name !== 'placeholder.png' ? `${process.env.MEDIA_SERVER}/${element.content.image.name}` : `${process.env.SERVER}/${element.content.image.name}`}
                    alt={element.content.image.name}
                />
            </div>
        </>
    );
}

ImagePreview.propTypes = {
    device: PropTypes.string.isRequired,
    element: PropTypes.shape({
        content: PropTypes.shape({
            alignment: PropTypes.string.isRequired,
            image: PropTypes.shape({
                name: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
        styles: PropTypes.shape({
        }).isRequired,
    }).isRequired,
};
