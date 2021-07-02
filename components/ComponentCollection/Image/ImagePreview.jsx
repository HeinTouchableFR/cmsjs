import React, { useEffect } from 'react';
import {
    styleImagePreview,
    styleDivImagePreview,
} from 'variables/previewFunctions';
import PropTypes from 'prop-types';
import { useBuilder } from 'context/builder';
import { useInView } from 'react-intersection-observer';

export default function ImagePreview({ element, device }) {
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
        id: PropTypes.number,
        content: PropTypes.shape({
            alignment: PropTypes.string.isRequired,
            image: PropTypes.shape({
                name: PropTypes.string.isRequired,
            }).isRequired,
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
