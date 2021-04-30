import React, {
    useState, useEffect, useContext, createContext,
} from 'react';

const Settings = createContext({
    value: null,
});

export function SettingsProvider({ children }) {
    const [value, setValue] = useState({
        success: false,
        settings: [],
    })

    useEffect(async () => {
        const res = await fetch('/api/settings');
        const { data } = await res.json();
        if (data) {
            setValue({
                success: true,
                settings: data,
            });
        }
    }, []);

    return (
        <Settings.Provider
            value={{
                value,
            }}
        >
            {children}
        </Settings.Provider>
    );
}

export const useSettings = () => useContext(Settings);
