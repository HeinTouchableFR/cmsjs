import React from 'react';
import { useSettings } from 'context/settings';
import {
    styleDivImagePreview,
    styleImagePreview,
} from 'variables/previewFunctions';
import PropTypes from 'prop-types';

function LogoPreview({ element, device }) {
    const { value: settings } = useSettings();

    const Image = styleImagePreview(device, element);

    return (
        <>
            <div css={styleDivImagePreview(device, element)}>
                <Image
                    src={(settings.settings.find((x) => x.data === 'logo')?.image) && settings.settings.find((x) => x.data === 'logo')?.image.url}
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
        }).isRequired,
        styles: PropTypes.shape({
        }).isRequired,
    }).isRequired,
};
