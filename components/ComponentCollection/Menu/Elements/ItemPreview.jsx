import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from '@emotion/styled';

export default function ItemPreview({ item, device }) {
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
        ...(device === 'mobile') && {
            display: 'block!important',
            position: 'relative',
            margin: '0!important',
            padding: '0',
            left: '0',
            top: '10px',
        },
        li: {
            backgroundColor: device === 'mobile' ? '#e1e1e1' : '#fff',
            '&:first-of-type a': {
                paddingTop: '8px',
            },
            '&:last-child a': {
                paddingBottom: '8px',
            },
            ...(device === 'mobile') && {
                paddingLeft: '1rem!important',
            },
        },
        a: {
            display: device === 'mobile' ? 'initial' : 'block',
            textAlign: 'left',
            padding: device === 'mobile' ? '0' : '0 25px 0 20px',
            whiteSpace: 'normal',
            width: '266px',
            ...(device === 'mobile') && {
                padding: '0!important',
                margin: '0!important',
            },
        },
        ul: {
            top: device === 'mobile' ? '10px' : '-22px',
            left: device === 'mobile' ? '0' : '266px',
        },
    });

    return (
        <>
            <li>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link href='#'>
                    {/* eslint-disable-next-line max-len */}
                    {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events */}
                    <a>{item.label}</a>
                </Link>

                {item.child.length > 0
                && (
                    <>
                        <SubMenu>
                            {item.child.map((thing) => (
                                <ItemPreview
                                    key={thing.slug}
                                    item={thing}
                                    icon='fa-angle-double-right'
                                    device={device}
                                />
                            ))}
                        </SubMenu>
                    </>
                )}
            </li>
        </>
    );
}

ItemPreview.propTypes = {
    item: PropTypes.shape({
        label: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        child: PropTypes.arrayOf(PropTypes.shape({
        })).isRequired,
    }).isRequired,
    device: PropTypes.string.isRequired,
};

ItemPreview.defaultProps = {
};
