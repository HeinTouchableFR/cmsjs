import React from 'react';
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

export default function TitleRender({ element, theme }) {
    const { ref, inView } = useInView();

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

    return (
        <>
            <div
                ref={ref}
                css={styleDiv(element, inView, theme)}
            >
                <Title>{parse(element.content.text)}</Title>
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
        }).isRequired,
        styles: PropTypes.shape({
        }).isRequired,
    }).isRequired,
    theme: PropTypes.string.isRequired,
};
