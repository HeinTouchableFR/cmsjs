import React, { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
    containerStyle,
    containerStyleHover,
} from 'variables/previewFunctions';
import {
    colorStyle,
    concatValueUnit,
    typoStyle,
} from 'variables/renderFunctions';
import PropTypes from 'prop-types';

function MenuPreview({ element, device }) {
    const [menu] = useState(JSON.parse(element.content.menu.items));
    const [isNavActive, setIsNavActive] = useState(false);

    const spanSize = (screen) => ({
        fontSize: `${concatValueUnit(element.content[screen].typo.size.value, element.content[screen].typo.size.unit)}`,
    });

    const Nav = styled.nav({
        transition: 'width .2s',
        ...containerStyle('desktop', element),
        ...(device === 'tablet' || device === 'mobile') && containerStyle('tablet', element),
        ...device === 'mobile' && containerStyle('mobile', element),
        '&:hover': {
            ...containerStyleHover('desktop', element),
            ...(device === 'tablet' || device === 'mobile') && containerStyleHover('tablet', element),
            ...device === 'mobile' && containerStyleHover('mobile', element),
        },
    });

    const Burger = {
        display: device === 'mobile' ? 'block' : 'none',
        position: 'relative',
        marginLeft: 'auto',
        height: '37px',
        zIndex: 51,
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

    const NavMenu = styled.ul`
        margin-left: auto;
        display: flex;
        font-size: 18px;
        font-weight: 500;
        list-style: none;
        margin-bottom: 0;
        justify-content: ${element.content.alignment};
        label {
            ${typoStyle('desktop', element)}
            ${(device === 'tablet' || device === 'mobile') && typoStyle('tablet', element)}
            ${device === 'mobile' && typoStyle('mobile', element)}
            ${colorStyle('desktop', 'normal', element)}
            ${(device === 'tablet' || device === 'mobile') && colorStyle('tablet', 'normal', element)}
            ${(device === 'mobile') && colorStyle('mobile', 'normal', element)}
        }
        label:hover, a[aria-current] {
            ${colorStyle('desktop', 'hover', element)}
        }
        > * + * {
            margin-left: 24px;
        }
        ${device === 'mobile' && `
            display: ${isNavActive ? 'flex' : 'none'};
            position: fixed;
            z-index: 50;
            justify-content: normal;
            background: hsla(0,0%,100%,.95);
            top: 0;
            right: 0;
            bottom: 0;
            flex-direction: column;
            font-size: 24px;
            padding: 60px 35px;
            opacity: 1;
            pointer-events: auto;
            transition: opacity .3s;
            width: 360px;
            left: 360px;
            margin: auto;
    `}
       
        `;

    const NavMenuItem = styled.li`
        position: relative;
        &:hover > ul {
            visibility: visible;
            opacity: 1;
        }
        span {
            margin-left: 1rem;
            ${spanSize('desktop')}
            ${(device === 'tablet' || device === 'mobile') && spanSize('tablet')}
            ${device === 'mobile' && spanSize('mobile')}
            ${colorStyle('desktop', 'normal', element)}
            ${(device === 'tablet' || device === 'mobile') && colorStyle('tablet', 'normal', element)}
            ${device === 'mobile' && colorStyle('mobile', 'normal', element)}
        }
        :hover > ul {
            display: block;
         }
        ${device === 'mobile' && `
            width: 100%;
            padding: 10px 0;
            text-align: left;
            margin-left: 0;
            `}
    `;

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
        'li label:hover': {
            paddingLeft: '10px',
            borderLeft: `2px solid ${element.content.desktop.typo.color.hover}`,
            transition: ' all 0.3s ease-in-out',
        },
        ...device === 'mobile' && css({
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

    const Item = ({ item, handleSetIsNavActive, icon = 'fa-angle-double-down' }) => (
        <NavMenuItem>
            <label onClick={() => handleSetIsNavActive(false)}>{item.label}</label>

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
                                handleSetIsNavActive={setIsNavActive}
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

export default React.memo(MenuPreview);

MenuPreview.propTypes = {
    device: PropTypes.string.isRequired,
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
            alignment: PropTypes.string.isRequired,
            menu: PropTypes.shape({
                items: PropTypes.string,
            }).isRequired,
        }).isRequired,
        styles: PropTypes.shape({
        }).isRequired,
    }).isRequired,
};
