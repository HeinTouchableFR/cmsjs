import React, {
    useEffect, useState,
} from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
    containerStyle,
    containerStyleHover,
} from 'variables/previewFunctions';
import {
    colorStyle,
    typoStyle,
} from 'variables/renderFunctions';
import PropTypes from 'prop-types';
import { useBuilder } from 'context/builder';
import { useInView } from 'react-intersection-observer';
import {
    Burger, handleOpenNav,
} from './Elements/Burger';
import ItemPreview from './Elements/ItemPreview';

function MenuPreview({ element, device }) {
    const { menus } = useBuilder();
    const [menu, setMenu] = useState(typeof element.content.menu === 'string' ? [] : JSON.parse(element.content.menu.items));
    const { showAnimation } = useBuilder();
    const { ref, entry } = useInView({
        triggerOnce: true,
    });
    const inView = showAnimation(element);
    const [mobileMenuPos, setMenuPos] = useState('0');

    useEffect(() => {
        if (typeof element.content.menu === 'string') {
            const menuFromMenus = menus.find((x) => x.id.toString() === element.content.menu);
            if (menuFromMenus) {
                setMenu(JSON.parse(menuFromMenus.items));
            }
        }
    }, [element, menus]);

    const Nav = css({
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

    useEffect(() => {
        const windowWidth = window.innerWidth;
        setMenuPos((windowWidth / 2) - 180);
    }, []);

    const MainNavigation = styled.div({
        display: 'flex',
        justifyContent: `${element.content.alignment}`,
        ...(device === 'mobile') && {
            display: 'block',
            justifyContent: 'none',
            position: 'fixed',
            top: 0,
            right: `${mobileMenuPos - 250}px`,
            bottom: 0,
            backgroundColor: '#FFF',
            height: '100%',
            width: '250px',
            opacity: '0',
            transition: 'right .5s',
        },
        ul: {
            float: 'left',
            display: 'block',
            listStyle: 'none',
            margin: '0',
            paddingLeft: '0',
            ...(device === 'mobile') && {
                float: 'none',
                marginTop: '50px',
            },
            li: {
                float: 'left',
                position: 'relative',
                ...(device === 'mobile') && {
                    float: 'none',
                    borderTop: 'solid 1px var(--color-gray)',
                    padding: '10px 0',
                },
                a: {
                    paddingLeft: '.5625rem',
                    paddingRight: '.5625rem',
                    marginTop: '0.625rem',
                    textDecoration: 'none',
                    display: device === 'mobile' ? 'initial' : 'block',
                    ...typoStyle('desktop', element),
                    ...(device === 'tablet' || device === 'mobile') && typoStyle('tablet', element),
                    ...device === 'mobile' && typoStyle('mobile', element),
                    ...colorStyle('desktop', 'normal', element),
                    ...(device === 'tablet' || device === 'mobile') && colorStyle('tablet', 'normal', element),
                    ...device === 'mobile' && colorStyle('mobile', 'normal', element),
                    ':after': {
                        backgroundColor: '#ffc029',
                        backgroundImage: 'linear-gradient(90deg,#ffc029,#4cd8b0)',
                        transition: 'width .2s',
                        content: device === 'mobile' ? 'none' : '""',
                        display: 'block',
                        height: '.125rem',
                        margin: '.625rem auto 0',
                        width: '0',
                    },
                    ':hover': {
                        ...colorStyle('desktop', 'hover', element),
                        ...(device === 'tablet' || device === 'mobile') && colorStyle('tablet', 'hover', element),
                        ...device === 'mobile' && colorStyle('mobile', 'hover', element),
                    },
                    ':hover:after': {
                        width: '100%',
                    },
                },
                ':hover > ul': {
                    clip: 'inherit',
                    height: 'inherit',
                    opacity: '1',
                    overflow: 'inherit',
                    width: 'inherit',
                },
            },
        },
        '&.active': {
            right: `${mobileMenuPos}px`,
            opacity: '1',
        },
    });

    useEffect(() => {
        if (entry) {
            if (inView && element.content.animation.name !== 'none') {
                const timer = setInterval(() => {
                    entry.target.classList.add('animated');
                    entry.target.classList.add(element.content.animation.name);
                    entry.target.classList.remove('invisible');

                    if (element.content.animation.duration !== 'normal') {
                        entry.target.classList.add(`animated-${element.content.animation.duration}`);
                    }
                }, element.content.animation.delay);
                return () => clearInterval(timer);
            }
        }
        return null;
    }, [inView, entry]);

    return (
        <>
            <nav
                ref={ref}
                css={Nav}
            >
                <MainNavigation>
                    <ul>
                        {menu && menu.map((item) => (
                            <ItemPreview
                                key={item.slug}
                                item={item}
                                device={device}
                            />
                        ))}
                    </ul>
                </MainNavigation>
                <button
                    key='burger-button'
                    css={Burger}
                    onClick={() => handleOpenNav(entry)}
                    className='burger'
                    type='button'
                    style={{
                        display: device === 'mobile' ? 'block' : 'none',
                    }}
                >
                    <span key='burger-button-span' />
                </button>
            </nav>
        </>
    );
}

export default (MenuPreview);

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
            menu: PropTypes.oneOfType([
                PropTypes.shape({
                    items: PropTypes.string,
                }),
                PropTypes.string,
            ]).isRequired,
            animation: PropTypes.shape({
                name: PropTypes.string,
                duration: PropTypes.string,
                delay: PropTypes.string,
            }),
        }).isRequired,
        styles: PropTypes.shape({
        }).isRequired,
    }).isRequired,
};
