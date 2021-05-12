import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './Accordion.module.scss';

export default function Accordion({ title,
    active,
    children,
    border }) {
    const [isActive, setIsActive] = useState(active);

    return (
        <div className={`${styles.accordion} ${border ? styles.border : ''}`}>
            <div
                className={`${styles.accordion__title} ${isActive && styles.active}`}
                onClick={() => setIsActive(!isActive)}
                onKeyDown={() => setIsActive(!isActive)}
                role='button'
                tabIndex={0}
            >
                <i
                    aria-hidden
                    className='fas fa-caret-down'
                />
                {title}
            </div>
            <div className={`${styles.accordion__content} ${isActive && styles.active}`}>
                {children}
            </div>
        </div>
    );
}

Accordion.propTypes = {
    active: PropTypes.bool,
    border: PropTypes.bool,
    title: PropTypes.oneOfType([
        PropTypes.shape({
        }),
        PropTypes.arrayOf(PropTypes.shape({
        })),
        PropTypes.string,
    ]).isRequired,
    children: PropTypes.oneOfType([
        PropTypes.shape({
        }),
        PropTypes.arrayOf(PropTypes.shape({
        })),
        PropTypes.string,
    ]).isRequired,
};

Accordion.defaultProps = {
    active: false,
    border: false,
};
