import React, { useState } from 'react';
import {
    styleDivImagePreview,
    styleImagePreview,
} from 'variables/previewFunctions';
import PropTypes from 'prop-types';
import { useBuilder } from 'context/builder';

function LogoPreview({ element, device }) {
    const [logo] = useState(element.content.url);
    const { showAnimation } = useBuilder();

    const Image = styleImagePreview(device, element);

    return (
        <>
            <div css={styleDivImagePreview(device, element, showAnimation(element))}>
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
        id: PropTypes.number,
        content: PropTypes.shape({
            alignment: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }).isRequired,
        styles: PropTypes.shape({
        }).isRequired,
    }).isRequired,
};
