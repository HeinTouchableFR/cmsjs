import React, {useEffect, useState} from 'react';
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import axios from 'axios';
import Link from 'next/link';

export default function MenuPreview({element, device}) {
    const [menu, setMenu] = useState([]);

    useEffect(async function() {
        if(menu.id !== element.content.menu.value){
            await axios
                .get(`${process.env.URL}/api/menus/${element.content.menu.value}`)
                .then((res) => {
                    setMenu(res.data.data)
                })
                .catch(() => {});
        }
    }, [element])

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
    const menuStyle = function (device) {
        return {

        }
    }
    const menuStyleHover = function (device) {
        return {
        }
    }

    const Nav = styled.nav`
            transition: width .2s;
            vertical-align: middle;
            display: block;
            ${menuStyle("desktop")}
            ${(device === "tablet" || device === "mobile") && menuStyle("tablet")}
            ${device === "mobile" && menuStyle("mobile")}
            &:hover {
                ${menuStyleHover("desktop")}
                ${(device === "tablet" || device === "mobile") && menuStyleHover("tablet")}
                ${device === "mobile" && menuStyleHover("mobile")}
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
                <Nav>
                    <ul className={"nav__menu"}>
                        {menu.items && JSON.parse(menu.items).map(item => <Item key={item.slug} item={item} />)}
                    </ul>
                    <button className={"nav__burger"}>
                        <span></span>
                    </button>
                </Nav>
            </div>
        </>
    );
}

const Item = function ({item}) {
    return <li className={"nav__menu_item"}>
        <Link href={`${item.slug}`}>
            <a>{item.label}</a>
        </Link>
        {item.child.length > 0 &&
        <ul className={"sub"}>
            {item.child.map(item => <Item key={item.slug} item={item}/>)}
        </ul>
        }
    </li>
}
