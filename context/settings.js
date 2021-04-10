import React, { useState, useEffect, useContext, createContext } from 'react';
import { useRouter } from 'next/router';

const Settings = createContext({
    value: null,
});

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState([]);
    const router = useRouter();

    useEffect(async () => {
        const res = await fetch('/api/settings');
        res.json().then(async (data) => {
            const tmpSettings = [];

            data.data.map((item) => {
                tmpSettings[item._id] = item;
            });

            if (tmpSettings['sitename'] === undefined) {
                const resInstallToken = await fetch('/api/install/token');
                const installToken = await resInstallToken.json();
                tmpSettings['installToken'] = installToken.data;
                router.push('/admin/install');
            }

            setSettings(tmpSettings);
        });
    }, []);

    return <Settings.Provider value={{ settings }}>{children}</Settings.Provider>;
}

export const useSettings = () => {
    return useContext(Settings);
};
