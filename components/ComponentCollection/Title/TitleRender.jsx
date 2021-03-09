import React from 'react';
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import parse from 'html-react-parser';

export default function TitleRender({element}) {

    const typoStyle = (device) => {
        return {
            fontSize: `${element.content[device].typo.size.value}${element.content[device].typo.size.unit}`,
            fontFamily: element.content[device].typo.family,
            fontWeight: element.content[device].typo.weight,
            textTransform: element.content[device].typo.transform,
            fontStyle: element.content[device].typo.style,
            textDecoration: element.content[device].typo.decoration,
            lineHeight: `${element.content[device].typo.lineHeight.value}${element.content[device].typo.lineHeight.unit}`,
            letterSpacing: element.content[device].typo.letterSpacing + 'px',
        }
    }

    const marginPaddingStyle = (device) => {
        return {
            margin: `${element.styles[device].margin.top}${element.styles[device].margin.unit} ${element.styles[device].margin.right}${element.styles[device].margin.unit} ${element.styles[device].margin.bottom}${element.styles[device].margin.unit} ${element.styles[device].margin.left}${element.styles[device].margin.unit}`,
            padding: `${element.styles[device].padding.top}${element.styles[device].padding.unit} ${element.styles[device].padding.right}${element.styles[device].padding.unit} ${element.styles[device].padding.bottom}${element.styles[device].padding.unit} ${element.styles[device].padding.left}${element.styles[device].padding.unit}`,
        }
    }

    const colorStyle = (device, mode) => {
        return {
            color: element.content[device].typo.color[mode],
        }
    }

    const backgroundStyle = (device, mode) => {
        return {
            background: element.content[device].styles.background[mode],
        }
    }

    const borderStyle = (device, mode) => {
        return {
            borderStyle: (element.content[device].styles.border[mode].type !== 'none') && element.content[device].styles.border[mode].type,
            borderWidth: (element.content[device].styles.border[mode].type !== 'none') && `${element.content[device].styles.border[mode].width.top}px ${element.content[device].styles.border[mode].width.right}px ${element.content[device].styles.border[mode].width.bottom}px ${element.content[device].styles.border[mode].width.left}px`,
            borderColor: (element.content[device].styles.border[mode].type !== 'none') && element.content[device].styles.border[mode].color,
            borderRadius: `${element.content[device].styles.border[mode].radius.top}${element.content[device].styles.border[mode].radius.unit} ${element.content[device].styles.border[mode].radius.right}${element.content[device].styles.border[mode].radius.unit} ${element.content[device].styles.border[mode].radius.bottom}${element.content[device].styles.border[mode].radius.unit} ${element.content[device].styles.border[mode].radius.left}${element.content[device].styles.border[mode].radius.unit}`,
        }
    }

    const Title = styled[element.content.tag](
        {
            ...colorStyle("desktop", "normal"),
            textAlign: element.content.alignment,
            ...typoStyle("desktop"),
            transition: 'color .2s',
            '&:hover': css({
                ...colorStyle("desktop", "hover"),
            }),
            '@media (max-width: 1024px)': css({
                ...typoStyle("tablet"),
                ...colorStyle("tablet", "normal"),
                '&:hover': css({
                    ...colorStyle("tablet", "hover"),
                })
            }),
            '@media (max-width: 768px)': css({
                ...typoStyle("mobile"),
                ...colorStyle("mobile", "normal"),
                '&:hover': css({
                    ...colorStyle("mobile", "hover"),
                })
            })
        },
    );

    const styleDiv =
        {
            ...marginPaddingStyle("desktop"),
            ...backgroundStyle("desktop", "normal"),
            ...borderStyle("desktop", "normal"),
            '&:hover': css({
                ...backgroundStyle("desktop", "hover"),
                ...borderStyle("desktop", "hover"),
            }),
            '@media (max-width: 1024px)': css({
                ...marginPaddingStyle("tablet"),
                ...backgroundStyle("tablet", "normal"),
                ...borderStyle("tablet", "normal"),
                '&:hover': css({
                    ...backgroundStyle("tablet", "hover"),
                    ...borderStyle("tablet", "hover"),
                }),
            }),
            '@media (max-width: 768px)': css({
                ...marginPaddingStyle("mobile"),
                ...backgroundStyle("mobile", "normal"),
                ...borderStyle("mobile", "normal"),
                '&:hover': css({
                    ...backgroundStyle("mobile", "hover"),
                    ...borderStyle("mobile", "hover"),
                }),
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
