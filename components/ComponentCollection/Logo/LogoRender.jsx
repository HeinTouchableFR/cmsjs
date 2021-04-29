import React, {
    useEffect, useState,
} from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { useSettings } from 'context/settings';
import {
    animationStyle,
    backgroundStyle,
    borderStyle,
    marginPaddingStyle,
    imageStyle,
    imageStyleHover,
} from 'variables/renderFunctions';
import PropTypes from 'prop-types';

export default function LogoRender({ element, theme }) {
    const { value: settings } = useSettings();
    const { ref, inView } = useInView();
    const [logo, setLogo] = useState([]);

    useEffect(() => {
        if (settings.settings) {
            const generalSettings = settings.settings.find((x) => x.id === 'general');
            if (generalSettings) {
                setLogo(generalSettings.logo);
            }
        }
    }, [settings]);

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
                <Link href='/'>
                    <a
                        className='nav__logo'
                        title="Page d'accueil"
                    >
                        <Image
                            src={logo.image && logo.image.url}
                            alt='Logo'
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
            image: PropTypes.shape({
                url: PropTypes.string.isRequired,
            }),
            alignment: PropTypes.string.isRequired,
        }).isRequired,
        styles: PropTypes.shape({
        }).isRequired,
    }).isRequired,
    theme: PropTypes.string.isRequired,
};
