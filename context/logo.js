import React, {useEffect, useContext, createContext, useState} from 'react';
import { firebase } from 'utils/firebaseClient';

const Logo = createContext({
    value: "{}",
});

export function LogoProvider({children}) {
    const [logo, setLogo] = useState({})

    useEffect(async() => {
        if(!logo.image){
            const logoSnapshot = await firebase.firestore().doc(`settings/logo`).get()
            setLogo(logoSnapshot.data())
            return true
        }
    })

    return <Logo.Provider value={{logo}}>{children}</Logo.Provider>;
}

export const useLogo = () => {
    return useContext(Logo);
};
