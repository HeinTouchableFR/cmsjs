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
import {
    Burger, handleOpenNav,
} from './Elements/Burger';

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
                    display: 'block',
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
                        display: 'initial',
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

    return (
        <>
            <nav
                ref={ref}
                css={Nav}
                className={element.content.animation.name !== 'none' ? 'invisible' : ''}
            >
                <MainNavigation>
                    <ul>
                        {menu && Object.values(menu.items).map((item) => {
                            if (item.parent === 'root') {
                                return (
                                    <Item
                                        key={item.id}
                                        item={item}
                                        items={menu.items}
                                    />
                                );
                            }
                            return null;
                        })}
                    </ul>
                </MainNavigation>
                <button
                    key='burger-button'
                    css={Burger}
                    onClick={() => handleOpenNav(entry)}
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
