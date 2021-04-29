import React, {
    useEffect, useState,
} from 'react';
import { useSettings } from 'context/settings';
import {
    styleDivImagePreview,
    styleImagePreview,
} from 'variables/previewFunctions';
import PropTypes from 'prop-types';

export default function LogoPreview({ element, device, theme }) {
    const { value: settings } = useSettings();
    const [logo, setLogo] = useState([]);

    useEffect(() => {
        if (settings.settings) {
            const generalSettings = settings.settings.find((x) => x.id === 'general');
            if (generalSettings) {
                setLogo(generalSettings.logo);
            }
        }
    }, [settings]);

    const Image = styleImagePreview(device, element)

    return (
        <>
            <div css={styleDivImagePreview(device, element, theme)}>
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
    theme: PropTypes.string.isRequired,
    element: PropTypes.shape({
        content: PropTypes.shape({
            alignment: PropTypes.string.isRequired,
        }).isRequired,
        styles: PropTypes.shape({
        }).isRequired,
    }).isRequired,
};
