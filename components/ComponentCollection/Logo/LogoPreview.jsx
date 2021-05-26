import React, { useState } from 'react';
import {
    styleDivImagePreview,
    styleImagePreview,
} from 'variables/previewFunctions';
import PropTypes from 'prop-types';

function LogoPreview({ element, device }) {
    const [logo] = useState(element.content.url);

    const Image = styleImagePreview(device, element);

    return (
        <>
            <div css={styleDivImagePreview(device, element)}>
                <Image
                    src={logo}
                    alt='Logo'
                />
            </div>
        </>
    );
}

export default React.memo(LogoPreview);

LogoPreview.propTypes = {
    device: PropTypes.string.isRequired,
    element: PropTypes.shape({
        content: PropTypes.shape({
            alignment: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }).isRequired,
        styles: PropTypes.shape({
        }).isRequired,
    }).isRequired,
};
