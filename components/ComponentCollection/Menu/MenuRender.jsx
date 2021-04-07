import React, {useEffect, useState} from 'react';
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import {useInView} from 'react-intersection-observer';
import Link from 'next/link';

export default function MenuRender({element, nav}) {
    const {ref, inView} = useInView();
    const [isNavActive, setIsNavActive] = useState(false)

    const [menu, setMenu] = useState(nav)

    useEffect(function () {
        setMenu(nav)
    }, [nav])

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
        Array.from(element.content[device].typo.decoration).map(item => {
            decorationString += `${item} `
        })
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
            animationDuration: (inView && element.content[device].animation.duration) && element.content[device].animation.duration,
            animationDelay: `${(inView && element.content[device].animation.delay) && element.content[device].animation.delay}ms`,
            animationName: `${inView && element.content[device].animation.name}`,
        }
    }

    const Nav = styled.nav({
        transition: 'width .2s',
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
    });

    const Burger = {
        display: "none",
        position: "relative",
        marginLeft: "auto",
        height: "37px",
        zIndex: 51,
        '@media (max-width: 768px)': {
            display: "block",
        },
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
        "a": {
            ...typoStyle("desktop"),
            ...colorStyle("desktop", "normal"),
        },
        "a:hover, a[aria-current]": {
            ...colorStyle("desktop", "hover"),
        },
        '@media (min-width: 768px)': css({
            justifyContent: element.content.alignment,
            "> * + *": {
                marginLeft: "24px",
            },
        }),
        '@media (max-width: 768px)': css({
            display: isNavActive ?? "flex",
            position: "fixed",
            zIndex: "50",
            background: "hsla(0,0%,100%,.95)",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: "column",
            fontSize: "24px",
            padding: '60px 35px',
            opacity: isNavActive ? "1" : "0",
            pointerEvents: isNavActive ? "auto" : "none",
            transition: "opacity .3s",
            animation: isNavActive ?? "menuIn 1s",
            "a": {
                ...typoStyle("mobile"),
                ...colorStyle("mobile", "normal"),
            },
            "a:hover, a[aria-current]": {
                ...colorStyle("mobile", "hover"),
            },
            "> *": {
                transform: isNavActive ? "translateY(0px)" : "translateY(-10px)",
                transition: "transform .3s, opacity .3s",
                opacity: isNavActive ? '1' : "0",
            },

        })
    })

    const NavMenuItem = styled.li({
        position: "relative",
        "span": {
            marginLeft: '1rem',
            fontSize: `${concatValueUnit(element.content["desktop"].typo.size.value, element.content["desktop"].typo.size.unit)}`,
            ...colorStyle("desktop", "normal"),
        },
        "&:hover > ul": {
            visibility: "visible",
            opacity: "1",
        },
        '@media (max-width: 768px)': css({
            width: '100%',
            padding: '10px 0',
            textAlign: 'left',
            marginLeft: '0',
            "&:hover > ul": {
                display: 'block',
            },
            "span": {
                fontSize: `${concatValueUnit(element.content["mobile"].typo.size.value, element.content["mobile"].typo.size.unit)}`,
                ...colorStyle("mobile", "normal"),
            }
        })
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
        },
        '@media (max-width: 768px)': css({
            background: 'transparent',
            boxShadow: 'none',
            position: 'relative',
            display: 'none',
            "li": {
                padding: "10px 25px",
                fontSize: "14px",
                marginBottom: "5px",
            },
            "ul": {
                left: "0px",
                top: "0",
            },
        })
    })

    const Item = ({item, setIsNavActive, icon = "la-angle-double-down"}) => {
        return <NavMenuItem>
            <Link href={`${item.slug}`}>
                <a onClick={() => setIsNavActive(false)}>{item.label}</a>
            </Link>

            {item.child.length > 0 &&
            <>
                <span className={`las ${icon}`} />
                <SubMenu>
                    {item.child.map(item => <Item key={item.slug} item={item} icon="la-angle-double-right"/>)}
                </SubMenu>
            </>
            }
        </NavMenuItem>
    }

    return (
        <>
            <Nav>
                <NavMenu>
                    {menu && menu.map(item => <Item key={item.slug} item={item} setIsNavActive={setIsNavActive}/>)}
                </NavMenu>
                <button key={"burger-button"} css={Burger} onClick={() => setIsNavActive(!isNavActive)}
                        className={`${isNavActive ? "isActive" : ''}`}>
                    <span key={"burger-button-span"}/>
                </button>
            </Nav>
        </>
    );
}
