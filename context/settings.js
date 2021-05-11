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
    });

    useEffect(async () => {
        const res = await fetch('/api/settings');
        const { data } = await res.json();
        if (data) {
            const generalSettings = data.find((x) => x.id === 'general');
            let logo = [];
            if (generalSettings) {
                logo = generalSettings.logo;
            }
            setValue({
                success: true,
                settings: data,
                logo,
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
