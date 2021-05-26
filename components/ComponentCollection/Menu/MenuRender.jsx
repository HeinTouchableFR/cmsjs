import React, { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
    animationStyle,
    backgroundStyle,
    borderStyle,
    colorStyle,
    marginPaddingStyle,
    typoStyle,
    concatValueUnit,
} from 'variables/renderFunctions';
import PropTypes from 'prop-types';

export default function MenuRender({ element }) {
    const { inView } = useInView();
    const [isNavActive, setIsNavActive] = useState(false);

    const [menu] = useState(JSON.parse(element.content.menu.items));

    const Nav = styled.nav({
        transition: 'width .2s',
        ...marginPaddingStyle('desktop', element),
        ...backgroundStyle('desktop', 'normal', element),
        ...borderStyle('desktop', 'normal', element),
        ...animationStyle('desktop', element, inView),
        '&:hover': {
            ...backgroundStyle('desktop', 'hover', element),
            ...borderStyle('desktop', 'hover', element),
        },
        '@media (max-width: 1024px)': css({
            ...marginPaddingStyle('tablet', element),
            ...backgroundStyle('tablet', 'normal', element),
            ...borderStyle('tablet', 'normal', element),
            ...animationStyle('tablet'),
            '&:hover': {
                ...backgroundStyle('tablet', 'hover', element),
                ...borderStyle('tablet', 'hover', element),
            },
        }),
        '@media (max-width: 768px)': css({
            ...marginPaddingStyle('mobile', element),
            ...backgroundStyle('mobile', 'normal', element),
            ...borderStyle('mobile', 'normal', element),
            ...animationStyle('mobile', element, inView),
            '&:hover': {
                ...backgroundStyle('mobile', 'hover', element),
                ...borderStyle('mobile', 'hover', element),
            },
        }),
    });

    const Burger = {
        display: 'none',
        position: 'relative',
        marginLeft: 'auto',
        height: '37px',
        zIndex: 51,
        '@media (max-width: 768px)': {
            display: 'block',
        },
        span: {
            position: 'relative',
            content: '\'\'',
            width: '20px',
            height: '2px',
            display: 'block',
            transition: 'transform .4s, background .2s',
            background: isNavActive ? 'transparent' : 'currentColor',
            '&:before': {
                position: 'absolute',
                content: '\'\'',
                width: '20px',
                height: '2px',
                background: 'currentColor',
                display: 'block',
                transition: 'transform .4s, background .2s',
                transformOrigin: '0 50%',
                top: '-6px',
                transform: isNavActive && 'translateY(-2px) rotate(45deg)',
            },
            '&:after': {
                position: 'absolute',
                content: '\'\'',
                width: '20px',
                height: '2px',
                background: 'currentColor',
                display: 'block',
                transition: 'transform .4s, background .2s',
                bottom: '-6px',
                transformOrigin: '0 50%',
                transform: isNavActive && 'rotate(-45deg)',
            },
        },
    };

    const NavMenu = styled.ul({
        marginLeft: 'auto',
        display: 'flex',
        fontSize: '18px',
        fontWeight: '500',
        listStyle: 'none',
        marginBottom: '0',
        a: {
            ...typoStyle('desktop', element),
            ...colorStyle('desktop', 'normal', element),
        },
        'a:hover, a[aria-current]': {
            ...colorStyle('desktop', 'hover', element),
        },
        '@media (min-width: 768px)': css({
            justifyContent: element.content.alignment,
            '> * + *': {
                marginLeft: '24px',
            },
        }),
        '@media (max-width: 768px)': css({
            display: isNavActive ?? 'flex',
            position: 'fixed',
            zIndex: '50',
            background: 'hsla(0,0%,100%,.95)',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: 'column',
            fontSize: '24px',
            padding: '60px 35px',
            opacity: isNavActive ? '1' : '0',
            pointerEvents: isNavActive ? 'auto' : 'none',
            transition: 'opacity .3s',
            animation: isNavActive ?? 'menuIn 1s',
            a: {
                ...typoStyle('mobile', element),
                ...colorStyle('mobile', 'normal', element),
            },
            'a:hover, a[aria-current]': {
                ...colorStyle('mobile', 'hover', element),
            },
            '> *': {
                transform: isNavActive ? 'translateY(0px)' : 'translateY(-10px)',
                transition: 'transform .3s, opacity .3s',
                opacity: isNavActive ? '1' : '0',
            },

        }),
    });

    const NavMenuItem = styled.li({
        position: 'relative',
        span: {
            marginLeft: '1rem',
            fontSize: `${concatValueUnit(element.content.desktop.typo.size.value, element.content.desktop.typo.size.unit)}`,
            ...colorStyle('desktop', 'normal', element),
        },
        '&:hover > ul': {
            visibility: 'visible',
            opacity: '1',
        },
        '@media (max-width: 768px)': css({
            width: '100%',
            padding: '10px 0',
            textAlign: 'left',
            marginLeft: '0',
            '&:hover > ul': {
                display: 'block',
            },
            span: {
                fontSize: `${concatValueUnit(element.content.mobile.typo.size.value, element.content.mobile.typo.size.unit)}`,
                ...colorStyle('mobile', 'normal', element),
            },
        }),
    });

    const SubMenu = styled.ul({
        position: 'absolute',
        visibility: 'hidden',
        opacity: '0',
        zIndex: '100',
        transition: '.3s ease-in-out',
        background: '#fff',
        boxShadow: '0 3px 5px -1px #ccc',
        width: '240px',
        textAlign: 'left',
        ul: {
            left: '240px',
            top: '0',
        },
        li: {
            padding: '5px 20px',
            fontSize: '14px',
            marginBottom: '5px',
        },
        'li a:hover': {
            paddingLeft: '10px',
            borderLeft: `2px solid ${element.content.desktop.typo.color.hover}`,
            transition: ' all 0.3s ease-in-out',
        },
        '@media (max-width: 768px)': css({
            background: 'transparent',
            boxShadow: 'none',
            position: 'relative',
            display: 'none',
            li: {
                padding: '10px 25px',
                fontSize: '14px',
                marginBottom: '5px',
            },
            ul: {
                left: '0px',
                top: '0',
            },
        }),
    });

    const Item = ({ item, handleSetIsNavActive, icon }) => (
        <NavMenuItem>
            <Link href={`${item.slug !== '/'}` ? `${process.env.SERVER}/${item.slug}` : `${item.slug}`}>
                <a onClick={() => handleSetIsNavActive(false)}>{item.label}</a>
            </Link>

            {item.child.length > 0
            && (
                <>
                    <span className={`fas ${icon}`} />
                    <SubMenu>
                        {item.child.map((thing) => (
                            <Item
                                key={thing.slug}
                                item={thing}
                                icon='fa-angle-double-right'
                            />
                        ))}
                    </SubMenu>
                </>
            )}
        </NavMenuItem>
    );

    Item.propTypes = {
        item: PropTypes.shape({
            label: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
            child: PropTypes.arrayOf(PropTypes.shape({
                length: PropTypes.number.isRequired,
                map: PropTypes.func.isRequired,
            })).isRequired,
        }).isRequired,
        icon: PropTypes.string,
        handleSetIsNavActive: PropTypes.func.isRequired,
    };

    Item.defaultProps = {
        icon: 'fa-angle-double-down',
    };

    return (
        <>
            <Nav>
                <NavMenu>
                    {menu && menu.map((item) => (
                        <Item
                            key={item.slug}
                            item={item}
                            handleSetIsNavActive={setIsNavActive}
                        />
                    ))}
                </NavMenu>
                <button
                    key='burger-button'
                    css={Burger}
                    onClick={() => setIsNavActive(!isNavActive)}
                    className={`${isNavActive ? 'isActive' : ''}`}
                    type='button'
                >
                    <span key='burger-button-span' />
                </button>
            </Nav>
        </>
    );
}

MenuRender.propTypes = {
    element: PropTypes.shape({
        content: PropTypes.shape({
            desktop: PropTypes.shape({
                typo: PropTypes.shape({
                    size: PropTypes.shape({
                        value: PropTypes.string.isRequired,
                        unit: PropTypes.string.isRequired,
                    }).isRequired,
                    color: PropTypes.shape({
                        hover: PropTypes.string.isRequired,
                    }).isRequired,
                }).isRequired,
            }),
            mobile: PropTypes.shape({
                typo: PropTypes.shape({
                    size: PropTypes.shape({
                        value: PropTypes.string.isRequired,
                        unit: PropTypes.string.isRequired,
                    }).isRequired,
                }).isRequired,
            }),
            alignment: PropTypes.string.isRequired,
            menu: PropTypes.shape({
                items: PropTypes.string,
            }).isRequired,
        }).isRequired,
        styles: PropTypes.shape({
        }).isRequired,
    }).isRequired,
};
