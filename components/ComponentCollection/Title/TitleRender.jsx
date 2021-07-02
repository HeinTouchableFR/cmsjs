import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import parse from 'html-react-parser';
import { useInView } from 'react-intersection-observer';
import {
    colorStyle,
    styleDiv,
    typoStyle,
} from 'variables/renderFunctions';
import PropTypes from 'prop-types';

export default function TitleRender({ element }) {
    const { ref, inView, entry } = useInView({
        triggerOnce: true,
    });

    const Title = styled[element.content.tag]({
        ...colorStyle('desktop', 'normal', element),
        textAlign: element.content.alignment,
        ...typoStyle('desktop', element),
        transition: 'color .2s',
        '&:hover': {
            ...colorStyle('desktop', 'hover', element),
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
                css={styleDiv(element)}
                className={element.content.animation.name !== 'none' ? 'invisible' : ''}
            >
                <Title>
                    {parse(element.content.text)}
                </Title>
            </div>
        </>
    );
}

TitleRender.propTypes = {
    element: PropTypes.shape({
        content: PropTypes.shape({
            alignment: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            tag: PropTypes.string.isRequired,
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
