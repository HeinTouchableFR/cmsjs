import React from 'react';
import styles from 'components/Loader/Loader.module.scss';
import PropTypes from 'prop-types';

export default function Loader({ size }) {
    const items = [];
    for (let i = 1; i <= 20; i += 1) {
        items.push({
            key: i,
        });
    }

    return (
        <>
            <div className={`${styles.loader} ${styles[size]}`}>
                {
                    items.map((item) => (
                        <span
                            key={item.key}
                            style={{
                                '--i': item.key,
                            }}
                        />
                    ))
                }
            </div>
        </>
    );
}

Loader.propTypes = {
    size: PropTypes.oneOf([
        'small',
        'normal',
        'big',
    ]),
};

Loader.defaultProps = {
    size: 'normal',
};
