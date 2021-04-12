import React, {
    useEffect, useState,
} from 'react';
import styles from './DarkModeButton.module.scss';

export default function DarkModeButton() {
    const [isDark, setIsDark] = useState(typeof window !== 'undefined' ? localStorage.getItem('theme') === 'dark' : false);

    const handleChange = (e) => {
        setIsDark(e.currentTarget.checked);
    };

    useEffect(() => {
        const themeToRemove = isDark ? 'light' : 'dark';
        const themeToAdd = isDark ? 'dark' : 'light';
        document.body.classList.add(`theme-${themeToAdd}`);
        document.body.classList.remove(`theme-${themeToRemove}`);
        localStorage.setItem('theme', themeToAdd);
    },
    [isDark]);

    return (
        <div className={`${styles.theme_switcher} ${styles.form_switch}`}>
            <input type='checkbox'
                id='theme-switcher'
                checked={isDark}
                onChange={handleChange}
            />
            <label htmlFor='theme-switcher'>
                <span className={styles.switch} />
                <svg className={`${styles.icon} ${styles.icon_moon}`}>
                    <use xlinkHref='/sprite.svg#moon' />
                </svg>
                <svg className={`${styles.icon} ${styles.icon_sun}`}>
                    <use xlinkHref='/sprite.svg#sun' />
                </svg>
            </label>
        </div>
    );
}
