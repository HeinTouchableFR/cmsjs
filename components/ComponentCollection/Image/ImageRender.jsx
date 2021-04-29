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
    imageStyleHover,
} from 'variables/renderFunctions';
import PropTypes from 'prop-types';

export default function ImageRender({ element, theme }) {
    const { ref, inView } = useInView();

    const Image = styled.img({
        ...imageStyle('desktop', element),
        transition: 'width .2s',
        '&:hover': {
            ...imageStyleHover('tablet', element),
        },
        '@media (max-width: 1024px)': css({
            '&:hover': {
            },
        }),
        '@media (max-width: 768px)': css({
            '&:hover': {
                ...imageStyleHover('mobile', element),
            },
        }),
    });

    const styleDiv = {
        textAlign: element.content.alignment,
        ...marginPaddingStyle('desktop', element),
        ...backgroundStyle('desktop', 'normal', element, theme),
        ...borderStyle('desktop', 'normal', element),
        ...animationStyle('desktop', element, inView),
        '&:hover': {
            ...backgroundStyle('desktop', 'hover', element, theme),
            ...borderStyle('desktop', 'hover', element),
        },
        '@media (max-width: 1024px)': css({
            ...marginPaddingStyle('tablet', element),
            ...backgroundStyle('tablet', 'normal', element, theme),
            ...borderStyle('tablet', 'normal', element),
            ...animationStyle('tablet', element, inView),
            '&:hover': {
                ...backgroundStyle('tablet', 'hover', element, theme),
                ...borderStyle('tablet', 'hover', element),
            },
        }),
        '@media (max-width: 768px)': css({
            ...marginPaddingStyle('mobile', element),
            ...backgroundStyle('mobile', 'normal', element, theme),
            ...borderStyle('mobile', 'normal', element),
            ...animationStyle('mobile', element, inView),
            '&:hover': {
                ...backgroundStyle('mobile', 'hover', element, theme),
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
    theme: PropTypes.string.isRequired,
};
