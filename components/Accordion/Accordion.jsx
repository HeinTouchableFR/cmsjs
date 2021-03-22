import React, {useState} from 'react';
import styles from './Accordion.module.scss';

export default function Accordion({ title, active = false, children, border = false }) {

    const [isActive, setIsActive] = useState(active)

    return (
        <>
            <div className={`${styles.accordion} ${border ? styles.border : ''}`}>
                <div className={`${styles.accordion__title} ${isActive && styles.active}`} onClick={() => setIsActive(!isActive)}>
                    <i aria-hidden="true" className="dropdown icon" />
                    {title}
                </div>
                <div className={`${styles.accordion__content} ${isActive && styles.active}`}>
                    {children}
                </div>
            </div>
        </>
    );
}
