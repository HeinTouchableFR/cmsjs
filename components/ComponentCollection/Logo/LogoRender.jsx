import React, {
    useEffect, useState,
} from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
    backgroundStyle,
    borderStyle,
    marginPaddingStyle,
    imageStyle,
    imageStyleHover,
} from 'variables/renderFunctions';
import PropTypes from 'prop-types';

export default function LogoRender({ element }) {
    const { ref, inView, entry } = useInView({
        triggerOnce: true,
    });
    const [logo] = useState(element.content.url);

    const Image = styled.img({
        ...imageStyle('desktop', element),
        transition: 'width .2s',
        '&:hover': {
            ...imageStyleHover('tablet', element),
        },
        '@media (max-width: 1024px)': css({
            ...imageStyle('tablet', element),
            '&:hover': {
                ...imageStyleHover('tablet', element),
            },
        }),
        '@media (max-width: 768px)': css({
            ...imageStyle('mobile', element),
            '&:hover': {
                ...imageStyleHover('mobile', element),
            },
        }),
    });

    const styleDiv = {
        textAlign: element.content.alignment,
        ...marginPaddingStyle('desktop', element),
        ...backgroundStyle('desktop', 'normal', element),
        ...borderStyle('desktop', 'normal', element),
        '&:hover': {
            ...backgroundStyle('desktop', 'hover', element),
            ...borderStyle('desktop', 'hover', element),
        },
        '@media (max-width: 1024px)': css({
            ...marginPaddingStyle('tablet', element),
            ...backgroundStyle('tablet', 'normal', element),
            ...borderStyle('tablet', 'normal', element),
            '&:hover': {
                ...backgroundStyle('tablet', 'hover', element),
                ...borderStyle('tablet', 'hover', element),
            },
        }),
        '@media (max-width: 768px)': css({
            ...marginPaddingStyle('mobile', element),
            ...backgroundStyle('mobile', 'normal', element),
            ...borderStyle('mobile', 'normal', element),
            '&:hover': {
                ...backgroundStyle('mobile', 'hover', element),
                ...borderStyle('mobile', 'hover', element),
            },
        }),
    };

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
    }, [inView]);

    return (
        <>
            <div
                ref={ref}
                css={styleDiv}
                className={element.content.animation.name !== 'none' ? 'invisible' : ''}
            >
                <Link href={`${process.env.SERVER}`}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a>
                        <Image
                            src={logo}
                            alt='Logo'
                            width='500'
                            height='500'
                        />
                    </a>
                </Link>
            </div>
        </>
    );
}

LogoRender.propTypes = {
    element: PropTypes.shape({
        content: PropTypes.shape({
            url: PropTypes.string.isRequired,
            alignment: PropTypes.string.isRequired,
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
