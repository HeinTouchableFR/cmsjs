import React, {
    useEffect, useState,
} from 'react';
import { useSettings } from 'context/settings';
import {
    styleDivImagePreview,
    styleImagePreview,
} from 'variables/previewFunctions';
import PropTypes from 'prop-types';

export default function LogoPreview({ element, device }) {
    const { settings } = useSettings();
    const [logo, setLogo] = useState([]);

    useEffect(() => {
        if (settings.logo) {
            setLogo(settings.logo);
        }
    }, [settings]);

    const Image = styleImagePreview(device, element)

    return (
        <>
            <div css={styleDivImagePreview(device, element)}>
                <Image
                    src={logo.image && logo.image.url}
                    alt='Logo'
                />
            </div>
        </>
    );
}

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
