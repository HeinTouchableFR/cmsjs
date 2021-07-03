import React, {
    useState, useEffect, useContext, createContext,
} from 'react';
import fetcher from 'utils/fetcher';

const Settings = createContext({
    value: null,
});

export function SettingsProvider({ children }) {
    const [value, setValue] = useState({
        success: false,
        settings: [],
    });

    useEffect(async () => {
        const res = await fetcher('/api/settings');
        if (res.success && res.result.data) {
            setValue({
                success: true,
                settings: res.result.data,
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
