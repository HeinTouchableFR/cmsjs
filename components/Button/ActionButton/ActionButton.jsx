import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import styles from './ActionButton.module.scss';

export default function ActionButton({
    label, action = '#', icon,
}) {
    return (
        <Link href={action}>
            <a className={styles.button}>
                {label}
                <span className={icon} />
            </a>
        </Link>
    );
}

ActionButton.propTypes = {
    action: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};
