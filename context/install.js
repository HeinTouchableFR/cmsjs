import React, {
    useState, useEffect, useContext, createContext,
} from 'react';
import { useRouter } from 'next/router';
import { useSettings } from './settings';

const Install = createContext({
    value: null,
});

export function InstallProvider({ children }) {
    const router = useRouter();
    const { value: settings } = useSettings();
    const [value, setValue] = useState({
    });

    useEffect(async () => {
        if (settings.success) {
            if (settings.settings.length === 0) {
                const resInstallToken = await fetch('/api/install/token');
                const installToken = await resInstallToken.json();
                setValue({
                    installToken: installToken.data,
                });
                router.push('/admin/install');
            }
        }
    }, [settings]);

    return (
        <Install.Provider
            value={{
                value,
            }}
        >
            {children}
        </Install.Provider>
    );
}

export const useInstall = () => useContext(Install);
