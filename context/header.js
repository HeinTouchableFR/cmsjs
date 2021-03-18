import React, {useState, useEffect, useContext, createContext} from 'react';
import { firebase } from 'utils/firebaseClient';

const Header = createContext({
    value: "[]",
});
const Logo = createContext({
    value: "[]",
});

export function HeaderProvider({children}) {
    const [header, setHeader] = useState(null);

    useEffect(async() => {
        if(!header){
            let logo = {}, content = "[]";

            const snapshot = await firebase.firestore().doc(`menus/IsWns6GwVz2YBCZe4fdk`).get()
            const item = {
                ...snapshot.data()
            }
            content = item.items

            const settingsSnapshot = await firebase.firestore().doc(`settings/logo`).get()
            const setting = {
                ...settingsSnapshot.data()
            }
            const imageSnapshot = await firebase.firestore().doc(`images/${setting.value}`).get()
            const image = {
                id: imageSnapshot.id,
                ...imageSnapshot.data()
            }
            logo = image

            setHeader({content, logo})
            return true
        }
    })

    return <Header.Provider value={{header}}>{children}</Header.Provider>;
}

export const useHeader = () => {
    return useContext(Header);
};
export const useLogo = () => {
    return useContext(Logo);
};
