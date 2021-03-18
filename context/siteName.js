import React, {useState, useEffect, useContext, createContext} from 'react';
import { firebase } from 'utils/firebaseClient';

const SiteName = createContext({
    value: null,
});

export function SiteNameProvider({children}) {
    const [siteName, setSiteName] = useState("");

    useEffect(() => {
        return firebase.firestore().doc(`settings/sitename`).get().then(snapshot => {
            const item = {
                ...snapshot.data()
            }
            setSiteName(item.value)
        })
    })

    return <SiteName.Provider value={{siteName}}>{children}</SiteName.Provider>;
}

export const useSiteName = () => {
    return useContext(SiteName);
};
