import React, {
    useEffect, useState,
} from 'react';
import {
    styleDivImagePreview,
    styleImagePreview,
} from 'variables/previewFunctions';
import PropTypes from 'prop-types';
import { useBuilder } from 'context/builder';
import { useInView } from 'react-intersection-observer';

function LogoPreview({ element, device }) {
    const [logo] = useState(element.content.url);
    const { showAnimation } = useBuilder();
    const { ref, entry } = useInView({
        triggerOnce: true,
    });
    const inView = showAnimation(element);

    const Image = styleImagePreview(device, element);

    useEffect(() => {
        if (entry) {
            if (inView && element.content.animation.name !== 'none') {
                const timer = setInterval(() => {
                    entry.target.classList.add('animated');
                    entry.target.classList.add(element.content.animation.name);
                    entry.target.classList.remove('invisible');

                    if (element.content.animation.duration !== 'normal') {
                        entry.target.classList.add(`animated-${element.content.animation.duration}`);
                    }
                }, element.content.animation.delay);
                return () => clearInterval(timer);
            }
        }
        return null;
    }, [inView, entry]);

    return (
        <>
            <div
                ref={ref}
                css={styleDivImagePreview(device, element)}
            >
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
            animation: PropTypes.shape({
                name: PropTypes.string,
                duration: PropTypes.string,
                delay: PropTypes.string,
            }),
        }).isRequired,
        styles: PropTypes.shape({
        }).isRequired,
    }).isRequired,
};
