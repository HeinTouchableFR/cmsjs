import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from '@emotion/styled';

export default function Item({ item, items }) {
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
                <Link href={item.data.slug !== '/' ? `${process.env.SERVER}/${item.data.slug}` : `${item.data.slug}`}>
                    {/* eslint-disable-next-line max-len */}
                    {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events */}
                    <a>{item.data.title}</a>
                </Link>
                {item.children.length > 0
                && (
                    <>
                        <SubMenu>
                            {item.children.map((thing) => (
                                <Item
                                    key={thing}
                                    item={items[thing]}
                                    items={items}
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
        data: PropTypes.shape({
            title: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
        }).isRequired,
        children: PropTypes.arrayOf(PropTypes.shape({
        })).isRequired,
    }).isRequired,
};

Item.defaultProps = {
};
