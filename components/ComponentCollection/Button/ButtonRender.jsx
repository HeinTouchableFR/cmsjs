import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import parse from 'html-react-parser';
import {
    typoStyle,
    colorStyle,
    buttonBackgroundStyle,
    styleDiv,
    borderButtonStyle,
    paddingMarginStyle,
} from 'variables/renderFunctions';
import Link from 'next/link';

export default function ButtonRender({ element }) {
    const { ref, inView, entry } = useInView({
        triggerOnce: true,
    });

    const Button = styled.a({
        display: 'inline-block',
        ...colorStyle('desktop', 'normal', element),
        ...buttonBackgroundStyle('normal', element),
        ...borderButtonStyle('normal', element),
        ...paddingMarginStyle(element),
        ...typoStyle('desktop', element),
        transition: 'color .2s',
        cursor: 'pointer',
        '&:hover': {
            ...colorStyle('desktop', 'hover', element),
            ...buttonBackgroundStyle('hover', element),
            ...borderButtonStyle('hover', element),
        },
        '@media (max-width: 1024px)': css({
            ...typoStyle('tablet', element),
            ...colorStyle('tablet', 'normal', element),
            '&:hover': {
                ...colorStyle('tablet', 'hover', element),
            },
        }),
        '@media (max-width: 768px)': css({
            ...typoStyle('mobile', element),
            ...colorStyle('mobile', 'normal', element),
            '&:hover': {
                ...colorStyle('mobile', 'hover', element),
            },
        }),
    });

    const align = css({
        textAlign: element.content.alignment,
    });

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
                css={css`
                    ${styleDiv(element)};
                    ${align}
                 `}
                className={element.content.animation.name !== 'none' ? 'invisible' : ''}
            >
                <Link
                    href={element.content.url}
                    passHref
                >
                    <Button>{parse(element.content.text)}</Button>
                </Link>
            </div>
        </>
    );
}

ButtonRender.propTypes = {
    element: PropTypes.shape({
        content: PropTypes.shape({
            buttonBackground: PropTypes.string.isRequired,
            alignment: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
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
