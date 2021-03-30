import React, {useEffect, useState} from 'react';
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import axios from 'axios';
import Link from 'next/link';

export default function MenuPreview({element, device}) {
    const [menu, setMenu] = useState([]);
    const [isNavActive, setIsNavActive] = useState(false)

    useEffect(async function () {
        if (menu.id !== element.content.menu.value) {
            await axios
                .get(`${process.env.URL}/api/menus/${element.content.menu.value}`)
                .then((res) => {
                    setMenu(res.data.data)
                })
                .catch(() => {
                });
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
    const typoStyle = (device) => {
        let decorationString = ""
        Array.from(element.content[device].typo.decoration).map(item => {decorationString += `${item} `})
        return {
            fontSize: `${concatValueUnit(element.content[device].typo.size.value, element.content[device].typo.size.unit)}`,
            fontFamily: element.content[device].typo.family,
            fontWeight: element.content[device].typo.weight,
            textTransform: element.content[device].typo.transform,
            fontStyle: element.content[device].typo.style,
            textDecoration: decorationString,
            lineHeight: `${concatValueUnit(element.content[device].typo.lineHeight.value, element.content[device].typo.lineHeight.unit)}`,
            letterSpacing: `${concatValueUnit(element.content[device].typo.letterSpacing)}`,
        }
    }
    const colorStyle = (device, mode) => {
        return {
            color: element.content[device].typo.color[mode],
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

    const Nav = styled.nav({
        transition: 'width .2s',
        ...containerStyle("desktop"),
        ...(device === "tablet" || device === "mobile") && containerStyle("tablet"),
        ...device === "mobile" && containerStyle("mobile"),
        "&:hover": {
            ...containerStyleHover("desktop"),
            ...(device === "tablet" || device === "mobile") && containerStyleHover("tablet"),
            ...device === "mobile" && containerStyleHover("mobile"),
        }
    });

    const Burger = {
        display: device === "mobile" ? "block" : "none",
        position: "relative",
        marginLeft: "auto",
        height: "37px",
        zIndex: 51,
        'span': {
            position: "relative",
            content: `''`,
            width: "20px",
            height: "2px",
            display: "block",
            transition: "transform .4s, background .2s",
            background: isNavActive ? "transparent" : "currentColor",
            '&:before': {
                position: 'absolute',
                content: `''`,
                width: "20px",
                height: "2px",
                background: "currentColor",
                display: "block",
                transition: "transform .4s, background .2s",
                transformOrigin: "0 50%",
                top: "-6px",
                transform: isNavActive && "translateY(-2px) rotate(45deg)",
            },
            '&:after': {
                position: 'absolute',
                content: `''`,
                width: "20px",
                height: "2px",
                background: "currentColor",
                display: "block",
                transition: "transform .4s, background .2s",
                bottom: "-6px",
                transformOrigin: "0 50%",
                transform: isNavActive && "rotate(-45deg)",
            }
        }
    }

    const NavMenu = styled.ul({
        marginLeft: "auto",
        display: "flex",
        fontSize: "18px",
        fontWeight: "500",
        listStyle: "none",
        marginBottom: "0",
        justifyContent: element.content.alignment,
        "a": {
            ...typoStyle("desktop"),
            ...colorStyle("desktop", "normal"),
        },
        "a:hover, a[aria-current]": {
            ...colorStyle("desktop", "hover"),
        },
        "> * + *": {
            marginLeft: "24px",
        },
        ...device === "mobile" && css({
            display: isNavActive ?? "flex",
            position: "fixed",
            zIndex: "50",
            background: "hsla(0,0%,100%,.95)",
            margin: "auto",
            top: 0,
            left: "360px",
            right: 0,
            bottom: 0,
            width: "360px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "24px",
            opacity: isNavActive ? "1" : "0",
            pointerEvents: isNavActive ? "auto" : "none",
            transition: "opacity .3s",
            animation: isNavActive ?? "menuIn 1s",
            "> *": {
                transform: isNavActive ? "translateY(0px)" : "translateY(-10px)",
                transition: "transform .3s, opacity .3s",
                opacity: isNavActive ? '1' : "0",
            },
            "* + *": {
                marginLeft: 0,
                marginTop: "32px",
            },
        })
    })

    const NavMenuItem = styled.li({
        position: "relative",
        "&:hover > ul": {
            visibility: "visible",
            opacity: "1",
        }
    })

    const SubMenu = styled.ul({
        position: "absolute",
        visibility: "hidden",
        opacity: "0",
        zIndex: "100",
        transition: ".3s ease-in-out",
        background: "#fff",
        boxShadow: "0 3px 5px -1px #ccc",
        width: "240px",
        textAlign: "left",
        "ul": {
            left: "240px",
            top: "0",
        },
        "li": {
            padding: "5px 20px",
            fontSize: "14px",
            marginBottom: "5px",
        },
        "li a:hover": {
            paddingLeft: "10px",
            borderLeft: `2px solid ${element.content["desktop"].typo.color["hover"]}`,
            transition: " all 0.3s ease-in-out",
        }
    })

    const Item = ({item, setIsNavActive}) => {
        return <NavMenuItem>
            <Link href={`${item.slug}`}>
                <a onClick={() => setIsNavActive(false)}>{item.label}</a>
            </Link>
            {item.child.length > 0 &&
            <SubMenu>
                {item.child.map(item => <Item key={item.slug} item={item}/>)}
            </SubMenu>
            }
        </NavMenuItem>
    }

    return (
        <>
            <Nav>
                <NavMenu>
                    {menu.items && JSON.parse(menu.items).map(item => <Item key={item.slug} item={item}/>)}
                </NavMenu>
                <button key={"burger-button"} css={Burger} onClick={() => setIsNavActive(!isNavActive)}
                        className={`${isNavActive ? "isActive" : ''}`}>
                    <span key={"burger-button-span"}/>
                </button>
            </Nav>
        </>
    );
}
