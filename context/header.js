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
            let logo = {}, nav = "[]", template = "[]";

            await axios
                .get(process.env.URL + '/api/templates/header')
                .then((res) => {
                    template = res.data.data;
                })
                .catch(() => {});

            JSON.parse(template.content).forEach(layout => {
                layout.columns.forEach(column =>{
                    column.elements.forEach(async element => {
                        if(element.type === "menu"){
                            const res = await axios.get(`${process.env.URL}/api/menus/${element.content.menu.value}`)
                            nav = res.data.data.items
                            return nav
                        }
                    })
                })
            })

            const logoSnapshot = await firebase.firestore().doc(`settings/logo`).get()
            logo = {
                ...logoSnapshot.data()
            }
            setHeader({nav, logo, template})
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
