import React from 'react';
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import parse from 'html-react-parser';

export default function TitleRender({element}) {

    const Title = styled[element.content.tag](
        {
            color: element.content.styles.color.normal,
            textAlign: element.content.alignment,
            fontSize: element.content.typo.size + "px",
            fontFamily: element.content.typo.family,
            fontWeight: element.content.typo.weight,
            textTransform: element.content.typo.transform,
            fontStyle: element.content.typo.style,
            textDecoration: element.content.typo.decoration,
            lineHeight: element.content.typo.lineHeight,
            letterSpacing: element.content.typo.letterSpacing + 'px',
            transition: 'color .2s',
            '&:hover': css({
                color: element.content.styles.color.hover,
            })
        },
    );

    const styleDiv =
        {
            margin: `${element.styles.margin.top}px ${element.styles.margin.right}px ${element.styles.margin.bottom}px ${element.styles.margin.left}px`,
            padding: `${element.styles.padding.top}px ${element.styles.padding.right}px ${element.styles.padding.bottom}px ${element.styles.padding.left}px`,
            background: element.content.styles.background.normal,
            borderStyle: (element.content.styles.border.normal.type !== 'none') && element.content.styles.border.normal.type,
            borderWidth: (element.content.styles.border.normal.type !== 'none') && `${element.content.styles.border.normal.width.top}px ${element.content.styles.border.normal.width.right}px ${element.content.styles.border.normal.width.bottom}px ${element.content.styles.border.normal.width.left}px`,
            borderColor: (element.content.styles.border.normal.type !== 'none') && element.content.styles.border.normal.color,
            borderRadius: `${element.content.styles.border.normal.radius.top}px ${element.content.styles.border.normal.radius.right}px ${element.content.styles.border.normal.radius.bottom}px ${element.content.styles.border.normal.radius.left}px`,
            '&:hover': css({
                background: element.content.styles.background.hover,
                borderStyle: (element.content.styles.border.hover.type !== 'none') && element.content.styles.border.hover.type,
                borderWidth: (element.content.styles.border.hover.type !== 'none') && `${element.content.styles.border.hover.width.top}px ${element.content.styles.border.hover.width.right}px ${element.content.styles.border.hover.width.bottom}px ${element.content.styles.border.hover.width.left}px`,
                borderColor: (element.content.styles.border.hover.type !== 'none') && element.content.styles.border.hover.color,
                borderRadius: `${element.content.styles.border.hover.radius.top}px ${element.content.styles.border.hover.radius.right}px ${element.content.styles.border.hover.radius.bottom}px ${element.content.styles.border.hover.radius.left}px`,
            })
        }

    return (
        <>
            <div css={styleDiv}>
                <Title>
                    {parse(element.content.text)}
                </Title>
            </div>
        </>
    );
}
