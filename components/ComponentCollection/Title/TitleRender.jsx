import React from 'react';
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import parse from 'html-react-parser';

export default function TitleRender({element}) {

    const Title = styled[element.content.tag](
        {
            color: element.content.styles.color.normal,
            textAlign: element.content.alignment,
            fontSize: `${element.content.typo.size.value}${element.content.typo.size.unit}`,
            fontFamily: element.content.typo.family,
            fontWeight: element.content.typo.weight,
            textTransform: element.content.typo.transform,
            fontStyle: element.content.typo.style,
            textDecoration: element.content.typo.decoration,
            lineHeight: `${element.content.typo.lineHeight.value}${element.content.typo.lineHeight.unit}`,
            letterSpacing: element.content.typo.letterSpacing + 'px',
            transition: 'color .2s',
            '&:hover': css({
                color: element.content.styles.color.hover,
            })
        },
    );

    const styleDiv =
        {
            margin: `${element.styles.margin.top}${element.styles.margin.unit} ${element.styles.margin.right}${element.styles.margin.unit} ${element.styles.margin.bottom}${element.styles.margin.unit} ${element.styles.margin.left}${element.styles.margin.unit}`,
            padding: `${element.styles.padding.top}${element.styles.padding.unit} ${element.styles.padding.right}${element.styles.padding.unit} ${element.styles.padding.bottom}${element.styles.padding.unit} ${element.styles.padding.left}${element.styles.padding.unit}`,
            background: element.content.styles.background.normal,
            borderStyle: (element.content.styles.border.normal.type !== 'none') && element.content.styles.border.normal.type,
            borderWidth: (element.content.styles.border.normal.type !== 'none') && `${element.content.styles.border.normal.width.top}px ${element.content.styles.border.normal.width.right}px ${element.content.styles.border.normal.width.bottom}px ${element.content.styles.border.normal.width.left}px`,
            borderColor: (element.content.styles.border.normal.type !== 'none') && element.content.styles.border.normal.color,
            borderRadius: `${element.content.styles.border.normal.radius.top}${element.content.styles.border.normal.radius.unit} ${element.content.styles.border.normal.radius.right}${element.content.styles.border.normal.radius.unit} ${element.content.styles.border.normal.radius.bottom}${element.content.styles.border.normal.radius.unit} ${element.content.styles.border.normal.radius.left}${element.content.styles.border.normal.radius.unit}`,
            '&:hover': css({
                background: element.content.styles.background.hover,
                borderStyle: (element.content.styles.border.hover.type !== 'none') && element.content.styles.border.hover.type,
                borderWidth: (element.content.styles.border.hover.type !== 'none') && `${element.content.styles.border.hover.width.top}px ${element.content.styles.border.hover.width.right}px ${element.content.styles.border.hover.width.bottom}px ${element.content.styles.border.hover.width.left}px`,
                borderColor: (element.content.styles.border.hover.type !== 'none') && element.content.styles.border.hover.color,
                borderRadius: `${element.content.styles.border.hover.radius.top}${element.content.styles.border.hover.radius.unit} ${element.content.styles.border.hover.radius.right}${element.content.styles.border.hover.radius.unit} ${element.content.styles.border.hover.radius.bottom}${element.content.styles.border.hover.radius.unit} ${element.content.styles.border.hover.radius.left}${element.content.styles.border.hover.radius.unit}`,
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
