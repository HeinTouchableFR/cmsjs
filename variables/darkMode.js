import {
    useEffect, useState,
} from 'react';

/**
 * Allows to know theme to display according to the parameters of the page
 * @param params
 * @return {string}
 */
export default function useDarkMode(params) {
    // Default body theme
    const [theme, setTheme] = useState('theme-light');
    // Default mode
    const [mode, setMode] = useState('light');

    /**
     * Allows you to define theme
     * @param value
     */
    const handleThemeChange = (value) => {
        setTheme(value);
    };

    /**
     * Allows to know theme of the body when it changes
     */
    useEffect(() => {
        const body = document.querySelector('body');
        const { classList } = body;
        handleThemeChange(classList.toString());
        body.addEventListener('change', () => {
            handleThemeChange(classList.toString());
        });
    }, []);

    /**
     * Allows you to change mode
     */
    useEffect(() => {
        const color = (theme === 'theme-light' || theme === '') ? 'light' : 'dark';
        setMode(!params.background.enableDarkMode ? 'light' : color);
    }, [theme, params]);

    return mode;
}
