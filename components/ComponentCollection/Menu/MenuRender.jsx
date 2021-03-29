import React, {useState} from 'react';
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import {useInView} from 'react-intersection-observer';
import Link from 'next/link';

export default function MenuRender({element, nav}) {
    const {ref, inView} = useInView();
    const [isNavActive, setIsNavActive] = useState(false)

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
    const menuStyle = function (device) {
        return {
        }
    }
    const menuStyleHover = function (device) {
        return {
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

    const Nav = styled.nav(
        {
            ...menuStyle("desktop"),
            transition: 'width .2s',
            '&:hover': {
                ...menuStyleHover("tablet")
            },
            '@media (max-width: 1024px)': css({
                '&:hover': {
                }
            }),
            '@media (max-width: 768px)': css({
                '&:hover': {
                    ...menuStyleHover("mobile")
                }
            })
        },
    );
    const styleDiv =
        {
            textAlign: element.content.alignment,
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
                <Nav>
                    <ul className={`nav__menu ${isNavActive ? "isActive" : ''}`}>
                        {nav && nav.map(item => <Item key={item.slug} item={item} setIsNavActive={setIsNavActive} />)}
                    </ul>
                    <button className={`nav__burger ${isNavActive ? "isActive" : ''}`} onClick={() => setIsNavActive(!isNavActive)}>
                        <span></span>
                    </button>
                </Nav>
            </div>
        </>
    );
}

const Item = function ({item, setIsNavActive}) {
    return <li className={"nav__menu_item"}>
        <Link href={`${item.slug}`}>
            <a onClick={() => setIsNavActive(false)}>{item.label}</a>
        </Link>
        {item.child.length > 0 &&
        <ul className={"sub"}>
            {item.child.map(item => <Item key={item.slug} item={item}/>)}
        </ul>
        }
    </li>
}
