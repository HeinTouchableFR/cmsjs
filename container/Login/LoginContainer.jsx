import React from 'react';

import styles from './LoginContainer.module.scss';

export default function LoginContainer({children}) {
    return (
        <>
            <div className={`${styles.login__container}`}>
                {children}
            </div>
        </>
    );
}
