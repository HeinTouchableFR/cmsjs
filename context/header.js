import React, {useState, useEffect, useContext, createContext} from 'react';
import { firebase } from 'utils/firebaseClient';
import axios from 'axios';

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

            let item = {};
            await axios
                .get(process.env.URL + '/api/menus/jBAOJwV8A1DWnzkP5PEQ')
                .then((res) => {
                    item = res.data.data;
                })
                .catch(() => {});
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
