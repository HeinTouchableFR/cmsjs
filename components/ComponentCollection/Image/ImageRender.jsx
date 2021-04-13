import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useInView } from 'react-intersection-observer';
import {
    animationStyle,
    backgroundStyle,
    borderStyle,
    marginPaddingStyle,
    imageStyle,
} from 'variables/renderFunctions';
import PropTypes from 'prop-types';

export default function ImageRender({ element }) {
    const { ref, inView } = useInView();

    const imageStyleHover = function (device) {
        return {
            opacity: `${element.content[device].image.opacity.hover}`,
        };
    };

    const Image = styled.img({
        ...imageStyle('desktop', element),
        transition: 'width .2s',
        '&:hover': {
            ...imageStyleHover('tablet'),
        },
        '@media (max-width: 1024px)': css({
            '&:hover': {
            },
        }),
        '@media (max-width: 768px)': css({
            '&:hover': {
                ...imageStyleHover('mobile'),
            },
        }),
    });

    const styleDiv = {
        textAlign: element.content.alignment,
        ...marginPaddingStyle('desktop', element),
        ...backgroundStyle('desktop', 'normal', element),
        ...borderStyle('desktop', 'normal', element),
        ...animationStyle('desktop', element, inView),
        '&:hover': {
            ...backgroundStyle('desktop', 'hover', element),
            ...borderStyle('desktop', 'hover', element),
        },
        '@media (max-width: 1024px)': css({
            ...marginPaddingStyle('tablet', element),
            ...backgroundStyle('tablet', 'normal', element),
            ...borderStyle('tablet', 'normal', element),
            ...animationStyle('tablet', element, inView),
            '&:hover': {
                ...backgroundStyle('tablet', 'hover', element),
                ...borderStyle('tablet', 'hover', element),
            },
        }),
        '@media (max-width: 768px)': css({
            ...marginPaddingStyle('mobile', element),
            ...backgroundStyle('mobile', 'normal', element),
            ...borderStyle('mobile', 'normal', element),
            ...animationStyle('mobile', element, inView),
            '&:hover': {
                ...backgroundStyle('mobile', 'hover', element),
                ...borderStyle('mobile', 'hover', element),
            },
        }),
    };

    return (
        <>
            <div
                ref={ref}
                css={styleDiv}
            >
                <Image
                    src={element.content.image.url}
                    alt={element.content.image.name}
                />
            </div>
        </>
    );
}

ImageRender.propTypes = {
    element: PropTypes.shape({
        content: PropTypes.shape({
            image: PropTypes.shape({
                url: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            }),
            alignment: PropTypes.string.isRequired,
        }).isRequired,
        styles: PropTypes.shape({
        }).isRequired,
    }).isRequired,
};
