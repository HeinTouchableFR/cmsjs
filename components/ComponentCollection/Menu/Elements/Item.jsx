import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from '@emotion/styled';

export default function Item({ item, icon }) {
    const SubMenu = styled.ul({
        paddingTop: '22px',
        transition: 'opacity .6s',
        clip: 'rect(1px, 1px, 1px, 1px)',
        height: '1px',
        left: '-1px',
        opacity: '0',
        overflow: 'hidden',
        position: 'absolute',
        width: '1px',
        zIndex: '9999',
        li: {
            backgroundColor: '#fff',
            '&:first-of-type a': {
                paddingTop: '8px',
            },
            '&:last-child a': {
                paddingBottom: '8px',
            },
        },
        a: {
            display: 'block',
            textAlign: 'left',
            padding: '0 25px 0 20px',
            whiteSpace: 'normal',
            width: '266px',
        },
        ul: {
            top: '-22px',
            left: '266px',
        },
        '@media (max-width: 768px)': {
            display: 'block!important',
            position: 'relative',
            margin: '0!important',
            padding: '0',
            left: '0',
            top: '10px',
            li: {
                backgroundColor: '#e1e1e1',
                paddingLeft: '1rem!important',
                a: {
                    display: 'initial',
                    padding: '0!important',
                    margin: '0!important',
                },
            },
            ul: {
                top: '10px',
                left: '0',
            },
        },
    });

    return (
        <>
            <li>
                <Link href={item.slug !== '/' ? `${process.env.SERVER}/${item.slug}` : `${item.slug}`}>
                    {/* eslint-disable-next-line max-len */}
                    {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events */}
                    <a>{item.label}</a>
                </Link>

                {item.child.length > 0
                && (
                    <>
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
            </li>
        </>
    );
}

Item.propTypes = {
    item: PropTypes.shape({
        label: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        child: PropTypes.arrayOf(PropTypes.shape({
        })).isRequired,
    }).isRequired,
    icon: PropTypes.string,
};

Item.defaultProps = {
    icon: 'fa-angle-double-down',
};
