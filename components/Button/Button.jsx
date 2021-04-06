import React from 'react';
import Link from 'next/link';

import styles from './Button.module.scss';

export function Button({label, action = "#", icon, target = "_self"}) {

    return (<>
            {typeof (action) === 'function' ?
                <button onClick={action} className={styles.button} type={"button"}>
                    {label}
                    <span className={icon}/>
                </button>
                :
                <Link href={action}>
                    <a target={target} className={styles.button}>
                        {label}
                        <span className={icon}/>
                    </a>
                </Link>
            }
        </>
    );
}

