import React, {
    useEffect, useState,
} from 'react';
import styles from 'components/Flash/Flash.module.scss';
import PropTypes from 'prop-types';

export default function Flash({ error }) {
    const [display, setDisplay] = useState(error.status !== undefined || error.code !== undefined);
    const [animation, setAnimation] = useState('in');

    useEffect(() => {
        const handle = setInterval(async () => {
            setAnimation('out');
        }, 4000);
        return () => clearInterval(handle);
    }, [error]);

    useEffect(() => {
        const handle = setInterval(async () => {
            setDisplay(false);
        }, 4500);
        return () => clearInterval(handle);
    }, [error]);

    useEffect(() => {
        setDisplay(error.status !== undefined || error.code !== undefined);
        setAnimation('in');
    }, [error]);

    return (
        <>
            {display && (
                <div className={`${styles.flash} ${styles.error} ${styles[animation]}`}>
                    <div className={`${styles.status}`}>
                        {`Status: ${error.status} - Code: ${error.code}`}
                    </div>
                    <div className={`${styles.message}`}>
                        {error.message}
                    </div>
                    {error.request && (
                        <div className={`${styles.request}`}>
                            {`Request: ${error.request}`}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

Flash.propTypes = {
    error: PropTypes.shape({
        status: PropTypes.number,
        code: PropTypes.number,
        message: PropTypes.string,
        request: PropTypes.string,
    }).isRequired,
};
