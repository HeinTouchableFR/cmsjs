import React from 'react';
import { useInView } from 'react-intersection-observer';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import parse from 'html-react-parser';
import Link from 'next/link';
import {
    styleDiv,
    typoStyle,
    colorStyle,
} from 'variables/renderFunctions';
import PropTypes from 'prop-types';

export default function LinkRender({ element }) {
    const { ref, inView } = useInView();

    const LinkComp = styled.a({
        display: 'block',
        ...colorStyle('desktop', 'normal', element),
        textAlign: element.content.alignment,
        ...typoStyle('desktop', element),
        transition: 'color .2s',
        cursor: 'pointer',
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
                css={styleDiv(element, inView)}
            >
                <Link
                    href={element.content.url}
                    passHref
                >
                    <LinkComp>{parse(element.content.text)}</LinkComp>
                </Link>
            </div>
        </>
    );
}

LinkRender.propTypes = {
    element: PropTypes.shape({
        content: PropTypes.shape({
            alignment: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }).isRequired,
        styles: PropTypes.shape({
        }).isRequired,
    }).isRequired,
};
