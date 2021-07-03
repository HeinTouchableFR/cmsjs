import React, {
    useState, useEffect, useContext, createContext,
} from 'react';
import { useRouter } from 'next/router';
import fetcher from '../utils/fetcher';

const Site = createContext({
    value: null,
});

export function SiteProvider({ children }) {
    const router = useRouter();
    const [value, setValue] = useState({
        authorizedToInstall: false,
        success: true,
    });

    useEffect(async () => {
        const res = await fetcher('/api/settings');
        if (res.success && res.result.data) {
            if (res.result.data.length === 0) {
                setValue({
                    authorizedToInstall: true,
                    success: true,
                });
                await router.push('/admin/install');
            } else {
                setValue({
                    settings: res.result.data,
                    success: true,
                });
            }
        }
    }, []);

    return (
        <Site.Provider
            value={{
                value,
            }}
        >
            {children}
        </Site.Provider>
    );
}

export const useSite = () => useContext(Site);
