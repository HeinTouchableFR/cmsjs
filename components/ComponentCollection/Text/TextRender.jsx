import React from 'react';
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import parse from 'html-react-parser';
import {useInView} from 'react-intersection-observer';

export default function TextRender({element}) {

    const {ref, inView, entry} = useInView();

    const concatValueUnit = (value, unit = 'px') => {
        return value + (value && unit)
    }

    const generateRuleFromValues = (values = [], unit = 'px') => {
        if (!values.every(item => item === 0)) {
            let string = ""
            values.map(value => string += concatValueUnit(value ? value : 0, unit) + " ")
            return string
        }
    }

    const typoStyle = (device) => {
        return {
            fontSize: `${concatValueUnit(element.content[device].typo.size.value, element.content[device].typo.size.unit)}`,
            fontFamily: element.content[device].typo.family,
            fontWeight: element.content[device].typo.weight,
            textTransform: element.content[device].typo.transform,
            fontStyle: element.content[device].typo.style,
            textDecoration: element.content[device].typo.decoration,
            lineHeight: `${concatValueUnit(element.content[device].typo.lineHeight.value, element.content[device].typo.lineHeight.unit)}`,
            letterSpacing: `${concatValueUnit(element.content[device].typo.letterSpacing)}`,
        }
    }

    const marginPaddingStyle = (device) => {
        return {
            margin: generateRuleFromValues([element.styles[device].margin.top, element.styles[device].margin.right, element.styles[device].margin.bottom, element.styles[device].margin.left], element.styles[device].margin.unit),
            padding: generateRuleFromValues([element.styles[device].padding.top, element.styles[device].padding.right, element.styles[device].padding.bottom, element.styles[device].padding.left], element.styles[device].padding.unit),
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
            borderWidth: (element.content[device].styles.border[mode].type !== 'none') && generateRuleFromValues([element.content[device].styles.border[mode].width.top, element.content[device].styles.border[mode].width.right, element.content[device].styles.border[mode].width.bottom, element.content[device].styles.border[mode].width.left]),
            borderColor: (element.content[device].styles.border[mode].type !== 'none') && element.content[device].styles.border[mode].color,
            borderRadius: generateRuleFromValues([element.content[device].styles.border[mode].radius.top, element.content[device].styles.border[mode].radius.right, element.content[device].styles.border[mode].radius.bottom, element.content[device].styles.border[mode].radius.left], element.content[device].styles.border[mode].radius.unit),
        }
    }

    const animationStyle = (device) => {
        return {
            animationDuration: (inView && element.content[device].animation.duration) && element.content[device].animation.duration,
            animationDelay: `${(inView && element.content[device].animation.delay) && element.content[device].animation.delay}ms`,
            animationName: `${inView && element.content[device].animation.name}`,
        }
    }

    const Text = styled.div(
        {
            ...colorStyle("desktop", "normal"),
            textAlign: element.content.alignment,
            ...typoStyle("desktop"),
            transition: 'color .2s',
            '&:hover': {
                ...colorStyle("desktop", "hover")
            },
            '@media (max-width: 1024px)': css({
                ...typoStyle("tablet"),
                ...colorStyle("tablet", "normal"),
                '&:hover': {
                    ...colorStyle("tablet", "hover")
                }
            }),
            '@media (max-width: 768px)': css({
                ...typoStyle("mobile"),
                ...colorStyle("mobile", "normal"),
                '&:hover': {
                    ...colorStyle("mobile", "hover")
                }
            })
        },
    );

    const styleDiv =
        {
            ...marginPaddingStyle("desktop"),
            ...backgroundStyle("desktop", "normal"),
            ...borderStyle("desktop", "normal"),
            ...animationStyle("desktop"),
            '&:hover': {
                ...backgroundStyle("desktop", "hover"),
                ...borderStyle("desktop", "hover")
            },
            '@media (max-width: 1024px)': css({
                ...marginPaddingStyle("tablet"),
                ...backgroundStyle("tablet", "normal"),
                ...borderStyle("tablet", "normal"),
                ...animationStyle("tablet"),
                '&:hover': {
                    ...backgroundStyle("tablet", "hover"),
                    ...borderStyle("tablet", "hover")
                },
            }),
            '@media (max-width: 768px)': css({
                ...marginPaddingStyle("mobile"),
                ...backgroundStyle("mobile", "normal"),
                ...borderStyle("mobile", "normal"),
                ...animationStyle("mobile"),
                '&:hover': {
                    ...backgroundStyle("mobile", "hover"),
                    ...borderStyle("mobile", "hover")
                },
            })
        }

    return (
        <>
            <div ref={ref} css={styleDiv}>
                <Text>
                    {parse(element.content.text)}
                </Text>
            </div>
        </>
    );
}
