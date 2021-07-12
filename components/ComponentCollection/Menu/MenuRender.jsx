import React, {
    useEffect, useState,
} from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useInView } from 'react-intersection-observer';
import {
    backgroundStyle,
    borderStyle,
    colorStyle,
    marginPaddingStyle,
    typoStyle,
} from 'variables/renderFunctions';
import PropTypes from 'prop-types';
import Item from './Elements/Item';

export default function MenuRender({ element }) {
    const { ref, inView, entry } = useInView({
        triggerOnce: true,
    });

    const [menu] = useState(JSON.parse(element.content.menu.items));

    const Nav = css({
        transition: 'width .2s',
        ...marginPaddingStyle('desktop', element),
        ...backgroundStyle('desktop', 'normal', element),
        ...borderStyle('desktop', 'normal', element),
        '&:hover': {
            ...backgroundStyle('desktop', 'hover', element),
            ...borderStyle('desktop', 'hover', element),
        },
        '@media (max-width: 1024px)': css({
            ...marginPaddingStyle('tablet', element),
            ...backgroundStyle('tablet', 'normal', element),
            ...borderStyle('tablet', 'normal', element),
            '&:hover': {
                ...backgroundStyle('tablet', 'hover', element),
                ...borderStyle('tablet', 'hover', element),
            },
        }),
        '@media (max-width: 768px)': css({
            ...marginPaddingStyle('mobile', element),
            ...backgroundStyle('mobile', 'normal', element),
            ...borderStyle('mobile', 'normal', element),
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
            background: 'currentColor',
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
            },
        },
        '&.active': {
            span: {
                background: 'transparent',
                '&:before': {
                    transform: 'translateY(-2px) rotate(45deg)',
                },
                '&:after': {
                    transform: 'rotate(-45deg)',
                },
            },
        },
    };

    const MainNavigation = styled.div({
        display: 'flex',
        justifyContent: `${element.content.alignment}`,
        ul: {
            float: 'left',
            display: 'block',
            listStyle: 'none',
            margin: '0',
            paddingLeft: '0',
            li: {
                float: 'left',
                position: 'relative',
                a: {
                    paddingLeft: '.5625rem',
                    paddingRight: '.5625rem',
                    marginTop: '0.625rem',
                    textDecoration: 'none',
                    ...typoStyle('desktop', element),
                    ...colorStyle('desktop', 'normal', element),
                    ':after': {
                        backgroundColor: '#ffc029',
                        backgroundImage: 'linear-gradient(90deg,#ffc029,#4cd8b0)',
                        transition: 'width .2s',
                        content: '""',
                        display: 'block',
                        height: '.125rem',
                        margin: '.625rem auto 0',
                        width: '0',
                    },
                    ':hover': {
                        ...colorStyle('desktop', 'hover', element),
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
        '@media (max-width: 1024px)': {
            ul: {
                li: {
                    a: {
                        ...typoStyle('tablet', element),
                        ...colorStyle('tablet', 'normal', element),
                        ':hover': {
                            ...colorStyle('tablet', 'hover', element),
                        },
                    },
                },
            },
        },
        '@media (max-width: 768px)': {
            display: 'block',
            justifyContent: 'none',
            position: 'fixed',
            top: 0,
            right: '-250px',
            bottom: 0,
            backgroundColor: '#FFF',
            height: '100%',
            width: '250px',
            transition: 'right .5s',
            ul: {
                float: 'none',
                marginTop: '50px',
                li: {
                    float: 'none',
                    borderTop: 'solid 1px var(--color-gray)',
                    padding: '10px 0',
                    a: {
                        ...typoStyle('mobile', element),
                        ...colorStyle('mobile', 'normal', element),
                        ':hover': {
                            ...colorStyle('mobile', 'hover', element),
                        },
                        '&:after': {
                            content: 'none',
                        },
                    },
                },
            },
            '&.active': {
                right: 0,
            },
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
    }, [inView]);

    const handleOpenNav = () => {
        entry.target.firstChild.classList.toggle('active');
        entry.target.lastChild.classList.toggle('active');
    };

    return (
        <>
            <nav
                ref={ref}
                css={Nav}
                className={element.content.animation.name !== 'none' ? 'invisible' : ''}
            >
                <MainNavigation>
                    <ul>
                        {menu && menu.map((item) => (
                            <Item
                                key={item.slug}
                                item={item}
                            />
                        ))}
                    </ul>
                </MainNavigation>
                <button
                    key='burger-button'
                    css={Burger}
                    onClick={handleOpenNav}
                    className='burger'
                    type='button'
                >
                    <span key='burger-button-span' />
                </button>
            </nav>
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
