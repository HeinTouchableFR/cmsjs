import PropTypes from 'prop-types';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import parse from 'html-react-parser';
import {
    typoStyle,
    colorStyle,
    buttonBackgroundStyle,
    styleDiv,
} from 'variables/renderFunctions';

export default function ButtonRender({ element }) {
    const { ref, inView } = useInView();

    const Button = styled.button({
        ...colorStyle('desktop', 'normal', element),
        ...buttonBackgroundStyle('desktop', 'normal', element),
        ...typoStyle('desktop', element),
        textAlign: element.content.alignment,
        transition: 'color .2s',
        cursor: 'pointer',
        '&:hover': {
            ...colorStyle('desktop', 'hover', element),
            ...buttonBackgroundStyle('desktop', 'hover', element),
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
                <div>
                    <Button>{parse(element.content.text)}</Button>
                </div>
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
        }).isRequired,
        styles: PropTypes.shape({
        }).isRequired,
    }).isRequired,
};
