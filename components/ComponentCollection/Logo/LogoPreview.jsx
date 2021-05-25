import React, {useEffect, useState} from 'react';
import { useSettings } from 'context/settings';
import {
    styleDivImagePreview,
    styleImagePreview,
} from 'variables/previewFunctions';
import PropTypes from 'prop-types';

function LogoPreview({ element, device }) {
    const { value: settings } = useSettings();
    const [logo, setLogo] = useState('');

    useEffect(() => {
        if (settings.settings) {
            const logoSetting = settings.settings.find((x) => x.data === 'logo')
            setLogo((logoSetting && logoSetting.image) ? `${process.env.MEDIA_SERVER}/${settings.settings.find((x) => x.data === 'logo')?.image.name}` : `${process.env.SERVER}/logo.png`);
        }
    }, [settings]);

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
        }).isRequired,
        styles: PropTypes.shape({
        }).isRequired,
    }).isRequired,
};
