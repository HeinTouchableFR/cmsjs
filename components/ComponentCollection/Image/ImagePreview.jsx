import React from 'react';
import {css} from '@emotion/react'
import styled from '@emotion/styled'

export default function ImagePreview({element, device}) {

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

    const marginPaddingStyle = (device) => {
        return {
            margin: generateRuleFromValues([element.styles[device].margin.top, element.styles[device].margin.right, element.styles[device].margin.bottom, element.styles[device].margin.left], element.styles[device].margin.unit),
            padding: generateRuleFromValues([element.styles[device].padding.top, element.styles[device].padding.right, element.styles[device].padding.bottom, element.styles[device].padding.left], element.styles[device].padding.unit),
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
            animationDuration: (element.content[device].animation.duration) && element.content[device].animation.duration,
            animationDelay: `${(element.content[device].animation.delay) && element.content[device].animation.delay}ms`,
            animationName: `${element.content[device].animation.name}`,
        }
    }

    const imageStyle = function (device) {
        return {
            width: `${element.content[device].image.size.width.value}${element.content[device].image.size.width.unit}`,
            maxWidth: `${element.content[device].image.size.maxWidth.value}${element.content[device].image.size.maxWidth.unit}`,
            height: `${element.content[device].image.size.height.value}${element.content[device].image.size.height.value !== 'auto' ? element.content[device].image.size.height.unit : ''}`,
            opacity: `${element.content[device].image.opacity.normal}`
        }
    }
    const imageStyleHover = function (device) {
        return {
            opacity: `${element.content[device].image.opacity.hover}`
        }
    }

    const Image = styled.img`
            transition: width .2s;
            vertical-align: middle;
            display: block;
            ${imageStyle("desktop")}
            ${(device === "tablet" || device === "mobile") && imageStyle("tablet")}
            ${device === "mobile" && imageStyle("mobile")}
            &:hover {
                ${imageStyleHover("desktop")}
                ${(device === "tablet" || device === "mobile") && imageStyleHover("tablet")}
                ${device === "mobile" && imageStyleHover("mobile")}
            };
        `

    const containerStyle = function (device) {
        return {
            ...marginPaddingStyle(device),
            ...backgroundStyle(device, "normal"),
            ...borderStyle(device, "normal"),
            ...animationStyle(device)
        }
    }
    const containerStyleHover = function (device) {
        return {
            ...backgroundStyle(device, "hover"),
            ...borderStyle(device, "hover")
        }
    }

    const styleDiv = css`
            text-align: ${element.content.alignment};
            ${containerStyle("desktop")}
            ${(device === "tablet" || device === "mobile") && containerStyle("tablet")}
            ${device === "mobile" && containerStyle("mobile")}
            &:hover {
                ${containerStyleHover("desktop")}
                ${(device === "tablet" || device === "mobile") && containerStyleHover("tablet")}
                ${device === "mobile" && containerStyleHover("mobile")}
            };
        `

    return (
        <>
            <div css={styleDiv}>
                <Image src={element.content.image.url} alt={element.content.image.name}/>
            </div>
        </>
    );
}
