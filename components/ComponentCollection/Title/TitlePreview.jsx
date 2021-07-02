import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import parse from 'html-react-parser';
import {
    styleDivPreview,
    typoColorStyle,
    typoColorStyleHover,
} from 'variables/previewFunctions';
import PropTypes from 'prop-types';
import { useBuilder } from 'context/builder';
import { useInView } from 'react-intersection-observer';

export default function TitlePreview({ element, device }) {
    const { showAnimation } = useBuilder();
    const { ref, entry } = useInView({
        triggerOnce: true,
    });
    const inView = showAnimation(element);

    const Title = styled[element.content.tag]`
        text-align: ${element.content.alignment};
        transition: 'color .2s';
        ${typoColorStyle('desktop', element)}
        ${(device === 'tablet' || device === 'mobile') && typoColorStyle('tablet', element)}
            ${device === 'mobile' && typoColorStyle('mobile', element)}
            &:hover {
            ${typoColorStyleHover('desktop', element)}
            ${(device === 'tablet' || device === 'mobile') && typoColorStyleHover('tablet', element)}
                ${device === 'mobile' && typoColorStyleHover('mobile', element)}
        } ;
    `;

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
                css={styleDivPreview(device, element)}
            >
                <Title>{parse(element.content.text)}</Title>
            </div>
        </>
    );
}

TitlePreview.propTypes = {
    device: PropTypes.string.isRequired,
    element: PropTypes.shape({
        id: PropTypes.number,
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
