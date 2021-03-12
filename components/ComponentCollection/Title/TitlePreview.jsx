import React from 'react';
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import parse from 'html-react-parser';

export default function TitlePreview({element, device}) {

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

    const typoStyle = () => {
        let fontSize, fontFamily, fontWeight, textTransform, fontStyle, textDecoration, lineHeight, letterSpacing = ""
        if (device === "desktop") {
            fontSize = concatValueUnit(element.content["desktop"].typo.size.value, element.content["desktop"].typo.size.unit)
            fontFamily = element.content["desktop"].typo.family
            fontWeight = element.content["desktop"].typo.weight
            textTransform = element.content["desktop"].typo.transform
            fontStyle = element.content["desktop"].typo.style
            textDecoration = element.content["desktop"].typo.decoration
            lineHeight = concatValueUnit(element.content["desktop"].typo.lineHeight.value, element.content["desktop"].typo.lineHeight.unit)
            letterSpacing = concatValueUnit(element.content["desktop"].typo.letterSpacing)
        } else if (device === "tablet") {
            fontSize = element.content[device].typo.size.value ? concatValueUnit(element.content[device].typo.size.value, element.content[device].typo.size.unit) : concatValueUnit(element.content["desktop"].typo.size.value, element.content["desktop"].typo.size.unit)
            fontFamily = element.content[device].typo.family ? element.content[device].typo.family : element.content["desktop"].typo.family
            fontWeight = element.content[device].typo.weight ? element.content[device].typo.weight : element.content["desktop"].typo.weight
            textTransform = element.content[device].typo.transform ? element.content[device].typo.transform : element.content["desktop"].typo.transform
            fontStyle = element.content[device].typo.style ? element.content[device].typo.style : element.content["desktop"].typo.style
            textDecoration = element.content[device].typo.decoration ? element.content[device].typo.decoration : element.content["desktop"].typo.decoration
            lineHeight = element.content[device].typo.lineHeight.value ? concatValueUnit(element.content[device].typo.lineHeight.value, element.content[device].typo.lineHeight.unit) : concatValueUnit(element.content["desktop"].typo.lineHeight.value, element.content["desktop"].typo.lineHeight.unit)
            letterSpacing = element.content[device].typo.letterSpacing ? concatValueUnit(element.content[device].typo.letterSpacing) : concatValueUnit(element.content["desktop"].typo.letterSpacing)
        } else if (device === "mobile") {
            fontSize = element.content[device].typo.size.value ? concatValueUnit(element.content[device].typo.size.value, element.content[device].typo.size.unit) : (element.content["tablet"].typo.size.value ? concatValueUnit(element.content["tablet"].typo.size.value, element.content["tablet"].typo.size.unit) : concatValueUnit(element.content["desktop"].typo.size.value, element.content["desktop"].typo.size.unit))
            fontFamily = element.content[device].typo.family ? element.content[device].typo.family : (element.content["tablet"].typo.family ? element.content["tablet"].typo.family : element.content["desktop"].typo.family)
            fontWeight = element.content[device].typo.weight ? element.content[device].typo.weight : (element.content["tablet"].typo.weight ? element.content["tablet"].typo.weight : element.content["desktop"].typo.weight)
            textTransform = element.content[device].typo.transform ? element.content[device].typo.transform : (element.content["tablet"].typo.transform ? element.content["tablet"].typo.transform : element.content["desktop"].typo.transform)
            fontStyle = element.content[device].typo.style ? element.content[device].typo.style : (element.content["tablet"].typo.style ? element.content["tablet"].typo.style : element.content["desktop"].typo.style)
            textDecoration = element.content[device].typo.decoration ? element.content[device].typo.decoration : (element.content["tablet"].typo.decoration ? element.content["tablet"].typo.decoration : element.content["desktop"].typo.decoration)
            lineHeight = element.content[device].typo.lineHeight.value ? concatValueUnit(element.content[device].typo.lineHeight.value, element.content[device].typo.lineHeight.unit) : (element.content["tablet"].typo.lineHeight.value ? concatValueUnit(element.content["tablet"].typo.lineHeight.value, element.content["tablet"].typo.lineHeight.unit) : concatValueUnit(element.content["desktop"].typo.lineHeight.value, element.content["desktop"].typo.lineHeight.unit))
            letterSpacing = element.content[device].typo.letterSpacing ? concatValueUnit(element.content[device].typo.letterSpacing) : (element.content["tablet"].typo.letterSpacing ? concatValueUnit(element.content["tablet"].typo.letterSpacing) : concatValueUnit(element.content["desktop"].typo.letterSpacing))
        }

        return {
            fontSize: fontSize,
            fontFamily: fontFamily,
            fontWeight: fontWeight,
            textTransform: textTransform,
            fontStyle: fontStyle,
            textDecoration: textDecoration,
            lineHeight: lineHeight,
            letterSpacing: letterSpacing,
        }
    }

    const marginPaddingStyle = () => {
        let margin, padding = ""

        if (device === "desktop") {
            margin = generateRuleFromValues([element.styles[device].margin.top, element.styles[device].margin.right, element.styles[device].margin.bottom, element.styles[device].margin.left], element.styles[device].margin.unit)
            padding = generateRuleFromValues([element.styles[device].padding.top, element.styles[device].padding.right, element.styles[device].padding.bottom, element.styles[device].padding.left], element.styles[device].padding.unit)
        } else if (device === "tablet") {
            margin = element.styles[device].margin.top || element.styles[device].margin.right || element.styles[device].margin.bottom || element.styles[device].margin.left ? generateRuleFromValues([element.styles[device].margin.top, element.styles[device].margin.right, element.styles[device].margin.bottom, element.styles[device].margin.left], element.styles[device].margin.unit) : generateRuleFromValues([element.styles["desktop"].margin.top, element.styles["desktop"].margin.right, element.styles["desktop"].margin.bottom, element.styles["desktop"].margin.left], element.styles["desktop"].margin.unit)
            padding = element.styles[device].padding.top || element.styles[device].padding.right || element.styles[device].padding.bottom || element.styles[device].padding.left ? generateRuleFromValues([element.styles[device].padding.top, element.styles[device].padding.right, element.styles[device].padding.bottom, element.styles[device].padding.left], element.styles[device].padding.unit) : generateRuleFromValues([element.styles["desktop"].padding.top, element.styles["desktop"].padding.right, element.styles["desktop"].padding.bottom, element.styles["desktop"].padding.left], element.styles["desktop"].padding.unit)
        } else if (device === "mobile") {
            margin = element.styles[device].margin.top || element.styles[device].margin.right || element.styles[device].margin.bottom || element.styles[device].margin.left ? generateRuleFromValues([element.styles[device].margin.top, element.styles[device].margin.right, element.styles[device].margin.bottom, element.styles[device].margin.left], element.styles[device].margin.unit) : (element.styles["tablet"].margin.top || element.styles["tablet"].margin.right || element.styles["tablet"].margin.bottom || element.styles["tablet"].margin.left ? generateRuleFromValues([element.styles["tablet"].margin.top, element.styles["tablet"].margin.right, element.styles["tablet"].margin.bottom, element.styles["tablet"].margin.left], element.styles["tablet"].margin.unit) : generateRuleFromValues([element.styles["desktop"].margin.top, element.styles["desktop"].margin.right, element.styles["desktop"].margin.bottom, element.styles["desktop"].margin.left], element.styles["desktop"].margin.unit))
            padding = element.styles[device].padding.top || element.styles[device].padding.right || element.styles[device].padding.bottom || element.styles[device].padding.left ? generateRuleFromValues([element.styles[device].padding.top, element.styles[device].padding.right, element.styles[device].padding.bottom, element.styles[device].padding.left], element.styles[device].padding.unit) : (element.styles["tablet"].padding.top || element.styles["tablet"].padding.right || element.styles["tablet"].padding.bottom || element.styles["tablet"].padding.left ? generateRuleFromValues([element.styles["tablet"].padding.top, element.styles["tablet"].padding.right, element.styles["tablet"].padding.bottom, element.styles["tablet"].padding.left], element.styles["tablet"].padding.unit) : generateRuleFromValues([element.styles["desktop"].padding.top, element.styles["desktop"].padding.right, element.styles["desktop"].padding.bottom, element.styles["desktop"].padding.left], element.styles["desktop"].padding.unit))
        }

        return {
            margin: margin,
            padding: padding,
        }
    }

    const colorStyle = (mode) => {
        let color = ""
        if (device === "desktop") {
            color = element.content[device].typo.color[mode]
        } else if (device === "tablet") {
            color = element.content[device].typo.color[mode] ? element.content[device].typo.color[mode] : element.content["desktop"].typo.color[mode]
        } else if (device === "mobile") {
            color = element.content[device].typo.color[mode] ? element.content[device].typo.color[mode] : (element.content["tablet"].typo.color[mode] ? element.content["tablet"].typo.color[mode] : element.content["desktop"].typo.color[mode])
        }
        return {
            color: color,
        }
    }

    const backgroundStyle = (mode) => {
        let background = ""
        if (device === "desktop") {
            background = element.content[device].styles.background[mode]
        } else if (device === "tablet") {
            background = element.content[device].styles.background[mode] ? element.content[device].styles.background[mode] : element.content["desktop"].styles.background[mode]
        } else if (device === "mobile") {
            background = element.content[device].styles.background[mode] ? element.content[device].styles.background[mode] : (element.content["tablet"].styles.background[mode] ? element.content["tablet"].styles.background[mode] : element.content["desktop"].styles.background[mode])
        }
        return {
            background: background,
        }
    }

    const borderStyle = (mode) => {
        let borderStyle = ""
        if (device === "desktop") {
            borderStyle = (element.content[device].styles.border[mode].type !== 'none') && element.content[device].styles.border[mode].type
        } else if (device === "tablet") {
            borderStyle = element.content[device].styles.background[mode] ? element.content[device].styles.background[mode] : element.content["desktop"].styles.background[mode]
        } else if (device === "mobile") {
            borderStyle = element.content[device].styles.background[mode] ? element.content[device].styles.background[mode] : (element.content["tablet"].styles.background[mode] ? element.content["tablet"].styles.background[mode] : element.content["desktop"].styles.background[mode])
        }

        return {
            borderStyle: borderStyle,
            borderWidth: (element.content[device].styles.border[mode].type !== 'none') && generateRuleFromValues([element.content[device].styles.border[mode].width.top, element.content[device].styles.border[mode].width.right, element.content[device].styles.border[mode].width.bottom, element.content[device].styles.border[mode].width.left]),
            borderColor: (element.content[device].styles.border[mode].type !== 'none') && element.content[device].styles.border[mode].color,
            borderRadius: generateRuleFromValues([element.content[device].styles.border[mode].radius.top, element.content[device].styles.border[mode].radius.right, element.content[device].styles.border[mode].radius.bottom, element.content[device].styles.border[mode].radius.left], element.content[device].styles.border[mode].radius.unit),
        }
    }

    const Title = styled[element.content.tag](
        {
            ...colorStyle("normal"),
            textAlign: element.content.alignment,
            ...typoStyle(),
            transition: 'color .2s',
            '&:hover': css({
                ...colorStyle("hover"),
            }),
        },
    );

    const styleDiv =
        {
            ...marginPaddingStyle(),
            ...backgroundStyle("normal"),
            ...borderStyle("normal"),
            animationDuration: element.content["desktop"].animation.duration && element.content["desktop"].animation.duration,
            animationDelay: `${ element.content["desktop"].animation.delay && element.content["desktop"].animation.delay}ms`,
            '&:hover': css({
                ...backgroundStyle("hover"),
                ...borderStyle("hover"),
            }),
        }

    return (
        <>
            <div css={styleDiv} className={`${element.content["desktop"].animation.name}`}>
                <Title>
                    {parse(element.content.text)}
                </Title>
            </div>
        </>
    );
}
